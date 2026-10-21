import { expect, test } from '@playwright/test'
import {
	approvedFeedback,
	cleanupSmokeContent,
	contactSender,
	pendingFeedback,
	seedSmokeContent,
	smokeProject,
} from '../helpers/seedContent'

const pages = [
	{ path: '/', title: 'John Dennehy — Software Engineer', heading: /Crafting/ },
	{ path: '/projects', title: 'Projects — John Dennehy', heading: 'Projects' },
	{ path: '/cv', title: 'CV — John Dennehy', heading: 'CV' },
	{ path: '/blog', title: 'Blog — John Dennehy', heading: 'Blog' },
	{ path: '/contact', title: 'Contact — John Dennehy', heading: 'Get in Touch' },
]

test.describe('Frontend smoke', () => {
	test.beforeAll(seedSmokeContent)
	test.afterAll(cleanupSmokeContent)

	for (const { path, title, heading } of pages) {
		test(`${path} renders`, async ({ page }) => {
			const response = await page.goto(path)
			expect(response?.status()).toBe(200)
			await expect(page).toHaveTitle(title)
			await expect(page.locator('h1').first()).toHaveText(heading)
		})
	}

	test('unknown routes return the 404 page', async ({ page }) => {
		const response = await page.goto('/this-page-does-not-exist')
		expect(response?.status()).toBe(404)
		await expect(page).toHaveTitle('404 — Page Not Found')
	})

	test('projects list links to a project page showing only approved feedback', async ({ page }) => {
		await page.goto('/projects')
		await page
			.getByRole('link', { name: new RegExp(smokeProject.title) })
			.first()
			.click()

		await expect(page).toHaveURL(`/projects/${smokeProject.slug}`)
		await expect(page.locator('h1').first()).toHaveText(smokeProject.title)
		await expect(page.getByText(approvedFeedback.message)).toBeVisible()
		await expect(page.getByText(pendingFeedback.message)).toHaveCount(0)
		await expect(page.getByRole('button', { name: 'Send Feedback' })).toBeVisible()
	})

	test('contact form renders with the honeypot hidden', async ({ page }) => {
		await page.goto('/contact')
		for (const label of ['Your Name', 'Email Address', 'Subject', 'Message']) {
			await expect(page.getByLabel(label, { exact: true })).toBeVisible()
		}
		await expect(page.locator('#contact-website')).not.toBeInViewport()
		await expect(page.getByRole('button', { name: /Send Message/ })).toBeVisible()
	})

	test('contact form thanks the sender by first name after sending', async ({ page }) => {
		await page.goto('/contact')
		await page.getByLabel('Your Name', { exact: true }).fill(contactSender.name)
		await page.getByLabel('Email Address', { exact: true }).fill(contactSender.email)
		await page.getByLabel('Subject', { exact: true }).fill('E2E subject')
		await page.getByLabel('Message', { exact: true }).fill('Sent by the e2e smoke tests.')
		// The form rejects submissions made within 3 seconds of page load
		await page.waitForTimeout(3_100)
		await page.getByRole('button', { name: /Send Message/ }).click()

		await expect(page.getByText('Thanks for reaching out, Ada!')).toBeVisible()
	})
})

test.describe('Public API access', () => {
	test.beforeAll(seedSmokeContent)
	test.afterAll(cleanupSmokeContent)

	test('anonymous feedback reads only return approved docs, without private fields', async ({
		request,
	}) => {
		const response = await request.get('/api/project-feedback?limit=100&depth=0')
		expect(response.ok()).toBe(true)
		const { docs } = (await response.json()) as { docs: Record<string, unknown>[] }

		const names = docs.map((doc) => doc.name)
		expect(names).toContain(approvedFeedback.name)
		expect(names).not.toContain(pendingFeedback.name)
		for (const doc of docs) {
			expect(doc).not.toHaveProperty('approved')
			expect(doc).not.toHaveProperty('website')
			expect(doc).not.toHaveProperty('submitterHash')
		}
	})

	test('contact messages are not publicly readable', async ({ request }) => {
		const response = await request.get('/api/contact-messages')
		expect(response.status()).toBe(403)
	})
})

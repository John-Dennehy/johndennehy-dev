import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const smokeProject = {
	title: 'E2E Smoke Project',
	slug: 'e2e-smoke-project',
}

export const approvedFeedback = { name: 'E2E Approved', message: 'Visible to everyone' }
export const pendingFeedback = { name: 'E2E Pending', message: 'Awaiting moderation' }

/**
 * Seeds a published project with one approved and one unapproved piece of feedback.
 * Everything is namespaced with "e2e" and removed again by cleanupSmokeContent.
 */
export async function seedSmokeContent(): Promise<void> {
	await cleanupSmokeContent()
	const payload = await getPayload({ config })

	const project = await payload.create({
		collection: 'projects',
		data: { ...smokeProject, summary: 'Seeded by the e2e smoke tests.', status: 'published' },
	})

	await payload.create({
		collection: 'project-feedback',
		data: { ...approvedFeedback, project: project.id, approved: true },
	})
	await payload.create({
		collection: 'project-feedback',
		data: { ...pendingFeedback, project: project.id, approved: false },
	})
}

export async function cleanupSmokeContent(): Promise<void> {
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'projects',
		where: { slug: { equals: smokeProject.slug } },
		depth: 0,
	})
	for (const project of docs) {
		await payload.delete({
			collection: 'project-feedback',
			where: { project: { equals: project.id } },
		})
		await payload.delete({ collection: 'projects', id: project.id })
	}
}

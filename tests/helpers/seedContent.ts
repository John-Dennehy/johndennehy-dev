import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const smokeProject = {
	title: 'E2E Smoke Project',
	slug: 'e2e-smoke-project',
}

export const contactSender = { name: 'Ada Lovelace', email: 'e2e-contact@example.com' }

export const approvedFeedback = { name: 'E2E Approved', message: 'Visible to everyone' }
export const pendingFeedback = { name: 'E2E Pending', message: 'Awaiting moderation' }

/**
 * These helpers write and delete data, so refuse to run unless the configured database is
 * local (the CI service container or a throwaway Docker Postgres). Mirrors the connection
 * logic in payload.config.ts, where PGHOST takes precedence over DATABASE_URL.
 */
function assertLocalDatabase(): void {
	const host =
		process.env.PGHOST || new URL(process.env.DATABASE_URL || 'postgres://unset').hostname
	if (!['localhost', '127.0.0.1', '::1', 'postgres'].includes(host)) {
		throw new Error(
			`Refusing to seed test data into non-local database host "${host}". ` +
				'Point DATABASE_URL at a local Postgres and leave PGHOST empty.',
		)
	}
}

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
	assertLocalDatabase()
	const payload = await getPayload({ config })

	await payload.delete({
		collection: 'contact-messages',
		where: { email: { equals: contactSender.email } },
	})

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

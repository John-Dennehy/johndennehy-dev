import type { Access, CollectionConfig, FieldAccess } from 'payload'
import { rateLimitSubmissions, rejectHoneypot, submitterHashField } from '../lib/publicForms'

const isAuthenticated: FieldAccess = ({ req: { user } }) => Boolean(user)

// Signed-in users see everything; the public only sees approved feedback
const readApprovedOrAuthenticated: Access = ({ req: { user } }) =>
	user ? true : { approved: { equals: true } }

export const ProjectFeedback: CollectionConfig = {
	slug: 'project-feedback',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'project', 'approved', 'createdAt'],
		group: 'Content',
	},
	access: {
		// Anyone can submit feedback
		create: () => true,
		read: readApprovedOrAuthenticated,
		// Only authenticated users can update/delete
		update: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
	},
	hooks: {
		beforeValidate: [rejectHoneypot],
		beforeChange: [rateLimitSubmissions({ max: 5, windowMinutes: 60 })],
	},
	fields: [
		{
			name: 'project',
			type: 'relationship',
			relationTo: 'projects',
			required: true,
			admin: {
				description: 'Which project this feedback is for',
			},
		},
		{
			name: 'name',
			type: 'text',
			required: true,
			maxLength: 100,
			admin: {
				description: "Commenter's name",
			},
		},
		{
			name: 'message',
			type: 'textarea',
			required: true,
			maxLength: 1000,
			admin: {
				description: 'The feedback or suggestion',
			},
		},
		submitterHashField,
		{
			// Honeypot field — hidden from real users, bots fill it in
			name: 'website',
			type: 'text',
			access: {
				read: isAuthenticated,
			},
			admin: {
				description: 'Honeypot field — should always be empty. Filled = spam.',
				position: 'sidebar',
			},
		},
		{
			name: 'approved',
			type: 'checkbox',
			defaultValue: false,
			access: {
				read: isAuthenticated,
				// Stop the public approving their own feedback on create
				create: isAuthenticated,
				update: isAuthenticated,
			},
			admin: {
				description: 'Only approved feedback is shown on the site',
				position: 'sidebar',
			},
		},
	],
}

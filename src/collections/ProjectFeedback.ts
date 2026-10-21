import type { Access, CollectionConfig, FieldAccess } from 'payload'

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
		beforeValidate: [
			({ data }) => {
				// Honeypot spam protection — reject if the hidden field is filled
				if (data?.website && String(data.website).trim().length > 0) {
					throw new Error('Spam detected.')
				}
				return data
			},
		],
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

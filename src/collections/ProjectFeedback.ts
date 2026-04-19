import type { CollectionConfig } from 'payload'

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
		// Only approved feedback is publicly readable
		read: () => true,
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
			admin: {
				description: 'Honeypot field — should always be empty. Filled = spam.',
				position: 'sidebar',
			},
		},
		{
			name: 'approved',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				description: 'Only approved feedback is shown on the site',
				position: 'sidebar',
			},
		},
	],
}

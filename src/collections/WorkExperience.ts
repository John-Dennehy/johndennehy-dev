import type { CollectionConfig } from 'payload'

export const WorkExperience: CollectionConfig = {
	slug: 'work-experience',
	admin: {
		useAsTitle: 'role',
		defaultColumns: ['role', 'company', 'startDate', 'endDate', 'order'],
		group: 'CV',
	},
	access: {
		read: () => true,
		create: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
	},
	fields: [
		{
			name: 'role',
			type: 'text',
			required: true,
			admin: {
				description: 'Job title (e.g. "Frontend Developer")',
			},
		},
		{
			name: 'company',
			type: 'text',
			required: true,
		},
		{
			name: 'companyUrl',
			type: 'text',
			admin: {
				description: 'Link to company website',
			},
		},
		{
			name: 'location',
			type: 'text',
			admin: {
				description: 'e.g. "London, UK"',
			},
		},
		{
			name: 'startDate',
			type: 'date',
			required: true,
			admin: {
				date: {
					pickerAppearance: 'monthOnly',
					displayFormat: 'MMM yyyy',
				},
			},
		},
		{
			name: 'endDate',
			type: 'date',
			admin: {
				description: 'Leave empty for current role',
				date: {
					pickerAppearance: 'monthOnly',
					displayFormat: 'MMM yyyy',
				},
			},
		},
		{
			name: 'current',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				description: 'Tick if this is your current role',
				position: 'sidebar',
			},
		},
		{
			name: 'summary',
			type: 'textarea',
			admin: {
				description: 'Brief 1-2 sentence overview of the role',
			},
		},
		{
			name: 'highlights',
			type: 'array',
			admin: {
				description: 'Key achievements and responsibilities — each is a bullet point',
			},
			fields: [
				{
					name: 'text',
					type: 'textarea',
					required: true,
				},
			],
		},
		{
			name: 'techStack',
			type: 'relationship',
			relationTo: 'technologies',
			hasMany: true,
			admin: {
				description: 'Technologies used in this role',
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			admin: {
				description: 'Display order (lower = higher up). Used alongside dates.',
				position: 'sidebar',
			},
		},
	],
}

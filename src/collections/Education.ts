import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
	slug: 'education',
	admin: {
		useAsTitle: 'qualification',
		defaultColumns: ['qualification', 'institution', 'startDate', 'order'],
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
			name: 'qualification',
			type: 'text',
			required: true,
			admin: {
				description: 'e.g. "BSc Computer Science" or "Full-Stack Web Development"',
			},
		},
		{
			name: 'institution',
			type: 'text',
			required: true,
			admin: {
				description: 'e.g. "General Assembly" or "University of London"',
			},
		},
		{
			name: 'institutionUrl',
			type: 'text',
			admin: {
				description: 'Link to institution website',
			},
		},
		{
			name: 'location',
			type: 'text',
		},
		{
			name: 'startDate',
			type: 'date',
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
				date: {
					pickerAppearance: 'monthOnly',
					displayFormat: 'MMM yyyy',
				},
			},
		},
		{
			name: 'description',
			type: 'textarea',
			admin: {
				description: 'Additional details about the course or qualification',
			},
		},
		{
			name: 'techStack',
			type: 'relationship',
			relationTo: 'technologies',
			hasMany: true,
			admin: {
				description: 'Technologies learned or used',
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			admin: {
				description: 'Display order (lower = higher up)',
				position: 'sidebar',
			},
		},
	],
}

import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
	slug: 'technologies',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'category', 'iconSlug', 'updatedAt'],
		group: 'Content',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'URL-friendly identifier (e.g. "react", "typescript")',
			},
		},
		{
			name: 'iconSlug',
			type: 'text',
			admin: {
				description:
					'Devicon icon identifier (e.g. "react", "typescript"). ' +
					'Used to load SVG from CDN: cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{iconSlug}/{iconSlug}-original.svg. ' +
					'Browse available icons at devicon.dev',
			},
		},
		{
			name: 'iconVariant',
			type: 'select',
			defaultValue: 'original',
			options: [
				{ label: 'Original', value: 'original' },
				{ label: 'Original (Wordmark)', value: 'original-wordmark' },
				{ label: 'Plain', value: 'plain' },
				{ label: 'Plain (Wordmark)', value: 'plain-wordmark' },
				{ label: 'Line', value: 'line' },
				{ label: 'Line (Wordmark)', value: 'line-wordmark' },
			],
			admin: {
				description:
					'Devicon icon style variant. "Original" is full colour; "plain" is monochrome.',
			},
		},
		{
			name: 'logo',
			type: 'upload',
			relationTo: 'media',
			admin: {
				description: 'Custom logo upload — overrides the Devicon icon if set',
			},
		},
		{
			name: 'docsUrl',
			type: 'text',
			admin: {
				description: 'Link to official documentation',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			defaultValue: 'other',
			options: [
				{ label: 'Language', value: 'language' },
				{ label: 'Framework', value: 'framework' },
				{ label: 'Library', value: 'library' },
				{ label: 'Tool', value: 'tool' },
				{ label: 'Database', value: 'database' },
				{ label: 'Platform', value: 'platform' },
				{ label: 'Other', value: 'other' },
			],
		},
	],
}

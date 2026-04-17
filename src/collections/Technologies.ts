import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Technology logo or icon',
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
        { label: 'Tool', value: 'tool' },
        { label: 'Database', value: 'database' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
}

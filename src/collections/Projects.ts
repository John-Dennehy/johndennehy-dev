import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'publishedDate'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier used in /projects/[slug]',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on the project card',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full project write-up',
      },
    },
    {
      name: 'techStack',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies used in this project',
      },
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: {
        description: 'Link to live/deployed project',
      },
    },
    {
      name: 'repoUrl',
      type: 'text',
      admin: {
        description: 'Link to source code repository',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Project screenshot or preview image',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pin this project to the top of the listing',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description: 'Only published projects appear on the site',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        description: 'Used for ordering projects on the listing page',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}

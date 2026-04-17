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

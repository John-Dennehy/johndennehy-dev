import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email',
	},
	auth: {
		maxLoginAttempts: 5,
		lockTime: 15 * 60 * 1000, // 15 minutes
	},
	access: {
		// Only authenticated users can manage other users
		read: ({ req: { user } }) => Boolean(user),
		create: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
	},
	fields: [
		// Email added by default
		// Add more fields as needed
	],
}

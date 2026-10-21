import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { ContactMessages } from './collections/ContactMessages'
import { Education } from './collections/Education'
import { Media } from './collections/Media'
import { ProjectFeedback } from './collections/ProjectFeedback'
import { Projects } from './collections/Projects'
import { Technologies } from './collections/Technologies'
import { Users } from './collections/Users'
import { WorkExperience } from './collections/WorkExperience'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	// Explicit URL in production; previews fall back to their own deployment URL
	serverURL:
		process.env.NEXT_PUBLIC_SERVER_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		meta: {
			titleSuffix: ' — johndennehy.dev',
			icons: [{ url: '/favicon.ico' }],
		},
	},
	collections: [
		Users,
		Media,
		Technologies,
		Projects,
		ProjectFeedback,
		WorkExperience,
		Education,
		ContactMessages,
	],
	editor: lexicalEditor(),
	email: resendAdapter({
		defaultFromAddress: 'noreply@johndennehy.dev',
		defaultFromName: 'John Dennehy',
		apiKey: process.env.RESEND_API_KEY || '',
	}),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		// Schema changes only ever happen through committed migrations (src/migrations),
		// never by dev-mode push, so a misconfigured DATABASE_URL can't silently alter prod.
		push: false,
		migrationDir: path.resolve(dirname, 'migrations'),
		pool: {
			connectionString: process.env.PGHOST
				? `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=verify-full`
				: process.env.DATABASE_URL || '',
		},
	}),
	sharp,
	plugins: [
		// Vercel's filesystem is ephemeral, so media lives in Vercel Blob. Without a token
		// (local dev, CI) uploads fall back to local disk.
		vercelBlobStorage({
			enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
			// Keep the schema identical whether or not the plugin is enabled
			alwaysInsertFields: true,
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN,
			// Upload straight from the browser to Blob, bypassing Vercel's 4.5 MB request body limit
			clientUploads: true,
		}),
	],
})

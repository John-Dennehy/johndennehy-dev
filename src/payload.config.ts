import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Technologies } from './collections/Technologies'
import { Projects } from './collections/Projects'
import { ProjectFeedback } from './collections/ProjectFeedback'
import { WorkExperience } from './collections/WorkExperience'
import { Education } from './collections/Education'
import { ContactMessages } from './collections/ContactMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
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
  collections: [Users, Media, Technologies, Projects, ProjectFeedback, WorkExperience, Education, ContactMessages],
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
    pool: {
      connectionString: process.env.PGHOST
        ? `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=verify-full`
        : process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})

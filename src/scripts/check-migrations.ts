/**
 * Pre-deploy guard, run by `pnpm run ci` before `payload migrate`.
 *
 * If the database was ever changed by Payload's dev-mode push, payload_migrations holds a
 * `batch = -1` row and `payload migrate` stops at an interactive prompt — which hangs a
 * non-interactive build. Fail fast with instructions instead.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../')
dotenv.config({ path: path.join(rootDir, '.env.local') })
dotenv.config({ path: path.join(rootDir, '.env') })

import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

async function run() {
	const { default: config } = await import('@payload-config')
	const payload = await getPayload({ config })

	const { rows } = await payload.db.drizzle.execute(
		sql`SELECT to_regclass('public.payload_migrations') IS NOT NULL AS has_table`,
	)
	const devPushRows = rows[0]?.has_table
		? (
				await payload.db.drizzle.execute(
					sql`SELECT count(*)::int AS count FROM payload_migrations WHERE batch = -1`,
				)
			).rows[0]?.count
		: 0

	if (devPushRows) {
		console.error(
			[
				'This database has been modified by Payload dev-mode push (payload_migrations has a batch = -1 row).',
				'`payload migrate` would stop at an interactive prompt and hang the build.',
				'Check the schema matches the committed migrations, then remove the marker:',
				'  DELETE FROM payload_migrations WHERE batch = -1;',
			].join('\n'),
		)
		process.exit(1)
	}

	console.log('Migration preflight passed.')
	process.exit(0)
}

run().catch((error) => {
	console.error(error)
	process.exit(1)
})

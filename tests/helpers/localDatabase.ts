/**
 * The e2e helpers write and delete data, so refuse to run unless the configured database is
 * local (the CI service container or a throwaway Docker Postgres). Mirrors the connection
 * logic in payload.config.ts, where PGHOST takes precedence over DATABASE_URL.
 *
 * Call it after getPayload(), so it sees any env files Payload loaded, and before writing.
 */
export function assertLocalDatabase(): void {
	const host =
		process.env.PGHOST || new URL(process.env.DATABASE_URL || 'postgres://unset').hostname
	if (!['localhost', '127.0.0.1', '::1', 'postgres'].includes(host)) {
		throw new Error(
			`Refusing to seed test data into non-local database host "${host}". ` +
				'Point DATABASE_URL at a local Postgres and leave PGHOST empty.',
		)
	}
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_feedback" ADD COLUMN "submitter_hash" varchar;
  ALTER TABLE "contact_messages" ADD COLUMN "submitter_hash" varchar;
  CREATE INDEX "project_feedback_submitter_hash_idx" ON "project_feedback" USING btree ("submitter_hash");
  CREATE INDEX "contact_messages_submitter_hash_idx" ON "contact_messages" USING btree ("submitter_hash");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "project_feedback_submitter_hash_idx";
  DROP INDEX "contact_messages_submitter_hash_idx";
  ALTER TABLE "project_feedback" DROP COLUMN "submitter_hash";
  ALTER TABLE "contact_messages" DROP COLUMN "submitter_hash";`)
}

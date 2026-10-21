# johndennehy.dev

Personal portfolio and project showcase built with [Next.js 16](https://nextjs.org/), [Payload CMS v3](https://payloadcms.com/), and [Neon Postgres](https://neon.tech/).

## Stack

- **Framework** — Next.js 16 (App Router)
- **CMS** — Payload CMS v3 (embedded, no separate server)
- **Database** — Neon Postgres (serverless)
- **Styling** — Tailwind CSS 4
- **Email** — Resend (transactional)
- **Editor** — Lexical rich-text
- **Images** — Sharp for responsive image processing

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables and fill in your values
cp .env.example .env

# Start the dev server
pnpm dev
```

Point `DATABASE_URL` at your own Neon **dev branch**, never the production database (see [Local database](#local-database)). Then apply the migrations:

```bash
pnpm migrate
```

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin panel.

On first visit to `/admin`, you'll be prompted to create an admin user.

## Local database

Use a separate [Neon branch](https://neon.tech/docs/introduction/branching) for local development so nothing you do locally can touch production data or schema:

1. In the Neon console, use the `vercel-dev` branch (the Vercel integration's development branch) and run **Reset from parent** to refresh it from production. A branch is a copy-on-write clone, so you get real content to work with. The free plan allows 10 branches, and preview deployments use them too.
2. Copy that branch's connection string into `DATABASE_URL` in your `.env`, and leave `PGHOST`/`PGUSER`/`PGDATABASE`/`PGPASSWORD` empty (when `PGHOST` is set it takes precedence over `DATABASE_URL`).
3. Run `pnpm migrate`. To start over, use **Reset from parent** on the branch in the Neon console.

## Schema changes (migrations)

Dev-mode schema push is disabled (`push: false` in `src/payload.config.ts`). The schema only changes through migrations committed in `src/migrations`:

1. Edit a collection in `src/collections`.
2. `pnpm migrate:create <short-name>` to generate a migration, then read the generated SQL.
3. `pnpm migrate` to apply it to your dev branch, and `pnpm generate:types` if fields changed.
4. Commit the migration with the collection change.

Production runs pending migrations during the deploy via `pnpm run ci` (see [Deployment](#deployment)).

## Collections

| Collection | Purpose |
|---|---|
| **Users** | Admin authentication (email + password) |
| **Media** | Image uploads with responsive sizes |
| **Projects** | Portfolio project entries |
| **Technologies** | Tech stack items (linked to projects) |
| **Project Feedback** | Community feedback on projects (moderated) |
| **Work Experience** | CV work history |
| **Education** | CV education history |
| **Contact Messages** | Contact form submissions (emailed via Resend) |

## Design

The visual design system (Editorial Minimalist: Noto Serif + Inter, golden-yellow accent, sharp corners, no shadows) is specified in [`DESIGN.md`](DESIGN.md). Its tokens are implemented in `src/app/(frontend)/styles.css`.

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm run ci` | Deploy build: migration preflight, `payload migrate`, then `next build` |
| `pnpm migrate` | Apply pending migrations to the database in `DATABASE_URL` |
| `pnpm migrate:create <name>` | Generate a migration from collection changes |
| `pnpm migrate:check` | Fail if the database carries a dev-push marker (would hang `payload migrate`) |
| `pnpm start` | Start production server |
| `pnpm generate:types` | Regenerate Payload TypeScript types |
| `pnpm lint` | Run Biome lint + format checks |
| `pnpm format` | Apply Biome formatting |
| `pnpm import:projects` | Import projects from `projects-import.json` (shape: `ImportProject` in `src/scripts/import-projects.ts`) |
| `pnpm test` | Run integration + Playwright smoke tests. They seed and delete `e2e`-namespaced data, so the helpers refuse any non-local database: run them against a local Postgres (e.g. `docker run -p 5432:5432 -e POSTGRES_PASSWORD=payload postgres:16-alpine`). `E2E_PORT` changes the test server port |

## Workflow

`main` is protected by a GitHub ruleset: changes land only through a pull request, the **Lint and typecheck** and **Migrate, build and test** checks must pass, and force-pushes and deletion are blocked. Work on a short-lived branch and open the PR against `main`. Each PR gets a Vercel preview with its own Neon branch.

## CI

`.github/workflows/ci.yml` runs lint and typecheck, then `pnpm run ci`, the integration tests and the Playwright smoke tests against a throwaway Postgres service container. It needs no repository secrets.

## Deployment

Production runs on Vercel. `vercel.json` sets the build command to `pnpm run ci` (not `pnpm ci`, which is a different, reserved pnpm command), so leave the dashboard Build Command on its default. It:

1. runs `pnpm migrate:check`, which fails the build if the database was ever changed by dev-mode push (a `payload_migrations` row with `batch = -1` makes `payload migrate` hang on an interactive prompt);
2. runs `payload migrate` against the database for that environment;
3. runs `next build`.

Preview deployments run migrations too, so they must use their own Neon branch. The Neon Vercel integration creates one per git branch and sets a branch-scoped `DATABASE_URL`; the project-wide `DATABASE_URL` is scoped to Production only, so a preview without its own branch fails to build instead of migrating production.

For Docker, a `Dockerfile` is included with standalone output support.

## Licence

MIT

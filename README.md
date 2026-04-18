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

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin panel.

On first visit to `/admin`, you'll be prompted to create an admin user.

## Collections

| Collection | Purpose |
|---|---|
| **Users** | Admin authentication (email + password) |
| **Media** | Image uploads with responsive sizes |
| **Projects** | Portfolio project entries |
| **Technologies** | Tech stack items (linked to projects) |
| **Project Feedback** | Community feedback on projects (moderated) |

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm generate:types` | Regenerate Payload TypeScript types |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run integration + e2e tests |

## Deployment

The site is designed for deployment on Vercel or any Node.js hosting. For Docker, a `Dockerfile` is included with standalone output support.

## Licence

MIT

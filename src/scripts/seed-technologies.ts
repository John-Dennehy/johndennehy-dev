/**
 * Seed script — populates the Technologies collection with common CV tech stack items.
 *
 * Each entry includes a `iconSlug` that maps to the Devicon CDN for automatic SVG icons.
 * Browse available icons at: https://devicon.dev
 *
 * Usage:
 *   pnpm tsx src/scripts/seed-technologies.ts
 *
 * This script is idempotent — it skips any technology that already exists (matched by slug).
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

interface TechSeed {
	name: string
	slug: string
	category: 'language' | 'framework' | 'library' | 'tool' | 'database' | 'platform' | 'other'
	iconSlug?: string
	iconVariant?:
		| 'original'
		| 'original-wordmark'
		| 'plain'
		| 'plain-wordmark'
		| 'line'
		| 'line-wordmark'
	docsUrl?: string
}

const technologies: TechSeed[] = [
	// ── Languages ─────────────────────────────────────────────
	{
		name: 'TypeScript',
		slug: 'typescript',
		category: 'language',
		iconSlug: 'typescript',
		docsUrl: 'https://www.typescriptlang.org/docs/',
	},
	{
		name: 'JavaScript',
		slug: 'javascript',
		category: 'language',
		iconSlug: 'javascript',
		docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
	},
	{
		name: 'HTML5',
		slug: 'html',
		category: 'language',
		iconSlug: 'html5',
		docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
	},
	{
		name: 'CSS3',
		slug: 'css',
		category: 'language',
		iconSlug: 'css3',
		docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
	},
	{
		name: 'SQL',
		slug: 'sql',
		category: 'language',
		iconSlug: 'azuresqldatabase',
		docsUrl: 'https://www.postgresql.org/docs/current/sql.html',
	},
	{
		name: 'Python',
		slug: 'python',
		category: 'language',
		iconSlug: 'python',
		docsUrl: 'https://docs.python.org/3/',
	},
	{
		name: 'Ruby',
		slug: 'ruby',
		category: 'language',
		iconSlug: 'ruby',
		docsUrl: 'https://ruby-doc.org/',
	},
	{
		name: 'PHP',
		slug: 'php',
		category: 'language',
		iconSlug: 'php',
		docsUrl: 'https://www.php.net/docs.php',
	},

	// ── Frameworks ────────────────────────────────────────────
	{
		name: 'React',
		slug: 'react',
		category: 'framework',
		iconSlug: 'react',
		docsUrl: 'https://react.dev/',
	},
	{
		name: 'Next.js',
		slug: 'nextjs',
		category: 'framework',
		iconSlug: 'nextjs',
		docsUrl: 'https://nextjs.org/docs',
	},
	{
		name: 'Node.js',
		slug: 'nodejs',
		category: 'framework',
		iconSlug: 'nodejs',
		docsUrl: 'https://nodejs.org/en/docs/',
	},
	{
		name: 'Express',
		slug: 'express',
		category: 'framework',
		iconSlug: 'express',
		docsUrl: 'https://expressjs.com/',
	},
	{
		name: 'Ruby on Rails',
		slug: 'rails',
		category: 'framework',
		iconSlug: 'rails',
		iconVariant: 'plain',
		docsUrl: 'https://guides.rubyonrails.org/',
	},
	{
		name: 'Vue.js',
		slug: 'vuejs',
		category: 'framework',
		iconSlug: 'vuejs',
		docsUrl: 'https://vuejs.org/guide/',
	},
	{
		name: 'Angular',
		slug: 'angular',
		category: 'framework',
		iconSlug: 'angular',
		docsUrl: 'https://angular.dev/',
	},

	// ── Libraries ─────────────────────────────────────────────
	{
		name: 'Tailwind CSS',
		slug: 'tailwindcss',
		category: 'library',
		iconSlug: 'tailwindcss',
		docsUrl: 'https://tailwindcss.com/docs',
	},
	{
		name: 'Redux',
		slug: 'redux',
		category: 'library',
		iconSlug: 'redux',
		docsUrl: 'https://redux.js.org/',
	},
	{
		name: 'MobX',
		slug: 'mobx',
		category: 'library',
		iconSlug: 'mobx',
		docsUrl: 'https://mobx.js.org/',
	},
	{
		name: 'React Router',
		slug: 'react-router',
		category: 'library',
		iconSlug: 'reactrouter',
		docsUrl: 'https://reactrouter.com/',
	},
	{
		name: 'React Hook Form',
		slug: 'react-hook-form',
		category: 'library',
		docsUrl: 'https://react-hook-form.com/',
	},
	{
		name: 'React Query',
		slug: 'react-query',
		category: 'library',
		docsUrl: 'https://tanstack.com/query',
	},
	{
		name: 'Storybook',
		slug: 'storybook',
		category: 'library',
		iconSlug: 'storybook',
		docsUrl: 'https://storybook.js.org/',
	},

	// ── Databases ─────────────────────────────────────────────
	{
		name: 'PostgreSQL',
		slug: 'postgresql',
		category: 'database',
		iconSlug: 'postgresql',
		docsUrl: 'https://www.postgresql.org/docs/',
	},
	{
		name: 'MongoDB',
		slug: 'mongodb',
		category: 'database',
		iconSlug: 'mongodb',
		docsUrl: 'https://www.mongodb.com/docs/',
	},
	{
		name: 'Redis',
		slug: 'redis',
		category: 'database',
		iconSlug: 'redis',
		docsUrl: 'https://redis.io/docs/',
	},
	{
		name: 'Firebase / Firestore',
		slug: 'firebase',
		category: 'database',
		iconSlug: 'firebase',
		docsUrl: 'https://firebase.google.com/docs',
	},

	// ── Tools ─────────────────────────────────────────────────
	{
		name: 'Git',
		slug: 'git',
		category: 'tool',
		iconSlug: 'git',
		docsUrl: 'https://git-scm.com/doc',
	},
	{
		name: 'GitHub',
		slug: 'github',
		category: 'tool',
		iconSlug: 'github',
		docsUrl: 'https://docs.github.com/',
	},
	{
		name: 'Docker',
		slug: 'docker',
		category: 'tool',
		iconSlug: 'docker',
		docsUrl: 'https://docs.docker.com/',
	},
	{
		name: 'Figma',
		slug: 'figma',
		category: 'tool',
		iconSlug: 'figma',
		docsUrl: 'https://help.figma.com/',
	},
	{
		name: 'VS Code',
		slug: 'vscode',
		category: 'tool',
		iconSlug: 'vscode',
		docsUrl: 'https://code.visualstudio.com/docs',
	},
	{
		name: 'Vite',
		slug: 'vite',
		category: 'tool',
		iconSlug: 'vitejs',
		docsUrl: 'https://vite.dev/',
	},
	{
		name: 'Playwright',
		slug: 'playwright',
		category: 'tool',
		iconSlug: 'playwright',
		docsUrl: 'https://playwright.dev/docs/intro',
	},
	{
		name: 'Vitest',
		slug: 'vitest',
		category: 'tool',
		iconSlug: 'vitest',
		docsUrl: 'https://vitest.dev/',
	},
	{
		name: 'Jest',
		slug: 'jest',
		category: 'tool',
		iconSlug: 'jest',
		docsUrl: 'https://jestjs.io/docs/getting-started',
	},
	{
		name: 'ESLint',
		slug: 'eslint',
		category: 'tool',
		iconSlug: 'eslint',
		docsUrl: 'https://eslint.org/docs/latest/',
	},
	{ name: 'Prettier', slug: 'prettier', category: 'tool', docsUrl: 'https://prettier.io/docs/en/' },
	{ name: 'pnpm', slug: 'pnpm', category: 'tool', iconSlug: 'pnpm', docsUrl: 'https://pnpm.io/' },
	{
		name: 'Webpack',
		slug: 'webpack',
		category: 'tool',
		iconSlug: 'webpack',
		docsUrl: 'https://webpack.js.org/',
	},
	{
		name: 'Airtable',
		slug: 'airtable',
		category: 'tool',
		iconSlug: 'airtable',
		docsUrl: 'https://airtable.com/developers',
	},

	// ── Platforms ──────────────────────────────────────────────
	{
		name: 'Vercel',
		slug: 'vercel',
		category: 'platform',
		iconSlug: 'vercel',
		docsUrl: 'https://vercel.com/docs',
	},
	{
		name: 'Payload CMS',
		slug: 'payloadcms',
		category: 'platform',
		docsUrl: 'https://payloadcms.com/docs',
	},
	{ name: 'Neon', slug: 'neon', category: 'platform', docsUrl: 'https://neon.tech/docs' },
	{ name: 'Qlik', slug: 'qlik', category: 'platform', docsUrl: 'https://help.qlik.com/' },

	// ── Other / Concepts ──────────────────────────────────────
	{ name: 'REST APIs', slug: 'rest-apis', category: 'other', docsUrl: 'https://restfulapi.net/' },
	{
		name: 'GraphQL',
		slug: 'graphql',
		category: 'other',
		iconSlug: 'graphql',
		docsUrl: 'https://graphql.org/learn/',
	},
	{ name: 'CI/CD', slug: 'ci-cd', category: 'other' },
	{ name: 'Agile / Scrum', slug: 'agile-scrum', category: 'other' },
	{ name: 'TDD', slug: 'tdd', category: 'other' },
]

async function seed() {
	const payload = await getPayload({ config })

	console.log(`\n🌱 Seeding ${technologies.length} technologies...\n`)

	let created = 0
	let skipped = 0

	for (const tech of technologies) {
		// Check if already exists
		const existing = await payload.find({
			collection: 'technologies',
			where: { slug: { equals: tech.slug } },
			limit: 1,
		})

		if (existing.docs.length > 0) {
			console.log(`  ⏭  ${tech.name} (already exists)`)
			skipped++
			continue
		}

		await payload.create({
			collection: 'technologies',
			data: {
				name: tech.name,
				slug: tech.slug,
				category: tech.category,
				iconSlug: tech.iconSlug ?? null,
				iconVariant: tech.iconVariant ?? 'original',
				docsUrl: tech.docsUrl ?? null,
			},
		})

		console.log(`  ✅ ${tech.name}`)
		created++
	}

	console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}\n`)
	process.exit(0)
}

seed().catch((err) => {
	console.error('Seed failed:', err)
	process.exit(1)
})

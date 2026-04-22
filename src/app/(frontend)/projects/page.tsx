import config from '@payload-config'
import { getPayload } from 'payload'
import ProjectsGrid from '../components/ProjectsGrid'

export const metadata = {
	title: 'Projects — John Dennehy',
	description:
		'A showcase of my side projects and experiments — built with React, TypeScript, Next.js, and more.',
}

export default async function ProjectsPage() {
	const payload = await getPayload({ config })

	const { docs: projects } = await payload.find({
		collection: 'projects',
		where: {
			status: { equals: 'published' },
		},
		sort: '-featured,-publishedDate',
		depth: 2, // Populate techStack → Technologies and thumbnail → Media
		limit: 50,
	})

	const { docs: allTechs } = await payload.find({
		collection: 'technologies',
		where: {
			displayAsFilterOption: { not_equals: false },
		},
		limit: 100,
		depth: 1,
	})

	// Serialize for client component
	const serialised = projects.map((p) => ({
		id: p.id,
		title: p.title,
		slug: p.slug,
		summary: p.summary,
		techStack: Array.isArray(p.techStack)
			? p.techStack
					.filter((t): t is Exclude<typeof t, number> => typeof t !== 'number')
					.map((t) => ({
						id: t.id,
						name: t.name,
						slug: t.slug,
						iconSlug: t.iconSlug ?? null,
						iconVariant: t.iconVariant ?? null,
						logo:
							t.logo && typeof t.logo !== 'number'
								? { url: t.logo.url ?? null, alt: t.logo.alt }
								: null,
					}))
			: [],
		liveUrl: p.liveUrl ?? null,
		repoUrl: p.repoUrl ?? null,
		thumbnail:
			p.thumbnail && typeof p.thumbnail !== 'number'
				? { url: p.thumbnail.url ?? null, alt: p.thumbnail.alt }
				: null,
		featured: p.featured ?? false,
	}))

	const serialisedTechs = allTechs
		.map((t) => ({
			id: t.id,
			name: t.name,
			slug: t.slug,
			iconSlug: t.iconSlug ?? null,
			iconVariant: t.iconVariant ?? null,
			logo:
				t.logo && typeof t.logo !== 'number'
					? { url: t.logo.url ?? null, alt: t.logo.alt }
					: null,
		}))
		.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<section className="px-6 md:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
			<div className="mx-auto max-w-5xl">
				{/* Header */}
				<div className="gradient-line mb-12 max-w-xs animate-fade-in" />
				<h1 className="animate-slide-up text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
					Projects
				</h1>
				<p className="animate-slide-up stagger-1 text-text-secondary mb-12 max-w-xl">
					Things I&apos;ve built, tinkered with, or am actively working on. Filter by technology to
					find what interests you.
				</p>

				<ProjectsGrid projects={serialised} filterOptions={serialisedTechs} />
			</div>
		</section>
	)
}

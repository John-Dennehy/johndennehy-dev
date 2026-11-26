import config from '@payload-config'
import { getPayload } from 'payload'
import { getPublishedProjects, serialiseTechnology } from '@/lib/projects'
import ProjectsGrid from '../components/ProjectsGrid'

// Force dynamic rendering — the DB schema (e.g. `featured` column) is applied
// at server startup via Payload's push, not at build time, so static pre-rendering
// would fail with "column does not exist" against the production database.
export const dynamic = 'force-dynamic'

export const metadata = {
	title: 'Projects — John Dennehy',
	description:
		'A showcase of my side projects and experiments — built with React, TypeScript, Next.js, and more.',
}

export default async function ProjectsPage() {
	const payload = await getPayload({ config })

	const [projects, { docs: allTechs }] = await Promise.all([
		getPublishedProjects(),
		payload.find({
			collection: 'technologies',
			where: {
				displayAsFilterOption: { not_equals: false },
			},
			limit: 100,
			depth: 1,
		}),
	])

	const filterOptions = allTechs
		.map(serialiseTechnology)
		.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<section className="px-6 md:px-8 pt-20 pb-16 md:pt-24 md:pb-16">
			<div className="mx-auto max-w-5xl">
				{/* Header */}
				<div className="mb-1 w-16 h-px bg-primary" />
				<h1 className="font-heading animate-fade-in text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-6 mb-4">
					Projects
				</h1>
				<p className="animate-fade-in text-muted-foreground mb-12 max-w-xl leading-relaxed">
					Things I&apos;ve built, tinkered with, or am actively working on. Filter by technology to
					find what interests you.
				</p>

				<ProjectsGrid projects={projects} filterOptions={filterOptions} />
			</div>
		</section>
	)
}

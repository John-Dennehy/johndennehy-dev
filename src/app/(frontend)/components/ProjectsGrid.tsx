'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { ProjectSummary, TechnologySummary } from '@/lib/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid({
	projects,
	filterOptions = [],
}: {
	projects: ProjectSummary[]
	filterOptions?: TechnologySummary[]
}) {
	const [activeTechs, setActiveTechs] = useState<string[]>([])
	const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND')

	// Split into matched / unmatched when a filter is active
	const { matched, unmatched } = useMemo(() => {
		if (activeTechs.length === 0) return { matched: projects, unmatched: [] as ProjectSummary[] }
		const m: ProjectSummary[] = []
		const u: ProjectSummary[] = []
		projects.forEach((p) => {
			const projectTechSlugs = p.techStack?.map((t) => t.slug) || []
			const hasMatch =
				filterMode === 'AND'
					? activeTechs.every((slug) => projectTechSlugs.includes(slug))
					: activeTechs.some((slug) => projectTechSlugs.includes(slug))

			if (hasMatch) m.push(p)
			else u.push(p)
		})
		return { matched: m, unmatched: u }
	}, [projects, activeTechs, filterMode])

	const toggleTech = (slug: string) => {
		setActiveTechs((prev) =>
			prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug],
		)
	}

	return (
		<>
			{/* Tech filter box */}
			{filterOptions.length > 0 && (
				<div className="border border-border p-6 mb-10">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
						<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
							Filter Projects
						</h3>

						{activeTechs.length > 1 && (
							<div className="flex items-center gap-px bg-border p-px border border-border">
								<button
									type="button"
									onClick={() => setFilterMode('AND')}
									className={`px-3 py-1.5 transition-all duration-300 rounded-none ${
										filterMode === 'AND'
											? 'bg-primary text-primary-foreground'
											: 'bg-background text-muted-foreground hover:text-foreground'
									}`}
								>
									Match All (AND)
								</button>
								<button
									type="button"
									onClick={() => setFilterMode('OR')}
									className={`px-3 py-1.5 transition-all duration-300 rounded-none ${
										filterMode === 'OR'
											? 'bg-primary text-primary-foreground'
											: 'bg-background text-muted-foreground hover:text-foreground'
									}`}
								>
									Match Any (OR)
								</button>
							</div>
						)}
					</div>

					<div className="flex flex-wrap gap-2">
						<button
							type="button"
							onClick={() => setActiveTechs([])}
							className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border rounded-none ${
								activeTechs.length === 0
									? 'bg-primary text-primary-foreground border-primary'
									: 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
							}`}
						>
							All
						</button>
						{filterOptions.map((tech) => {
							const iconUrl = tech.iconSlug
								? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconSlug}/${tech.iconSlug}-${tech.iconVariant || 'original'}.svg`
								: null

							const hasProjects = projects.some((p) =>
								p.techStack?.some((t) => t.slug === tech.slug),
							)
							const isActive = activeTechs.includes(tech.slug)

							return (
								<button
									type="button"
									key={tech.slug}
									onClick={() => toggleTech(tech.slug)}
									className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border rounded-none ${
										isActive
											? 'bg-primary text-primary-foreground border-primary'
											: !hasProjects
												? 'bg-transparent text-muted-foreground/40 border-border opacity-60'
												: 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
									}`}
									title={!hasProjects ? `No published ${tech.name} projects currently` : ''}
								>
									{tech.logo?.url ? (
										<Image
											src={tech.logo.url}
											alt={tech.logo.alt}
											width={14}
											height={14}
											className="rounded-none"
										/>
									) : iconUrl ? (
										// eslint-disable-next-line @next/next/no-img-element
										<Image
											src={iconUrl}
											alt={`${tech.name} icon`}
											width={14}
											height={14}
											unoptimized
										/>
									) : null}
									{tech.name}
								</button>
							)
						})}
					</div>
				</div>
			)}

			{/* Matched projects */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{matched.map((project) => (
					<ProjectCard key={project.id} project={project} dimmed={false} />
				))}
			</div>

			{/* Unmatched projects (greyed out) */}
			{unmatched.length > 0 && (
				<>
					<div className="my-8 flex items-center gap-4">
						<div className="h-px flex-1 bg-border" />
						<span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
							Other Projects
						</span>
						<div className="h-px flex-1 bg-border" />
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{unmatched.map((project) => (
							<ProjectCard key={project.id} project={project} dimmed={true} />
						))}
					</div>
				</>
			)}

			{/* Empty state */}
			{projects.length === 0 && (
				<div className="border border-border p-12 text-center">
					<div className="mb-4 text-4xl" aria-hidden="true">
						🚀
					</div>
					<h3 className="font-heading text-lg font-semibold text-foreground mb-2">
						Projects on the way
					</h3>
					<p className="text-sm text-muted-foreground max-w-md mx-auto">
						I&apos;m actively building and will be adding projects here soon. Check back or follow
						me on{' '}
						<a
							href="https://github.com/john-dennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary font-semibold hover:underline transition-colors"
						>
							GitHub
						</a>{' '}
						for updates.
					</p>
				</div>
			)}
		</>
	)
}

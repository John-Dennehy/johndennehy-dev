'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface Technology {
	id: number
	name: string
	slug: string
	iconSlug?: string | null
	iconVariant?: string | null
	logo?: { url?: string | null; alt: string } | null
}

interface Project {
	id: number
	title: string
	slug: string
	summary: string
	techStack?: Technology[] | null
	liveUrl?: string | null
	repoUrl?: string | null
	thumbnail?: { url?: string | null; alt: string } | null
	featured?: boolean | null
}

export default function ProjectsGrid({
	projects,
	filterOptions = [],
}: {
	projects: Project[]
	filterOptions?: Technology[]
}) {
	const [activeTechs, setActiveTechs] = useState<string[]>([])
	const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND')

	// No need to derive allTechs from projects anymore since we receive them from CMS
	// We'll use filterOptions instead.

	// Split into matched / unmatched when a filter is active
	const { matched, unmatched } = useMemo(() => {
		if (activeTechs.length === 0) return { matched: projects, unmatched: [] as Project[] }
		const m: Project[] = []
		const u: Project[] = []
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
			{/* Tech filter bar */}
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
						<span className="text-xs text-text-muted font-medium uppercase tracking-wider">
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
				<div className="glass-card p-12 text-center animate-fade-in">
					<div className="mb-4 text-4xl">🚀</div>
					<h3 className="text-lg font-semibold text-text-primary mb-2">Projects on the way</h3>
					<p className="text-sm text-text-secondary max-w-md mx-auto">
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

function ProjectCard({
	project,
	dimmed,
}: {
	project: Project
	dimmed: boolean
}) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className={`group block overflow-hidden transition-all duration-500 border border-border rounded-none ${
				dimmed ? 'opacity-40 hover:opacity-70' : 'opacity-100'
			}`}
		>
			{/* Thumbnail or gradient placeholder */}
			<div className="relative h-40 overflow-hidden">
				{project.thumbnail?.url ? (
					<Image
						src={project.thumbnail.url}
						alt={project.thumbnail.alt}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div
						className="h-full w-full"
						style={{
							background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)`,
						}}
					>
						<div className="flex h-full items-center justify-center">
							<svg
								className="w-10 h-10 text-text-muted/30"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1}
								role="img"
								aria-labelledby="no-image-title"
							>
								<title id="no-image-title">Project placeholder</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
								/>
							</svg>
						</div>
					</div>
				)}

				{/* Featured badge */}
				{project.featured && (
					<div className="absolute top-0 right-0 bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
						Featured
					</div>
				)}
			</div>

			{/* Card body */}
			<div className="p-5">
				<h3 className="text-base font-bold uppercase tracking-widest text-foreground mb-2 group-hover:text-primary transition-colors">
					{project.title}
				</h3>
				<p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
					{project.summary}
				</p>

				{/* Tech tags */}
				{project.techStack && project.techStack.length > 0 && (
					<div className="flex flex-wrap gap-1.5 mb-4">
						{project.techStack.map((tech) => (
							<span
								key={tech.id}
								className="rounded-none bg-muted px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground border border-border"
							>
								{tech.name}
							</span>
						))}
					</div>
				)}

				{/* Action links */}
				<div className="flex items-center gap-3">
					{project.repoUrl && (
						<span className="inline-flex items-center gap-1 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
							<svg
								className="w-3.5 h-3.5"
								fill="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-labelledby="repo-link-title"
							>
								<title id="repo-link-title">GitHub Repository</title>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
							Code
						</span>
					)}
					{project.liveUrl && (
						<span className="inline-flex items-center gap-1 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								role="img"
								aria-labelledby="live-link-title"
							>
								<title id="live-link-title">Live Site</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								/>
							</svg>
							Live
						</span>
					)}
					<span className="ml-auto text-xs text-text-muted group-hover:text-accent transition-colors">
						View →
					</span>
				</div>
			</div>
		</Link>
	)
}

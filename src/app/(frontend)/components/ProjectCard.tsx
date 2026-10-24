import Image from 'next/image'
import Link from 'next/link'
import type { ProjectSummary } from '@/lib/projects'

export default function ProjectCard({
	project,
	dimmed = false,
}: {
	project: ProjectSummary
	dimmed?: boolean
}) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className={`group block overflow-hidden transition-all duration-500 border border-border rounded-none hover:border-foreground ${
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
					<div className="h-full w-full bg-gradient-to-br from-muted to-border flex items-center justify-center">
						<svg
							className="w-10 h-10 text-muted-foreground/30"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1}
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
							/>
						</svg>
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
				<h3 className="font-heading text-xl font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
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
						<span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
							<svg
								className="w-3.5 h-3.5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
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
						<span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								/>
							</svg>
							Live
						</span>
					)}
					<span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">
						View →
					</span>
				</div>
			</div>
		</Link>
	)
}

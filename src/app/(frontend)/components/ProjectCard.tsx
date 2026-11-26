import Image from 'next/image'
import Link from 'next/link'
import { CodeBracketIcon, ExternalLinkIcon, GitHubIcon } from '@/components/icons'
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
						<CodeBracketIcon
							className="w-10 h-10 text-muted-foreground/30"
							strokeWidth={1}
							aria-hidden="true"
						/>
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
							<GitHubIcon className="w-3.5 h-3.5" />
							Code
						</span>
					)}
					{project.liveUrl && (
						<span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
							<ExternalLinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
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

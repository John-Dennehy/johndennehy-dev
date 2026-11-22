import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { ArrowLeftIcon, ExternalLinkIcon, GitHubIcon } from '@/components/icons'
import type { Project } from '@/payload-types'
import FeedbackSection from '../../components/FeedbackSection'
import TechIcon from '../../components/TechIcon'

// Force dynamic rendering — Payload's schema push runs at server startup,
// not during `next build`, so build-time pre-rendering would fail if the DB
// schema hasn't yet been updated (e.g. new columns like `featured`).
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })
	const { docs } = await payload.find({
		collection: 'projects',
		where: { slug: { equals: slug }, status: { equals: 'published' } },
		limit: 1,
	})
	const project = docs[0]
	if (!project) return { title: 'Project Not Found — John Dennehy' }
	return {
		title: `${project.title} — John Dennehy`,
		description: project.summary,
	}
}

const STAGE_LABELS: Record<NonNullable<Project['stage']>, string> = {
	'in-progress': 'In progress',
	live: 'Live',
	archived: 'Archived',
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'projects',
		where: { slug: { equals: slug }, status: { equals: 'published' } },
		depth: 2,
		limit: 1,
	})

	const project = docs[0]
	if (!project) notFound()

	// Fetch approved feedback for this project
	const { docs: feedback } = await payload.find({
		collection: 'project-feedback',
		where: {
			project: { equals: project.id },
			approved: { equals: true },
		},
		sort: '-createdAt',
		limit: 50,
	})

	// Resolve tech stack
	const techStack = Array.isArray(project.techStack)
		? project.techStack.filter((t): t is Exclude<typeof t, number> => typeof t !== 'number')
		: []

	const thumbnail =
		project.thumbnail && typeof project.thumbnail !== 'number' ? project.thumbnail : null

	const gallery = (project.gallery ?? []).flatMap((item) =>
		item.image && typeof item.image !== 'number' && item.image.url
			? [{ id: item.id ?? item.image.id, image: item.image, caption: item.caption }]
			: [],
	)

	const stageLabel = project.stage ? STAGE_LABELS[project.stage] : null

	return (
		<section className="px-6 md:px-8 pt-20 pb-16 md:pt-24 md:pb-16">
			<div className="mx-auto max-w-3xl">
				{/* Back link */}
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
				>
					<ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
					Back to Projects
				</Link>

				{/* Header */}
				<div className="mb-1 w-16 h-px bg-primary" />

				{stageLabel && (
					<p className="mt-6 inline-block border border-border px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
						{stageLabel}
					</p>
				)}

				<h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-6 mb-4">
					{project.title}
				</h1>

				<p className="text-muted-foreground text-lg mb-6 leading-relaxed">{project.summary}</p>

				<div className="flex flex-wrap gap-3 mb-10">
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-primary/90"
						>
							<ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
							View Live
						</a>
					)}
					{project.repoUrl && (
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-foreground"
						>
							<GitHubIcon className="w-4 h-4" title="Repository" titleId="repo-link-icon-title" />
							View Code
						</a>
					)}
				</div>

				{thumbnail?.url && (
					<div className="mb-10 overflow-hidden border border-border">
						<Image
							src={thumbnail.url}
							alt={thumbnail.alt}
							width={800}
							height={450}
							className="w-full object-cover"
						/>
					</div>
				)}

				{techStack.length > 0 && (
					<div className="mb-10">
						<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
							Built With
						</h2>
						<div className="flex flex-wrap gap-3">
							{techStack.map((tech) => {
								const logo = tech.logo && typeof tech.logo !== 'number' ? tech.logo : null

								const content = (
									<>
										<TechIcon
											name={tech.name}
											iconSlug={tech.iconSlug}
											iconVariant={tech.iconVariant}
											logo={logo ? { url: logo.url ?? null, alt: logo.alt } : null}
											size={18}
										/>
										{tech.name}
										{tech.docsUrl && (
											<ExternalLinkIcon
												className="w-3 h-3 text-muted-foreground"
												role="img"
												aria-label="Documentation"
											/>
										)}
									</>
								)

								return tech.docsUrl ? (
									<a
										key={tech.id}
										href={tech.docsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:border-foreground transition-colors"
									>
										{content}
									</a>
								) : (
									<span
										key={tech.id}
										className="inline-flex items-center gap-2 border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground"
									>
										{content}
									</span>
								)
							})}
						</div>
					</div>
				)}

				{project.description && (
					<div className="prose max-w-none mb-16 text-foreground prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm">
						<RichText data={project.description} />
					</div>
				)}

				{project.buildNotes && (
					<div className="mb-16">
						<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
							How I Built It
						</h2>
						<div className="prose max-w-none text-foreground prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm">
							<RichText data={project.buildNotes} />
						</div>
					</div>
				)}

				{gallery.length > 0 && (
					<div className="mb-16">
						<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
							Screenshots
						</h2>
						<div className="grid gap-6 sm:grid-cols-2">
							{gallery.map(({ id, image, caption }) => (
								<figure key={id} className="overflow-hidden border border-border">
									<Image
										src={image.url as string}
										alt={image.alt}
										width={800}
										height={450}
										className="w-full object-cover"
									/>
									{caption && (
										<figcaption className="px-4 py-3 text-sm text-muted-foreground">
											{caption}
										</figcaption>
									)}
								</figure>
							))}
						</div>
					</div>
				)}

				<FeedbackSection
					projectId={project.id}
					feedback={feedback.map((f) => ({
						id: f.id,
						name: f.name,
						message: f.message,
						createdAt: f.createdAt,
					}))}
				/>
			</div>
		</section>
	)
}

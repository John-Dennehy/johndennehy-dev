import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
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

	return (
		<section className="px-6 md:px-8 pt-20 pb-16 md:pt-24 md:pb-16">
			<div className="mx-auto max-w-3xl">
				{/* Back link */}
			<Link
				href="/projects"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						role="img"
						aria-labelledby="back-to-projects-title"
					>
						<title id="back-to-projects-title">Back to Projects</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
						/>
					</svg>
					Back to Projects
				</Link>

			{/* Header */}
			<div className="mb-1 w-16 h-px bg-primary" />

			<h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-6 mb-4">
				{project.title}
			</h1>

			<p className="text-muted-foreground text-lg mb-6 leading-relaxed">
				{project.summary}
			</p>

			<div className="flex flex-wrap gap-3 mb-10">
				{project.liveUrl && (
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-primary/90"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								role="img"
								aria-labelledby="live-link-icon-title"
							>
								<title id="live-link-icon-title">Live site</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								/>
							</svg>
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
							<svg
								className="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-labelledby="repo-link-icon-title"
							>
								<title id="repo-link-icon-title">Repository</title>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
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
											<svg
												className="w-3 h-3 text-muted-foreground"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
												role="img"
												aria-labelledby="docs-link-icon-title"
											>
												<title id="docs-link-icon-title">Documentation</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
												/>
											</svg>
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

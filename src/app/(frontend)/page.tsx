import { ArrowRight, CodeXml, Database, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site'
import { getPublishedProjects } from '@/lib/projects'
import { cn } from '@/lib/utils'
import AboutSection from './components/AboutSection'
import ProjectCard from './components/ProjectCard'

// Reads projects from the database at request time, like /projects
export const dynamic = 'force-dynamic'

export default async function HomePage() {
	const projects = await getPublishedProjects({ limit: 3 })

	return (
		<div className="flex flex-col min-h-screen bg-background">
			{/* ── Hero Section ─────────────────────────────────────────── */}
			<section className="relative w-full min-h-[90vh] flex items-center bg-background border-b border-border">
				<div className="mx-auto w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 pt-24 pb-16 md:py-16">
					{/* Left Column: Typography */}
					<div className="flex-1 min-w-0 space-y-8 animate-fade-in [animation-duration:1s]">
						<div className="space-y-6">
							<div className="inline-flex items-center rounded-none border border-primary bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
								<span className="flex h-2 w-2 bg-primary mr-2"></span>
								Available for new roles
							</div>

							<h1 className="font-heading text-balance text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
								Crafting <br /> Digital <br /> Excellence.
							</h1>

							<p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md leading-relaxed">
								I build exceptional web experiences with precision and artistry. A Full-Stack
								Developer specialising in high-performance applications.
							</p>
						</div>

						{/* CTA buttons */}
						<div className="flex flex-wrap gap-4 pt-4">
							<Link
								href="/projects"
								className={cn(
									buttonVariants({ size: 'lg' }),
									'px-10 font-bold uppercase tracking-widest',
								)}
							>
								View Portfolio
							</Link>
							<Link
								href="/contact"
								className={cn(
									buttonVariants({ variant: 'outline', size: 'lg' }),
									'px-10 font-bold uppercase tracking-widest',
								)}
							>
								Contact Me
							</Link>
						</div>
					</div>

					{/* Right Column: Integrated Portrait — gradient fade at the bottom */}
					<div className="flex-1 min-w-0 w-full flex justify-center md:justify-end animate-fade-in [animation-duration:1.5s]">
						<div className="relative w-full max-w-sm md:max-w-md">
							<Image
								src="/images/hero.png"
								alt="John Dennehy"
								width={800}
								height={1200}
								priority
								className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
								sizes="(max-width: 768px) 80vw, 40vw"
							/>
							{/* Dissolve the bottom of the portrait into the page background */}
							<div
								className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
								style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
								aria-hidden="true"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* ── Selected Work ───────────────────────────────────────── */}
			{projects.length > 0 && (
				<section
					aria-labelledby="selected-work-heading"
					className="px-6 md:px-12 py-16 bg-background border-b border-border"
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
							<h2
								id="selected-work-heading"
								className="font-heading text-balance text-4xl md:text-6xl font-bold tracking-tighter text-foreground"
							>
								Selected Work
							</h2>
							<Link
								href="/projects"
								className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
							>
								All projects →
							</Link>
						</div>

						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{projects.map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</div>
				</section>
			)}

			<AboutSection />

			{/* ── What I Bring ──────────────────────────────────────────── */}
			<section className="px-6 md:px-12 py-16 bg-background border-b border-border">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
						<h2 className="font-heading text-balance text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
							My Skills
						</h2>
						<p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
							Returning to development with a unique blend of technical expertise and a decade of
							problem-solving experience.
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Card 1 — Frontend Development */}
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10 hover:border-foreground">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<CodeXml className="w-8 h-8" strokeWidth={1.5} aria-hidden="true" />
								</div>
								<CardTitle className="font-heading font-bold text-2xl">
									React &amp; Next.js
								</CardTitle>
							</CardHeader>
							<CardContent className="px-6">
								<CardDescription className="text-base text-muted-foreground leading-relaxed">
									Frontend development is my home ground. Currently building dynamic,
									high-performance interfaces with modern React and Next.js.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Card 2 — Full-Stack Capable */}
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10 hover:border-foreground">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<Database className="w-8 h-8" strokeWidth={1.5} aria-hidden="true" />
								</div>
								<CardTitle className="font-heading font-bold text-2xl">Full-Stack</CardTitle>
							</CardHeader>
							<CardContent className="px-6">
								<CardDescription className="text-base text-muted-foreground leading-relaxed">
									Comfortable working end-to-end. This site runs on Payload CMS and Neon Postgres —
									I enjoy connecting the database to the deployed product.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Card 3 — Not Just Code */}
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10 hover:border-foreground">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<Users className="w-8 h-8" strokeWidth={1.5} aria-hidden="true" />
								</div>
								<CardTitle className="font-heading font-bold text-2xl">Communication</CardTitle>
							</CardHeader>
							<CardContent className="px-6">
								<CardDescription className="text-base text-muted-foreground leading-relaxed">
									A decade managing complaints in finance taught me to listen and solve problems
									under pressure. I write code, but I understand people too.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<section className="px-6 md:px-12 py-16 bg-background border-t border-border">
				<div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="max-w-xl">
						<h2 className="font-heading text-balance text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
							Let's Connect
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							I'm looking for frontend or full-stack roles and always happy to chat. Reach out on
							any of these platforms.
						</p>
					</div>

					<div className="flex flex-col w-full md:w-auto gap-4">
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between gap-8 p-8 md:w-96 rounded-none border border-border bg-card hover:border-primary transition duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<GitHubIcon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
								<p className="text-lg font-bold uppercase tracking-widest">GitHub</p>
							</div>
							<ArrowRight
								className="w-6 h-6 opacity-0 -translate-x-2 text-primary group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
								aria-hidden="true"
							/>
						</a>

						<a
							href={LINKEDIN_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between gap-8 p-8 md:w-96 rounded-none border border-border bg-card hover:border-primary transition duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<LinkedInIcon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
								<p className="text-lg font-bold uppercase tracking-widest">LinkedIn</p>
							</div>
							<ArrowRight
								className="w-6 h-6 opacity-0 -translate-x-2 text-primary group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>
			</section>
		</div>
	)
}

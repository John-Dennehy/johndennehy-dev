import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function HomePage() {
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

							<h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[0.9] uppercase">
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

			{/* ── What I Bring ──────────────────────────────────────────── */}
			<section className="px-6 md:px-12 py-32 bg-background border-b border-border">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
						<h2 className="text-balance text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
							My Skills
						</h2>
						<p className="text-lg font-bold uppercase tracking-widest text-muted-foreground max-w-xl">
							Returning to development with a unique blend of technical expertise and a decade of
							problem-solving experience.
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Card 1 — Frontend Development */}
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<svg
										className="w-8 h-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={1.5}
										role="img"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
										/>
									</svg>
								</div>
								<CardTitle className="font-bold uppercase tracking-widest text-2xl">
									React & Next.js
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
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<svg
										className="w-8 h-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={1.5}
										role="img"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
										/>
									</svg>
								</div>
								<CardTitle className="font-bold uppercase tracking-widest text-2xl">
									Full-Stack
								</CardTitle>
							</CardHeader>
							<CardContent className="px-6">
								<CardDescription className="text-base text-muted-foreground leading-relaxed">
									Comfortable working end-to-end. This site runs on Payload CMS and Neon Postgres —
									I enjoy connecting the database to the deployed product.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Card 3 — Not Just Code */}
						<Card className="rounded-none border border-border bg-transparent transition duration-300 group pt-10">
							<CardHeader className="px-8 pb-2">
								<div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
									<svg
										className="w-8 h-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={1.5}
										role="img"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
										/>
									</svg>
								</div>
								<CardTitle className="font-bold uppercase tracking-widest text-2xl">
									Communication
								</CardTitle>
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

			<section className="px-6 md:px-12 py-32 bg-background border-t border-border">
				<div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="max-w-xl">
						<h2 className="text-balance text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground mb-6">
							Let’s Connect
						</h2>
						<p className="text-lg font-bold uppercase tracking-widest text-muted-foreground">
							I’m looking for frontend or full-stack roles and always happy to chat. Reach out on
							any of these platforms.
						</p>
					</div>

					<div className="flex flex-col w-full md:w-auto gap-4">
						<a
							href="https://github.com/john-dennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between gap-8 p-8 md:w-96 rounded-none border border-border bg-card hover:border-primary transition duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<svg
									className="w-8 h-8 text-foreground group-hover:text-primary transition-colors"
									fill="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
								<p className="text-lg font-bold uppercase tracking-widest">GitHub</p>
							</div>
							<svg
								className="w-6 h-6 opacity-0 -translate-x-2 text-primary group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								role="img"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
								/>
							</svg>
						</a>

						<a
							href="https://linkedin.com/in/johnfdennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between gap-8 p-8 md:w-96 rounded-none border border-border bg-card hover:border-primary transition duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<svg
									className="w-8 h-8 text-foreground group-hover:text-primary transition-colors"
									fill="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-hidden="true"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								<p className="text-lg font-bold uppercase tracking-widest">LinkedIn</p>
							</div>
							<svg
								className="w-6 h-6 opacity-0 -translate-x-2 text-primary group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								role="img"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
								/>
							</svg>
						</a>
					</div>
				</div>
			</section>
		</div>
	)
}

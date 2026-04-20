import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* ── Hero Section ─────────────────────────────────────────── */}
			<section className="relative px-6 md:px-8 pt-24 pb-24 md:pt-36 md:pb-32 overflow-hidden">
				{/* Subtle structural grid background for the premium feel */}
				<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

				<div className="relative z-10 mx-auto max-w-5xl">
					<div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
						{/* Typographic Monogram */}
						<div className="shrink-0 animate-fade-in [animation-duration:1s]">
							<div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center bg-primary text-primary-foreground text-4xl md:text-5xl font-heading font-black tracking-tighter shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
								JD
							</div>
						</div>

						{/* Hero text */}
						<div className="space-y-8 max-w-2xl">
							<div className="space-y-4">
								<Badge
									variant="secondary"
									className="font-medium tracking-wide rounded-none px-3 py-1 bg-secondary text-secondary-foreground"
								>
									Available for new roles
								</Badge>
								<h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.05] animate-fade-in [animation-duration:0.8s] [animation-delay:0.1s] fill-mode-both">
									John Dennehy
								</h1>
								<p className="text-lg md:text-xl text-foreground font-medium animate-fade-in [animation-duration:0.8s] [animation-delay:0.2s] fill-mode-both">
									Frontend &amp; Full-Stack Developer{' '}
									<span className="text-muted-foreground mx-2">·</span>{' '}
									<span className="text-primary font-bold">London</span>
								</p>
							</div>

							<p className="text-lg text-muted-foreground leading-relaxed animate-fade-in [animation-duration:0.8s] [animation-delay:0.3s] fill-mode-both">
								Returning to development after a career that’s taken a few interesting turns — a
								decade in financial services, a bootcamp pivot, three years building products in
								fintech and edtech, and a recent chapter coaching others through their own career
								changes. Now I’m back at the keyboard, building again.
							</p>

							{/* CTA buttons */}
							<div className="flex flex-wrap gap-4 pt-4 animate-fade-in [animation-duration:0.8s] [animation-delay:0.4s] fill-mode-both">
								<Link
									href="/projects"
									className={cn(
										buttonVariants({ size: 'lg' }),
										"rounded-none font-semibold hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
									)}
								>
									View Projects
									<svg
										className="w-4 h-4 ml-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
										role="img"
										aria-labelledby="view-projects-title"
										aria-hidden="true"
									>
										<title id="view-projects-title">View Projects icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</Link>
								<a
									href="https://linkedin.com/in/johnfdennehy"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({ variant: 'outline', size: 'lg' }),
										"rounded-none font-semibold border-2 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors"
									)}
								>
									Get in Touch
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── What I Bring ──────────────────────────────────────────── */}
			<section className="px-6 md:px-8 py-24 bg-muted/30 border-y border-border">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-balance text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
						What I Bring
					</h2>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{/* Card 1 — Frontend Development */}
						<Card className="rounded-none border-2 border-border shadow-none hover:border-primary hover:shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] transition-all duration-200 bg-card group">
							<CardHeader>
								<div className="mb-4 flex h-12 w-12 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
									<svg
										className="w-6 h-6"
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
											d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
										/>
									</svg>
								</div>
								<CardTitle className="font-heading text-xl">Frontend Development</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base text-muted-foreground">
									React and TypeScript are my home ground. Currently rebuilding my fluency with
									Next.js 16, modern CSS, and the component patterns that have evolved while I was
									away.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Card 2 — Full-Stack Capable */}
						<Card className="rounded-none border-2 border-border shadow-none hover:border-secondary hover:shadow-[8px_8px_0px_0px_rgba(147,51,234,1)] transition-all duration-200 bg-card group">
							<CardHeader>
								<div className="mb-4 flex h-12 w-12 items-center justify-center bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
									<svg
										className="w-6 h-6"
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
											d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
										/>
									</svg>
								</div>
								<CardTitle className="font-heading text-xl">Full-Stack Capable</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base text-muted-foreground">
									Comfortable working end-to-end. This site runs on Payload CMS and Neon Postgres —
									I enjoy understanding the full picture, from database schema to deployed product.
								</CardDescription>
							</CardContent>
						</Card>

						{/* Card 3 — Not Just Code */}
						<Card className="rounded-none border-2 border-border shadow-none hover:border-[#22d3ee] hover:shadow-[8px_8px_0px_0px_rgba(34,211,238,1)] transition-all duration-200 bg-card group">
							<CardHeader>
								<div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#22d3ee]/10 text-[#22d3ee] group-hover:bg-[#22d3ee] group-hover:text-[#050511] transition-colors">
									<svg
										className="w-6 h-6"
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
											d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
										/>
									</svg>
								</div>
								<CardTitle className="font-heading text-xl">Not Just Code</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base text-muted-foreground">
									Ten years managing complaints in financial services taught me to listen,
									communicate clearly, and solve problems under pressure. A year coaching others
									sharpened that further. I write code, but I understand people too.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* ── Connect Section ──────────────────────────────────────── */}
			<section className="px-6 md:px-8 py-24">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-balance text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
						Connect
					</h2>
					<p className="text-lg text-muted-foreground mb-12 max-w-xl">
						I’m looking for frontend or full-stack roles and always happy to chat. Find me on any of
						these platforms.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						<a
							href="https://github.com/john-dennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between p-6 border-2 border-border bg-card hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<svg
									className="w-6 h-6"
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
								<div>
									<p className="text-base font-bold font-heading">GitHub</p>
									<p className="text-sm opacity-80 group-hover:opacity-100">@john-dennehy</p>
								</div>
							</div>
							<svg
								className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
							className="group flex items-center justify-between p-6 border-2 border-border bg-card hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-hidden="true"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								<div>
									<p className="text-base font-bold font-heading">LinkedIn</p>
									<p className="text-sm opacity-80 group-hover:opacity-100">johnfdennehy</p>
								</div>
							</div>
							<svg
								className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
							href="https://x.com/jdthegeek"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-between p-6 border-2 border-border bg-card hover:bg-[#22d3ee] hover:border-[#22d3ee] hover:text-[#050511] transition-colors focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:outline-none"
						>
							<div className="flex items-center gap-4">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-hidden="true"
								>
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
								<div>
									<p className="text-base font-bold font-heading">X</p>
									<p className="text-sm opacity-80 group-hover:opacity-100">@jdthegeek</p>
								</div>
							</div>
							<svg
								className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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

import Link from 'next/link'

export const metadata = {
	title: 'CV — John Dennehy',
	description:
		'John Dennehy\u2019s CV — frontend and full-stack developer based in London. Coming soon.',
}

export default function CVPage() {
	return (
		<section className="px-6 md:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
			<div className="mx-auto max-w-3xl text-center">
				<div className="gradient-line mb-12 mx-auto max-w-xs animate-fade-in" />

				{/* Icon */}
				<div className="animate-slide-up mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-bg-surface border border-border">
					<svg
						className="w-9 h-9 text-accent"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
						role="img"
						aria-labelledby="cv-icon-title"
					>
						<title id="cv-icon-title">CV icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
						/>
					</svg>
				</div>

				<h1 className="animate-slide-up stagger-1 text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
					CV
				</h1>

				<p className="animate-slide-up stagger-2 text-lg text-text-secondary mb-4 max-w-md mx-auto">
					I&apos;m putting together a proper interactive CV for this site. It&apos;s on the way.
				</p>

				<p className="animate-slide-up stagger-3 text-text-muted mb-10 max-w-sm mx-auto">
					In the meantime, my full professional history is on LinkedIn.
				</p>

				<div className="animate-slide-up stagger-4 flex flex-wrap justify-center gap-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-border-hover hover:text-text-primary hover:bg-bg-elevated hover:-translate-y-0.5"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							role="img"
							aria-labelledby="cv-back-home-title"
						>
							<title id="cv-back-home-title">Back to Home</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
							/>
						</svg>
						Back to Home
					</Link>
					<a
						href="https://linkedin.com/in/johnfdennehy"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent-glow hover:-translate-y-0.5"
					>
						<svg
							className="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 24 24"
							role="img"
							aria-labelledby="linkedin-icon-title"
						>
							<title id="linkedin-icon-title">LinkedIn</title>
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
						View on LinkedIn
					</a>
				</div>
			</div>
		</section>
	)
}

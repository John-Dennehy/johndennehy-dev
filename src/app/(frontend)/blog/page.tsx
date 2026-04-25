import Link from 'next/link'

export const metadata = {
	title: 'Blog — John Dennehy',
	description:
		'Thoughts on frontend development, career changes, and building in public. Coming soon.',
}

export default function BlogPage() {
	return (
		<section className="px-6 md:px-8 pt-20 pb-16 md:pt-24 md:pb-16">
			<div className="mx-auto max-w-3xl text-center">
				<div className="mb-8 w-16 h-px bg-primary mx-auto" />

				{/* Icon */}
				<div className="mb-8 inline-flex h-20 w-20 items-center justify-center border border-border bg-muted">
					<svg
						className="w-9 h-9 text-foreground"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
						role="img"
						aria-labelledby="blog-icon-title"
					>
						<title id="blog-icon-title">Blog icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
						/>
					</svg>
				</div>

				<h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
					Blog
				</h1>

				<p className="text-lg text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
					I&apos;m planning to write about frontend development, career pivots, and building in
					public.
				</p>

				<p className="text-muted-foreground/70 mb-10 max-w-sm mx-auto">
					Posts are on the way — watch this space.
				</p>

				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-foreground"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							role="img"
							aria-labelledby="back-to-home-title"
						>
							<title id="back-to-home-title">Back to Home</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
							/>
						</svg>
						Back to Home
					</Link>
				</div>
			</div>
		</section>
	)
}

import { ArrowLeft, Newspaper } from 'lucide-react'
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
					<Newspaper className="w-9 h-9 text-foreground" strokeWidth={1.5} aria-hidden="true" />
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
						<ArrowLeft className="w-4 h-4" aria-hidden="true" />
						Back to Home
					</Link>
				</div>
			</div>
		</section>
	)
}

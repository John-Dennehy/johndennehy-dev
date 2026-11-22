import Link from 'next/link'
import { ArrowLeftIcon, FileTextIcon, LinkedInIcon } from '@/components/icons'
import { LINKEDIN_URL } from '@/config/site'

export const metadata = {
	title: 'CV — John Dennehy',
	description:
		'John Dennehy\u2019s CV — frontend and full-stack developer based in London. Coming soon.',
}

export default function CVPage() {
	return (
		<section className="px-6 md:px-8 pt-20 pb-16 md:pt-24 md:pb-16">
			<div className="mx-auto max-w-3xl text-center">
				<div className="mb-8 w-16 h-px bg-primary mx-auto" />

				{/* Icon */}
				<div className="mb-8 inline-flex h-20 w-20 items-center justify-center border border-border bg-muted">
					<FileTextIcon className="w-9 h-9 text-foreground" strokeWidth={1.5} aria-hidden="true" />
				</div>

				<h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
					CV
				</h1>

				<p className="text-lg text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
					I&apos;m putting together a proper interactive CV for this site. It&apos;s on the way.
				</p>

				<p className="text-muted-foreground/70 mb-10 max-w-sm mx-auto">
					In the meantime, my full professional history is on LinkedIn.
				</p>

				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-foreground"
					>
						<ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
						Back to Home
					</Link>
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-primary/90"
					>
						<LinkedInIcon className="w-4 h-4" title="LinkedIn" titleId="linkedin-icon-title" />
						View on LinkedIn
					</a>
				</div>
			</div>
		</section>
	)
}

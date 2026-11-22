import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { TIP_URL, tools } from '@/config/site'
import { cn } from '@/lib/utils'

export default function AboutSection() {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="scroll-mt-16 px-6 md:px-12 py-16 bg-background border-b border-border"
		>
			<div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 items-start">
				<Image
					src="/images/hero.png"
					alt="John Dennehy"
					width={320}
					height={320}
					sizes="(max-width: 768px) 160px, 240px"
					className="size-40 md:size-60 rounded-full object-cover object-top border border-border"
				/>

				<div className="space-y-12 max-w-2xl">
					<div className="space-y-6">
						<h2
							id="about-heading"
							className="font-heading text-balance text-4xl md:text-6xl font-bold tracking-tighter text-foreground"
						>
							About me
						</h2>
						<p className="text-lg md:text-xl text-foreground leading-relaxed">
							Hi, I’m John. I help people into work for a living, and in my spare time I try to
							build web tools that might help those I can’t normally reach.
						</p>
						{TIP_URL && (
							<p className="text-lg text-muted-foreground leading-relaxed">
								Your tips keep these tools free for the people who need them most. Thank you.
							</p>
						)}
					</div>

					<div className="space-y-6">
						<h3 className="font-heading text-2xl font-bold text-foreground">Tools I’ve built</h3>
						<ul className="divide-y divide-border border-y border-border">
							{tools.map((tool) => (
								<li key={tool.url}>
									<a
										href={tool.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									>
										<span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
											{tool.name}
											<span className="sr-only"> (opens in a new tab)</span>
										</span>
										<span className="text-muted-foreground">{tool.description}</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					{TIP_URL && (
						<Link
							href="/tip"
							className={cn(
								buttonVariants({ size: 'lg' }),
								'w-full sm:w-auto px-10 font-bold uppercase tracking-widest',
							)}
						>
							Leave a tip
						</Link>
					)}
				</div>
			</div>
		</section>
	)
}

import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site'

const socialLinks = [
	{
		href: GITHUB_URL,
		label: 'GitHub',
		Icon: GitHubIcon,
	},
	{
		href: LINKEDIN_URL,
		label: 'LinkedIn',
		Icon: LinkedInIcon,
	},
]

export default function Footer() {
	return (
		<footer className="relative mt-auto border-t border-border">
			<div className="mx-auto max-w-7xl px-6 md:px-12 py-12">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
					{/* Copyright */}
					<p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
						© {new Date().getFullYear()} John Dennehy
					</p>

					{/* Social icons */}
					<div className="flex items-center gap-6">
						{socialLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								className="text-muted-foreground transition-colors duration-300 hover:text-primary"
							>
								<link.Icon className="w-5 h-5" />
							</a>
						))}
					</div>

					{/* Attribution */}
					<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
						Built with Next.js &amp; Payload
					</p>
				</div>
			</div>
		</footer>
	)
}

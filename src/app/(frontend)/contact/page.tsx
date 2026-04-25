import ContactForm from '../components/ContactForm'

export const metadata = {
	title: 'Contact — John Dennehy',
	description: 'Get in touch with John Dennehy for frontend and full-stack development inquiries.',
}

export default function ContactPage() {
	return (
	<div className="px-6 md:px-8 py-16 md:py-20">
		<div className="mx-auto max-w-3xl">
			<div className="mb-12">
				<div className="mb-6 w-16 h-px bg-primary" />
				<h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
					Get in Touch
				</h1>
				<p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
					I&apos;m currently open to new opportunities and collaborations. Whether you have a
					specific role in mind or just want to talk shop, drop me a message below.
				</p>
			</div>

			<ContactForm />

			<div className="mt-16 grid gap-8 sm:grid-cols-2">
				<div>
					<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
						Social Channels
					</h3>
					<div className="space-y-2">
						<a
							href="https://linkedin.com/in/johnfdennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-foreground hover:text-primary transition-colors"
						>
							LinkedIn
						</a>
						<a
							href="https://github.com/john-dennehy"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-foreground hover:text-primary transition-colors"
						>
							GitHub
						</a>
					</div>
				</div>
				<div>
					<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
						Location
					</h3>
					<p className="text-muted-foreground leading-relaxed">
						London, United Kingdom
						<br />
						Available for London-based office roles.
					</p>
				</div>
			</div>
		</div>
	</div>
	)
}

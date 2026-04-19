import ContactForm from '../components/ContactForm'

export const metadata = {
	title: 'Contact — John Dennehy',
	description: 'Get in touch with John Dennehy for frontend and full-stack development inquiries.',
}

export default function ContactPage() {
	return (
		<div className="px-6 md:px-8 py-12 md:py-20">
			<div className="mx-auto max-w-3xl">
				<div className="mb-12 animate-fade-in">
					<div className="gradient-line mb-8 max-w-xs" />
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight">
						Get in Touch
					</h1>
					<p className="text-lg text-text-secondary max-w-xl leading-relaxed">
						I&apos;m currently open to new opportunities and collaborations. Whether you have a
						specific role in mind or just want to talk shop, drop me a message below.
					</p>
				</div>

				<ContactForm />

				<div className="mt-16 grid gap-8 sm:grid-cols-2 animate-slide-up stagger-3">
					<div>
						<h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-3">
							Social Channels
						</h3>
						<div className="space-y-2">
							<a
								href="https://linkedin.com/in/johnfdennehy"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-text-secondary hover:text-accent transition-colors"
							>
								LinkedIn
							</a>
							<a
								href="https://github.com/john-dennehy"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-text-secondary hover:text-accent transition-colors"
							>
								GitHub
							</a>
							<a
								href="https://x.com/jdthegeek"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-text-secondary hover:text-accent transition-colors"
							>
								X / Twitter
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-3">
							Location
						</h3>
						<p className="text-text-secondary">
							London, United Kingdom
							<br />
							Available for remote or local roles.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

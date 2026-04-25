import Link from 'next/link'
import { inter, notoSerif } from './fonts'
import './(frontend)/styles.css'
import Footer from './(frontend)/components/Footer'
import Navigation from './(frontend)/components/Navigation'

export const metadata = {
	title: '404 — Page Not Found',
	description: 'The page you\u2019re looking for doesn\u2019t exist.',
}

export default function NotFound() {
	return (
	<html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
			<body
				className={`${inter.className} flex flex-col min-h-screen antialiased bg-background text-foreground`}
			>
				{/* Clean minimal background */}
				<div className="relative z-10 flex flex-col min-h-screen">
					<Navigation />
					<main className="flex-1 pt-16">
						<section className="px-6 md:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
							<div className="mx-auto max-w-3xl text-center">
								<div className="gradient-line mb-12 mx-auto max-w-xs animate-fade-in" />

								<h1 className="animate-slide-up text-8xl md:text-9xl font-extrabold tracking-tighter gradient-text mb-6">
									404
								</h1>

								<h2 className="animate-slide-up stagger-1 text-2xl md:text-3xl font-bold text-foreground mb-4">
									Page not found
								</h2>

								<p className="animate-slide-up stagger-2 text-muted-foreground mb-10 max-w-md mx-auto">
									The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s
									get you back on track.
								</p>

								<div className="animate-slide-up stagger-3 flex flex-wrap justify-center gap-4">
									<Link
										href="/"
										className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
											role="img"
											aria-labelledby="go-home-icon-title"
										>
											<title id="go-home-icon-title">Home icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
											/>
										</svg>
										Go Home
									</Link>
									<Link
										href="/projects"
										className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary hover:-translate-y-0.5"
									>
										View Projects
									</Link>
								</div>
							</div>
						</section>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}

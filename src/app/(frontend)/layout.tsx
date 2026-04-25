import { Analytics } from '@vercel/analytics/next'
import React from 'react'
import { inter, notoSerif } from '../fonts'
import './styles.css'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

export const metadata = {
	title: 'John Dennehy — Software Engineer',
	description:
		'John Dennehy — frontend and full-stack developer based in London. Portfolio, projects, and a bit about the journey from financial services to code.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
			<body
				className={`${inter.className} flex flex-col min-h-screen antialiased bg-background text-foreground`}
			>
				<Analytics />

				{/* Page content */}
				<div className="relative z-10 flex flex-col min-h-screen">
					<Navigation />
					<main className="flex-1 pt-16">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact Me' },
]

export default function Navigation() {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const pathname = usePathname()

	const isActive = (href: string) => {
		if (href === '/') return pathname === '/'
		return pathname.startsWith(href)
	}

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? 'bg-background/95 border-b border-border' : 'bg-transparent'
			}`}
		>
			<div className="mx-auto max-w-7xl px-6 md:px-12">
				<div className="flex h-16 items-center justify-between">
					{/* Logo / Name */}
					<Link
						href="/"
						className="text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
					>
						johndennehy.dev
					</Link>

					{/* Desktop nav links */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`text-sm font-bold transition-colors uppercase tracking-widest ${
									isActive(link.href)
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Mobile hamburger */}
					<button
						type="button"
						onClick={() => setMobileOpen(!mobileOpen)}
						className="md:hidden flex flex-col gap-1.5 p-2 text-foreground"
						aria-label="Toggle menu"
					>
						<span
							className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
								mobileOpen ? 'translate-y-2 rotate-45' : ''
							}`}
						/>
						<span
							className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
								mobileOpen ? 'opacity-0' : ''
							}`}
						/>
						<span
							className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
								mobileOpen ? '-translate-y-2 -rotate-45' : ''
							}`}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${
					mobileOpen ? 'max-h-64 opacity-100 border-b border-border' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="bg-background px-6 py-4 space-y-3">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setMobileOpen(false)}
							className={`block text-sm font-bold uppercase tracking-widest transition-colors py-1 ${
								isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}

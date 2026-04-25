'use client'

import React, { useRef, useState, useTransition } from 'react'

export default function ContactForm() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()
	const loadTimeRef = useRef(Date.now())

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
			setError('Please fill in all fields.')
			return
		}

		// Timing guard — reject submissions faster than 3 seconds (likely bots)
		const elapsed = Date.now() - loadTimeRef.current
		if (elapsed < 3000) {
			setError('Please take a moment before submitting.')
			return
		}

		// Honeypot check — the hidden field should be empty
		const formData = new FormData(e.currentTarget)
		const honeypot = formData.get('website')
		if (honeypot && String(honeypot).trim().length > 0) {
			// Silently pretend success to not tip off the bot
			setSubmitted(true)
			return
		}

		startTransition(async () => {
			try {
				const res = await fetch('/api/contact-messages', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: name.trim(),
						email: email.trim().toLowerCase(),
						subject: subject.trim(),
						message: message.trim(),
					}),
				})

				if (!res.ok) {
					throw new Error('Failed to submit message')
				}

				setSubmitted(true)
				setName('')
				setEmail('')
				setSubject('')
				setMessage('')
			} catch {
				setError('Something went wrong. Please try again or reach out on LinkedIn.')
			}
		})
	}

	if (submitted) {
		return (
			<div className="border border-border p-8 text-center">
				<div className="mb-4 text-4xl" aria-hidden="true">✉️</div>
				<h3 className="font-heading text-xl font-bold text-foreground mb-3">Message Sent</h3>
				<p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
					Thanks for reaching out, {name.split(' ')[0]}! I&apos;ve received your message and will
					get back to you as soon as I can.
				</p>
				<button
					type="button"
					onClick={() => setSubmitted(false)}
					className="mt-8 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
				>
					Send another message
				</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="border border-border p-6 md:p-8 space-y-5">
			<div className="grid gap-5 md:grid-cols-2">
				<div className="space-y-1.5">
					<label
						htmlFor="contact-name"
						className="block text-xs font-bold uppercase tracking-widest text-muted-foreground"
					>
						Your Name
					</label>
					<input
						id="contact-name"
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="John Doe"
						className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
					/>
				</div>
				<div className="space-y-1.5">
					<label
						htmlFor="contact-email"
						className="block text-xs font-bold uppercase tracking-widest text-muted-foreground"
					>
						Email Address
					</label>
					<input
						id="contact-email"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="john@example.com"
						className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
					/>
				</div>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="contact-subject"
					className="block text-xs font-bold uppercase tracking-widest text-muted-foreground"
				>
					Subject
				</label>
				<input
					id="contact-subject"
					type="text"
					required
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					placeholder="Collaboration Inquiry"
					className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
				/>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="contact-message"
					className="block text-xs font-bold uppercase tracking-widest text-muted-foreground"
				>
					Message
				</label>
				<textarea
					id="contact-message"
					required
					rows={5}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Tell me what's on your mind..."
					className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-none"
				/>
			</div>

			{/* Honeypot field — visually hidden, traps bots */}
			<div
				aria-hidden="true"
				tabIndex={-1}
				style={{
					position: 'absolute',
					left: '-9999px',
					top: '-9999px',
					opacity: 0,
					height: 0,
					overflow: 'hidden',
				}}
			>
				<label htmlFor="contact-website">Website</label>
				<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
			</div>

			{error && (
				<div className="border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
					{error}
				</div>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isPending ? (
					<>
						<svg
							className="w-4 h-4 animate-spin"
							fill="none"
							viewBox="0 0 24 24"
							role="img"
							aria-labelledby="loading-icon-title"
						>
							<title id="loading-icon-title">Loading</title>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							/>
						</svg>
						Sending Message…
					</>
				) : (
					<>
						Send Message
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
							role="img"
							aria-labelledby="send-icon-title"
						>
							<title id="send-icon-title">Send icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</>
				)}
			</button>
		</form>
	)
}

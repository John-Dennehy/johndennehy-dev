'use client'

import React, { useRef, useState, useTransition } from 'react'

interface FeedbackItem {
	id: number
	name: string
	message: string
	createdAt: string
}

export default function FeedbackSection({
	projectId,
	feedback: initialFeedback,
}: {
	projectId: number
	feedback: FeedbackItem[]
}) {
	const [feedback] = useState(initialFeedback)
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()
	const loadTimeRef = useRef(Date.now())

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		if (!name.trim() || !message.trim()) {
			setError('Please fill in both fields.')
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
				const res = await fetch('/api/project-feedback', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						project: projectId,
						name: name.trim(),
						message: message.trim(),
					}),
				})

				if (!res.ok) {
					throw new Error('Failed to submit feedback')
				}

				setSubmitted(true)
				setName('')
				setMessage('')
			} catch {
				setError('Something went wrong. Please try again.')
			}
		})
	}

	return (
		<div>
			<div className="mb-1 w-16 h-px bg-primary" />

			<h2 className="font-heading text-2xl font-bold text-foreground mt-6 mb-2">Feedback &amp; Suggestions</h2>
			<p className="text-muted-foreground text-sm mb-8 leading-relaxed">
				I genuinely value feedback and collaboration. If you have suggestions, spotted something
				interesting, or just want to say hello — I&apos;d love to hear from you.
			</p>

			{/* Existing approved feedback */}
			{feedback.length > 0 && (
				<div className="space-y-4 mb-10">
					{feedback.map((item) => (
						<div key={item.id} className="border border-border p-5">
							<div className="flex items-center gap-3 mb-2">
								<div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
									{item.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">{item.name}</p>
									<p className="text-[11px] text-muted-foreground">
										{new Date(item.createdAt).toLocaleDateString('en-GB', {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										})}
									</p>
								</div>
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">{item.message}</p>
						</div>
					))}
				</div>
			)}

			{/* Submission form */}
			{submitted ? (
				<div className="border border-border p-8 text-center">
					<div className="mb-3 text-3xl" aria-hidden="true">✨</div>
					<h3 className="font-heading text-lg font-semibold text-foreground mb-2">
						Thanks for your feedback!
					</h3>
					<p className="text-sm text-muted-foreground">
						Your message will appear here once I&apos;ve reviewed it.
					</p>
					<button
						type="button"
						onClick={() => setSubmitted(false)}
						className="mt-4 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
					>
						Submit another
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="border border-border p-6 space-y-4">
					<div>
						<label
							htmlFor="feedback-name"
							className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
						>
							Your Name
						</label>
						<input
							id="feedback-name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							maxLength={100}
							placeholder="Jane Smith"
							className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
						/>
					</div>
					<div>
						<label
							htmlFor="feedback-message"
							className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
						>
							Your Feedback
						</label>
						<textarea
							id="feedback-message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							maxLength={1000}
							rows={4}
							placeholder="What do you think? Any suggestions?"
							className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
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
						<label htmlFor="feedback-website">Website</label>
						<input
							id="feedback-website"
							name="website"
							type="text"
							tabIndex={-1}
							autoComplete="off"
						/>
					</div>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<button
						type="submit"
						disabled={isPending}
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isPending ? (
							<>
								<svg
									className="w-4 h-4 animate-spin"
									fill="none"
									viewBox="0 0 24 24"
									role="img"
									aria-labelledby="feedback-loading-title"
								>
									<title id="feedback-loading-title">Loading</title>
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
								Sending…
							</>
						) : (
							'Send Feedback'
						)}
					</button>
				</form>
			)}
		</div>
	)
}

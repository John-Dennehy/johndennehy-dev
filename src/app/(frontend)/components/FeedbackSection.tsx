'use client'

import React, { useState, useTransition } from 'react'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both fields.')
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
    <div className="animate-slide-up stagger-5">
      <div className="gradient-line mb-8 max-w-xs" />

      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Feedback &amp; Suggestions
      </h2>
      <p className="text-text-secondary text-sm mb-8">
        I genuinely value feedback and collaboration. If you have suggestions,
        spotted something interesting, or just want to say hello — I&apos;d love
        to hear from you.
      </p>

      {/* Existing approved feedback */}
      {feedback.length > 0 && (
        <div className="space-y-4 mb-10">
          {feedback.map((item) => (
            <div key={item.id} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {new Date(item.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Submission form */}
      {submitted ? (
        <div className="glass-card p-8 text-center">
          <div className="mb-3 text-3xl">✨</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Thanks for your feedback!
          </h3>
          <p className="text-sm text-text-secondary">
            Your message will appear here once I&apos;ve reviewed it.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <div>
            <label
              htmlFor="feedback-name"
              className="block text-sm font-medium text-text-secondary mb-1.5"
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
              className="w-full rounded-lg border border-border bg-bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="feedback-message"
              className="block text-sm font-medium text-text-secondary mb-1.5"
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
              className="w-full rounded-lg border border-border bg-bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isPending ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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

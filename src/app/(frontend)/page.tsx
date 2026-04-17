import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative px-6 md:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* Animated gradient accent line */}
          <div className="gradient-line mb-12 max-w-xs animate-fade-in" />

          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
            {/* Headshot placeholder — initials avatar with glow */}
            <div className="animate-fade-in shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-accent-secondary opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500 animate-glow-pulse" />
                <div className="relative flex h-28 w-28 md:h-36 md:w-36 items-center justify-center rounded-full bg-bg-surface border border-border text-3xl md:text-4xl font-bold gradient-text">
                  JD
                </div>
              </div>
            </div>

            {/* Hero text */}
            <div className="space-y-5">
              <h1 className="animate-slide-up text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
                John Dennehy
              </h1>
              <p className="animate-slide-up stagger-1 text-lg md:text-xl text-text-secondary font-medium">
                Frontend &amp; Full-Stack Developer{' '}
                <span className="text-text-muted">·</span>{' '}
                <span className="gradient-text">London</span>
              </p>
              <p className="animate-slide-up stagger-2 max-w-xl text-text-secondary leading-relaxed">
                Returning to development after a career that&apos;s taken a few
                interesting turns — a decade in financial services, a bootcamp
                pivot, three years building products in fintech and edtech, and a
                recent chapter coaching others through their own career changes.
                Now I&apos;m back at the keyboard, building again.
              </p>

              {/* CTA buttons */}
              <div className="animate-slide-up stagger-3 flex flex-wrap gap-4 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent-glow hover:-translate-y-0.5"
                >
                  View Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://linkedin.com/in/johnfdennehy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-border-hover hover:text-text-primary hover:bg-bg-elevated hover:-translate-y-0.5"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I Bring ──────────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="animate-slide-up stagger-3 text-2xl md:text-3xl font-bold text-text-primary mb-10">
            What I Bring
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 — Frontend Development */}
            <div className="glass-card p-6 animate-slide-up stagger-3">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Frontend Development
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                React and TypeScript are my home ground. Currently rebuilding my
                fluency with Next.js&nbsp;16, modern CSS, and the component
                patterns that have evolved while I was away.
              </p>
            </div>

            {/* Card 2 — Full-Stack Capable */}
            <div className="glass-card p-6 animate-slide-up stagger-4">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-secondary/10 text-accent-secondary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Full-Stack Capable
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Comfortable working end-to-end. This site runs on
                Payload&nbsp;CMS and Neon&nbsp;Postgres — I enjoy understanding
                the full picture, from database schema to deployed product.
              </p>
            </div>

            {/* Card 3 — Not Just Code */}
            <div className="glass-card p-6 animate-slide-up stagger-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Not Just Code
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Ten years managing complaints in financial services taught me to
                listen, communicate clearly, and solve problems under pressure.
                A year coaching others sharpened that further. I write code, but
                I understand people too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connect Section ──────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="animate-slide-up stagger-4 text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Connect
          </h2>
          <p className="animate-slide-up stagger-4 text-text-secondary mb-10 max-w-xl">
            I&apos;m looking for frontend or full-stack roles and always happy to
            chat. Find me on any of these.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up stagger-5">
            <a
              href="https://github.com/john-dennehy"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-3 px-6 py-4 group"
            >
              <svg className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-text-primary">GitHub</p>
                <p className="text-xs text-text-muted">@john-dennehy</p>
              </div>
              <svg className="w-4 h-4 ml-2 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/johnfdennehy"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-3 px-6 py-4 group"
            >
              <svg className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-text-primary">LinkedIn</p>
                <p className="text-xs text-text-muted">johnfdennehy</p>
              </div>
              <svg className="w-4 h-4 ml-2 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>

            <a
              href="https://x.com/jdthegeek"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-3 px-6 py-4 group"
            >
              <svg className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-text-primary">X</p>
                <p className="text-xs text-text-muted">@jdthegeek</p>
              </div>
              <svg className="w-4 h-4 ml-2 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
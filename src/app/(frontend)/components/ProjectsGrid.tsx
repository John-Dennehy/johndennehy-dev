'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Technology {
  id: number
  name: string
  slug: string
  iconSlug?: string | null
  iconVariant?: string | null
  logo?: { url?: string | null; alt: string } | null
}

interface Project {
  id: number
  title: string
  slug: string
  summary: string
  techStack?: Technology[] | null
  liveUrl?: string | null
  repoUrl?: string | null
  thumbnail?: { url?: string | null; alt: string } | null
  featured?: boolean | null
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTech, setActiveTech] = useState<string | null>(null)

  // Aggregate all unique technologies across projects
  const allTechs = useMemo(() => {
    const techMap = new Map<string, Technology>()
    projects.forEach((p) => {
      p.techStack?.forEach((t) => {
        if (!techMap.has(t.slug)) techMap.set(t.slug, t)
      })
    })
    return Array.from(techMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    )
  }, [projects])

  // Split into matched / unmatched when a filter is active
  const { matched, unmatched } = useMemo(() => {
    if (!activeTech) return { matched: projects, unmatched: [] as Project[] }
    const m: Project[] = []
    const u: Project[] = []
    projects.forEach((p) => {
      const hasMatch = p.techStack?.some((t) => t.slug === activeTech)
      if (hasMatch) m.push(p)
      else u.push(p)
    })
    return { matched: m, unmatched: u }
  }, [projects, activeTech])

  return (
    <>
      {/* Tech filter bar */}
      {allTechs.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2 animate-slide-up stagger-2">
          <button
            onClick={() => setActiveTech(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border ${
              activeTech === null
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent-glow'
                : 'bg-bg-surface text-text-muted border-border hover:border-border-hover hover:text-text-secondary'
            }`}
          >
            All
          </button>
          {allTechs.map((tech) => {
            const iconUrl = tech.iconSlug
              ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconSlug}/${tech.iconSlug}-${tech.iconVariant || 'original'}.svg`
              : null

            return (
              <button
                key={tech.slug}
                onClick={() =>
                  setActiveTech(activeTech === tech.slug ? null : tech.slug)
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border ${
                  activeTech === tech.slug
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent-glow'
                    : 'bg-bg-surface text-text-muted border-border hover:border-border-hover hover:text-text-secondary'
                }`}
              >
                {tech.logo?.url ? (
                  <Image
                    src={tech.logo.url}
                    alt={tech.logo.alt}
                    width={14}
                    height={14}
                    className="rounded-sm"
                  />
                ) : iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={iconUrl}
                    alt={`${tech.name} icon`}
                    width={14}
                    height={14}
                    loading="lazy"
                  />
                ) : null}
                {tech.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Matched projects */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matched.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            dimmed={false}
          />
        ))}
      </div>

      {/* Unmatched projects (greyed out) */}
      {unmatched.length > 0 && (
        <>
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Other Projects
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unmatched.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                dimmed={true}
              />
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="mb-4 text-4xl">🚀</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Projects on the way
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            I&apos;m actively building and will be adding projects here soon.
            Check back or follow me on{' '}
            <a
              href="https://github.com/john-dennehy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              GitHub
            </a>{' '}
            for updates.
          </p>
        </div>
      )}
    </>
  )
}

function ProjectCard({
  project,
  index,
  dimmed,
}: {
  project: Project
  index: number
  dimmed: boolean
}) {
  // Stagger classes cycle through stagger-1 to stagger-6
  const staggerClass = `stagger-${(index % 6) + 1}`

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`glass-card group block overflow-hidden transition-all duration-500 animate-slide-up ${staggerClass} ${
        dimmed ? 'opacity-40 hover:opacity-70' : 'opacity-100'
      }`}
    >
      {/* Thumbnail or gradient placeholder */}
      <div className="relative h-40 overflow-hidden">
        {project.thumbnail?.url ? (
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)`,
            }}
          >
            <div className="flex h-full items-center justify-center">
              <svg
                className="w-10 h-10 text-text-muted/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-accent-glow">
            Featured
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* Tech tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech.id}
                className="rounded-full bg-bg-elevated px-2.5 py-0.5 text-[11px] font-medium text-text-muted border border-border"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="flex items-center gap-3">
          {project.repoUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Code
            </span>
          )}
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Live
            </span>
          )}
          <span className="ml-auto text-xs text-text-muted group-hover:text-accent transition-colors">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

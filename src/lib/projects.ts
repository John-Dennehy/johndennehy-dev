import config from '@payload-config'
import { getPayload } from 'payload'
import type { Media, Technology } from '@/payload-types'

export interface TechnologySummary {
	id: number
	name: string
	slug: string
	iconSlug: string | null
	iconVariant: string | null
	logo: { url: string | null; alt: string } | null
}

/** A published project, flattened to plain data so it can be passed to client components */
export interface ProjectSummary {
	id: number
	title: string
	slug: string
	summary: string
	techStack: TechnologySummary[]
	liveUrl: string | null
	repoUrl: string | null
	thumbnail: { url: string | null; alt: string } | null
	featured: boolean
}

function serialiseMedia(media: number | Media | null | undefined) {
	return media && typeof media !== 'number' ? { url: media.url ?? null, alt: media.alt } : null
}

export function serialiseTechnology(tech: Technology): TechnologySummary {
	return {
		id: tech.id,
		name: tech.name,
		slug: tech.slug,
		iconSlug: tech.iconSlug ?? null,
		iconVariant: tech.iconVariant ?? null,
		logo: serialiseMedia(tech.logo),
	}
}

/** Published projects, featured first and then newest first */
export async function getPublishedProjects({
	limit = 50,
}: {
	limit?: number
} = {}): Promise<ProjectSummary[]> {
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'projects',
		where: {
			status: { equals: 'published' },
		},
		sort: '-featured,-publishedDate',
		depth: 2, // Populate techStack → Technologies and thumbnail → Media
		limit,
	})

	return docs.map((p) => ({
		id: p.id,
		title: p.title,
		slug: p.slug,
		summary: p.summary,
		techStack: Array.isArray(p.techStack)
			? p.techStack.filter((t): t is Technology => typeof t !== 'number').map(serialiseTechnology)
			: [],
		liveUrl: p.liveUrl ?? null,
		repoUrl: p.repoUrl ?? null,
		thumbnail: serialiseMedia(p.thumbnail),
		featured: p.featured ?? false,
	}))
}

import { createHmac } from 'node:crypto'
import {
	APIError,
	type CollectionBeforeChangeHook,
	type CollectionBeforeValidateHook,
	type CollectionSlug,
	type Field,
} from 'payload'

const HTML_ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
}

/** Escape a value for safe interpolation into HTML text or a quoted attribute. */
export function escapeHtml(value: unknown): string {
	return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

/** Collapse whitespace (including CR/LF) so a value is safe to use as an email header. */
export function toHeaderValue(value: unknown): string {
	return String(value ?? '')
		.replace(/\s+/g, ' ')
		.trim()
}

/**
 * Reject submissions where the hidden `website` honeypot field was filled in.
 * Only applies to anonymous creates; signed-in admins are never blocked.
 */
export const rejectHoneypot: CollectionBeforeValidateHook = ({ data, operation, req }) => {
	if (operation === 'create' && !req.user && data?.website && String(data.website).trim()) {
		throw new APIError('Submission rejected.', 400)
	}
	return data
}

/** Pseudonymous, per-deployment identifier for a visitor: an HMAC of their IP, never the IP itself. */
export function submitterHash(headers: Headers): string {
	const ip =
		headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
	return createHmac('sha256', process.env.PAYLOAD_SECRET || '')
		.update(ip)
		.digest('hex')
}

/**
 * Throttle anonymous creates: at most `max` submissions per visitor per `windowMinutes`.
 * Stores the visitor's hash on the document so later submissions can be counted.
 */
export function rateLimitSubmissions({
	max,
	windowMinutes,
}: {
	max: number
	windowMinutes: number
}): CollectionBeforeChangeHook {
	return async ({ collection, data, operation, req }) => {
		if (operation !== 'create' || req.user) return data

		const hash = submitterHash(req.headers)
		const since = new Date(Date.now() - windowMinutes * 60_000).toISOString()
		const { totalDocs } = await req.payload.count({
			collection: collection.slug as CollectionSlug,
			where: {
				and: [{ submitterHash: { equals: hash } }, { createdAt: { greater_than: since } }],
			},
			req,
		})

		if (totalDocs >= max) {
			throw new APIError('Too many submissions. Please try again later.', 429)
		}

		return { ...data, submitterHash: hash }
	}
}

/** Hidden field that rateLimitSubmissions fills in; only signed-in users can read it. */
export const submitterHashField: Field = {
	name: 'submitterHash',
	type: 'text',
	index: true,
	access: {
		read: ({ req: { user } }) => Boolean(user),
	},
	admin: {
		hidden: true,
	},
}

import { APIError, type CollectionBeforeValidateHook } from 'payload'

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

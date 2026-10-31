/**
 * Site-wide settings that are easy to change by hand.
 *
 * TIP_URL is the one place the tip link lives. johndennehy.dev/tip redirects
 * here (see next.config.ts), and the "Leave a tip" button links to /tip.
 * Leave it empty and /tip returns a 404 and the button is hidden.
 */
export const TIP_URL = ''

export type Tool = {
	name: string
	url: string
	description: string
}

/** Tools listed under "Tools I've built" on the homepage, in display order. */
export const tools: Tool[] = [
	{
		name: 'Foot In',
		url: 'https://footin.work',
		description: 'CVs and applications that get you noticed',
	},
]

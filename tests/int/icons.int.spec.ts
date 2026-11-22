import { render } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { GitHubIcon, LinkedInIcon, SpinnerIcon } from '@/components/icons'
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site'

describe('site social URLs', () => {
	it('exports the canonical GitHub and LinkedIn profile URLs', () => {
		expect(GITHUB_URL).toBe('https://github.com/john-dennehy')
		expect(LINKEDIN_URL).toBe('https://linkedin.com/in/johnfdennehy')
	})
})

describe('shared SVG icons', () => {
	const icons = [
		['GitHubIcon', GitHubIcon],
		['LinkedInIcon', LinkedInIcon],
		['SpinnerIcon', SpinnerIcon],
	] as const

	it.each(
		icons,
	)('%s renders decorative SVG with aria-hidden by default and forwards className', (_, Icon) => {
		const { container } = render(createElement(Icon, { className: 'w-5 h-5 custom-class' }))
		const svg = container.querySelector('svg')

		expect(svg).not.toBeNull()
		expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
		expect(svg?.getAttribute('aria-hidden')).toBe('true')
		expect(svg?.getAttribute('role')).toBeNull()
		expect(svg?.querySelector('title')).toBeNull()
		expect(svg?.getAttribute('class')).toBe('w-5 h-5 custom-class')
	})

	it.each(
		icons,
	)('%s renders accessible SVG with title and role="img" when title is provided', (name, Icon) => {
		const titleId = `${name}-title`
		const { container } = render(
			createElement(Icon, { title: `${name} label`, titleId, className: 'w-4 h-4' }),
		)
		const svg = container.querySelector('svg')
		const titleEl = svg?.querySelector('title')

		expect(svg).not.toBeNull()
		expect(svg?.getAttribute('aria-hidden')).toBeNull()
		expect(svg?.getAttribute('role')).toBe('img')
		expect(svg?.getAttribute('aria-labelledby')).toBe(titleId)
		expect(titleEl?.getAttribute('id')).toBe(titleId)
		expect(titleEl?.textContent).toBe(`${name} label`)
	})
})

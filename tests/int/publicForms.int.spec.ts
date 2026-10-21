import { describe, expect, it } from 'vitest'
import { escapeHtml, submitterHash, toHeaderValue } from '@/lib/publicForms'

describe('publicForms', () => {
	it('escapes HTML special characters', () => {
		expect(escapeHtml('<script>alert("x")</script> & \'y\'')).toBe(
			'&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;',
		)
		expect(escapeHtml(undefined)).toBe('')
	})

	it('strips newlines from header values', () => {
		expect(toHeaderValue('hi\r\nBcc: evil@example.test')).toBe('hi Bcc: evil@example.test')
	})

	it('hashes the first forwarded IP without exposing it', () => {
		const hash = submitterHash(new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))
		expect(hash).toMatch(/^[0-9a-f]{64}$/)
		expect(hash).not.toContain('203.0.113.7')
		expect(hash).toBe(submitterHash(new Headers({ 'x-real-ip': '203.0.113.7' })))
	})
})

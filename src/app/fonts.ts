import { Geist, Playfair_Display } from 'next/font/google'

export const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
	display: 'swap',
})

export const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	display: 'swap',
})


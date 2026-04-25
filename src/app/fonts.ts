import { Inter, Noto_Serif } from 'next/font/google'

export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

export const notoSerif = Noto_Serif({
	subsets: ['latin'],
	variable: '--font-noto-serif',
	display: 'swap',
})

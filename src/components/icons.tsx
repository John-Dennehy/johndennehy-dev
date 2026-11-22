import { type SVGProps, useId } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
	title?: string
	titleId?: string
}

function IconSvg({
	title,
	titleId,
	children,
	...props
}: SVGProps<SVGSVGElement> & { title?: string; titleId?: string }) {
	const fallbackTitleId = useId()

	if (title) {
		const resolvedTitleId = titleId ?? fallbackTitleId
		return (
			<svg role="img" aria-labelledby={resolvedTitleId} {...props}>
				<title id={resolvedTitleId}>{title}</title>
				{children}
			</svg>
		)
	}

	return (
		<svg aria-hidden="true" {...props}>
			{children}
		</svg>
	)
}

export function GitHubIcon(props: IconProps) {
	return (
		<IconSvg fill="currentColor" viewBox="0 0 24 24" {...props}>
			<path
				fillRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
				clipRule="evenodd"
			/>
		</IconSvg>
	)
}

export function LinkedInIcon(props: IconProps) {
	return (
		<IconSvg fill="currentColor" viewBox="0 0 24 24" {...props}>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</IconSvg>
	)
}

export function SpinnerIcon(props: IconProps) {
	return (
		<IconSvg fill="none" viewBox="0 0 24 24" {...props}>
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			/>
		</IconSvg>
	)
}

// Outline icons drawn as 24x24 stroked paths (Heroicons v1 outline). These match
// the SVGs the site used before they were centralised, so they stay pixel-identical.
function OutlineIcon({ d, ...props }: IconProps & { d: string }) {
	return (
		<IconSvg
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d={d} />
		</IconSvg>
	)
}

export function ArrowLeftIcon(props: IconProps) {
	return <OutlineIcon d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" {...props} />
}

export function ArrowRightIcon(props: IconProps) {
	return <OutlineIcon d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" {...props} />
}

export function CodeBracketIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
			{...props}
		/>
	)
}

export function DatabaseIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
			{...props}
		/>
	)
}

export function ExternalLinkIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
			{...props}
		/>
	)
}

export function FileTextIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			{...props}
		/>
	)
}

export function HomeIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			{...props}
		/>
	)
}

export function NewspaperIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
			{...props}
		/>
	)
}

export function SendIcon(props: IconProps) {
	return <OutlineIcon d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" {...props} />
}

export function UsersIcon(props: IconProps) {
	return (
		<OutlineIcon
			d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
			{...props}
		/>
	)
}

import Image from 'next/image'

/**
 * Resolves and renders a technology icon.
 *
 * Priority order:
 * 1. Uploaded custom `logo` (from Media collection)
 * 2. Devicon CDN SVG via `iconSlug` + `iconVariant`
 * 3. Fallback: first letter of the tech name in a coloured circle
 */
export default function TechIcon({
  name,
  iconSlug,
  iconVariant,
  logo,
  size = 20,
  className = '',
}: {
  name: string
  iconSlug?: string | null
  iconVariant?: string | null
  logo?: { url?: string | null; alt: string } | null
  size?: number
  className?: string
}) {
  // 1. Custom uploaded logo takes priority
  if (logo?.url) {
    return (
      <Image
        src={logo.url}
        alt={logo.alt}
        width={size}
        height={size}
        className={`rounded-sm ${className}`}
      />
    )
  }

  // 2. Devicon CDN icon
  if (iconSlug) {
    const variant = iconVariant || 'original'
    const cdnUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconSlug}/${iconSlug}-${variant}.svg`

    return (
      // Using <img> instead of next/image because these are external CDN SVGs
      // and we don't want to proxy them through Next.js image optimisation
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cdnUrl}
        alt={`${name} icon`}
        width={size}
        height={size}
        loading="lazy"
        className={className}
      />
    )
  }

  // 3. Fallback: letter avatar
  return (
    <span
      className={`inline-flex items-center justify-center rounded bg-accent/10 text-accent font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-label={`${name} icon`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

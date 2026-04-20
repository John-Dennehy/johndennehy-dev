---
name: web-design-guidelines-vibrant
description: Design guide for the "Vibrant & Expressive Premium" portfolio aesthetic. Follow these guidelines to maintain a non-AI, highly crafted look.
user-invocable: true
---

# Design Guide: Vibrant & Expressive Premium

When building or modifying UI components, follow this strict design system to maintain the portfolio's premium, custom-crafted feel.

## 1. Aesthetic Core

We strictly avoid the "generic AI-generated" aesthetic.
**DO NOT USE:**
- Glowing gradients, `backdrop-filter: blur`, or "glassmorphism".
- Soft drop shadows (e.g., `shadow-lg`, `shadow-xl`).
- Pill-shaped rounded corners everywhere (e.g., `rounded-2xl`, `rounded-full`).

**DO USE:**
- High-contrast, vibrant solid colors against a deep background.
- Neo-brutalist or highly structural layouts.
- Sharp edges or very subtle rounding (`rounded-none`, `rounded-sm`).
- Solid, offset drop shadows for interactive elements (e.g., `shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]`).

## 2. Color Palette (Tailwind variables)

We use a "Deep Midnight" dark theme with bright, high-energy accents.
- `bg-background`: Deep Midnight (`#050511`).
- `bg-card`: Slightly lighter midnight (`#0a0a1a`) for structural containers.
- `text-foreground`: Bright off-white (`#f8fafc`).
- `text-muted-foreground`: Slate/Gray for secondary text.
- `bg-primary`: **Vibrant Yellow** (`#eab308`). Use for primary actions, borders on hover, and highlights.
- `bg-secondary`: **Neon Purple** (`#9333ea`). Use for secondary actions and structural contrasts.
- `bg-tertiary`: **Electric Cyan** (`#22d3ee`). Use as a tertiary accent to round out the trio of vibrant colors.

## 3. Typography

The design is highly typographic.
- **Headings (`font-heading`)**: Uses `Space Grotesk`. Use for `h1`, `h2`, `h3`, Card Titles, Buttons, and Badges. It adds character and a tech-forward feel.
- **Body (`font-sans`)**: Uses `Outfit`. Use for paragraphs, descriptions, and metadata. It is clean and legible.

**Typographic Rules:**
- Headings should have tight tracking (`tracking-tight` or `tracking-tighter`).
- Large headings must use `text-balance` to avoid widows.
- Use curly quotes (`’`, `“`, `”`) instead of straight quotes (`'`, `"`).
- Use proper non-breaking spaces (`&nbsp;`) between words that should not wrap (e.g., `Next.js 16`).

## 4. Components

We use `shadcn/ui` components located in `@/components/ui/`.
- **Buttons**: Use `rounded-none`. For primary buttons, apply a solid offset shadow.
- **Cards**: Use `border-2 border-border rounded-none`. Avoid soft shadows. On hover, reveal a vibrant border (e.g., `hover:border-primary`) or vibrant background.
- **Badges**: Use `rounded-none font-heading font-medium`.

## 5. Interaction & Animation

- Hover states should be decisive (e.g., a background completely changing to a vibrant color, or a sharp offset shadow appearing).
- Use specific transition properties (`transition-colors`, `transition-transform`). **Never use `transition-all`** per Vercel Web Interface Guidelines.
- Provide `focus-visible` rings for all interactive elements: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
- Respect `prefers-reduced-motion` for complex animations.

## 6. Vercel Web Interface Guidelines

Always adhere to the global guidelines:
- Ensure all SVGs and icons have `aria-hidden="true"` or an `aria-labelledby` with a proper `<title>`.
- Use correct semantic tags (`<button>`, `<a>`, `<nav>`, `<section>`).
- Ensure `text-balance` on headings.
- Avoid `transition: all`.

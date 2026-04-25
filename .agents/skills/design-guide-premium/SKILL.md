---
name: design-guide-premium
description: Design guide for the "Clean Minimalist Premium" portfolio aesthetic. Follow these guidelines to maintain a highly polished, modern, and accessible look.
user-invocable: true
---

# Design Guide: Clean Minimalist Premium

When building or modifying UI components, follow this strict design system to maintain the portfolio's premium, clean, and modern feel.

## 1. Aesthetic Core

We strictly avoid the "Neo-Brutalist" aesthetic.
**DO NOT USE:**
- Harsh offset shadows (e.g., `shadow-[4px_4px_0px_0px_rgba(...)]`).
- Sharp, brutalist edges (`rounded-none`).
- Chaotic or overly vibrant neon accents mixed together.

**DO USE:**
- Clean, minimalist layouts with ample whitespace.
- Soft radii (`rounded-md` or `0.5rem`).
- Elegant, subtle drop shadows for depth and elevation.
- A restrained, highly deliberate color palette.

## 2. Color Palette (Tailwind variables)

We use a "Clean Monochrome" theme accented by a single premium color.
- `bg-background`: Clean White (`#ffffff`) in light mode, Deep Charcoal (`#0f1115`) in dark mode.
- `bg-card`: Matches background for seamless integration.
- `text-foreground`: Deep Charcoal (`#111827`) in light mode, Soft White (`#f9fafb`) in dark mode.
- `bg-primary`: **Premium Yellow** (`#EAB308`). Use strategically for primary actions, active link states, and focus rings.

## 3. Typography

The design relies on a sophisticated dual-font system.
- **Body Text**: `Geist` (or `Geist_Mono` for code snippets) for clean, modern legibility.
- **Heading Font**: `Playfair Display` for key, impactful sections like hero headers or page titles to add an editorial, premium feel.
- Headings should have tight tracking (`tracking-tight` or `tracking-tighter`).
- Large headings must use `text-balance` to avoid widows.

## 4. Theming & Components

We use **idiomatic Tailwind CSS v4** alongside **shadcn/ui**.
- Ensure all theming leverages native CSS variables and the new `@theme` directive correctly.
- Do not hardcode HEX values in component classes. Always use semantic variables (`bg-primary`, `text-muted-foreground`, etc.).
- Maintain accessibility: Provide `focus-visible` rings for all interactive elements (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`).

## 5. Images & Layout

- **Strict Rule for Images**: Always use the proper Next.js `<Image>` component.
- You must supply explicit `width` and `height` properties to preserve aspect ratios and prevent clipping.
- Do NOT use `overflow-hidden` containers that chop off or crop portrait photography.
- Let portrait photos with flat backgrounds (like pure white) blend naturally into the section background.

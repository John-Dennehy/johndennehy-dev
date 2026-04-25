---
name: Editorial Minimalist
colors:
  surface: "#fbf9f9"
  surface-dim: "#dbdad9"
  surface-bright: "#fbf9f9"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f5f3f3"
  surface-container: "#efeded"
  surface-container-high: "#e9e8e7"
  surface-container-highest: "#e3e2e2"
  on-surface: "#1b1c1c"
  on-surface-variant: "#4d4732"
  inverse-surface: "#303031"
  inverse-on-surface: "#f2f0f0"
  outline: "#7e775f"
  outline-variant: "#d0c6ab"
  surface-tint: "#705d00"
  primary: "#705d00"
  on-primary: "#ffffff"
  primary-container: "#ffd700"
  on-primary-container: "#705e00"
  inverse-primary: "#e9c400"
  secondary: "#5e5e5e"
  on-secondary: "#ffffff"
  secondary-container: "#e2e2e2"
  on-secondary-container: "#646464"
  tertiary: "#5d5f5f"
  on-tertiary: "#ffffff"
  tertiary-container: "#dadada"
  on-tertiary-container: "#5e5f5f"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ffe16d"
  primary-fixed-dim: "#e9c400"
  on-primary-fixed: "#221b00"
  on-primary-fixed-variant: "#544600"
  secondary-fixed: "#e2e2e2"
  secondary-fixed-dim: "#c6c6c6"
  on-secondary-fixed: "#1b1b1b"
  on-secondary-fixed-variant: "#474747"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c7"
  on-tertiary-fixed: "#1a1c1c"
  on-tertiary-fixed-variant: "#454747"
  background: "#fbf9f9"
  on-background: "#1b1c1c"
  surface-variant: "#e3e2e2"
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.3"
    letterSpacing: "0"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.0"
    letterSpacing: 0.1em
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 16px
  margin: 32px
  stack-tight: 8px
  stack-md: 16px
  section-gap: 64px
---

## Brand & Style

The design system is anchored in high-end editorial aesthetics, designed for elite portfolios and creative showcases. It evokes an atmosphere of clarity, precision, and intellectual rigor. By stripping away superfluous decoration, the design system allows the work to take center stage, punctuated only by a singular, confident accent.

The style is a fusion of **Modern Minimalism** and **Swiss Grid** principles. It relies on a rigorous adherence to hierarchy and a "content-first" philosophy. The emotional response is one of trust and exclusivity, making the user feel as though they are browsing a premium physical monograph or a curated gallery space.

## Colours

The palette is intentionally restricted to create maximum impact through contrast.

- **Primary:** A vibrant Golden Yellow (`#FFD700`) serves as the sole "active" signal. It is used sparingly for interactive elements, notifications, and critical highlights to ensure it never loses its potency.
- **Surface (General):** The default page background is `#fbf9f9` (warm off-white), mapped to `--background`. This is the standard surface for all content areas.
- **Surface (Pure White):** Where photographic or illustrative content with a white background must blend seamlessly into the layout, use `--card` (`#ffffff`), which maps to `surface-container-lowest` in the palette. This applies to image containers and hero portrait wrappers.
- **Typography:** Near-black (`#1b1c1c`) is used for all body text, mapped to `--foreground`. This ensures legibility against both surface colours.
- **Accents:** Subtle greys (`#f5f3f3`, `#e3e2e2`) are used for hairline dividers, disabled states, and secondary containers to provide structure without introducing visual noise.

## Typography

This design system employs a classic serif/sans-serif pairing to distinguish between narrative and utility.

- **Headlines:** Noto Serif (`font-heading`) is used for all `h1`–`h3` headings. Headlines are always set in mixed-case (sentence or title case). They must never be uppercased — let Noto Serif's editorial weight and tight tracking carry the hierarchy.
- **Body:** Inter provides a functional, neutral counterpoint. Its purpose is to disappear into the layout, facilitating effortless reading.
- **Labels (`label-caps`):** Meta-information, small UI labels, navigation items, filter chips, and button text use Inter in uppercase with increased letter spacing (`tracking-widest`). This creates a distinct visual texture for technical and interactive data. Uppercase is **exclusively** reserved for this role.

## Layout & Spacing

The layout follows a **Fixed Grid** model with a distinct editorial "tightness." Instead of the loose padding common in modern SaaS, this design system uses compressed margins to create a sense of density and professional urgency.

- **Grid:** A 12-column grid with 16px gutters.
- **Editorial Rhythm:** Use vertical rhythm based on a 4px baseline. Components should be packed closely, using hairline dividers rather than wide gaps to separate distinct ideas.
- **Alignment:** Strong adherence to the left margin for all text elements. Right-aligned elements should be reserved for navigation or meta-data to create an unbalanced, dynamic "asymmetric" feel typical of modern print design.

## Elevation & Depth

In keeping with the minimalist philosophy, this design system rejects the use of shadows. Depth is communicated exclusively through **Low-Contrast Outlines** and **Tonal Layers**.

- **Surfaces:** All elements sit on the same optical plane.
- **Separation:** Boundaries between elements are defined by 1px solid borders in a light grey (#E5E5E5).
- **Active State:** Depth is implied through "fills" rather than "lifts." When an item is hovered or active, it may receive a subtle grey background or a primary golden yellow accent, but it never casts a shadow.

## Shapes

The shape language is strictly **Sharp (0px)**. All buttons, cards, images, and input fields must have perfectly square corners. This reinforces the architectural and grid-based nature of the design system, evoking the precision of a technical drawing or a printed journal.

## Components

Consistent application of the sharp-edged, high-contrast aesthetic is vital across all components:

- **Buttons:** Primary buttons are filled with Golden Yellow (#FFD700) with black text. No border. Secondary buttons are outlined in 1px Black with no fill.
- **Chips:** Small, square-edged boxes with a light grey background and Inter Bold labels. Used for tagging projects or categories.
- **Inputs:** Simple bottom-border only (1px Black) or a full 1px light grey frame. Focus states are indicated by the border changing to Golden Yellow.
- **Cards:** No shadows. Cards are defined by a 1px #E5E5E5 border. On hover, the border may turn Black or the background may shift to a very faint grey.
- **Lists:** Separated by 1px horizontal rules. Metadata is always aligned to the right in `label-caps` typography.
- **Additional Elements:** Large-scale image treatments should use 0px border-radius and, where possible, be framed by a 1px border to treat the photography as an "object" within the layout.

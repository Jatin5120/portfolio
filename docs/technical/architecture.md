# Architecture

**Project**: React Portfolio
**Created**: 2026-02-20
**Last Updated**: 2026-02-20
**Version**: 1.0.0
**Status**: Active

---

## Overview

Single-page application (SPA). One scrollable page with distinct sections. No routing. Navigation scrolls to anchored sections. All data is static — no backend, no API calls at runtime.

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   └── og-image.png              # Open Graph preview image
│
├── src/
│   ├── components/
│   │   ├── sections/             # Full-page sections (each maps to a scroll target)
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Projects/
│   │   │   ├── Testimonials/
│   │   │   └── Contact/
│   │   │
│   │   ├── ui/                   # Small, reusable UI primitives
│   │   │   ├── Button/
│   │   │   ├── ProjectCard/
│   │   │   ├── Badge/
│   │   │   └── SectionHeading/
│   │   │
│   │   └── layout/               # Structural components
│   │       ├── Header/           # Sticky nav
│   │       └── Footer/
│   │
│   ├── data/                     # All static content (TypeScript)
│   │   ├── projects.ts           # Project list with metadata
│   │   ├── about-nodes.ts        # 8 personal nodes for Timeline Scatter
│   │   └── testimonials.ts       # Testimonials data
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useReducedMotion.ts   # Reads prefers-reduced-motion
│   │   └── useActiveSection.ts   # Tracks which section is in view (for nav)
│   │
│   ├── types/                    # Shared TypeScript interfaces
│   │   └── index.ts
│   │
│   ├── styles/
│   │   └── globals.css           # CSS variables (color tokens), @font-face, base resets
│   │
│   ├── lib/
│   │   └── utils.ts              # Tiny utilities (cn() for classname merging, etc.)
│   │
│   ├── App.tsx                   # Root — renders Header + sections in order + Footer
│   └── main.tsx                  # Entry point, mounts App
│
├── index.html                    # Single HTML shell with meta tags
├── tailwind.config.ts            # Design token configuration
├── tsconfig.json
└── vite.config.ts
```

---

## Page Architecture

### Single Scroll Page

```
┌─────────────────────────────────┐
│ Header (sticky)                 │ ← Nav: Work, About, Contact + "Available" badge
├─────────────────────────────────┤
│ Hero                            │ ← #hero
├─────────────────────────────────┤
│ Projects                        │ ← #work
├─────────────────────────────────┤
│ About (Timeline Scatter)        │ ← #about
├─────────────────────────────────┤
│ Testimonials                    │ ← #testimonials
├─────────────────────────────────┤
│ Contact                         │ ← #contact
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

**Navigation**: Nav links use `href="#section-id"`. Smooth scroll handled by CSS (`scroll-behavior: smooth`) or Framer Motion. No React Router.

---

## Component Architecture

### Sections

Each section is a top-level component in `src/components/sections/`. Sections:
- Are self-contained (own their layout, animation, data fetching from `src/data/`)
- Accept no required props (data comes from static imports)
- Handle their own responsive layout

### UI Primitives

Reusable across sections. Accept explicit props for content and variants:

```typescript
// Example
<Button variant="primary" onClick={...}>View Project</Button>
<Badge variant="live">Live on App Store</Badge>
<ProjectCard project={project} />
```

### Data Flow

```
src/data/*.ts
     ↓ (static import)
Section components
     ↓ (props)
UI primitives
```

No Context, no global state store. Data flows down via props only. Local `useState` used only for UI state (hover, open/close, etc.).

---

## Design Token Integration

CSS variables are defined in `src/styles/globals.css` and mapped to Tailwind in `tailwind.config.ts`.

### Two-Layer System

```css
/* globals.css — Layer 1: Core palette */
:root {
  --orange-500: #FFAB00;
  --orange-600: #FF9500;
  --orange-700: #E68A00;
  --neutral-950: #0A0A0A;
  --neutral-900: #0C0C0E;
  --neutral-800: #161A22;
  --neutral-700: #1F2937;
  --neutral-300: #9CA3AF;
  --neutral-100: #F3F4F6;
}

/* globals.css — Layer 2: Semantic tokens */
:root {
  --color-primary: var(--orange-500);
  --color-primary-hover: var(--orange-600);
  --color-primary-active: var(--orange-700);

  --bg-page: var(--neutral-950);
  --bg-card: var(--neutral-800);
  --bg-elevated: var(--neutral-700);

  --text-primary: var(--neutral-100);
  --text-secondary: var(--neutral-300);
  --text-accent: var(--orange-500);
  --text-on-primary: var(--neutral-900);

  --border-subtle: var(--neutral-700);
  --border-accent: var(--orange-500);
}
```

```typescript
// tailwind.config.ts — expose semantic tokens as Tailwind classes
colors: {
  primary: 'var(--color-primary)',
  'primary-hover': 'var(--color-primary-hover)',
  'bg-page': 'var(--bg-page)',
  'bg-card': 'var(--bg-card)',
  // ...etc
}
```

Full spec: `.claude/rules/design/color-system.md`

---

## Special Sections

### Hero — Easter Egg for CTOs

The Hero has a hidden interaction designed to delight technical recruiters. See `docs/content/hero-section-technical-easter-egg-cto-optimized.md` for copy and `docs/content/hero-easter-egg-approaches.md` for approach options.

Implementation is a layered state toggle — default view vs. easter egg view. No routing, no URL change.

### About — Timeline Scatter

An interactive constellation of 8 personal nodes scattered across the viewport. Nodes are positioned with intentional asymmetry and respond to hover/click.

See `docs/design/about-section-spec.md` for the full specification including node positions, interaction design, and content.

**Key implementation considerations:**
- Node positions use absolute positioning within a fixed-height container
- Positions shift between breakpoints (different scatter layout for mobile vs desktop)
- Framer Motion handles drag constraints and hover animations
- Mobile: simplified layout (no drag, tap-to-expand instead)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Bundle size (gzipped) | < 150KB JS |

**Strategies:**
- Static data (no runtime fetches)
- Font `display=swap` prevents render blocking
- `whileInView` animations (Framer Motion) — off-screen elements don't animate until visible
- Images: WebP format, explicit `width`/`height` to prevent layout shift
- No heavy third-party scripts (no analytics, no chat widget, no tag manager)

---

## SEO & Meta

No SSR needed. SPA with well-formed `<head>` meta tags is sufficient for a portfolio — the audience (recruiters, CTOs) clicks direct links, not Google searches.

### Required meta tags in `index.html`:

```html
<title>Jatin — Mobile Lead</title>
<meta name="description" content="Mobile Lead with 5+ years building Flutter, iOS, and AI products." />

<!-- Open Graph (LinkedIn, Slack previews) -->
<meta property="og:title" content="Jatin — Mobile Lead" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

---

## Accessibility

- All interactive elements keyboard-navigable
- Focus rings visible (styled with orange ring, not removed)
- `aria-current="page"` on active nav items
- `prefers-reduced-motion` respected via `useReducedMotion` hook fed into Framer Motion
- Color contrast: all text/background combos pass WCAG AAA (documented in `docs/design-review-summary.md`)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` used correctly
- Images have `alt` text

---

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Implementation Plan](./implementation-plan.md)
- [About Section Spec](../design/about-section-spec.md)
- [Hero Section Reference](../design/hero-section-reference.md)
- [Motion Design](../design/motion-design.md)
- [Color System Rules](../../.claude/rules/design/color-system.md)

---

**Last Updated**: 2026-02-20
**Maintained By**: Manual

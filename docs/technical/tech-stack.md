# Tech Stack

**Project**: React Portfolio
**Created**: 2026-02-20
**Last Updated**: 2026-02-20
**Version**: 1.0.0
**Status**: Active

---

## Overview

A static single-page application (SPA) built with React and TypeScript, styled with Tailwind CSS, animated with Framer Motion, and deployed on Vercel.

---

## Core Stack

### Framework & Build

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev/) | 19.x | UI component framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Vite](https://vite.dev/) | 6.x | Build tool, dev server |

**Why Vite over CRA or Next.js:**
- Fastest dev server (native ESM, no bundling during dev)
- Minimal config for a pure SPA
- No SSR needed — portfolio is fully static, SEO via meta tags is sufficient
- Smaller bundle output than CRA

---

### Styling

| Tool | Version | Purpose |
|------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling |

**Tailwind Configuration:**
- Custom design tokens mapped from `docs/design/` specs
- Two-layer color system (core → semantic) via CSS variables
- Custom font families (Cabinet Grotesk, Inter, JetBrains Mono, Ms Madi)
- Extended spacing scale based on 8px grid

---

### Animation

| Tool | Version | Purpose |
|------|---------|---------|
| [Framer Motion](https://motion.dev/) | 12.x | Animations, interactions, gestures |

**Why Framer Motion over CSS-only:**
- Declarative API — animations are co-located with components
- Physics-based spring animations for natural feel
- Built-in `prefers-reduced-motion` support
- Gesture support needed for About section Timeline Scatter (drag/hover)
- `AnimatePresence` for smooth mount/unmount transitions

See `docs/design/motion-design.md` for all animation specs.

---

### Fonts

All fonts are free. Loaded via `<link>` tags or `@font-face`.

| Font | Source | Usage |
|------|--------|-------|
| [Cabinet Grotesk](https://www.fontshare.com/fonts/cabinet-grotesk) | Fontshare | All headings |
| [Inter](https://fonts.google.com/specimen/Inter) | Google Fonts | Body text |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Google Fonts | Code snippets, tech labels |
| [Ms Madi](https://fonts.google.com/specimen/Ms+Madi) | Google Fonts | Footer signature only |

**Loading strategy:**
- `display=swap` on all fonts to prevent invisible text during load
- Preconnect to `fonts.googleapis.com` and `api.fontshare.com`
- Subset fonts where possible to reduce download size

---

### Deployment & Hosting

| Tool | Purpose |
|------|---------|
| [Vercel](https://vercel.com/) | Hosting, CI/CD, preview deployments |
| [GitHub](https://github.com/) | Source control, triggers Vercel deploys |

**Vercel setup:**
- Auto-deploys on push to `main`
- Preview URLs on every pull request
- Zero-config for Vite projects

---

## Data Layer

### Approach: Hardcoded TypeScript

All portfolio content (projects, about nodes, testimonials) lives in TypeScript data files in `src/data/`. Content is compiled into the bundle at build time — no runtime network requests.

**Why not a database (e.g. Firestore):**
- Portfolio content changes rarely (a few times a year)
- Database fetch adds ~200-500ms latency on every page load
- Requires loading states for content that should be instant
- Adds cost, complexity, and a network dependency for no benefit

**Why not a CMS (e.g. Sanity, Contentful):**
- Overkill for a solo developer portfolio
- Adds vendor dependency and build complexity
- Content editing is fine via code for this scale

**Upgrade path:** If frequent content updates become a need, migrate `src/data/` to a headless CMS with build-time fetching (not runtime). The component layer won't need to change.

---

### Contact Form

**Status**: TBD — to be decided at implementation time.

**Options in order of simplicity:**
1. **Formspree / EmailJS** — No backend. Form submits to third-party service which forwards to email. Free tier sufficient.
2. **mailto: link** — Opens user's email client. Zero setup, works offline.
3. **Vercel Serverless Function** — Custom endpoint, full control, no third-party.

**Recommendation**: Start with Formspree or a mailto link. Upgrade only if needed.

---

## What's Intentionally Excluded

| Tool | Reason Not Included |
|------|---------------------|
| Next.js | No SSR/ISR needed — SPA + meta tags handles SEO for a portfolio |
| Redux / Zustand | No global state needed. Local React state is sufficient. |
| React Router | Single page, scroll-based navigation. No routing needed. |
| Analytics | Excluded for now. Can add Plausible/Fathom later with one script tag. |
| Storybook | Component library too small to warrant it |
| Testing library | Not prioritized for MVP — can be added post-launch |
| CSS Modules | Replaced by Tailwind |
| Styled Components | Replaced by Tailwind |

---

## Related Documents

- [Architecture](./architecture.md)
- [Implementation Plan](./implementation-plan.md)
- [Design System Spec](../design/visual-direction.md)
- [Motion Design](../design/motion-design.md)
- [Color System Rules](../../.claude/rules/design/color-system.md)

---

**Last Updated**: 2026-02-20
**Maintained By**: Manual

# Implementation Plan

**Project**: React Portfolio
**Created**: 2026-02-20
**Last Updated**: 2026-02-20
**Version**: 1.0.0
**Status**: Active

---

## Overview

Four phases from project init to production deploy. Each phase produces working, deployable code. No phase leaves the project in a broken state.

---

## Phase 1 — Foundation

**Goal**: Runnable project with design system in place. No real content yet.

### 1.1 — Project Initialization

- [ ] Scaffold with Vite: `npm create vite@latest portfolio -- --template react-ts`
- [ ] Install core dependencies:
  ```bash
  npm install framer-motion
  npm install -D tailwindcss @tailwindcss/vite
  ```
- [ ] Install utility:
  ```bash
  npm install clsx tailwind-merge   # for cn() helper
  ```
- [ ] Configure Tailwind v4 with Vite plugin
- [ ] Set up `tsconfig.json` with path aliases (`@/` → `src/`)
- [ ] Configure Vite with path alias to match tsconfig

### 1.2 — Design System in Code

- [ ] Create `src/styles/globals.css`:
  - CSS custom properties for Layer 1 (core palette) and Layer 2 (semantic tokens)
  - `@font-face` or `<link>` tags for all four fonts
  - Base reset: `box-sizing`, `scroll-behavior: smooth`, remove default margins
  - Background set to `var(--bg-page)` on `body`

- [ ] Configure `tailwind.config.ts`:
  - Map all semantic color tokens to Tailwind classes
  - Extend spacing scale (matches 8px grid from `docs/design/layout-system.md`)
  - Add font families: `cabinet-grotesk`, `inter`, `jetbrains-mono`, `ms-madi`
  - Add custom easing curves for animations

- [ ] Create `src/lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)

### 1.3 — App Shell

- [ ] `src/App.tsx` — skeleton with `<Header>`, empty section placeholders, `<Footer>`
- [ ] `src/components/layout/Header/` — sticky nav with logo/name + section links
- [ ] `src/components/layout/Footer/` — signature in Ms Madi font + social icons
- [ ] `index.html` — all meta tags (title, description, OG, Twitter card)

**Milestone**: `npm run dev` shows dark page with header, footer, correct fonts, and correct colors.

---

## Phase 2 — Core Sections (Static)

**Goal**: All sections built with real content but no animations yet. Looks right, doesn't move.

### 2.1 — Data Layer

- [ ] Create `src/types/index.ts` with TypeScript interfaces:
  ```typescript
  interface Project { id, title, tagline, description, techStack, status, link, image }
  interface AboutNode { id, content, year?, position, size }
  interface Testimonial { id, name, role, company, quote, avatar? }
  ```
- [ ] `src/data/projects.ts` — all projects from `docs/content/projects-section-copy.md`
- [ ] `src/data/about-nodes.ts` — 8 personal nodes from `docs/content/about-section-copy-v4-final.md`
- Note: No testimonials data file needed — decision is zero testimonials (see `docs/content/testimonials-strategy.md`)

### 2.2 — UI Primitives

Build these before sections — sections will use them:

- [ ] `src/components/ui/Button/` — primary, secondary, ghost variants + all states
- [ ] `src/components/ui/Badge/` — live, launching-soon, tech-stack variants
- [ ] `src/components/ui/ProjectCard/` — image, tagline, title, description, tech badges, CTA
- [ ] `src/components/ui/SectionHeading/` — consistent section title style

### 2.3 — Sections (Static)

Build in this order (top to bottom of page):

- [ ] **Hero** — layout, typography, CTA buttons, "Currently Exploring" badge. No easter egg yet.
- [ ] **Projects** — project cards grid/list, "Show All" toggle
- [ ] **About** — static positioning of 8 nodes (no scatter animation yet)
- [ ] **Contact** — contact form/CTA (implement chosen approach from `docs/technical/tech-stack.md`)

**Milestone**: Full page visible with real content, all sections readable and correctly styled on mobile + desktop.

---

## Phase 3 — Motion & Interactions

**Goal**: All animations and interactions implemented. The page feels alive.

### 3.1 — Global Hooks

- [ ] `src/hooks/useReducedMotion.ts` — wraps `window.matchMedia('(prefers-reduced-motion: reduce)')`
- [ ] `src/hooks/useActiveSection.ts` — IntersectionObserver to track visible section, updates nav highlight

### 3.2 — Scroll-Triggered Animations

Apply to all sections using Framer Motion `whileInView`:

- [ ] Cards fade + slide up on enter viewport
- [ ] Stagger children for project card grid (100ms delay between cards)
- [ ] Section headings animate in
- [ ] All animations skip when `useReducedMotion()` returns true

### 3.3 — Interactive Components

- [ ] **Button hover** — lift `-2px` + orange glow (200ms)
- [ ] **Project card hover** — orange border, lift `-4px`, image scale 105% (300ms)
- [ ] **Nav links** — orange underline slides in on hover (200ms)
- [ ] **Header** — background/blur appears after scrolling past Hero

### 3.4 — Hero Easter Egg

- [ ] Implement the CTO-targeted easter egg interaction
- [ ] State toggle between default and easter egg view
- [ ] Smooth transition between states
- [ ] Reference: `docs/content/hero-section-technical-easter-egg-cto-optimized.md`

### 3.5 — About Timeline Scatter

This is the most complex interaction on the site:

- [ ] **Desktop**: Absolute-positioned nodes with intentional asymmetry across fixed-height container
- [ ] **Hover state**: Node expands to show full content, others dim slightly
- [ ] **Click/tap**: Node locks open (click again or click elsewhere to close)
- [ ] **Mobile**: Simplified layout — nodes in a readable list/grid, tap to expand
- [ ] Framer Motion `layout` animation for smooth expand/collapse
- [ ] Reference: `docs/design/about-section-spec.md` for all positions and interaction specs

**Milestone**: Full page with all animations working. Accessible (reduced motion works). Tested on mobile + desktop.

---

## Phase 4 — Polish & Deploy

**Goal**: Production-ready. Fast, accessible, deployed.

### 4.1 — Performance

- [ ] Audit bundle size (`npm run build` → check output sizes)
- [ ] Ensure all images are WebP with explicit dimensions
- [ ] Verify font loading doesn't block render (`display=swap` everywhere)
- [ ] Run Lighthouse — target 95+ performance score
- [ ] Check for unused Tailwind classes (Tailwind v4 purges automatically)

### 4.2 — Cross-Browser & Responsive

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on iOS Safari (mobile)
- [ ] Test on Android Chrome (mobile)
- [ ] Verify at 320px, 375px, 768px, 1024px, 1440px widths
- [ ] Verify Timeline Scatter mobile layout is usable

### 4.3 — Accessibility Audit

- [ ] Tab through entire page — all interactions reachable by keyboard
- [ ] Check focus ring visibility on all interactive elements
- [ ] Verify `prefers-reduced-motion` disables all animations
- [ ] Run axe DevTools or Lighthouse accessibility audit — target 95+
- [ ] Screen reader test on key content (hero, project cards)

### 4.4 — Assets

- [ ] Design and export favicon (`.ico` + `apple-touch-icon.png`)
- [ ] Create OG image (`public/og-image.png`, 1200×630px) — dark background, name, title, orange accent

### 4.5 — Deploy

- [ ] Connect GitHub repo to Vercel (zero-config for Vite)
- [ ] Verify production build: `npm run build && npm run preview`
- [ ] Push to `main` → Vercel auto-deploys
- [ ] Set up custom domain (if applicable)
- [ ] Test live URL — all fonts load, all animations work

### 4.6 — Post-Launch

- [ ] Update `docs/content/professional-data.md` with portfolio URL
- [ ] Update LinkedIn profile with portfolio URL
- [ ] Share with designer friend who reviewed design specs

---

## Section Build Order Rationale

Sections are built top-to-bottom because:
1. **Hero** — simplest layout, establishes design language in code
2. **Projects** — highest priority content for the target audience (CTOs/VPs)
3. **About** — complex interaction, but content is independent
4. **Testimonials** — straightforward, validates social proof section layout
5. **Contact** — last because it requires a decision on form approach

---

## Decisions Still Open

| Decision | Status | Where Documented |
|----------|--------|-----------------|
| Contact form approach | TBD | `docs/technical/tech-stack.md` |
| Custom domain | TBD | — |
| Hero easter egg trigger mechanism | TBD at implementation | `docs/content/hero-easter-egg-approaches.md` |

---

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Architecture](./architecture.md)
- [About Section Spec](../design/about-section-spec.md) — Timeline Scatter details
- [Hero Section Reference](../design/hero-section-reference.md)
- [Hero Easter Egg](../content/hero-section-technical-easter-egg-cto-optimized.md)
- [Projects Copy](../content/projects-section-copy.md)
- [About Nodes Copy](../content/about-section-copy-v4-final.md)
- [Motion Design](../design/motion-design.md)

---

**Last Updated**: 2026-02-20
**Maintained By**: Manual

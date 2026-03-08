# Implementation Plan

**Project**: React Portfolio
**Created**: 2026-02-20
**Last Updated**: 2026-03-08
**Version**: 2.0.0
**Status**: Active — Phase 2 In Progress

---

## Overview

Four phases from project init to production deploy. Each phase produces working, deployable code. No phase leaves the project in a broken state.

---

## Phase 1 — Foundation ✅ COMPLETE

**Goal**: Runnable project with design system in place. No real content yet.

### 1.1 — Project Initialization ✅

- [x] Scaffold with Vite: React 19 + TypeScript + Vite 6
- [x] Install core dependencies: framer-motion, tailwindcss @tailwindcss/vite
- [x] Install utility: clsx + tailwind-merge for cn() helper
- [x] Configure Tailwind v4 with Vite plugin
- [x] Set up `tsconfig.json` with path aliases (`@/` → `src/`)
- [x] Configure Vite with path alias to match tsconfig

### 1.2 — Design System in Code ✅

- [x] `src/styles/globals.css` — @theme layer with all CSS tokens + glow vars
- [x] Tailwind v4 configured via @theme (no tailwind.config.ts needed)
- [x] `src/lib/utils.ts` — cn() helper

### 1.3 — App Shell ✅

- [x] `src/components/layout/Header/` — sticky nav with logo/name + section links
- [x] `src/components/layout/Footer/` — signature in Ms Madi font + social icons
- [x] UI primitives: Button, Badge, NavLink, ProjectCard components built and reviewed
- [x] Component playground reviewed by design-critic (all critical/major issues resolved)

**Milestone**: ✅ `npm run dev` shows dark page with header, footer, correct fonts, and correct colors.

---

## Phase 2 — Core Sections (Static + Motion) 🔄 IN PROGRESS

**Goal**: All sections built with real content and animations. Full page working.

### 2.1 — Data Layer ✅

- [x] `src/types/index.ts` — Project, WorkExperience, AboutNode interfaces + ProjectCategory type
- [x] `src/data/projects.ts` — 9 projects with `category: ProjectCategory` field
- [x] `src/data/work-experience.ts` — 4 companies with `skills: string[]` (max 5 per role, TechTag pills)
- [x] `src/data/about-nodes.ts` — 8 personal nodes, all approved
- Note: No testimonials data — decision is zero testimonials

### 2.2 — UI Primitives ✅

- [x] `src/components/ui/Button/` — primary, secondary, ghost variants + all states
- [x] `src/components/ui/Badge/` — live, launching-soon, tech-stack variants
- [x] `src/components/ui/NavLink/` — nav link with hover underline
- [x] `src/components/ui/ProjectCard/` — image, tagline, title, description, tech badges, CTA
- [ ] `src/components/ui/SectionHeading/` — scroll-reveal underline (Decision #5 Modified)
- [ ] `src/components/ui/TechTag/` — neutral monospace pill for WorkExperience (Decision #2)
- [ ] `src/components/ui/FilterTabs/` — All·Apps·Packages·AI with layoutId pill (Decision #6)

### 2.3 — Sections

Build in order (top to bottom of page), run in parallel where possible:

- [ ] **Hero** — inline photo (100px), Option E copy ("Hey, I'm Jatin — Mobile Lead..."), Cmd+K CTO easter egg, stagger entrance, scroll indicator. Reference: `docs/content/hero-section-copy.md`
- [ ] **Work** — WorkExperience timeline entries, TechTag pills per role, scroll-reveal heading. Reference: `docs/content/professional-data.md`
- [ ] **Projects** — FilterTabs (All·Apps·Packages·AI), card grid, AnimatePresence popLayout, keyboard nav. Reference: `docs/content/projects-section-copy.md`
- [ ] **About** — Timeline Scatter: 8 nodes around centered profile photo, connection lines, hover expand. Reference: `docs/content/about-section-copy-v4-final.md`
- [ ] **Contact** — Email-only (A3: "Let's build something"), mailto link, LinkedIn/Twitter/GitHub. Reference: `docs/content/contact-section-copy.md`

**Finalized Design Decisions Applied:**
- **#2 TechTag pills**: `bg-elevated text-secondary border-subtle font-mono text-xs rounded-full` — NOT orange
- **#5 Section heading underline**: `scaleX 0→1` on scroll-in, `h-[0.12em]`, `bg-primary/70`, `once: true`
- **#6 FilterTabs**: `layoutId="filter-indicator"` pill, `AnimatePresence mode="popLayout"`, `role="tablist"` + ArrowKey nav

**Milestone**: Full page with real content + animations. Accessible. Tested on mobile + desktop.

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

## Decisions Resolved

| Decision | Status | Resolution |
|----------|--------|------------|
| Contact form approach | ✅ RESOLVED | Email-only (A3: "Let's build something"). No form needed. |
| Hero easter egg trigger | ✅ RESOLVED | Cmd+K (or Ctrl+K). Hint text fades after 3s. CTO pseudo-code mode. |
| Project filter categories | ✅ RESOLVED | `All · Apps · Packages · AI` — no Web tab. |
| TechTag color | ✅ RESOLVED | Neutral only (`bg-elevated text-secondary`), NOT orange. |
| Section heading underline | ✅ RESOLVED | Scroll-reveal `scaleX 0→1`, NOT hover. `0.12em`, `primary/70`. |
| Custom domain | TBD | — |

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

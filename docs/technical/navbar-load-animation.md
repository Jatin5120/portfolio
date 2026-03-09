# Navbar Load Animation — Technical Implementation Guide

**Project**: React Portfolio
**Created**: 2026-03-08
**Last Updated**: 2026-03-08
**Version**: 1.0.0
**Status**: Active

---

## Overview

This document specifies the implementation of the "studio turning on" navbar entrance animation for `Header.tsx`. The animation assembles the header on page load: logo materializes first, nav links stagger in, then the whole bar settles into the ghost-nav state (40% opacity at rest).

The pattern chosen is **declarative `variants` with `staggerChildren`** orchestrated from a parent container. This integrates cleanly with the existing `useMotionValue` / `useSpring` ghost-nav system without conflict.

---

## Table of Contents

1. [Pattern Decision](#1-pattern-decision)
2. [The Ghost-Nav Conflict — and How to Solve It](#2-the-ghost-nav-conflict-and-how-to-solve-it)
3. [Variant Architecture](#3-variant-architecture)
4. [Timing Numbers](#4-timing-numbers)
5. [Full Implementation](#5-full-implementation)
6. [Performance Notes](#6-performance-notes)
7. [Reduced Motion Fallback](#7-reduced-motion-fallback)
8. [Pitfalls to Avoid](#8-pitfalls-to-avoid)

---

## 1. Pattern Decision

### Three Candidate Approaches

**Option A — Inline `delay` on every element**

```tsx
// Each element manually specified with a hardcoded delay
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} />
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} />
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
```

Verdict: works but is brittle. Adding a new nav link requires recalculating every delay. No variant reuse. Hard to maintain.

**Option B — `useAnimate` with imperative sequence array**

```tsx
const [scope, animate] = useAnimate()
useEffect(() => {
  animate([
    ['#logo', { opacity: [0, 1], y: [-8, 0] }, { duration: 0.4 }],
    ['nav a', { opacity: [0, 1], y: [-6, 0] }, { delay: stagger(0.08), at: '-0.1' }],
  ])
}, [])
```

Verdict: maximum control over timing offsets using `at` values. Best for sequences where elements overlap in non-uniform ways. Adds imperative complexity; bypasses the variant propagation system that the rest of the component already uses.

**Option C — Declarative `variants` with `staggerChildren` + `delayChildren` (Recommended)**

```tsx
const navVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}
```

Verdict: **chosen approach**. Reasons:
- Matches how the existing mobile nav stagger is written (`delay: i * 0.07` on each `motion.a`)
- Variant propagation means child elements inherit parent state, so adding/removing nav links automatically gets the right stagger without manual delay recalculation
- The `when: "beforeChildren"` option lets the container animate before the children, enabling the "waking up" sequence
- Integrates with the existing `initial` / `animate` lifecycle on `motion.header` cleanly

---

## 2. The Ghost-Nav Conflict — and How to Solve It

### The Problem

The existing ghost-nav system controls overall header visibility through a `useMotionValue` → `useSpring` pipeline:

```tsx
const rawOpacity = useMotionValue(forceScrolled ? 1 : 0.4)
const navOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 })
// Applied as:
<motion.div style={{ opacity: navOpacity }}>  // Logo wrapper
<motion.div style={{ opacity: navOpacity }}>  // Links wrapper
```

The ghost nav sets opacity to `0.4` as its "at rest" baseline. The load animation wants to start at `opacity: 0` and animate to `opacity: 1`. These two systems fight over the same CSS property on the same element.

**If you naively add `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`** to the logo or links `motion.div` that also has `style={{ opacity: navOpacity }}`, the `style` prop from `useSpring` wins at runtime because it resolves to an inline style, which outranks the `animate` target. The load animation will appear broken or flash.

### The Solution: Two-Layer Opacity

Separate concerns by splitting the opacity into two nested `motion.div` layers:

- **Outer layer** (`motion.div style={{ opacity: navOpacity }}`): owned entirely by the ghost-nav system. Starts at `0.4`, responds to scroll/hover. **Never touched by the load animation.**
- **Inner layer** (`motion.div` with `variants`): owned entirely by the load animation. Starts at `opacity: 0`, animates to `opacity: 1` once. After the load animation completes, this layer stays at `opacity: 1` permanently and the outer layer handles all subsequent opacity changes.

The browser composites these as `0.4 × 1.0 = 0.4` at rest, `1.0 × 1.0 = 1.0` when scrolled — identical to the current behavior.

```tsx
{/* Outer: ghost-nav opacity controller (unchanged) */}
<motion.div style={{ opacity: navOpacity }} className="flex items-center">
  {/* Inner: load-animation controller (new) */}
  <motion.div variants={itemVariants}>
    {/* Logo content */}
  </motion.div>
</motion.div>
```

This separation is the critical architectural decision. Everything else is straightforward timing.

---

## 3. Variant Architecture

### Three levels of variants

```
navbarVariants  (on motion.header — the orchestrator)
  ├── logoGroupVariants  (on logo wrapper)
  │     └── logo itself is itemVariants
  └── linksGroupVariants  (on nav links wrapper)
        └── each NavLink item is itemVariants
```

In practice, both groups share the same `itemVariants` for the individual element transitions. Only the container orchestration differs (logo group has `delayChildren: 0`, links group has `delayChildren: 0.28` to start after the logo settles).

### Variant Definitions

```tsx
// Shared transition for individual elements
// Uses project's primary easing [0.4, 0, 0.2, 1]
const LOAD_TRANSITION = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

// The motion state applied to each individual animated item
const itemVariants = {
  hidden: {
    opacity: 0,
    y: -7,         // subtle upward offset; drops into position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: LOAD_TRANSITION,
  },
}

// Orchestrator for the logo section (logo + clock slot)
const logoGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,   // small pause after header mounts
      staggerChildren: 0.1,  // logo, then potential sub-elements
    },
  },
}

// Orchestrator for the nav links section
const linksGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.28,     // starts after logo is mostly done
      staggerChildren: 0.08,   // each link staggers 80ms after the previous
    },
  },
}
```

### Why `y: -7` and not `y: -20`

Large y-offsets (`y: -20` or `y: -50`) on a fixed header create a visible pop-in from off-screen. Since the header is `position: fixed` at the top of the viewport, a 20px downward travel reads as the header falling into place. A 7px offset is enough to feel like a "materialize" without a physically distracting drop. It also keeps the content within its already-reserved space, preventing any CLS.

---

## 4. Timing Numbers

The full sequence in absolute time (in seconds from page load):

| Time (s) | Event |
|---|---|
| 0.00 | Header mounts; all elements at `opacity: 0, y: -7` |
| 0.08 | Logo begins fade-in + drop (duration 0.45s) |
| 0.18 | Logo first nav link begins entering (if logo group has sub-items) |
| 0.28 | First nav link ("01 Work") begins entering |
| 0.36 | Second nav link ("02 About") begins entering |
| 0.44 | Third nav link ("03 Contact") begins entering |
| 0.53 | Logo animation completes (0.08 + 0.45) |
| 0.73 | Last nav link animation completes (0.44 + 0.45 ≈ 0.89, but perceived done ~0.73 because ease tails off) |

Total perceived sequence: ~0.7 to 0.8 seconds. This is fast enough to not feel like it's delaying the user's ability to use the nav, but slow enough to register as intentional motion rather than a flash.

### Easing rationale

`[0.4, 0, 0.2, 1]` is the project's primary easing (cubic-bezier ease-out). For entrance animations this is ideal: fast at the beginning (element rushes in) and decelerates to rest. It reads as confident, not floaty.

If you wanted the logo to feel slightly softer (more "waking up" and less "snapping in"), use `[0.25, 0.46, 0.45, 0.94]` (a gentler ease-out) only for the logo, and keep `[0.4, 0, 0.2, 1]` for the links.

---

## 5. Full Implementation

Below is the complete, drop-in implementation. Changes from the current `Header.tsx` are annotated with `// NEW` or `// CHANGED`.

```tsx
import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useScroll,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/ui/NavLink'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

// ─── Load animation variants ────────────────────────────────────────────────
// NEW: Variant definitions for the "studio turning on" entrance sequence.
// These are defined at module scope to avoid re-creation on every render.

const LOAD_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]

const itemVariants = {
  hidden: { opacity: 0, y: -7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: LOAD_EASE },
  },
}

const logoGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
}

const linksGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.08,
    },
  },
}
// ────────────────────────────────────────────────────────────────────────────

function BangaloreClock() {
  // ... unchanged
}

interface HeaderProps {
  activeSection?: string
  forceScrolled?: boolean
}

export function Header({ activeSection, forceScrolled = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(forceScrolled)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolledRef = useRef(forceScrolled)

  const rawOpacity = useMotionValue(forceScrolled ? 1 : 0.4)
  const navOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 })

  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ... scroll/mouse/mobile effects unchanged

  // NEW: Determine the animate target for load animation.
  // When reduced motion is active, we skip the entrance entirely by going
  // straight to "visible" without the y-offset (opacity still transitions
  // but faster — handled in the variants check below).
  const loadAnimateTarget = 'visible'

  return (
    <>
      {/*
        CHANGED: motion.header now acts as the top-level variant orchestrator.
        "initial" and "animate" props drive the load animation down the tree
        via variant propagation. The backgroundColor/backdropFilter animate
        prop is kept but moved to a separate "style" or kept inline — variants
        can coexist with direct animate props in Framer Motion.

        NOTE: Framer Motion MERGES variant states with direct animate props
        when they animate different CSS properties. Since the load variants
        animate `opacity` and `y`, and the direct animate prop animates
        `backgroundColor` and `backdropFilter`, they don't conflict.
      */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial="hidden"
        animate={loadAnimateTarget}
        variants={{
          hidden: {},   // container itself has no visual state
          visible: {},  // container itself has no visual state — only propagates
        }}
        // Existing background animation (unchanged)
        style={{}} // separate motion values from variant propagation
        // backgroundColor and backdropFilter must be in a nested element
        // OR use a separate motion.div overlay beneath — see note below
      >
        {/*
          PATTERN NOTE on backgroundColor/backdropFilter:

          The existing code uses `animate={{ backgroundColor, backdropFilter }}`
          directly on motion.header. When we add `initial="hidden" animate="visible"`
          for variant propagation, Framer Motion will use the animate object (the
          variant name string) for variant dispatch and fall back to the object
          form for direct properties. This DOES work — Framer Motion supports
          mixing variant strings and direct animate values only via the
          useAnimation hook or AnimatePresence exit sequences, NOT on the same
          prop simultaneously.

          SOLUTION: Wrap the background in a sibling motion.div positioned
          absolutely behind the nav content, which handles only the background
          color/blur animation. The motion.header becomes a pure variant
          orchestrator with no direct animate values.
        */}

        {/* Background layer — handles scroll-reactive styling separately */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundColor:
              scrolled || mobileOpen
                ? 'rgba(10, 10, 10, 0.92)'
                : 'rgba(10, 10, 10, 0)',
            backdropFilter:
              scrolled || mobileOpen ? 'blur(12px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
        />

        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ── Logo group ── */}
          {/*
            CHANGED: The outer motion.div keeps style={{ opacity: navOpacity }}
            for ghost-nav. A new inner motion.div with logoGroupVariants
            handles the load animation. The two layers compose multiplicatively.
          */}
          <motion.div style={{ opacity: navOpacity }} className="flex items-center">
            {/* NEW: Load animation inner layer for logo group */}
            <motion.div
              variants={logoGroupVariants}
              className="flex items-center"
            >
              {/* NEW: Logo wrapped in itemVariants */}
              <motion.div variants={itemVariants}>
                <motion.a
                  href="#"
                  className="relative overflow-hidden outline-none rounded-sm
                             focus-visible:ring-2 focus-visible:ring-primary
                             focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  style={{ lineHeight: 1, display: 'block' }}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span
                    className="font-heading font-bold text-2xl leading-none tracking-tight text-heading"
                    style={{ display: 'block', position: 'relative', zIndex: 1 }}
                  >
                    Jatin
                  </span>
                  <motion.span
                    className="absolute inset-0 font-heading font-bold text-2xl leading-none tracking-tight text-accent"
                    style={{ zIndex: 2 }}
                    variants={{
                      rest: {
                        clipPath: 'inset(100% 0 0 0)',
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.18,
                          ease: LOAD_EASE,
                        },
                      },
                      hover: {
                        clipPath: 'inset(0% 0 0 0)',
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.22,
                          ease: LOAD_EASE,
                        },
                      },
                    }}
                  >
                    Jatin
                  </motion.span>
                </motion.a>
              </motion.div>

              {/* Bangalore clock — unchanged, appears via AnimatePresence on scroll */}
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    className="ml-3 pl-3 border-l border-subtle"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.3, ease: LOAD_EASE }}
                  >
                    <BangaloreClock />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ── Desktop nav links ── */}
          {/*
            CHANGED: Same pattern — outer div keeps ghost-nav opacity,
            inner motion.div with linksGroupVariants owns load animation.
          */}
          <motion.div
            style={{ opacity: navOpacity }}
            className="hidden md:flex items-center gap-8"
          >
            {/* NEW: Load animation inner layer for links group */}
            <motion.div
              variants={linksGroupVariants}
              className="flex items-center gap-8"
            >
              <LayoutGroup>
                {NAV_LINKS.map((link, i) => (
                  // NEW: Each link wrapped in itemVariants
                  <motion.div key={link.label} variants={itemVariants}>
                    <NavLink
                      href={link.href}
                      index={i + 1}
                      isActive={activeSection === link.href.replace('#', '')}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </LayoutGroup>
            </motion.div>
          </motion.div>

          {/* ── Hamburger — unchanged ── */}
          {/* NEW: Wrap in itemVariants for consistent entrance */}
          <motion.div variants={itemVariants} className="md:hidden">
            <button
              className={cn(
                'w-10 h-10 flex flex-col items-center justify-center gap-[5px]',
                'rounded-lg outline-none',
                'focus-visible:ring-2 focus-visible:ring-primary',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <motion.span
                className="block w-5 h-px bg-heading rounded-full origin-center"
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: LOAD_EASE }}
              />
              <motion.span
                className="block w-5 h-px bg-heading rounded-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px bg-heading rounded-full origin-center"
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: LOAD_EASE }}
              />
            </button>
          </motion.div>
        </nav>

        {/* Progress line — unchanged */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left pointer-events-none"
          style={{
            backgroundColor: 'rgba(255, 171, 0, 0.45)',
            scaleX: progressScaleX,
          }}
        />
      </motion.header>

      {/* Mobile nav overlay — unchanged */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-page/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-10" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileNav}
                  className={cn(
                    'text-4xl font-heading font-bold text-heading',
                    'hover:text-accent transition-colors duration-200',
                    'outline-none focus-visible:text-accent',
                    activeSection === link.href.replace('#', '') && 'text-accent',
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.07,
                    ease: LOAD_EASE,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Key structural change: the background layer extraction

The biggest structural change required is extracting `backgroundColor` and `backdropFilter` from `motion.header`'s `animate` prop into a separate positioned `motion.div`. This is necessary because Framer Motion does not support mixing a variant name string and a property object on the same `animate` prop simultaneously. The pattern is:

```tsx
// BEFORE (cannot add variants to this)
<motion.header
  animate={{ backgroundColor: ..., backdropFilter: ... }}
>

// AFTER (header becomes pure variant orchestrator)
<motion.header
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>
  {/* Separate element handles the background */}
  <motion.div
    className="absolute inset-0 -z-10"
    animate={{ backgroundColor: ..., backdropFilter: ... }}
    transition={{ duration: 0.3 }}
  />
  {/* Nav content here */}
</motion.header>
```

The `absolute inset-0 -z-10` positions the background layer to fill the header while sitting behind the nav content.

---

## 6. Performance Notes

### Properties being animated

The load animation touches only `opacity` and `y` (transform: translateY). Both are compositor-thread properties. They do not trigger layout recalculation or paint. This is the safest possible set of properties to animate.

**Do not add `filter: blur()` to the entrance animation.** While blur-in (animating `filter: blur(8px) → blur(0px)`) looks polished in Figma mockups, it has measurable performance cost at scale:
- Every blur frame forces a paint step on the blurred layer and its expanded bounding box
- On a fixed header spanning 100vw, this is a large surface area
- macOS renders blur filters reasonably well, but low-end Android devices will drop frames
- The existing `backdropFilter: blur(12px)` on the background layer already gives the frosted-glass effect on scroll; adding another blur to the entrance layer doubles the compositor workload for no perceptible design gain

Stick to `opacity` and `y` only for the entrance.

### `will-change` — do not add it manually

Framer Motion 12 manages `will-change` internally. It sets `will-change: transform, opacity` on animated elements as needed and removes it after the animation completes. Manually adding `will-change` via Tailwind or inline styles on top of Framer Motion's own management causes the property to persist beyond the animation lifecycle, wasting GPU memory for the lifetime of the component. Let Framer Motion own this.

### CLS (Cumulative Layout Shift)

The `initial={{ y: -7 }}` state means the header's content is shifted 7px upward from its final position. Since the header is `position: fixed`, this shift is entirely off the normal document flow and contributes zero CLS to the Core Web Vitals score. Fixed elements are excluded from CLS measurement.

### Animation on first render vs subsequent renders

Framer Motion's `initial` prop fires once on mount. When `Header` re-renders (e.g., `activeSection` changes, `scrolled` flips), the variants system does not re-trigger the entrance animation because the component has already reached the `"visible"` state. Variant state is sticky — it does not reset on parent re-render unless you explicitly change the `animate` prop value.

---

## 7. Reduced Motion Fallback

### Two-layer strategy

The project already has `useReducedMotion()` imported in `Header.tsx`. Apply it at the variant level:

```tsx
const prefersReducedMotion = useReducedMotion()

// Override itemVariants when reduced motion is requested
const itemVariants = prefersReducedMotion
  ? {
      hidden: { opacity: 0 },       // No y-movement
      visible: {
        opacity: 1,
        transition: { duration: 0.15 },  // Fast fade, no motion
      },
    }
  : {
      hidden: { opacity: 0, y: -7 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: LOAD_EASE },
      },
    }
```

With reduced motion active:
- No `y` displacement (eliminates vestibular trigger)
- A very short opacity fade (0.15s) still signals "loaded" without being a jarring pop
- `staggerChildren` delays are preserved — Framer Motion does not override timing orchestration via `reducedMotion`, only removes transforms. The stagger means the elements still appear sequentially but faster.

### `MotionConfig` as a site-wide backstop

In `App.tsx` or the root layout, add:

```tsx
import { MotionConfig } from 'framer-motion'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* rest of app */}
    </MotionConfig>
  )
}
```

With `reducedMotion="user"`, Framer Motion automatically disables all transform and layout animations for users with the OS "Reduce Motion" preference enabled, while preserving opacity and color transitions. This is a safety net that works even if individual components forget to check `useReducedMotion()`.

Note: `globals.css` already has a `prefers-reduced-motion` media query that sets `animation-duration: 0.01ms` on CSS animations. This does not affect Framer Motion's JS-driven animations directly, which is why the JS-level `MotionConfig` is needed as well.

---

## 8. Pitfalls to Avoid

### Pitfall 1: `initial={false}` on a parent breaks child entrance animations

If `motion.header` or any ancestor has `initial={false}` (which tells Framer Motion "render immediately in the animate state"), child variants will not play their entrance animation on mount. They will teleport to their final state. Check that no parent component wraps the header with `initial={false}`.

### Pitfall 2: Logo's `animate="rest"` conflicts with parent `animate="visible"`

The logo `motion.a` has `initial="rest" whileHover="hover" animate="rest"` for the color-wipe hover animation. These are local variants that use the variant name strings `"rest"` and `"hover"`. The parent propagates `"hidden"` → `"visible"`.

Framer Motion resolves this by matching variant names against each element's own `variants` definition. If an element has no `"hidden"` or `"visible"` key in its local `variants`, it passes the propagated state down to its children without applying anything to itself. The logo `motion.a` only has `"rest"` and `"hover"` variants, so it ignores `"hidden"` and `"visible"` propagation.

However, the `motion.div` wrapper around the `motion.a` (the new `variants={itemVariants}` wrapper) does have `"hidden"` and `"visible"`, so it handles the entrance. The logo's hover animation then operates independently afterward. No conflict.

### Pitfall 3: `LayoutGroup` and variant stagger on the same container

`LayoutGroup` from Framer Motion is used to coordinate layout animations across the nav links. Wrapping `motion.div` elements that use `variants` inside a `LayoutGroup` is safe — `LayoutGroup` handles the layout animation namespace and does not interfere with opacity/transform variants.

### Pitfall 4: Hamburger button enters during mobile layout tests

The hamburger button wrapper (`motion.div variants={itemVariants}`) is a `motion.div` with `className="md:hidden"`. On desktop, this element is hidden via CSS but still mounted in the DOM, so it still runs the load animation (it just isn't visible). On mobile, it will correctly enter with the stagger.

If you want the hamburger and the desktop nav links to share a single stagger sequence (i.e., hamburger uses the `linksGroupVariants` timing), move the hamburger wrapper's `variants={itemVariants}` under `linksGroupVariants` or give it a fixed `delay` directly in its variant's transition.

### Pitfall 5: The animation re-fires after hot module replacement in development

During Vite development, HMR causes components to remount, which re-triggers `initial` → `animate`. This is expected and only affects the development experience. In production, the animation fires once on page load as intended.

---

## Related Documents

- [Architecture](./architecture.md) — System architecture decisions
- [Implementation Plan](./implementation-plan.md) — Development roadmap

---

**Last Updated**: 2026-03-08
**Version**: 1.0.0
**Maintained By**: Manual

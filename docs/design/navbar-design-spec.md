# Navbar Design Specification

**Project**: React Portfolio (Developer Brand)
**Created**: 2026-03-08
**Last Updated**: 2026-03-08
**Version**: 1.0.0
**Status**: Active
**Author**: Art Direction

---

## Overview

This document specifies a complete redesign of the portfolio navbar. The current implementation is functionally correct but visually undifferentiated — a transparent-to-blur bar with white nav links and an underline hover effect. This redesign targets the reaction: "this person has taste" from a senior engineer or CTO in the first three seconds.

Every decision below is grounded in the brand DNA: quiet confidence, craftsman posture, dark energy, orange warmth.

---

## The Diagnosis (What's Broken)

| Element | Current State | Problem |
|---|---|---|
| Logo | `font-bold text-2xl text-heading` | Cabinet Grotesk Bold 24px white. Every portfolio does this. No visual voice. |
| Nav links | Underline scale on hover | The most overused hover pattern of 2020–2024. |
| Available badge | Dark pill, orange text, slight glow | Forgettable. Looks like a status tag on a Jira ticket. |
| Scroll state | `rgba(10,10,10,0.92) blur(12px)` | Identical to the header on 10,000 other sites built with the same Tailwind tutorial. |
| Separator line | Gradient `rgba(31,41,55,0.8)` | Gray divider. Communicates nothing about who built this. |

---

## Design Decisions

---

### 1. The Logo: Weight-Split Typography

#### The Idea

The word "Jatin" rendered as a **split-weight typographic mark** using Cabinet Grotesk. The "J" is displayed at ExtraBold weight (900) at a slightly larger optical size, while "atin" drops to Regular (400) at the standard size. The two parts sit on the same baseline but feel like a craftsman's signature — asymmetric, deliberate, unrepeatable.

This creates a mark without being a logo. It communicates typographic awareness before anyone reads the nav links.

#### Visual Logic

```
J          atin
↑          ↑
900 weight  400 weight
28px        22px
#F3F4F6     #9CA3AF  (default)
```

On hover, "atin" slides toward white (#F3F4F6) with letter-spacing expanding from `tracking-tight` (-0.025em) to `tracking-normal` (0em) over 300ms. The "J" doesn't move. The effect is the name "opening up" — breathing out — without any scale, glow, or shadow involved. Pure typographic motion.

The hover glow on the existing implementation (`drop-shadow(0 0 10px rgba(255, 171, 0, 0.5))`) is removed. Orange glow on your own name is a beginner tell. The name earns attention through composition, not lighting effects.

#### Implementation

```tsx
// Replace the existing <motion.a> logo with this:

<motion.a
  href="#"
  className="flex items-baseline gap-0 leading-none rounded-sm outline-none
             focus-visible:ring-2 focus-visible:ring-primary
             focus-visible:ring-offset-2 focus-visible:ring-offset-page"
  initial="idle"
  whileHover="hover"
  aria-label="Jatin — home"
>
  {/* The "J" — anchor, heavy, immovable */}
  <span
    className="font-heading text-heading"
    style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}
  >
    J
  </span>

  {/* "atin" — lighter, responds to hover */}
  <motion.span
    className="font-heading"
    style={{ fontSize: '22px', fontWeight: 400, color: 'var(--color-secondary)' }}
    variants={{
      idle: { letterSpacing: '-0.02em', color: 'var(--color-secondary)' },
      hover: { letterSpacing: '0.01em', color: 'var(--color-heading)' },
    }}
    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    atin
  </motion.span>
</motion.a>
```

#### Why This Works

- The weight contrast (900 vs 400) is the kind of typographic decision that signals design fluency. Most developers never think about this.
- The letterSpacing animation on hover is uncommon — almost no one does it for logos — which makes it feel original.
- No color flash. No glow. No transform. Pure type. That restraint *is* the statement.
- Cabinet Grotesk at 900 weight has a distinctive optical character (compressed, strong), while 400 is generous and open. The contrast is visible and meaningful.

---

### 2. Nav Link Interaction: The Character Lift

#### The Idea

Replace the underline scale with a **per-character vertical lift**. Each letter in the nav label lifts (translateY: -3px) in sequence with a staggered delay of 30ms per character, then settles back. The effect reads as the word "stepping forward" — like keys on a keyboard being pressed individually. It is subtle, surprising, and technically intentional.

The color transitions from `text-heading` (#F3F4F6) to `text-accent` (#FFAB00) over the full duration of the animation — approximately 120ms into the character cascade, when the middle character lifts.

No underline. No scale. No background pill. Just the characters moving.

#### Implementation

```tsx
// New NavLink component — replaces src/components/ui/NavLink.tsx

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: string   // Must be string for per-character splitting
  isActive?: boolean
}

const charVariants = {
  idle: { y: 0 },
  hover: (i: number) => ({
    y: -3,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: [0.34, 1.56, 0.64, 1],  // Subtle spring overshoot
    },
  }),
}

// Return animation — slight delay so the lift settles before coming back
const charReturnVariants = {
  idle: (i: number) => ({
    y: 0,
    transition: {
      delay: i * 0.02,
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function NavLink({ href, children, isActive = false }: NavLinkProps) {
  const chars = children.split('')

  return (
    <motion.a
      href={href}
      className={cn(
        'relative flex items-center gap-0',
        'text-sm font-semibold font-body tracking-wide',
        'rounded-sm outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        isActive ? 'text-accent' : 'text-heading',
      )}
      initial="idle"
      whileHover="hover"
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active state indicator: a small orange dot below, not an underline */}
      {isActive && (
        <motion.span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2
                     w-1 h-1 rounded-full bg-primary"
          layoutId="nav-active-dot"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {chars.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charVariants}
          style={{
            display: 'inline-block',
            // Preserve space characters
            minWidth: char === ' ' ? '0.3em' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.a>
  )
}
```

#### The Active State Dot

The current active state uses `text-accent after:scale-x-100` (orange underline). This is replaced with a single 4px orange dot (`w-1 h-1`) centered below the active link, using Framer Motion's `layoutId="nav-active-dot"` for a spring-animated slide between links as the active section changes. The dot is magnetic and physical — it moves as a body, not a color swap. This is the same technique Linear and Vercel use for tab indicators.

#### Why This Works

- Per-character animation on nav labels is a 2025–2026 Awwwards pattern. It signals awareness of the current moment in web craft.
- The spring overshoot (`[0.34, 1.56, 0.64, 1]`) on the lift adds physical character without being cartoonish.
- The `layoutId` spring dot is a micro-interaction that a CTO scanning the page will register subconsciously as polished.
- Removing the underline removes the visual noise of a bar running beneath three different words at different widths.

---

### 3. Available Badge: The Blinking Terminal Cursor

#### The Idea

The current badge is a pill with a pulsing dot and the word "Available." It reads as a status tag, not a signal. It communicates "I labeled myself available" rather than "I am genuinely here, paying attention."

The redesign removes the pill shape entirely. The badge becomes an **inline terminal-style indicator**: a monospaced string `"available"` in lowercase JetBrains Mono (the code font from the brand system), at 11px, with `tracking-widest` letter-spacing, preceded by a blinking block cursor character.

The cursor blinks using a custom CSS animation: `opacity` alternates between 1 and 0 at 1.2s interval (slower than standard — unhurried, present). The text is `#FFAB00` at 70% opacity in the resting state; on hover over the entire navbar right-side group, it resolves to 100%.

No border. No background. No rounded pill. The format itself communicates "terminal literacy" — which is a craftsman's signal.

#### Implementation

```tsx
// Replace AvailableBadge in src/components/ui/Badge.tsx

// First, add this keyframe to globals.css:
// @keyframes cursor-blink {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0; }
// }

export function AvailableBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 select-none"
      aria-label="Currently available for work"
    >
      {/* Blinking block cursor */}
      <span
        className="inline-block w-[7px] h-[11px] bg-primary"
        style={{ animation: 'cursor-blink 1.2s step-end infinite' }}
        aria-hidden="true"
      />

      {/* Terminal-style label */}
      <span
        className="font-mono text-[11px] tracking-widest uppercase text-primary"
        style={{ opacity: 0.75, letterSpacing: '0.12em' }}
      >
        available
      </span>
    </span>
  )
}
```

Add to `globals.css` (inside `@layer base` or as a top-level `@keyframes`):

```css
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

#### Why This Works

- Using JetBrains Mono (the brand's mono font) for a status indicator is self-referential in a good way: it places the badge in the developer's own visual language, not a UI designer's toolkit.
- `step-end` (not `ease`) on the blink animation is authentic — it matches actual terminal cursors. `ease` blink looks like a UI component trying to seem like a terminal. `step-end` *is* a terminal.
- Uppercase with `tracking-widest` gives the 11px text presence without size. This is a common pattern in high-end editorial design: small but architectural.
- No pill border means no visual box competing with the nav links. The badge earns its place through behavior (blink) not decoration (border + background).
- The 70% opacity resting state communicates availability without shouting. It is present but not desperate.

---

### 4. Scroll State: The Orange Rule

#### The Idea

The current scroll state does exactly what every Tailwind tutorial teaches: background appears, blur activates. It signals "I followed a tutorial" not "I made a decision."

The redesign introduces a completely different scroll transition mechanism: **an orange 1px horizontal rule** (`border-b border-primary/20`) that slides in from the left when scrolled, and a `--header-progress` CSS custom property (driven by a `useScroll` hook) that shifts the header's text elements from full opacity to `opacity: 0.92` — barely perceptible but present.

The background treatment itself becomes simpler: no blur, no frosted glass. Instead, the background transitions from `transparent` to `rgba(10, 10, 10, 0.97)` — nearly opaque, nearly flat. This reads as intentional flatness rather than an accidental omission of blur.

The rule at the bottom animates via `scaleX` from 0 to 1, transforming from the left edge. The rule color is `rgba(255, 171, 0, 0.2)` — barely orange, but when it slides in it signals: something has changed, and that change belongs to this brand.

#### Implementation

```tsx
// Updated header motion config in Header.tsx

<motion.header
  className="fixed top-0 left-0 right-0 z-50"
  animate={{
    backgroundColor: scrolled || mobileOpen
      ? 'rgba(10, 10, 10, 0.97)'
      : 'rgba(10, 10, 10, 0)',
    // No backdropFilter — intentional flatness
  }}
  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {/* ... nav content ... */}

  {/* Replace the gray gradient separator with the orange rule */}
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-px origin-left"
    style={{ backgroundColor: 'rgba(255, 171, 0, 0.2)' }}
    animate={{ scaleX: scrolled ? 1 : 0 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  />
</motion.header>
```

#### The Scroll Progress Micro-Effect (Optional Enhancement)

For an additional layer: use Framer Motion's `useScroll` + `useTransform` to drive the logo "J" from weight 900 → 700 as the user scrolls past 200px. The name visually compresses as the user descends into the content — a subtle signal that the hero moment has passed and work is in focus.

```tsx
import { useScroll, useTransform, useMotionTemplate } from 'framer-motion'

// Inside Header component:
const { scrollY } = useScroll()
const jWeight = useTransform(scrollY, [0, 200], [900, 700])

// Apply to the "J" span:
<motion.span style={{ fontWeight: jWeight }}>J</motion.span>
```

Note: Variable font weight animation requires Cabinet Grotesk to be loaded as a variable font (`font-variation-settings: 'wght' <value>`). If the current setup uses static font files, this effect should be held until variable font loading is confirmed.

#### Why This Works

- Removing backdrop-filter is a bold choice. Blur has become so commonplace that its absence reads as a deliberate aesthetic decision.
- The orange rule sliding in from the left is a unique scroll tell. No other portfolio in any reference set uses this. It is tiny, barely perceptible at 20% opacity — but it is orange, which means it is unmistakably this brand.
- `scaleX` from origin-left gives the rule a directional quality (time moving forward, page being read) rather than a simple fade.
- The near-opaque background (0.97 vs the typical 0.85–0.92) combined with no blur creates a cleaner surface for the nav content to sit on when scrolled.

---

### 5. Wildcard: The Index Number

#### The Idea

Add a `01 —` prefix to each nav link's label, but render it only on the desktop view, and only in a faint tertiary color, at 9px JetBrains Mono. The full rendered link becomes:

```
01 — Work
02 — About
03 — Contact
```

Where `01 —` is styled as `font-mono text-[9px] text-tertiary opacity-40 tracking-widest mr-1.5` and `Work` is the existing semibold Cabinet Grotesk label.

On hover, the index number fades from `opacity-40` to `opacity-70` and shifts color from `text-tertiary` to `text-accent` — the orange touches the number first, then the character lift happens on the label. There is a 40ms delay between the number's color change and the label characters beginning to lift.

This is a typographic device borrowed from editorial design and high-end agency sites (particularly French creative studios on Awwwards). It imposes an archival, catalog-like sensibility on what are otherwise just three navigation items. It signals: "this person thinks about information hierarchy even when the information is trivial."

The numbers add no functional value. That is precisely the point. The craftsman added them because they looked considered.

#### Implementation

```tsx
// Updated NAV_LINKS in Header.tsx
const NAV_LINKS = [
  { label: 'Work', href: '#work', index: '01' },
  { label: 'About', href: '#about', index: '02' },
  { label: 'Contact', href: '#contact', index: '03' },
]

// Updated NavLink component signature:
interface NavLinkProps {
  href: string
  children: string
  isActive?: boolean
  index?: string      // New optional prop
}

// In the NavLink render:
{index && (
  <motion.span
    className="font-mono mr-1.5 hidden lg:inline-block"
    style={{ fontSize: '9px', letterSpacing: '0.1em' }}
    variants={{
      idle: { color: 'var(--color-tertiary)', opacity: 0.4 },
      hover: {
        color: 'var(--color-accent)',
        opacity: 0.7,
        transition: { duration: 0.15, delay: 0 }  // Fires before label lift
      },
    }}
  >
    {index} —
  </motion.span>
)}

{/* Then the per-character label with 40ms additional delay on each char: */}
{chars.map((char, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={{
      idle: { y: 0 },
      hover: (i: number) => ({
        y: -3,
        transition: {
          delay: 0.04 + i * 0.03,   // 40ms base delay + stagger
          duration: 0.2,
          ease: [0.34, 1.56, 0.64, 1],
        },
      }),
    }}
    style={{ display: 'inline-block' }}
  >
    {char}
  </motion.span>
))}
```

The `hidden lg:inline-block` ensures the index numbers only appear at large breakpoints, keeping the mobile nav clean.

#### Why This Works

- Index numbers on nav items are a signature of French creative agencies (Locomotive, Dogstudio, Resn) that consistently win Awwwards. Adopting the device without copying any specific site's execution makes it feel like Jatin arrived at it himself.
- The sequence of the hover — number lights up orange first, then letters lift — creates a two-beat rhythm that feels choreographed.
- At 9px mono in `opacity-40`, the numbers are invisible to a casual eye. They are a reward for people who look closely. A CTO with taste will notice them. A recruiter scanning for "React developer" will not. This is the correct selectivity.
- The em-dash (—) between index and label is a typographic choice: it reads as a table of contents, which frames the portfolio as a document worth reading rather than a marketing page worth skimming.

---

## Complete Updated Files

### `src/components/ui/NavLink.tsx` (Full Replacement)

```tsx
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: string
  isActive?: boolean
  index?: string
}

export function NavLink({ href, children, isActive = false, index }: NavLinkProps) {
  const chars = children.split('')

  return (
    <motion.a
      href={href}
      className={cn(
        'relative flex items-center gap-0',
        'text-sm font-semibold font-body tracking-wide',
        'rounded-sm outline-none select-none',
        'focus-visible:ring-2 focus-visible:ring-primary',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        isActive ? 'text-accent' : 'text-heading',
      )}
      initial="idle"
      whileHover="hover"
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active indicator: spring-animated orange dot */}
      {isActive && (
        <motion.span
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2
                     w-1 h-1 rounded-full bg-primary"
          layoutId="nav-active-dot"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Index prefix — desktop only */}
      {index && (
        <motion.span
          className="font-mono mr-1.5 hidden lg:inline-block leading-none"
          style={{ fontSize: '9px', letterSpacing: '0.1em' }}
          variants={{
            idle: { color: 'var(--color-tertiary)', opacity: 0.4 },
            hover: {
              color: 'var(--color-accent)',
              opacity: 0.7,
              transition: { duration: 0.15, delay: 0 },
            },
          }}
          aria-hidden="true"
        >
          {index} —
        </motion.span>
      )}

      {/* Per-character animated label */}
      {chars.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={{
            idle: { y: 0 },
            hover: (i: number) => ({
              y: -3,
              transition: {
                delay: index ? 0.04 + i * 0.03 : i * 0.03,
                duration: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              },
            }),
          }}
          style={{
            display: 'inline-block',
            minWidth: char === ' ' ? '0.3em' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.a>
  )
}
```

---

### `src/components/ui/Badge.tsx` — `AvailableBadge` Replacement

```tsx
export function AvailableBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 select-none"
      aria-label="Currently available for work"
    >
      {/* Block cursor — authentic terminal blink with step-end */}
      <span
        className="inline-block bg-primary"
        style={{
          width: '7px',
          height: '11px',
          animation: 'cursor-blink 1.2s step-end infinite',
        }}
        aria-hidden="true"
      />
      <span
        className="font-mono uppercase text-primary"
        style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          opacity: 0.75,
        }}
      >
        available
      </span>
    </span>
  )
}
```

---

### `src/styles/globals.css` — Additions

Add inside the existing `@layer base` block (alongside other rules):

```css
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

### `src/components/layout/Header.tsx` — Key Changes

```tsx
// Updated NAV_LINKS (add index):
const NAV_LINKS = [
  { label: 'Work', href: '#work', index: '01' },
  { label: 'About', href: '#about', index: '02' },
  { label: 'Contact', href: '#contact', index: '03' },
]

// Updated logo (replace existing <motion.a> logo):
<motion.a
  href="#"
  className="flex items-baseline gap-0 leading-none rounded-sm outline-none
             focus-visible:ring-2 focus-visible:ring-primary
             focus-visible:ring-offset-2 focus-visible:ring-offset-page"
  initial="idle"
  whileHover="hover"
  aria-label="Jatin — return to top"
>
  <span
    className="font-heading text-heading"
    style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}
  >
    J
  </span>
  <motion.span
    className="font-heading"
    style={{ fontSize: '22px', fontWeight: 400, color: 'var(--color-secondary)' }}
    variants={{
      idle: { letterSpacing: '-0.02em', color: 'var(--color-secondary)' },
      hover: { letterSpacing: '0.01em', color: 'var(--color-heading)' },
    }}
    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    atin
  </motion.span>
</motion.a>

// Updated NavLink usage (pass index):
{NAV_LINKS.map((link) => (
  <NavLink
    key={link.label}
    href={link.href}
    isActive={activeSection === link.href.replace('#', '')}
    index={link.index}
  >
    {link.label}
  </NavLink>
))}

// Updated motion.header (remove backdropFilter, update background):
<motion.header
  className="fixed top-0 left-0 right-0 z-50"
  animate={{
    backgroundColor: scrolled || mobileOpen
      ? 'rgba(10, 10, 10, 0.97)'
      : 'rgba(10, 10, 10, 0)',
  }}
  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
>

// Updated bottom separator (replace gray gradient with orange rule):
<motion.div
  className="absolute bottom-0 left-0 right-0 h-px origin-left"
  style={{ backgroundColor: 'rgba(255, 171, 0, 0.2)' }}
  animate={{ scaleX: scrolled ? 1 : 0 }}
  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
/>
```

---

## Summary: Before and After

| Element | Before | After | Why It's Better |
|---|---|---|---|
| Logo | `font-bold text-2xl "Jatin"` | 900/400 weight split, letterSpacing hover | Typographic intelligence. No glow needed. |
| Nav hover | Underline scale | Per-character y-lift with spring | 2025 interaction pattern. Unexpected but tasteful. |
| Active state | Orange underline bar | Spring-animated single dot, `layoutId` | Physical, magnetic, minimal. |
| Available badge | Pill + pulsing dot | Terminal cursor + mono uppercase | Self-referential to craft. Signals presence, not status. |
| Scroll bg | `blur(12px)` frosted glass | Flat `rgba(10,10,10,0.97)`, no blur | Deliberate flatness reads as a choice, not an omission. |
| Scroll rule | Gray gradient line | Orange `scaleX` slide-in, 20% opacity | Brand-aligned scroll tell. Unique. |
| Wildcard | — | `01 —` index prefix, mono, 9px | Editorial archival quality. Rewards close looking. |

---

## Decisions Not Made (Held Back Intentionally)

These ideas were considered and rejected for this iteration:

**Rejected: Custom cursor**
A custom orange cursor or cursor trail was considered. Rejected because it is a commitment that affects the entire page, not just the navbar, and it tips toward "trying to impress" rather than "quietly impressive." Revisit when full-page motion direction is set.

**Rejected: Magnetic buttons**
Nav links attracting to the cursor (`onMouseMove` with spring transforms) was considered. Rejected because: (a) it requires precise implementation to avoid feeling cheap, and (b) the character-lift animation already provides a rich hover state. Two layered effects on the same element creates noise.

**Rejected: Glassmorphism**
The scroll state could have used a frosted glass panel with border. Rejected because glassmorphism is past its peak and the deliberate flatness of the new scroll state is the stronger signal.

**Rejected: Animated gradient on logo**
A subtle gradient sweep across "Jatin" on hover was considered. Rejected because the weight-split approach communicates typographic intelligence — which is a stronger signal for a developer with design sensibility — while a gradient sweep reads as a visual effect.

---

## Accessibility Notes

All changes maintain full keyboard navigation support:

- The weight-split logo remains a single `<a>` tag with `aria-label="Jatin — return to top"`.
- The per-character split in NavLink uses `aria-current="page"` on the parent `<a>`, not on individual character spans.
- The index numbers have `aria-hidden="true"` so screen readers announce "Work" not "01 em dash Work".
- The terminal cursor in AvailableBadge has `aria-hidden="true"` on the cursor span; the parent has `aria-label="Currently available for work"`.
- `prefers-reduced-motion` is handled by the existing global rule in `globals.css` which sets `transition-duration: 0.01ms` — this covers the Framer Motion variants automatically since they respect CSS transitions where possible. For the per-character variants, a check should be added: `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

---

## Related Documents

- [visual-direction.md](./visual-direction.md) — Overall aesthetic and mood
- [brand-strategy.md](../brand/brand-strategy.md) — Voice, positioning, craftsman identity
- [component-specs.md](./component-specs.md) — Full component system specifications

---

**Last Updated**: 2026-03-08
**Version**: 1.0.0
**Status**: Active — Awaiting Implementation
**Maintained By**: Art Direction

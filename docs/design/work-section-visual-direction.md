# Work Section — Visual Direction

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 2.0.0
**Status**: Active

---

## Overview

This document defines the complete visual system for the Work section: surfaces,
spacing, hierarchy, motion, and Tailwind class specifications per component. Copy is
excluded by design. This spec feeds directly into implementation.

The section contains two visual zones: one featured entry (current role, Foyer) and
three past role entries rendered in a 3-column grid. The visual language must make the
hierarchy legible within 500ms of scroll-in without a single word being read.

**Stack**: React 19, Tailwind CSS v4, Framer Motion 12, tokens from `src/styles/globals.css`.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Zone Architecture](#zone-architecture)
3. [Component 1 — Featured Entry (FoyerCard)](#component-1--featured-entry-foyercard)
4. [Component 2 — Past Role Tiles](#component-2--past-role-tiles)
5. [Component 3 — Zone Transition](#component-3--zone-transition)
6. [Metric Display System](#metric-display-system)
7. [Motion Specification](#motion-specification)
8. [Spacing System](#spacing-system)
9. [Token Reference](#token-reference)
10. [New CSS Tokens Needed](#new-css-tokens-needed)
11. [Do's and Don'ts](#dos-and-donts)
12. [Mood Board Description](#mood-board-description)

---

## Design Principles

**1. Hierarchy through surface weight, not decoration.**
The featured card earns dominance by being physically heavier: richer surface, more
padding, a live edge, a glow. Past tiles are deliberately lighter — same border-radius
family, smaller radius value, reduced surface opacity. No decorative elements are added
to inflate importance.

**2. Metrics are architectural, not decorative.**
Numbers such as "3", "95%", "23%" are not badges or callout boxes. The featured card
carries its metric as a large faint background watermark (bottom-right, bleeds off-edge).
Past tiles carry a smaller top-right watermark. The metric recedes when you are reading
prose; it surfaces when you are scanning.

**3. Orange is earned, not assigned.**
The only persistent orange at rest: the breathing left-edge pulse on the featured card
and the live status dot. Past tiles receive orange only on hover (border tint). The zone
label is `text-tertiary/45` — so dim it almost disappears. Orange signals current status
or active interaction. Nothing else.

**4. The past is quieter.**
Past tiles share the border-radius family and typographic system with the featured card,
but their surface opacity is 60%, their radius is 4px smaller, and their typographic
hierarchy is compressed. The eye migrates to the featured card first without any label
saying "featured".

**5. Motion narrates the sequence.**
Featured card enters alone. A 140ms pause. Then the zone label. Then the past tiles
cascade. The stagger mirrors the narrative: this is now, and before that, there was this.

---

## Zone Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  SectionHeading                                mb-12 / mb-16│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURED CARD — full width                                 │
│  rounded-2xl, gradient surface, warm border, overflow-hidden│
│                                                             │
│  ├── left-edge pulse (3px, z-20)                            │
│  ├── ambient glow (top-left radial, z-0)                    │
│  ├── watermark number (bottom-right bleed, z-0)             │
│  └── content (z-10)                                         │
│       ├── header row (role · company · live badge · date)   │
│       ├── tagline                                           │
│       ├── description (max-w-[68ch])                        │
│       └── skill tags                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ZONE TRANSITION            mt-10 lg:mt-12 / mb-5 lg:mb-6  │
│  gradient hairline + "// previously" label                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PAST TILES — grid-cols-1 sm:grid-cols-3, gap-4 lg:gap-5   │
│  rounded-xl, muted surface, transparent border              │
│  each tile: company / role / duration / tags / watermark    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Component 1 — Featured Entry (FoyerCard)

### Surface

Do not use a flat `bg-card` (#161A22). The featured card needs a compound background
that is visually one step warmer and lighter than a neutral card surface. This creates
a sense of depth without resorting to a glowing neon card.

```
background: linear-gradient(135deg, #1a1f2a 0%, #161a22 60%, #131720 100%)
```

The directional warmth reads as "lit from the upper-left" — the same direction as the
ambient glow overlay. Surfaces and light source should agree.

Border at rest: `1px solid rgba(255, 171, 0, 0.12)` — orange at 12% opacity. This is
barely visible as a warm edge rather than a neutral grey line. On hover it lifts to
`rgba(255, 171, 0, 0.22)`.

Border-radius: `rounded-2xl` (16px). Past tiles use `rounded-xl` (12px). The 4px
difference is enough to signal hierarchy without being theatrical.

```tsx
// Surface declaration
className="relative rounded-2xl overflow-hidden px-6 py-8 lg:px-10 lg:py-12 group"
style={{
  background: 'linear-gradient(135deg, #1a1f2a 0%, #161a22 60%, #131720 100%)',
  border: '1px solid rgba(255, 171, 0, 0.12)',
}}
```

`overflow-hidden` is required for two reasons: it clips the watermark bleed to a clean
card edge, and it prevents the left-edge pulse glow from bleeding outside the radius.

### Ambient Glow Overlay

A radial gradient anchored to the upper-left corner — not centered. Asymmetric light
creates atmosphere; centered glows read as a loading spinner.

```tsx
<div
  className="absolute inset-0 pointer-events-none z-0"
  style={{
    background: 'radial-gradient(ellipse 55% 45% at -5% 15%, rgba(255, 171, 0, 0.07) 0%, transparent 65%)',
    transition: 'opacity 300ms ease',
  }}
  aria-hidden="true"
/>
```

At rest: opacity 1 (the rgba value IS 7% — do not add an extra opacity class).
On hover: use the CSS `group-hover` approach to transition the rgba value, or wrap
in a `motion.div` with `animate` tied to a hover state. The opacity shifts from
`rgba(255, 171, 0, 0.07)` to `rgba(255, 171, 0, 0.10)` on hover. Only the opacity
value changes — not the gradient radius or position.

### Left-Edge Pulse

Keep the current implementation exactly as-is. Position: `absolute left-0 top-0 bottom-0 z-20`.

The pulse is layered at `z-20` (above content). This is intentional — the glow on the
pulse should bleed over the card's internal text, not behind it. The glow is 14px at
peak, which is wide enough to affect text color in the first 16px of the content area.
This is acceptable. It reinforces the sense of the card being "alive at the edge".

Specification (unchanged from current):
- Width: 3px
- Color: `var(--color-primary)`
- Border-radius: `rounded-full`
- Animate: `opacity [0.45, 1, 0.45]`, glow `[4px, 14px, 4px]`, duration 2.8s, infinite

### Watermark Number

New element. Displays the hero metric for this role as a large background number. This
is the most significant addition to the featured card.

For Foyer, the metric is **3** (three rewrites of the Thine background audio system).

```tsx
// Watermark — behind content, partially bleeds off bottom-right edge
<div
  className="absolute bottom-0 right-0 select-none pointer-events-none z-0"
  aria-hidden="true"
  style={{
    fontSize: 'clamp(96px, 18vw, 160px)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 900,
    lineHeight: 0.85,
    color: 'rgba(255, 171, 0, 0.045)',
    letterSpacing: '-0.04em',
    transform: 'translate(8%, 12%)',
    userSelect: 'none',
  }}
>
  3
</div>
```

Key decisions:
- Opacity `0.045`: visible as a reward for looking, invisible to fast scanners.
- `transform: translate(8%, 12%)`: bleeds off the card. Partial numbers feel designed;
  fully contained numbers feel like stickers.
- `clamp(96px, 18vw, 160px)`: fluid — scales with viewport without a layout shift.
- `lineHeight: 0.85`: removes extra line-height so the number presses into the bottom
  edge of the card.
- Static — no animation. Motion would compete with the pulse.
- `z-0`: sits below the content wrapper at `z-10` and behind the pulse at `z-20`.

On mobile (< 480px): hide the watermark. At narrow widths it overlaps the skill tags.
Use a breakpoint check or `hidden xs:block`. The `xs` breakpoint (`480px`) is not
default Tailwind v4 — add it or use a container query alternative.

### Header Row

```tsx
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 relative z-10">
```

Left block:
```tsx
// Role title — loudest text in the card
<h3 className="font-heading font-bold text-xl lg:text-2xl tracking-tight text-heading leading-tight">
  {job.role}
</h3>

// Company + location — secondary, one line
<p className="text-secondary text-sm mt-1">
  {job.company}
  {job.location && (
    <>
      <span aria-hidden="true" className="text-tertiary mx-2">·</span>
      <span className="text-tertiary">{job.location}</span>
    </>
  )}
</p>
```

Right block (shrink-0, flex-col items-end gap-1):
```tsx
// Live status badge — keep current implementation
<span className="flex items-center gap-1.5 font-mono text-[10px] text-primary/70 uppercase tracking-widest">
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
  </span>
  {'// present'}
</span>

// Duration — warm, not neutral
<span className="font-mono text-xs text-accent/70 whitespace-nowrap">
  {job.duration}
</span>
```

The duration uses `text-accent/70` (orange at 70%) rather than `text-tertiary`. Dates
are part of the identity signal for the current role — they deserve warm tint, not grey.

### Tagline

The second-loudest typographic element, not a subtitle. It frames the story before the
description body delivers it.

```tsx
<p className="font-heading font-semibold text-xl lg:text-2xl text-heading/85 tracking-tight leading-snug mb-5 relative z-10">
  {job.tagline}
</p>
```

`text-heading/85` = rgba(243, 244, 246, 0.85). Sits between heading white and secondary
grey. The tagline frames; the role title identifies.

### Description

```tsx
<p className="text-secondary text-base leading-relaxed mb-6 max-w-[68ch] relative z-10">
  {job.description}
</p>
```

`max-w-[68ch]`: character-count constrained line length. On wide viewports this prevents
lines from spanning the full card width, which would push reading speed past comfortable.

### Skill Tags

```tsx
<div className="flex flex-wrap gap-2 relative z-10">
  {job.skills.map((skill) => (
    <TechTag key={skill}>{skill}</TechTag>
  ))}
</div>
```

No change from current implementation. Neutral variant only.

### Padding

```
px-6 py-8 lg:px-10 lg:py-12
```

Current implementation uses `px-6 py-8 lg:px-8 lg:py-10`. The updated spec increases
desktop horizontal padding by 8px (to `px-10`) and vertical by 8px (to `py-12`). The
extra space increases the card's perceived quality.

### Hover State

```tsx
whileHover={prefersReduced ? undefined : {
  y: -3,
  boxShadow: '0 0 20px rgba(255, 171, 0, 0.18), 0 16px 40px rgba(0, 0, 0, 0.4)',
}}
transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
```

Two-layer shadow:
- Orange atmospheric: `0 0 20px rgba(255, 171, 0, 0.18)` — warm presence
- Dark drop: `0 16px 40px rgba(0, 0, 0, 0.4)` — physical lift

The y-lift is `-3`. Current implementation uses `-2`. Three pixels reads as deliberate;
two reads as a rounding error.

Border color transition on hover: managed via CSS transition, not Framer. Add
`transition-colors duration-300` to the element and use a `group-hover` selector via
inline style override, or manage via a `useState(isHovered)` and conditional style.

### z-index Layer Order (Back to Front)

```
z-0  — ambient glow div
z-0  — watermark number
z-10 — all content (header, tagline, description, tags)
z-20 — left-edge pulse bar
```

---

## Component 2 — Past Role Tiles

### Layout

```tsx
<motion.div
  variants={pastGridVariants}
  className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5"
>
```

`lg:gap-5` (20px) vs current `gap-4` (16px). A small increase that gives the grid more
air on large viewports.

### Surface

```tsx
<motion.button
  className={cn(
    'relative text-left w-full rounded-xl p-5 lg:p-6 overflow-hidden',
    'transition-colors duration-200',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
    'outline-none',
  )}
  style={{
    backgroundColor: 'var(--color-card-muted)',    // rgb(22 26 34 / 0.6)
    border: '1px solid var(--color-border-muted)', // rgb(55 65 81 / 0.5)
  }}
>
```

`rounded-xl` (12px) vs featured card's `rounded-2xl` (16px). Four pixel difference,
intentional hierarchy signal. `overflow-hidden` clips the tile watermark.

Surface at 60% opacity vs featured card at full opacity. The page background bleeds
through. This makes past tiles feel archival — present and legible, but not competing.

### Tile Watermark

Each past tile carries a single hero metric as a faint background number, anchored
top-right.

```tsx
<div
  className="absolute top-3 right-4 select-none pointer-events-none z-0"
  aria-hidden="true"
  style={{
    fontSize: 'clamp(44px, 8vw, 64px)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 900,
    lineHeight: 1,
    color: 'rgba(255, 171, 0, 0.055)',
    letterSpacing: '-0.04em',
    userSelect: 'none',
  }}
>
  {tile.metric}
</div>
```

`clamp(44px, 8vw, 64px)` — smaller than the featured card. Past tiles are smaller
containers. The watermark must not overflow into text areas.

Metrics per tile:

| Company | Metric Value | Rendered String |
|---------|-------------|-----------------|
| Appscrip | 4 products from one monorepo | `4` |
| PrimoTech | 95% of issues resolved | `95%` |
| Agumentik | 23% satisfaction gain | `23%` |

For the `95%` and `23%` tiles, render the `%` character. At this size and opacity it
adds visual texture without reading as a badge.

### Content Hierarchy

Four-level vertical stack. All content at `relative z-10`.

**Level 1 — Company name**
```tsx
<p className="font-heading font-semibold text-base text-heading/75 leading-tight">
  {job.company}
</p>
```

`text-heading/75` = rgba(243, 244, 246, 0.75). Not full heading white (reserved for
the featured role title). Loud enough to anchor the tile on first scan.

**Level 2 — Role title**
```tsx
<p className="text-secondary text-sm mt-1.5 leading-tight">
  {job.role}
</p>
```

**Level 3 — Duration**
```tsx
<p className="font-mono text-xs text-tertiary mt-1">
  {job.duration}
</p>
```

Monospace + tertiary = clearly data, not narrative.

**Level 4 — Skill tags (max 3)**
```tsx
<div className="flex flex-wrap gap-1.5 mt-3">
  {job.skills.slice(0, 3).map((skill) => (
    <TechTag key={skill} className="text-[11px] px-2 py-0.5">{skill}</TechTag>
  ))}
</div>
```

Tags are smaller than the featured card (11px vs 12px). A subtle compression that
registers subconsciously.

### Expandable Description

Keep the current hover-expand pattern. One modification: use `opacity: 0.8` when
expanded, not 1.0. The description is context, not a headline — it should be clearly
readable but not compete with the company name.

```tsx
<motion.div
  initial={false}
  animate={{
    height: isExpanded ? 'auto' : 0,
    opacity: isExpanded ? 0.8 : 0,
  }}
  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
  className="overflow-hidden sm:block"
>
  <p className="text-secondary/75 text-sm leading-relaxed pt-3">
    {job.description}
  </p>
</motion.div>
```

### Hover State

```tsx
whileHover={prefersReduced ? undefined : {
  y: -2,
  borderColor: 'rgba(255, 171, 0, 0.22)',
  boxShadow: '0 0 12px rgba(255, 171, 0, 0.12)',
  backgroundColor: 'rgb(22 26 34 / 0.8)',
}}
transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
```

Three simultaneous changes:
1. y-lift: `-2px`
2. Border: neutral → orange at 22% opacity (the most visually significant change)
3. Glow: `12px` at `12%` orange — softer than the featured card's hover glow
4. Surface: opacity increases from 60% → 80% (tile "solidifies" on hover)

The border color shift is the primary interactivity signal. It should be perceptible
within 50ms of cursor entry.

### z-index Layer Order (Back to Front)

```
z-0  — tile watermark number
z-10 — all content (company, role, duration, tags, description)
```

---

## Component 3 — Zone Transition

### Current Implementation Problem

The current `// previously` label alone provides insufficient visual separation. The
eye moves from the featured card's bottom edge directly to the first past tile without
a clear zone break.

### Hairline + Label Pattern

```tsx
<motion.div variants={itemVariants} className="mt-10 lg:mt-12 mb-5 lg:mb-6">

  {/* Gradient hairline */}
  <div
    className="w-full mb-4"
    style={{
      height: '1px',
      background: 'linear-gradient(90deg, rgba(255, 171, 0, 0.15) 0%, rgba(55, 65, 81, 0.4) 30%, transparent 100%)',
    }}
    aria-hidden="true"
  />

  {/* Zone label */}
  <p className="font-mono text-xs text-tertiary/45 uppercase tracking-widest" aria-hidden="true">
    {'// previously'}
  </p>
  <span className="sr-only">Previous roles</span>

</motion.div>
```

The hairline gradient runs left to right:
- Starts with a whisper of orange at `0%` (aligned with the featured card's left-edge pulse)
- Transitions to a mid-tone neutral at `30%`
- Fades to transparent at `100%`

This creates directional flow: warm on the left, fading right — the same visual grammar
as the left-edge pulse that anchors the featured card.

The label `text-tertiary/45` is nearly invisible. It confirms the zone break for anyone
reading carefully but does not demand attention on a scan.

### Spacing Values

```
mt-10 lg:mt-12   →  40px / 48px above hairline (from featured card)
mb-4             →  16px between hairline and label
mb-5 lg:mb-6     →  20px / 24px below label (to past grid)
```

Total gap between featured card and first past tile: 64–88px. This gap is the
spatial marker of two eras.

---

## Metric Display System

### Metric Assignment

| Zone | Company | Metric | Rendered Value | Display Location |
|------|---------|--------|----------------|------------------|
| Featured | Foyer | 3 rewrites | `3` | Bottom-right watermark, bleeds off edge |
| Past | Appscrip | 4 products | `4` | Top-right watermark, contained |
| Past | PrimoTech | 95% issues resolved | `95%` | Top-right watermark, contained |
| Past | Agumentik | 23% satisfaction | `23%` | Top-right watermark, contained |

### Shared Visual Token

All watermarks use: `rgba(255, 171, 0, 0.045–0.055)`

Featured: 0.045 (slightly lower — the number is much larger, so perceived brightness
at the same opacity would be higher).
Past tiles: 0.055 (slightly higher to compensate for smaller size).

### Counter Animation (Featured Card Only)

The featured card watermark animates from 0 to 3 once when the section enters
the viewport. Past tile watermarks are static.

Why only the featured card: one animated number with three static numbers creates
hierarchy through motion. Four simultaneous counters would be noise.

Counter timing:
- Delay: 600ms after section enters viewport (let the card entrance settle first)
- Step intervals: `[0ms, 280ms, 520ms, 820ms]` for values `[0, 1, 2, 3]`
- Intervals decelerate (280 → 240 → 300ms) — the count physically slows as it lands

```tsx
const [count, setCount] = useState(0)
const { ref, inView } = useInView({ once: true, margin: '-5% 0px' })

useEffect(() => {
  if (!inView || prefersReduced) {
    setCount(3)  // Skip to final value immediately
    return
  }
  const delay = setTimeout(() => {
    const steps = [0, 1, 2, 3]
    const offsets = [0, 280, 520, 820]
    steps.forEach((val, i) => {
      setTimeout(() => setCount(val), offsets[i])
    })
  }, 600)
  return () => clearTimeout(delay)
}, [inView, prefersReduced])
```

Under `prefers-reduced-motion`: skip to final value (`setCount(3)`) immediately.
No animation at all.

---

## Motion Specification

### Entrance Sequence

All entrance animations are governed by a single `whileInView` trigger on the section
container. Children use `variants` with inherited stagger.

```
t = 0ms      Section container enters viewport
t = 0ms      Featured card: opacity 0→1, y 24→0 (500ms, EASE_OUT_EXPO)
t = 140ms    Zone transition wrapper: opacity 0→1, y 24→0 (400ms, EASE_OUT_EXPO)
t = 280ms    Past grid container animates in
t = 340ms    Past tile 1: opacity 0→1, y 14→0 (380ms, EASE_OUT_EXPO)
t = 420ms    Past tile 2
t = 500ms    Past tile 3
```

Container variants (section-level):
```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
}
```

Item variants (featured card + zone transition):
```tsx
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}
```

Past grid variants:
```tsx
const pastGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}
```

Past tile variants (shorter travel distance than featured):
```tsx
const pastTileVariants = {
  hidden: { opacity: 0, y: 14 },  // 14, not 24 — less dramatic than featured card
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE_OUT_EXPO },
  },
}
```

### Hover Transition Timing

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Featured card | y | 300ms | EASE_OUT_EXPO |
| Featured card | boxShadow | 300ms | Framer default (ease) |
| Featured card | border opacity | 300ms | CSS transition-colors |
| Featured card | ambient glow opacity | 300ms | CSS transition |
| Past tile | y | 200ms | EASE_OUT_EXPO |
| Past tile | boxShadow | 200ms | Framer default |
| Past tile | border color | 200ms | CSS transition-colors |
| Past tile | background opacity | 200ms | CSS transition |

Featured card hover is 100ms slower than past tile hover. The featured card feels more
deliberate and heavy. Past tiles feel more responsive and lightweight.

### What NOT to Animate

- Watermark numbers on past tiles (static — they are architectural, not interactive)
- Skill tags (no hover state, no animation at any size)
- Section heading (handled by `SectionHeading` component's own scroll-reveal)
- Zone transition hairline (static spatial element)
- Left-edge pulse timing or rhythm (do not change it)

### Reduced Motion Rules

| Animation | Under Reduced Motion |
|-----------|---------------------|
| Entrance y-travel | Remove y entirely. Fade opacity only (0→1) |
| Left-edge pulse | Static bar, full opacity, no animation |
| Hover y-lift on both cards | Disabled entirely |
| Watermark counter | Immediately show final value |
| Past tile expand | Keep — it is a layout change, not decorative motion |

---

## Spacing System

All values are multiples of the 4px base grid.

```
Section container:
  py-24 lg:py-32           96px / 128px vertical
  px-6 lg:px-16            24px / 64px horizontal
  max-w-5xl mx-auto

Section heading → featured card:
  mb-12 lg:mb-16           48px / 64px

Featured card — internal padding:
  px-6 py-8 lg:px-10 lg:py-12    24×32 / 40×48

Featured card — internal vertical rhythm:
  header → tagline: mb-5         20px
  tagline → description: mb-6    24px (slightly more — description earns more air)
  description → tags: (natural)

Featured card → zone transition:
  mt-10 lg:mt-12                 40px / 48px  (on transition wrapper)

Zone hairline → zone label:
  mb-4                           16px

Zone label → past grid:
  mb-5 lg:mb-6                   20px / 24px  (on transition wrapper)

Past grid:
  gap-4 lg:gap-5                 16px / 20px

Past tile — internal padding:
  p-5 lg:p-6                     20px / 24px

Past tile — internal vertical rhythm:
  company → role: mt-1.5         6px
  role → duration: mt-1          4px
  duration → tags: mt-3          12px
  tags → description: pt-3       12px (on expand wrapper)
```

---

## Token Reference

All existing tokens come from `src/styles/globals.css`.

| Visual Decision | Token or Value |
|----------------|----------------|
| Featured card bg | `linear-gradient(135deg, #1a1f2a 0%, #161a22 60%, #131720 100%)` |
| Featured card border (rest) | `rgba(255, 171, 0, 0.12)` |
| Featured card border (hover) | `rgba(255, 171, 0, 0.22)` |
| Featured card ambient glow | `rgba(255, 171, 0, 0.07)` → `0.10` on hover |
| Featured watermark | `rgba(255, 171, 0, 0.045)` |
| Past tile bg | `var(--color-card-muted)` → `rgb(22 26 34 / 0.6)` |
| Past tile bg (hover) | `rgb(22 26 34 / 0.8)` |
| Past tile border (rest) | `var(--color-border-muted)` → `rgb(55 65 81 / 0.5)` |
| Past tile border (hover) | `rgba(255, 171, 0, 0.22)` |
| Past tile watermark | `rgba(255, 171, 0, 0.055)` |
| Left-edge pulse color | `var(--color-primary)` |
| Left-edge pulse glow min | `0 0 4px rgba(255, 171, 0, 0.25)` |
| Left-edge pulse glow max | `0 0 14px rgba(255, 171, 0, 0.65)` |
| Zone hairline | `linear-gradient(90deg, rgba(255, 171, 0, 0.15) 0%, rgba(55, 65, 81, 0.4) 30%, transparent 100%)` |
| Zone label | `text-tertiary/45` |
| Company name (past tile) | `text-heading/75` |
| Role title (featured) | `text-heading` → `var(--color-heading)` → `#f3f4f6` |
| Description text | `text-secondary` → `#9ca3af` |
| Duration (featured) | `text-accent/70` = orange at 70% |
| Duration (past tile) | `text-tertiary` |
| Featured hover glow | `0 0 20px rgba(255, 171, 0, 0.18), 0 16px 40px rgba(0, 0, 0, 0.4)` |
| Past tile hover glow | `0 0 12px rgba(255, 171, 0, 0.12)` |

---

## New CSS Tokens Needed

Add these to `src/styles/globals.css` under `:root` in `@layer base`. They are used
only in the Work section's featured card.

```css
/* Work section — featured card gradient stops */
--color-featured-bg-start: #1a1f2a;
--color-featured-bg-mid:   #161a22;
--color-featured-bg-end:   #131720;
```

These are named explicitly so future implementers understand what they refer to and
do not mistake them for page-level background tokens.

---

## Do's and Don'ts

**DO:**
- Keep `overflow-hidden` on both featured card and past tiles — the watermarks require it
- Use `aria-hidden="true"` on all watermark divs, the ambient glow div, and the left-edge
  pulse
- Add `<span className="sr-only">Previous roles</span>` adjacent to the `// previously`
  label (which should also have `aria-hidden="true"`)
- Maintain the `useReducedMotion` guard on every `whileHover` and `animate` call
- Keep `once: true` on the `whileInView` scroll trigger — re-triggering on scroll-up
  cheapens the entrance
- Test the watermark numbers on a real device — opacity that looks correct on a bright
  monitor may be invisible on OLED

**DON'T:**
- Animate past tile watermarks — they are static architectural elements
- Increase the featured card's ambient glow radius on hover — only its opacity changes
- Use `text-accent` (full orange #FFAB00) for anything other than the live status badge
  and the featured card duration text
- Apply `box-shadow` glow to past tiles at hover intensity matching the featured card —
  the featured card's hover glow is intentionally stronger
- Remove `relative z-10` from the content wrapper inside the featured card — without it
  the watermark number renders on top of all text
- Use a flat `bg-card` surface for the featured card — the gradient surface is load-bearing

---

## Mood Board Description

The Work section reads as a curated archive with one live thread.

The page is dark and quiet. At the top of the section, the featured card sits — physically
warmer than the page, its gradient surface holding a residual orange tint in the upper-left
corner, its left edge breathing orange in a slow pulse that marks it as current. The light
source and the pulse agree: both come from the left.

Inside the card, behind the prose, a large `3` sits in the bottom-right corner, faint
enough to feel like watermarked paper. A fast reader misses it entirely. A reader who
slows down notices it at the third or fourth line, and it recontextualizes what they just
read. That is its function. It is not a callout. It is evidence.

Below the card, a hairline gradient fades from warm orange on the left to transparent on
the right. A small monospace label: `// previously`. Then three tiles in a row, quieter
in every dimension — more transparent, tighter radius, compressed type, subdued watermark
numbers in their upper corners. They read as archived records, each containing the number
that defined that chapter.

The motion tells the same story as the layout. Something large enters first. It holds for
a moment. Then the smaller things follow. The section has one pulse, and that pulse belongs
only to the present.

The overall register: if the hero section is a bold opening statement — orange glow, large
type, kinetic energy — the work section is the evidence that follows it. Same system, same
grammar, different volume. This is what "quiet confidence" looks like in a layout.

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md)
- [Portfolio Copy](../content/portfolio-copy.md)
- Color system: `.claude/rules/design/color-system.md`

---

**Last Updated**: 2026-03-18
**Version**: 2.0.0
**Maintained By**: visual-director agent

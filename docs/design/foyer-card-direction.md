# Foyer Work Card — Visual Direction

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Status**: Active
**Scope**: Visual and interaction improvements for the Foyer (current role) entry in `src/sections/Work.tsx`

---

## Overview

This document provides specific, actionable visual improvements for the Foyer card.
It does not change copy. It focuses only on layout, hierarchy, surface treatment,
micro-interactions, animation, and the strategic use of orange.

The quality bar is three portfolios in the premium tier: amitsharma.online (editorial
restraint, strong type hierarchy, minimal chrome), maitripatel.webflow.io (confident
use of whitespace, visual rhythm between sections), and alexnguyen.online (purpose-driven
color use, professional weight, zero gratuitous decoration).

The overriding principle from the brand strategy: **premium by removing, not adding**.

---

## Diagnosis: What the Current Card Gets Right

Before improving, it is worth naming what works so these are not accidentally broken:

- No card surface at rest — consistent with the editorial, typography-driven sections.
- Company name at 4xl/5xl is the correct anchor weight. It owns the space.
- Metrics are already separated from skills — the right structural instinct.
- Orange is controlled: only the status dot, the duration, and the metric values.
- Tagline in heading font at semibold/xl-2xl is a good contrast layer between the company
  name and the body copy.

---

## Diagnosis: The Problems

**1. The metrics feel like data, not evidence.**
Three values (`3–4%`, `3`, `2`) sitting in a flex row at `text-2xl/3xl` are readable but
not arresting. They look like a stats widget. They should feel like proof.
The problem is structural: every metric has the same visual weight, the same spacing,
the same treatment. The genuinely remarkable one — `3–4% battery/hr` — is indistinguishable
from `2 products`, which is almost a disposable fact.

**2. The orange status dot works against the page.**
A `1.5×1.5` dot anchoring a 5xl company name is visually mismatched. The dot reads as
a UI affordance (status indicator) rather than a brand accent. It pulls orange onto a
decorative element that competes with the metric values, which are doing real work.

**3. There is no "live" signal for the current role.**
Past roles are read as past. The Foyer entry has no visual language that communicates
active, present, ongoing. The duration string (`Dec 2024 — Present`) does this
semantically, but not visually.

**4. The tagline size is close to the role/location line.**
At `xl/2xl` semibold, the tagline is meant to be a visual step down from the company name
and a step up from the description. But `text-secondary text-lg` for the role is only
slightly smaller. The three lines (company → role → tagline) do not have enough interval
between them to feel like a deliberate hierarchy; they feel like they are the same tier.

**5. The separator to past roles is anonymous.**
A `h-px bg-subtle/50` line has no character. It reads as a layout accident rather than
a purposeful punctuation mark between the current role and history.

**6. Hover is unused.**
The current role block has no hover state. Past roles get a company name color transition
(`text-heading/75 → text-heading`). The Foyer entry, which deserves more interaction
surface, gets nothing.

**7. The skills tags are sized identically to past role tags.**
Past roles explicitly size their tags down to `text-[11px] px-2 py-0.5`. Foyer's tags
use default TechTag sizing. This is actually correct by design intent, but currently
there is no visual reason why — it reads as inconsistency rather than hierarchy.

---

## Improvement 1: Metrics — Differentiate the Remarkable

**Goal**: Make `3–4% battery/hr` feel like the anchor proof point it is.
Make `3 rewrites` feel like a footnote to the process. Make `2 products` read
as context, not a headline.

### Approach: Unequal Weight System

Not all three metrics should have the same visual treatment. Apply a three-tier system:

**Tier 1 — Primary metric** (`3–4% battery/hr`): The number that required six months of
work. This is the Rolls Royce clock. It should own the left-most position and receive
the full-weight orange treatment.

```
Value:   font-mono font-bold text-3xl lg:text-4xl text-primary leading-none
Label:   font-mono text-xs text-secondary mt-1.5
         (label should be slightly longer breathing room below the value)
```

**Tier 2 — Supporting metric** (`3 rewrites`): A process signal. Reduce relative to Tier 1.

```
Value:   font-mono font-bold text-2xl lg:text-3xl text-primary/80 leading-none
Label:   font-mono text-xs text-tertiary mt-1.5
```

**Tier 3 — Context metric** (`2 products`): Nearly disposable. Reduce further and consider
muting it to reinforce that the battery stat is what matters.

```
Value:   font-mono font-bold text-xl lg:text-2xl text-primary/60 leading-none
Label:   font-mono text-xs text-tertiary/70 mt-1.5
```

**Spacing**: Keep `gap-8 lg:gap-12` between metrics but add a thin vertical separator
(`w-px h-8 bg-border/30 self-end mb-1`) between each metric group. This gives the row
editorial structure without adding a panel or card surface.

**Result**: The eye lands on `3–4%` first because it is largest, brightest, and leftmost.
The visitor reads the label. They now want to know what `battery/hr` means. They read
the description. That is the correct reading order.

---

## Improvement 2: Replace the Status Dot with an Active Pulse

**Goal**: Signal "current role" visually. Remove a decorative orange use that is competing
with the metrics.

### Approach: Animated Presence Indicator

Replace the `w-1.5 h-1.5 rounded-sm bg-primary` dot with a two-layer pulse:
an outer ring that breathes in and out, and an inner solid core.

This communicates "live" without any text. It borrows from Loom's recording indicator and
Linear's live status signal — both instantly understood at a glance.

```tsx
// Replace the current <span> dot with this component structure:
<span className="relative inline-flex items-center justify-center w-3 h-3 shrink-0" aria-hidden="true">
  {/* Outer pulsing ring */}
  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
  {/* Inner solid dot — slightly larger than the current 1.5×1.5 for optical balance */}
  <span className="relative rounded-full w-2 h-2 bg-primary" />
</span>
```

**Tailwind animate-ping** runs indefinitely but at `2s` it is slow enough to read as
"breathing" rather than "alert". Do not use the default `1s` — it creates anxiety, not
presence.

**Position**: Keep it inline with the company name baseline. The optical center of the
`h-3 w-3` container will align with the cap-height of the heading.

**Reduced motion**: The `@media (prefers-reduced-motion: reduce)` rule in globals.css
already zeroes `animation-duration`, so the outer ring will stop animating and sit as a
static faint circle. This is the correct fallback — the indicator reads as present/static
rather than absent.

---

## Improvement 3: Typography Hierarchy — Create Genuine Interval

**Goal**: Make the three-step descent (company → role → tagline) feel intentional and
premium, not accidental.

### Current hierarchy (approximate rendered sizes):

```
Company name:   text-4xl / text-5xl (76px desktop)    — font-heading bold, text-heading
Role:           text-lg (24px desktop)                 — font-body, text-secondary
Tagline:        text-xl / text-2xl (32–43px desktop)   — font-heading semibold, text-heading/85
Description:    text-[15px] / leading-[1.8]            — font-body, text-secondary
```

**The problem**: Role at 24px and Tagline at 32px are 8px apart. The company name at 76px
drops 52px to get to role, but then role only drops 8px to get to tagline. The rhythm
is uneven.

### Recommendation:

Reduce the tagline to `text-lg lg:text-xl` (24–32px). This creates a more even cascade:

```
76px → 24px → 24–32px → 15px
```

But more importantly, add vertical breathing room between the layers:

```
Company name + role row:   mb-5 (up from mb-1 on the header row, mb-2 on the role row)
Tagline:                   mb-6 (up from mb-5)
Description:               mb-8 (up from mb-6)
```

The tagline is currently `font-heading font-semibold`. This is correct — it reads as
a tighter, more editorial voice than the description. Consider reducing it to
`text-heading/75` to sit between the company name at full heading weight and the
description at secondary. The current `text-heading/85` is almost indistinguishable
from the company name color at a glance.

**Final type stack for Foyer:**

```
Foyer                     font-heading bold    text-4xl/5xl   text-heading     tracking-tight
Mobile Lead · Bangalore   font-body            text-lg        text-secondary
"Two products..."         font-heading semibold text-lg/xl    text-heading/70  leading-snug
[description paragraph]   font-body            text-[15px]    text-secondary   leading-[1.8]
[metrics row]
[tech tags]
```

---

## Improvement 4: Hover State for the Foyer Block

**Goal**: Give the Foyer entry the same sense of responsiveness that past roles have,
without adding a card surface at rest.

### Approach: Left-border accent on hover

On the wrapping `motion.div`, add a left border that transitions from transparent to
`border-primary/40` on hover. This is a subtle editorial technique — the left border
reads as a focus state, like a blockquote accent. It costs nothing visually at rest.

```tsx
<motion.div
  variants={itemVariants}
  className="
    mb-14 lg:mb-20
    pl-5 border-l-2 border-transparent
    hover:border-primary/40
    transition-colors duration-300
  "
>
```

**Why `border-primary/40` not `border-primary`**: Full orange is too heavy. 40% opacity
reads as warmth without competing with the metrics or the pulse dot. It sits behind the
content, not in front of it.

**Why left border, not bottom or glow**: The Foyer entry is structurally above the
separator, so a glow effect or bottom border would visually contaminate the separator
line below. The left border is isolated. It also creates a vertical axis that subtly
reinforces reading direction.

**Alternative if left border is too strong**: Instead of a border, use a `::before`
pseudo-element via a className with a scoped CSS variable approach, or a Framer Motion
`whileHover` on a decorative child div. The left border in Tailwind is the simplest
implementation.

---

## Improvement 5: The Separator — Give It Purpose

**Goal**: Make the line between the current role and past roles feel like editorial
punctuation, not a layout accident.

### Current implementation:

```tsx
<div className="h-px bg-subtle/50" aria-hidden="true" />
```

### Improved implementation:

Two changes. First, the separator gains a left-to-right gradient that fades to transparent,
making it feel like it belongs to the Foyer entry's gravity rather than being a full-width
rule:

```tsx
<div
  aria-hidden="true"
  className="h-px"
  style={{
    background: 'linear-gradient(to right, rgba(255,171,0,0.15) 0%, rgba(55,65,81,0.5) 30%, transparent 100%)',
  }}
/>
```

The orange tint at the left end is at 15% opacity — barely perceptible, but it ties the
separator to the Foyer entry above it. Visitors will not consciously notice this, but the
section will feel cohesive.

Second, increase the margin above and below the separator:

```
mb-8 lg:mb-10 on the Foyer block (from mb-14 lg:mb-20 on the wrapping div)
mt-8 lg:mt-10 before the past roles list
```

The separator should breathe. Currently it is too close to both elements it divides.

---

## Improvement 6: Entrance Animation — Stagger the Metrics

**Goal**: Give the metrics row a moment. They are the strongest proof point in the card.
They should not appear simultaneously with the description above them.

### Current behavior:

The entire Foyer block (`motion.div variants={itemVariants}`) enters as a single unit.
All elements fade and rise together.

### Recommended change:

Keep the outer `motion.div` for the block-level entrance. But give the metrics row its
own nested animation that staggers each metric value independently.

```tsx
const metricsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const metricItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}
```

Each metric (`div` with value + label) becomes a `motion.div` with `variants={metricItemVariants}`.
The container becomes a `motion.div` with `variants={metricsContainerVariants}`.

Because the outer `itemVariants` already inherits from the section's `containerVariants`,
the metrics will stagger after the description text has settled. The reading sequence
becomes: company name → role → tagline → description → [pause] → metric 1 → metric 2 →
metric 3. The pause before the metrics is the `delayChildren: 0.15` — it creates
anticipation.

**Reduced motion**: `useReducedMotion` is already wired in `Work.tsx`. Mirror the pattern
from the existing code — check `prefersReduced` and pass `initial="visible"` to skip
the animation.

---

## Improvement 7: Tech Tags — Add a Hover Reveal Behavior

**Goal**: Make the tags feel like they are part of the page, not a data dump at the bottom.

### Current behavior:

Tags sit statically below the metrics. No interaction.

### Recommended change:

On tag hover, transition the border from `border-subtle` to `border-primary/30` and the
text from `text-secondary` to `text-primary/80`. This does not require a TechTag variant —
a hover state on the existing component:

```tsx
// Updated TechTag for the Foyer context (or as a prop to the existing component)
<span
  className={cn(
    'inline-flex items-center',
    'bg-elevated text-secondary border border-subtle',
    'hover:border-primary/30 hover:text-primary/80',
    'font-mono text-xs',
    'px-2.5 py-1 rounded-full',
    'transition-colors duration-200',
    'select-none cursor-default',
    className,
  )}
>
```

**Why `text-primary/80` not `text-primary`**: Full orange on hover would make the tags
feel like links or buttons, which they are not. 80% reads as "illuminated" not "actionable".

**Why add this to TechTag globally**: The past roles already use TechTag. This hover state
would apply there too, which is fine — the past role tags will receive the same treatment.
If you want Foyer-only behavior, pass an `interactive` prop to TechTag that opts into the
hover classes.

---

## Improvement 8: Orange Discipline — The Audit

The brand rule is: if you removed ALL orange and the page feels lifeless (not just less
energetic), you are using it right.

Currently, orange appears in the Foyer entry at:
1. The status dot (`bg-primary`)
2. The duration string (`text-primary/60`)
3. All three metric values (`text-primary`)
4. The hover border (once added)

**Recommendation**: The duration string (`Dec 2024 — Present`) in `text-primary/60` is
a weak use. It applies orange to a piece of administrative metadata. Consider changing
this to `text-tertiary` (same treatment as past role durations) and reserving orange for
the status dot (now the pulse indicator) and the metrics.

This removes one orange use and increases the contrast between the orange elements that
remain. The metrics get brighter relative to their surroundings. The pulse indicator reads
as more intentional because it is no longer competing with the duration string.

**Revised orange inventory:**
1. Pulse dot — presence signal (visual, not semantic)
2. Metric values — proof points (semantic, highest priority)
3. Left border on hover — interaction feedback (transient)
4. Tag border/text on hover — interaction feedback (transient)

Four uses, each with a distinct purpose, none decorative.

---

## Composite View: Before vs. After

### Before (current structure, roughly):

```
[orange dot]  Foyer                              Dec 2024 — Present (orange/60)
              Mobile Lead · Bangalore
              "Two products. One engineer. Zero documentation."   (xl/2xl heading)
              [description paragraph]
              [3–4%] [3] [2]                     (all same weight, same orange)
              [Flutter] [Swift] [iOS Native] [AI Integration] [Team Lead]
─────────────────────────────────────────────────────────────────────
[past roles]
```

### After (recommended):

```
[live pulse]  Foyer                              Dec 2024 — Present (tertiary)
              Mobile Lead · Bangalore
              "Two products. One engineer. Zero documentation."   (lg/xl heading, heading/70)
              [description paragraph, more breathing room]
              [3–4%  ]  |  [3       ]  |  [2      ]
               battery/hr     rewrites     products
               (text-4xl,      (text-3xl,   (text-2xl,
                primary)        primary/80)  primary/60)
              [Flutter] [Swift] [iOS Native] [AI Integration] [Team Lead]
                                                              ↑ hover: orange border + text
│
│  (gradient separator: orange tint at left, fading to transparent)
│
[past roles]
```

**On hover of the entire Foyer block**: left border in `border-primary/40` transitions in.

---

## Implementation Notes

### Changes isolated to `Work.tsx`

All recommendations in this document can be implemented in `src/sections/Work.tsx` without
touching any other file, except for the TechTag hover behavior, which touches
`src/components/ui/TechTag.tsx`.

The animation additions (metrics stagger) require importing the new variant objects at
the top of the file alongside the existing `containerVariants` and `itemVariants`.

### Token references (do not hardcode)

| Purpose | Token |
|---------|-------|
| Pulse outer ring | `bg-primary/30` |
| Pulse inner dot | `bg-primary` |
| Left hover border | `border-primary/40` |
| Separator gradient start | `rgba(255,171,0,0.15)` — use inline style or CSS var `var(--color-primary-rgb)` |
| Separator gradient mid | `rgba(55,65,81,0.5)` — `var(--color-border)` at 50% |
| Duration text (revised) | `text-tertiary` |
| Tier 1 metric value | `text-primary` |
| Tier 2 metric value | `text-primary/80` |
| Tier 3 metric value | `text-primary/60` |
| Tag hover border | `border-primary/30` |
| Tag hover text | `text-primary/80` |

For the separator gradient, use the existing `--color-primary-rgb: 255 171 0` token
defined in `:root` in globals.css:

```tsx
style={{
  background: `linear-gradient(to right, rgb(var(--color-primary-rgb) / 0.15) 0%, rgba(55,65,81,0.5) 30%, transparent 100%)`
}}
```

### Animation: reduced motion guard

The metrics stagger animation should check `prefersReduced` from `useReducedMotion()`,
already present in the file. Pass `initial={prefersReduced ? 'visible' : 'hidden'}` to
the metrics container, consistent with the section-level pattern.

---

## Do's and Don'ts

**DO:**
- Let `3–4% battery/hr` be the largest, brightest metric. It earned that position.
- Use the pulse indicator to communicate "live" without any text change.
- Give the separator editorial character through gradient, not thickness or decoration.
- Add hover states that feel warm and intentional, not UI-library defaults.
- Stagger the metrics entrance so they land as a sequence, not a block.

**DON'T:**
- Add a card background to the Foyer entry. The rest of the page has no surfaces at rest.
  A card here breaks the editorial consistency of all other sections.
- Put orange on administrative metadata (duration string). Reserve it for proof.
- Make all three metrics the same visual weight. The Thine battery stat is not equally
  important to `2 products`. Treat them accordingly.
- Use `animate-ping` at the default 1s duration. It reads as an alert, not a presence
  signal. Use 2s.
- Add a glow effect to the Foyer block at rest. Glows are for hover states and hero
  sections. At rest, the page should breathe.

---

## Priority Order

If implementation must be phased, address in this order:

1. **Metrics differentiation** (Improvement 1) — highest visual ROI, directly serves the
   Thine story as proof of capability.
2. **Pulse indicator** (Improvement 2) — removes a weak orange use, adds a meaningful
   live signal.
3. **Separator gradient** (Improvement 5) — low effort, high cohesion.
4. **Left hover border** (Improvement 4) — low effort, adds warmth and interaction surface.
5. **Typography interval** (Improvement 3) — requires judgment, test in browser.
6. **Tag hover state** (Improvement 7) — small polish, correct for TechTag globally.
7. **Metrics entrance stagger** (Improvement 6) — animation polish, last because it is
   invisible until the section enters the viewport.

---

## Related Documents

- [`docs/brand/brand-strategy.md`](../brand/brand-strategy.md) — Brand positioning,
  the Thine story, and the Rolls Royce technique that grounds the metric hierarchy.
- [`src/sections/Work.tsx`](../../src/sections/Work.tsx) — Implementation target.
- [`src/data/work-experience.ts`](../../src/data/work-experience.ts) — Data source for
  Foyer metrics and skills.
- [`src/components/ui/TechTag.tsx`](../../src/components/ui/TechTag.tsx) — Tag component,
  target for hover state addition.
- [`src/styles/globals.css`](../../src/styles/globals.css) — Token definitions, including
  `--color-primary-rgb` for gradient separator.
- [`src/lib/motion.ts`](../../src/lib/motion.ts) — Shared easing curves for animation
  additions.

---

**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Maintained By**: visual-director agent

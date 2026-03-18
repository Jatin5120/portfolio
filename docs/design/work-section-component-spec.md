# Work Section — Component Specification

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Status**: Active — Ready for Implementation

---

## Overview

This document is the final, code-ready specification for the Work section redesign.
It replaces the current `FoyerCard` + `PastRoleTile` + 3-column grid architecture
with a unified vertical timeline system: `TimelineRail`, `TimelineEntry`, `TimelineDot`,
`RoleHeader`, `EntryProse`, `MetricCallout`.

All class names are Tailwind tokens defined in `globals.css`. All animation prop
objects are ready for direct paste into Framer Motion `motion.*` elements. All values
are derived from the existing color system — no new tokens are introduced.

---

## Data Requirements

The existing `WorkExperience` type and `work-experience.ts` data layer require **no
changes**. The design works with the data as-is.

Each entry's two metric callouts are defined as a static local map inside `Work.tsx`
rather than in the data layer — they are a presentation concern, not a data concern.

```typescript
// Define this inside Work.tsx, above the component
const METRICS: Record<string, [{ value: string; label: string }, { value: string; label: string }]> = {
  foyer:     [{ value: '3', label: 'rewrites' }, { value: '3–4%', label: 'battery/hr' }],
  appscrip:  [{ value: '4', label: 'products' }, { value: '1', label: 'monorepo' }],
  primotech: [{ value: '95%', label: 'issues resolved' }, { value: '6', label: 'months' }],
  agumentik: [{ value: '23%', label: 'satisfaction' }, { value: '3', label: 'clients' }],
}
```

---

## Animation Infrastructure

Import from existing `src/lib/motion.ts`. No new easing values needed.

```typescript
import { EASE_OUT_EXPO } from '@/lib/motion'
```

### Container Stagger Variants

```typescript
// Applied to the <motion.div> that wraps all TimelineEntry elements
const timelineContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}
```

### Per-Entry Variants

```typescript
// Applied to each TimelineEntry's outermost motion.div
const entryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}
```

### Rail Draw-In Variants

```typescript
// Applied to the TimelineRail motion.div
const railVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 },
  },
}
```

### Metric Counter Animation

**Decision: No.** Do not use a counting animation on metric numbers.

Rationale: Counter animations (0 → 95%) require JavaScript timers or libraries
like `react-countup`. They fire on scroll, creating a race between the stagger
reveal and the counter. The metric numbers are short strings like "3", "95%",
"3–4%" — a counter animation on "3–4%" is impossible and would need special-casing.
More importantly, the value comes from the instant scanability of the number, not
from a theatrical countdown. Plain text with the right typographic weight lands
harder than animation here.

---

## Component: `<TimelineRail />`

A purely decorative 2px vertical line that runs from the first dot to the last dot.
Hidden on mobile. Does not receive pointer events.

### Wrapper

The outer `<div>` of the timeline region (the one holding all `TimelineEntry`
elements) must be `relative` so the rail can position absolutely against it.

```tsx
// Outer container of the timeline region
<div className="relative pl-8 sm:pl-10">  {/* left padding creates space for dot + rail */}
  <TimelineRail prefersReduced={prefersReduced} />
  {/* TimelineEntry elements here */}
</div>
```

### Classes and Styles

```tsx
// Hidden entirely on mobile (< 640px). Visible from sm upward.
<motion.div
  aria-hidden="true"
  className="hidden sm:block absolute left-0 top-2 bottom-2 w-[2px] origin-top"
  style={{ backgroundColor: 'rgba(255, 171, 0, 0.15)' }}
  variants={railVariants}
  // No initial/animate here — these are driven by the parent container variants
/>
```

The rail is positioned `left-0` within the `pl-8 sm:pl-10` container. The `pl-8`
on the container creates the 32px of space where dots and the rail live. The rail
sits at x=0 within that padding zone.

`top-2 bottom-2` trims the rail so it does not extend past the first and last dots.

---

## Component: `<TimelineDot />`

A circular marker on the left rail. Two variants: `current` (filled, pulsing orange)
and `past` (hollow, no animation).

### Props

```typescript
interface TimelineDotProps {
  isCurrent: boolean
  prefersReduced: boolean | null
}
```

### Wrapper Position

The dot is absolutely positioned at `left-[-4px] sm:left-[-5px] top-[5px]`
relative to each `TimelineEntry`'s wrapper. This places it on the rail centerline.

The current-role dot is 10px wide; the past-role dot is 8px wide.

### Current Role Dot

```tsx
// isCurrent === true
<div className="hidden sm:block absolute left-[-4px] top-[5px]">
  {!prefersReduced ? (
    <motion.div
      className="w-[10px] h-[10px] rounded-full"
      style={{ backgroundColor: 'var(--color-primary)' }}
      animate={{
        boxShadow: [
          '0 0 4px rgba(255, 171, 0, 0.3)',
          '0 0 14px rgba(255, 171, 0, 0.65)',
          '0 0 4px rgba(255, 171, 0, 0.3)',
        ],
      }}
      transition={{
        duration: 2.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop' as const,
      }}
      aria-hidden="true"
    />
  ) : (
    <div
      className="w-[10px] h-[10px] rounded-full bg-primary"
      aria-hidden="true"
    />
  )}
</div>
```

### Past Role Dot

```tsx
// isCurrent === false
<div
  className="hidden sm:block absolute left-[-4px] top-[5px] w-[8px] h-[8px] rounded-full"
  style={{
    border: '1.5px solid rgba(255, 171, 0, 0.4)',
    backgroundColor: 'transparent',
  }}
  aria-hidden="true"
/>
```

---

## Component: `<RoleHeader />`

Three lines of typographic hierarchy: company name, role + location, duration + present badge.

### Props

```typescript
interface RoleHeaderProps {
  company: string
  role: string
  location?: string
  duration: string
  isCurrent: boolean
}
```

### Full JSX

```tsx
<div className="mb-3">
  {/* Line 1: Company name */}
  <h3
    className={cn(
      'font-heading font-bold uppercase tracking-[0.08em] leading-none',
      'text-heading transition-colors duration-200',
      'group-hover:text-primary',
      isCurrent ? 'text-[22px]' : 'text-[20px]',
    )}
  >
    {company}
  </h3>

  {/* Line 2: Role · Location */}
  <p className="font-body text-[14px] text-secondary mt-1 leading-snug">
    {role}
    {location && (
      <>
        <span aria-hidden="true" className="text-tertiary mx-1.5">·</span>
        <span className="text-tertiary">{location}</span>
      </>
    )}
  </p>

  {/* Line 3: Duration + Present badge (current only) */}
  <div className="flex items-center gap-2 mt-1">
    <span
      className={cn(
        'font-mono text-[11px]',
        isCurrent ? 'text-primary/70' : 'text-tertiary',
      )}
    >
      {duration}
    </span>
    {isCurrent && (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        Present
      </span>
    )}
  </div>
</div>
```

### Notes

- `group-hover:text-primary` works because the hover `group` is on the `TimelineEntry`
  wrapper. The color transition targets only the company name `h3` — nothing else
  in the entry changes color on hover.
- `emerald-400` maps to `#4ADE80`, which is the existing `--state-success` token.
  No new color token is needed.
- Uppercase + `tracking-[0.08em]` on the company name is intentional — it is the
  loudest typographic element per entry and the one piece of Maitri Patel's
  editorial confidence carried into this system.

---

## Component: `<MetricCallout />`

A single metric: one number, one label. No border, no background. A 1px left border
in primary/25 is the only visual container. Two of these stack vertically per entry.

### Props

```typescript
interface MetricCalloutProps {
  value: string   // e.g. "3", "95%", "3–4%", "23%"
  label: string   // e.g. "rewrites", "issues resolved", "battery/hr"
}
```

### Classes and Styles

```tsx
<div
  className="pl-3"
  style={{ borderLeft: '1px solid rgba(255, 171, 0, 0.25)' }}
>
  {/* Metric number */}
  <p
    className="font-mono font-bold leading-none text-primary"
    style={{ fontSize: '28px' }}
  >
    {value}
  </p>
  {/* Metric label */}
  <p className="font-body text-[11px] text-tertiary leading-tight mt-0.5">
    {label}
  </p>
</div>
```

### Mobile Variant

On mobile the two callouts render in a horizontal row rather than stacked. The
`value` font size reduces to `22px` on mobile. The parent controls this layout:

```tsx
// Mobile: flex-row, gap-6; Desktop: flex-col, gap-4
// Parent wrapper classes:
"flex flex-row gap-6 sm:flex-col sm:gap-4 w-auto sm:w-32 shrink-0"
```

The `MetricCallout` component itself does not need to know about the mobile variant —
the layout is handled by the parent's flex direction change.

---

## Component: `<EntryProse />`

The left column of the content row: optional tagline, description paragraph, and TechTag strip.

### Props

```typescript
interface EntryProseProps {
  tagline?: string
  description: string
  skills: string[]
}
```

### Full JSX

```tsx
<div className="flex-1 min-w-0">
  {/* Tagline — Foyer only. The Amit Sharma narrative hook. */}
  {tagline && (
    <p className="font-heading font-semibold text-[18px] text-heading/85 tracking-tight leading-snug mb-3">
      {tagline}
    </p>
  )}

  {/* Description paragraph */}
  <p
    className="font-body text-[15px] text-secondary leading-[1.75] max-w-[540px]"
  >
    {description}
  </p>

  {/* Skill tags */}
  <div className="flex flex-wrap gap-2 mt-4">
    {skills.map((skill) => (
      <TechTag key={skill}>{skill}</TechTag>
    ))}
  </div>
</div>
```

### Notes

- `max-w-[540px]` on the prose paragraph controls line length (target: ~80 chars
  at 15px Inter). This is applied to the `<p>` element only, not the wrapper — the
  TechTag row below it can span full width.
- Do not bullet-point the description. The data is authored as prose. Rendering as
  a `<p>` honors that.
- `text-heading/85` on the tagline gives it presence without matching the full
  white of the company name — it is a secondary headline, not a primary one.

---

## Component: `<TimelineEntry />`

The unified component that replaces both `FoyerCard` and `PastRoleTile`. One
component, two visual states, controlled by `isCurrent`.

### Props

```typescript
interface TimelineEntryProps {
  job: WorkExperience
  metrics: [{ value: string; label: string }, { value: string; label: string }]
  isCurrent: boolean
  prefersReduced: boolean | null
}
```

### Full JSX

```tsx
<motion.div
  variants={entryVariants}
  className={cn(
    'group relative',
    // Mobile: bottom border separates entries (replaces rail)
    'pb-8 sm:pb-10',
    'border-b border-subtle sm:border-b-0',
    // Remove border on last child
    'last:border-b-0',
  )}
>
  {/* Timeline dot — absolutely positioned on the left rail */}
  <TimelineDot isCurrent={isCurrent} prefersReduced={prefersReduced} />

  {/* Role header: company / role · location / duration */}
  <RoleHeader
    company={job.company}
    role={job.role}
    location={job.location}
    duration={job.duration}
    isCurrent={isCurrent}
  />

  {/* Content row: prose left, metrics right */}
  <div className="flex flex-col sm:flex-row sm:gap-8">
    <EntryProse
      tagline={job.tagline}
      description={job.description}
      skills={job.skills}
    />

    {/* Metric callouts */}
    <div className="flex flex-row gap-6 sm:flex-col sm:gap-4 w-auto sm:w-28 shrink-0 mt-4 sm:mt-0">
      <MetricCallout value={metrics[0].value} label={metrics[0].label} />
      <MetricCallout value={metrics[1].value} label={metrics[1].label} />
    </div>
  </div>
</motion.div>
```

### Hover Behavior

The `group` class on the outermost `motion.div` combined with `group-hover:text-primary`
on the company name `h3` in `<RoleHeader />` produces the complete hover state:

- Company name transitions from `text-heading` (#F3F4F6) to `text-primary` (#FFAB00)
- Transition: `duration-200 ease-out` (the `transition-colors` on the `h3`)
- Nothing else moves, lifts, or changes color
- No `whileHover` on the `motion.div` — this is text-only hover, no positional change

This is deliberate. The timeline layout is not a card grid; it should not lift.
The hover state must cost nothing visually except one color change.

### Focus State

For keyboard accessibility: the `TimelineEntry` wrapper is a `<div>`, not a button.
It is not interactive. Individual links inside entries (future case) would carry
focus rings per the existing `focus-visible:ring-2 focus-visible:ring-primary
focus-visible:ring-offset-2 focus-visible:ring-offset-page` pattern.

---

## Full `Work.tsx` Shell

This shows the complete section assembly. Sub-components are defined in the same
file or imported from `@/components/ui/` as appropriate.

```tsx
import { useReducedMotion, motion } from 'framer-motion'
import { workExperience } from '@/data/work-experience'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechTag } from '@/components/ui/TechTag'
import { EASE_OUT_EXPO } from '@/lib/motion'

// Metric data — keyed by WorkExperience.id
const METRICS: Record<string, [{ value: string; label: string }, { value: string; label: string }]> = {
  foyer:     [{ value: '3', label: 'rewrites' }, { value: '3–4%', label: 'battery/hr' }],
  appscrip:  [{ value: '4', label: 'products' }, { value: '1', label: 'monorepo' }],
  primotech: [{ value: '95%', label: 'issues resolved' }, { value: '6', label: 'months' }],
  agumentik: [{ value: '23%', label: 'satisfaction' }, { value: '3', label: 'clients' }],
}

// Animation variants
const timelineContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const entryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
}

const railVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 } },
}

export function Work() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="work"
      aria-label="Work Experience"
      className="py-24 lg:py-32 px-6 lg:px-16 max-w-5xl mx-auto"
    >
      {/* Section heading */}
      <div className="mb-14 lg:mb-20">
        <SectionHeading className="text-4xl lg:text-5xl">
          The work that shaped how I build.
        </SectionHeading>
      </div>

      {/* Timeline region */}
      <motion.div
        variants={timelineContainerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-5% 0px' }}
        className="relative pl-8 sm:pl-10"
      >
        {/* Left rail — desktop only */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="hidden sm:block absolute left-0 top-2 bottom-2 w-[2px] origin-top"
            style={{ backgroundColor: 'rgba(255, 171, 0, 0.15)' }}
            variants={railVariants}
          />
        )}
        {/* Static fallback for reduced motion */}
        {prefersReduced && (
          <div
            aria-hidden="true"
            className="hidden sm:block absolute left-0 top-2 bottom-2 w-[2px]"
            style={{ backgroundColor: 'rgba(255, 171, 0, 0.15)' }}
          />
        )}

        {/* Entries */}
        {workExperience.map((job, index) => (
          <TimelineEntry
            key={job.id}
            job={job}
            metrics={METRICS[job.id]}
            isCurrent={index === 0}
            prefersReduced={prefersReduced}
          />
        ))}
      </motion.div>
    </section>
  )
}
```

---

## Responsive Behavior Summary

| Element | Mobile (< 640px) | Desktop (>= 640px) |
|---------|------------------|--------------------|
| Left rail | Hidden | Visible, 2px, `rgba(255,171,0,0.15)` |
| Timeline dots | Hidden | Visible, positioned on rail |
| Entry padding-left | `pl-8` (container) | `pl-10` (container) |
| Content row | `flex-col` (prose above metrics) | `flex-row` (prose left, metrics right) |
| Metric callouts layout | `flex-row gap-6` | `flex-col gap-4` |
| Metric number size | `22px` | `28px` |
| Entry separator | `border-b border-subtle` | None (whitespace only) |
| Company name size | 20px (past) / 22px (current) | 20px (past) / 22px (current) |

---

## Color Usage Summary

| Element | Token | Hex | Notes |
|---------|-------|-----|-------|
| Company name at rest | `text-heading` | #F3F4F6 | |
| Company name on hover | `text-primary` | #FFAB00 | Only element that changes |
| Metric numbers | `text-primary` | #FFAB00 | The orange proof points |
| Rail line | `rgba(255,171,0,0.15)` | — | 15% opacity — structural, not decorative |
| Current dot | `bg-primary` | #FFAB00 | With glow pulse |
| Past dot border | `rgba(255,171,0,0.4)` | — | 40% opacity ring, no fill |
| Metric left border | `rgba(255,171,0,0.25)` | — | 25% opacity |
| Current duration | `text-primary/70` | #FFAB00 at 70% | Warm without competing |
| Present badge | `text-emerald-400 / bg-emerald-400` | #4ADE80 | `--state-success` token |
| Tagline | `text-heading/85` | #F3F4F6 at 85% | Near-white, not full heading |
| Role / location | `text-secondary` | #9CA3AF | |
| Prose | `text-secondary` | #9CA3AF | |
| Duration (past) | `text-tertiary` | #6B7280 | |
| Metric labels | `text-tertiary` | #6B7280 | |
| Skill tags | TechTag (neutral) | #9CA3AF / #1F2937 | Existing component, no change |
| Entry separator (mobile) | `border-subtle` | #1F2937 | |

Orange appears in: dot (1), metric numbers (2 per entry), company name hover (1 at a time),
rail (structural). That is the complete orange budget for this section. No backgrounds,
no glow divs, no radial gradients.

---

## What Is Removed from the Current Implementation

| Current Element | Status | Reason |
|----------------|--------|--------|
| `FoyerCard` component | Deleted | Replaced by `TimelineEntry` with `isCurrent=true` |
| `PastRoleTile` component | Deleted | Replaced by `TimelineEntry` with `isCurrent=false` |
| `bg-card` surface on featured role | Removed | Timeline entries live on `bg-page` |
| Ambient radial glow div inside FoyerCard | Removed | Dot pulse + metric orange carry all energy |
| Breathing left-edge pulse bar | Removed | Replaced by the dot pulse — same information, better architecture |
| `// previously` zone label | Removed | Timeline visual hierarchy makes it redundant |
| 3-column past roles grid | Removed | Full-width entries with prose and metrics for every role |
| Hover-expand description on tiles | Removed | Descriptions always visible |
| `containerVariants` with stagger=0.15 | Replaced | New container uses stagger=0.12 and `delayChildren: 0.1` |

---

## Accessibility

- `<section>` carries `aria-label="Work Experience"` (unchanged from current)
- Company names are `<h3>` — correct heading level under the section `<h2>`
- Timeline dot and rail `<div>`s carry `aria-hidden="true"` — decorative
- Present badge is readable text ("Present"), not solely communicated by color
- `useReducedMotion` guard on: dot pulse, entry stagger, rail draw-in
- Reduced-motion fallback: entries appear at `visible` state immediately, rail is static,
  dot is static
- Minimum touch target (44×44px) not applicable — entries are not interactive buttons

---

## Related Documents

- `docs/design/work-section-visual-direction.md` — layout rationale and ASCII diagram
- `docs/design/work-section-direction.md` — editorial index row direction (earlier draft)
- `src/sections/Work.tsx` — implementation target
- `src/data/work-experience.ts` — data layer (no changes needed)
- `src/lib/motion.ts` — `EASE_OUT_EXPO` easing and `EasingTuple` type
- `src/components/ui/TechTag.tsx` — neutral pill, used without modification
- `src/components/ui/SectionHeading.tsx` — scroll-reveal heading, used without modification
- `.claude/rules/design/color-system.md` — color token definitions

---

**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Maintained By**: design-integrator agent

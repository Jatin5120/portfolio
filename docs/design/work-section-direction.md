# Work Section Visual Direction

**Project**: React Portfolio
**Created**: 2026-03-17
**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Active

---

## Overview

This document records the layout decision for the Work/Experience section, based on
trend research across Dribbble, Behance, Figma Community, Awwwards, and CSSDA
(2024-2026). Two finalists were evaluated against current patterns. Neither was
adopted in full. The outcome is a hybrid called Option C: Editorial Index Row.

---

## Finalists Evaluated

### Option A — Anchored Dossier
- Current role: full-width open text, large type, no container
- Past roles: 3-column text grid below a hairline rule
- Fully static

### Option B — Large-Type Cascade
- Company names at decreasing display scale: ~88px → ~56px → ~40px → ~32px
- Single column, role and description indented below each company name
- Type scale as hierarchy device
- Fully static

---

## Trend Research Summary

### Dominant Premium Pattern (2024-2026)

The pattern confirmed across Awwwards SOTD portfolios, top Behance developer
portfolios (20K-30K views), and the most-downloaded Figma Community templates is
the **Editorial Index Row**:

- Full-width horizontal rows
- Company name left, date range right-aligned (muted, monospace)
- Role title below company name, secondary weight and color
- 1px rule separating each entry
- Description text always visible below (not hidden in accordion)
- Hover state: company name warms to accent color, rule brightens
- Current role distinguished by a single accent-color marker (dot or "Current" label)
- No cards, no border-radius, no column grids

This pattern appeared in: Cyd Stumpel Portfolio 2025 (Awwwards SOTD, 7.22),
Antoine Wodniack AW Portfolio (Awwwards SOTD, 7.56), Victor Work Folio
(Awwwards SOTD, 7.62), Brittany Chiang v4 (accordion variant), and the majority
of Figma Community templates with 10K+ downloads.

### Option A: What Research Found

The 3-column grid for past roles is the pattern used by low-effort and template
portfolios. Design-literate visitors — including the primary audience of engineering
managers and CTOs — recognize it as a resume-transposed-to-web shortcut. It reads
as "I chose the easy structure." Additionally, the current-role / 3-column-grid
split creates two competing visual languages on one page, which undermines the
craft signal the brand strategy requires.

### Option B: What Research Found

Decreasing display scale at headline sizes is a graphic design experiment pattern,
not a senior-engineer-portfolio pattern. It signals creative designer energy.
For the primary audience (technical hiring decision-makers), it reads as decorative
rather than precise. Awwwards-level work sections that use large type do so within
a constrained, structured reading column — they do not cascade raw display sizes
in proportion to role recency. Scanability also degrades: the company a visitor
most wants to read about at the bottom (Agumentik) is visually the most subordinate.

### Third Pattern (Not Proposed)

Neither Option A nor B is the current dominant premium pattern. The Editorial Index
Row is a third pattern that was not under consideration and should be.

---

## Decision: Option C — Editorial Index Row

### Visual Specification

#### Section Label
```
EXPERIENCE
```
- Font: `font-body`, 11px, letter-spacing wide, `text-muted`, uppercase
- Same treatment as other section labels in the site

#### Full-Width Separator
- 1px rule, `border-t border-border` (matches existing token)
- Above each entry row, including above the first

#### Per-Entry Row Structure

```
[dot] Company Name               2023–Now
      Role Title
      Description line 1
      Description line 2–3
```

**Company Name**
- Size: ~28px (clamp between 24-32px responsive)
- Weight: `font-medium` or `font-semibold`
- Color: `text-heading` (white) at rest
- On hover: transitions to `text-primary` (orange)
- Transition: `color 200ms ease`

**Dot (current role only)**
- 6px circle, `bg-primary`, `rounded-full`
- Positioned left of company name, vertically centered
- Only on the Foyer entry. All past roles: no dot.

**Date Range**
- Right-aligned, same row as company name (flex justify-between)
- Font: `font-mono`, 13px
- Color: `text-muted`
- Current role date: `text-primary` at 70% opacity for subtle warmth

**Role Title**
- Font: `font-body`, 14-15px
- Color: `text-secondary`
- Below company name, same left alignment

**Description**
- Always visible (not hidden in accordion)
- Font: `font-body`, 14-15px, `leading-relaxed`
- Color: `text-secondary`
- 2-3 lines maximum
- Top margin: 8px from role title

**Separator Rule (hover state)**
- At rest: `opacity-30`
- On row hover: `opacity-100`
- Transition: `opacity 200ms ease`

#### Spacing
- Between rule and company name: 20px
- Between entries (rule to rule): 20px padding-bottom on each row
- Section padding-top: matches other sections

### Interaction (Recommended Addition)

Scroll-reveal stagger using existing `src/lib/motion.ts` patterns:

- Each row: `y: 12 → 0`, `opacity: 0 → 1`
- Stagger delay between rows: 80ms
- Trigger: `useInView` (already in project)
- Once: true (does not re-trigger on scroll back)
- Easing: `[0.16, 1, 0.3, 1]` (matches navbar entrance)

This matches the scroll-reveal pattern approved for section headings (#5 in
finalized design decisions) and uses the already-built motion infrastructure.

### Color in This Section

One accent use only: the orange dot on the current role, and the date range
for the current role at `text-primary/70`. All other text is white or muted.
On hover, the company name warms to orange — this is the only interactive color.

This restraint is intentional. The Work section comes directly after the Hero
where orange is used for CTAs. Keeping the section monochromatic with one
accent dot ensures the orange does not lose its signal value through overuse.

---

## Why Not Option A

| Issue | Detail |
|-------|--------|
| 3-column grid pattern | Recognized as template-default by design-literate visitors |
| Two visual languages | Current role (full-width) vs past roles (grid) breaks consistency |
| No hover state | Misses craft signal that costs 2 CSS lines |
| Static grid for 3 companies | Cannot scale to more entries gracefully |

## Why Not Option B

| Issue | Detail |
|-------|--------|
| Raw display-size cascade | Reads as graphic design experiment, not engineering craft |
| Wrong audience signal | Engineering managers read it as "creative," not "precise" |
| Scanability | 88px company name at top, 32px at bottom — backwards readability curve |
| Static at this visual scale | High visual promise, zero payoff creates mismatch |
| Fatigue | Four entries at display sizes is exhausting before reaching descriptions |

---

## What Each Option Contributed

**From Option A (carry forward):**
- Hairline rule separators
- No cards, no border-radius, no containers
- Section label treatment (uppercase, tracked, muted)
- Descriptions always visible

**From Option B (carry forward):**
- Company name takes visual priority over role title
- Single-column layout
- No containers of any kind
- Editorial confidence — let text be the layout

---

## Implementation Notes

- The row flex layout: `display: flex; justify-content: space-between; align-items: baseline`
- Description and role title sit outside the flex row, below company name, full width
- The dot: `::before` pseudo-element or a `<span>` with `w-1.5 h-1.5 rounded-full bg-primary`
- Hover state should be on the entire row container, not just the company name
- Do NOT add a background fill on hover — it would create an implicit card
- `transition-all` on the row for smooth hover behavior (matches Button base style)

### Tailwind Implementation Sketch

```tsx
<div className="border-t border-border pt-5 pb-5 group cursor-default">
  <div className="flex justify-between items-baseline">
    <div className="flex items-center gap-2">
      {isCurrent && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
      )}
      <span className="text-2xl font-medium text-heading group-hover:text-primary transition-colors duration-200">
        {company}
      </span>
    </div>
    <span className={cn(
      "font-mono text-sm",
      isCurrent ? "text-primary/70" : "text-muted"
    )}>
      {dateRange}
    </span>
  </div>
  <p className="text-secondary text-sm mt-1">{role}</p>
  <p className="text-secondary text-sm leading-relaxed mt-2">{description}</p>
</div>
```

---

## Relationship to Brand Strategy

The Editorial Index Row aligns with the brand strategy's core positioning:

- **"Craftsman" signal**: Expressed through precision of execution — consistent
  spacing, controlled color, one accent — not through decoration or graphic stunts
- **"Independent, quiet confidence"**: The layout does not beg for attention. It
  presents information and gets out of the way.
- **Primary audience (engineering managers)**: Can scan four rows in under five
  seconds. Company, role, years, and description are in expected positions.
- **Passive presence**: No cards, no hover-fill, no animation that demands
  attention. The work described in each entry sells; the layout facilitates.

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md) — positioning, audience, voice
- [Visual Direction](./visual-direction.md) — overall aesthetic system
- `src/sections/Work.tsx` — implementation target
- `src/data/work-experience.ts` — data layer (needs `description` field per entry)
- `src/lib/motion.ts` — scroll-reveal variants to reuse

---

**Last Updated**: 2026-03-17
**Maintained By**: visual-director agent

# Projects Section — Visual Redesign Direction

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Status**: Active

---

## The Core Problem

The current design commits the most common portfolio mistake: it uses a UI pattern (bordered cards with surfaces, image thumbnails, multiple buttons) that was designed for dashboards and content management systems. Every element is trying to be useful at once — image, badge, tagline, title, description, tech tags, CTA button — and the result is visual noise where nothing leads.

The reference sites the user cited (amitsharma.online, maitripatel.webflow.io) succeed because they remove UI. The work is presented, not merchandised. This is the "premium by removing" principle applied to a portfolio: fewer affordances, more focus, more trust transferred to the work itself.

The redesign below operates on a single conviction: **nine projects on a dark background should feel like nine reasons to reach out, not nine product listings in a catalog.**

---

## Design Direction: Typographic List with Reveal

### The Model

Replace the 3-column card grid with a **stacked list of full-width rows**. Each project is a horizontal strip: a large index number on the left, project title and tagline in the center, a tech tag cluster on the right. No card surface. No border at rest. A single hairline `border-b border-subtle` divides rows.

On hover, two things happen simultaneously:
1. The row background transitions from transparent to `bg-card` (a subtle surface appears)
2. A project thumbnail or a large decorative initial fades in on the right side (or floats near the cursor on desktop)

This is the pattern editorial sites and high-signal developer portfolios converge on in 2025-2026. It reads as a curated index, not a product grid. The visitor scans the full list in under three seconds, which is the actual behavior — they are not reading every card, they are pattern-matching for relevance.

---

## Layout: Two Tiers

The nine projects split into two visual zones. This creates hierarchy without a "featured" badge.

### Zone 1: The Anchor Projects (top, 2-3 projects)

Two or three projects that are strongest — Thine, Merlin AI, SalonPay — presented as **large-format rows** with more vertical padding, a slightly larger title, and the thumbnail reveal enabled. These do not have a label that says "featured." Their size does the work.

```
┌────────────────────────────────────────────────────────────────┐
│  01   Thine                    iOS · Swift · Audio            │
│       The recording kept running all night                    │  ← full-width row, py-8 lg:py-10
├────────────────────────────────────────────────────────────────┤
│  02   Merlin AI                Flutter · AI · Cross-platform  │
│       AI that feels instant, not waiting                      │
├────────────────────────────────────────────────────────────────┤
```

### Zone 2: The Supporting Projects (below, 6-7 projects)

Smaller rows, less vertical padding, no thumbnail reveal. Just index + title + tags. Still hoverable with the surface-appear effect, but quicker to scan.

```
├────────────────────────────────────────────────────────────────┤
│  03   NoteTaker AI             Flutter · OCR · Transcription  │
├────────────────────────────────────────────────────────────────┤
│  04   Bonkers                  Flutter · AI · Social          │
├────────────────────────────────────────────────────────────────┤
```

This two-tier structure replaces the visual weight of a featured card without adding complexity or a new UI component.

---

## Card Design: Borderless Rows, Not Surfaces

### At Rest

```tsx
// Row at rest — no visible surface, just a divider
<article className="
  group relative
  flex items-center gap-6 lg:gap-10
  py-6 lg:py-8                          // anchor rows: py-8 lg:py-10
  border-b border-subtle
  cursor-pointer
  transition-all duration-300
">
```

- Background: transparent (the page shows through)
- Border: only `border-b border-subtle` (`#1F2937`) — a single 1px line
- No `bg-card`, no `rounded-xl`, no `border` on all four sides

The section has **no visual chrome at rest**. It reads as a clean editorial index.

### On Hover

```tsx
// Applied via whileHover in Framer Motion or CSS group-hover:
// backgroundColor: 'var(--color-card)'     — #161A22 surface appears
// paddingLeft: '1.5rem'                     — content shifts right subtly (8-12px)
// borderColor: 'var(--color-primary)'       — bottom border becomes orange
```

Three micro-changes fire together:
1. `bg-card` surface appears (`#161A22`) — the row "lifts" off the page
2. Bottom border turns `border-primary` — orange line anchors the active row
3. Content nudges 8-12px right — the list item steps forward

This is a **single unified gesture**, not separate effects stacked on top of each other. The row does not bounce, scale, or glow. It simply becomes present.

For anchor rows only: a project thumbnail (or `ImagePlaceholder`) cross-fades in at the right edge, positioned absolute, `opacity-0 group-hover:opacity-100 transition-opacity duration-500`. It sits at roughly 240px wide, aspect-video, object-cover, slightly desaturated at rest then full color on hover.

---

## Anatomy of a Row

### Anchor Row (large format)

```
[index]  [title + tagline]                         [tags]  [thumbnail]
  01     Thine                                   iOS · Swift
         The recording kept running all night
```

- **Index**: `font-mono text-xs text-tertiary` — `01`, `02`, `03`. Sits in a fixed-width column (`w-8 lg:w-12`), right-aligned. On hover, transitions to `text-primary`.
- **Title**: `font-heading font-bold text-xl lg:text-2xl text-heading leading-tight`. On hover, title stays `text-heading` but the row's orange border signals the active state.
- **Tagline**: `font-body text-sm text-tertiary leading-snug`. One line max. This is the hook — it replaces the inline CTA button.
- **Tags**: 2-3 tech tags maximum, right-aligned, `font-mono text-xs text-tertiary`. On hover, first tag transitions to `text-accent`. Do not use TechTag pill components here — plain text with `·` separator is cleaner and faster to scan.
- **Status dot** (optional): For `live` projects, a 6px `bg-success` dot before the title. `launching-soon` gets a 6px `bg-primary/60` dot. No badge component. Just a dot.
- **Arrow**: `→` in `text-tertiary`, absolute right, `opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all`. Appears on hover and slides in from left.

### Supporting Row (compact format)

Same anatomy but:
- No tagline (single-line row)
- `py-4 lg:py-5` instead of `py-8`
- No thumbnail reveal
- Title is `text-base lg:text-lg`

---

## Grid vs. List: The Decision

**Remove the 3-column grid entirely.**

The reasons:

1. **Nine projects in three columns is eight more cards than most visitors will read.** The list format respects the scanning behavior that actually happens — it lets a visitor reach the bottom of the list in the time it would take them to read two card descriptions.

2. **The card grid fragments reading flow.** Eyes jump left-right-left-right across three columns. A list directs the eye vertically, which is how humans scan text. The vertical rhythm of a list is faster and more readable.

3. **Cards impose visual weight before interest is established.** The current design says "here is a thing, look at its thumbnail, read its description, click its button" before the visitor has decided whether to care. The list says "here are your options" and lets the visitor self-select.

4. **The reference portfolios do not use card grids.** amitsharma.online and maitripatel.webflow.io both present work as flat, text-led entries with interaction layered on top. The grid is a dashboard pattern, not an editorial one.

**One exception**: if a masonry or bento layout is ever revisited, it should be for a curated selection of 3-4 projects max, not all nine.

---

## Filter Tab Redesign

The current implementation is well-built (layoutId animated underline, keyboard nav, accessible). The design treatment needs one change: **move the filter tabs to align with the editorial tone**.

### Changes

- Remove `rounded-md` from individual tabs. Editorial filter tabs are square-edged or use a bottom border only — not pill-shaped.
- Increase the gap between tabs: `gap-6` instead of `gap-1`.
- The active underline `h-0.5` stays but uses `bg-primary/70` per the approved decision.
- Add `text-xs font-mono uppercase tracking-widest` to tab labels (currently `text-sm font-medium font-body`). This aligns with the mono labeling convention used in the section header and project indexes.
- Active tab: `text-accent`. Inactive: `text-tertiary hover:text-secondary`. No changes needed here.

```tsx
// Updated tab button className:
'relative px-0 py-2 pr-6 text-xs font-mono uppercase tracking-widest'
// (remove rounded-md, remove px-4, increase label spacing)
```

The filter row should sit flush-left with the list, not centered. It reads as a control, not a navigation component.

---

## Visual Hierarchy: How to Make Projects Stand Out

The current design attempts hierarchy by making the `FeaturedProjectCard` physically larger (2-col span). The redesign achieves hierarchy through **typographic scale and vertical rhythm** alone.

### Hierarchy Signals (in order of strength)

1. **Index number size**: Anchor rows have `text-sm` indexes. This seems counterintuitive — smaller numbers on larger rows — but the smaller mono index against the larger heading creates more contrast than matching sizes.

2. **Row height**: Anchor rows have roughly 2x the vertical padding of supporting rows. No label required. The eye reads height as importance.

3. **Tagline presence**: Only anchor rows show taglines. This is a secondary line of text that supporting rows do not have. Its absence is the signal.

4. **Thumbnail visibility**: Only anchor rows reveal thumbnails on hover. Supporting rows hover with surface only.

5. **Orange accent on index**: On hover, anchor row indexes transition to `text-primary`. Supporting row indexes transition to `text-secondary`. This is a 1px difference in color but compounds with the other signals.

### The "Zone Divider" Between Tiers

A visual separator between anchor and supporting rows prevents them from reading as one undifferentiated list. Options in ascending elegance:

- **Option A (simplest)**: An extra `mt-8 lg:mt-12` margin before the first supporting row, with a small mono label "More Projects" in `text-xs text-tertiary` flush left. Not recommended — too explicit.
- **Option B (recommended)**: A single `border-t border-subtle/40` hairline with `mt-6` padding, no label. The gap and the thin line are enough.
- **Option C (subtlest)**: Just `mt-10 lg:mt-16` margin. No line. Let the whitespace speak.

Option B is recommended. It communicates the tier break without labeling it.

---

## Hover Interactions: Micro-interaction Stack

The complete hover interaction for an anchor row fires three layers in sequence:

### Layer 1: Immediate (0ms, CSS transition 300ms)
- `background-color`: transparent → `var(--color-card)`
- `border-bottom-color`: `var(--color-subtle)` → `var(--color-primary)`
- `padding-left`: 0 → 12px (content shifts right)

### Layer 2: Fast (0ms, CSS transition 400ms ease-out)
- Index number: `color` `text-tertiary` → `text-primary` (orange)
- Arrow `→`: `opacity-0 translateX(-4px)` → `opacity-100 translateX(0)`

### Layer 3: Delayed (50ms delay, CSS transition 500ms ease)
- Thumbnail: `opacity-0` → `opacity-100` (only on anchor rows)

### On Click / Keyboard Focus
- Same surface-appear effect, no additional treatment
- Focus ring: existing `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-page` is correct and stays

### What to Explicitly Avoid
- No `y: -4` lift (the row is not a card, it does not float up)
- No `scale` on the row
- No `box-shadow` or glow (glow belongs on individual interactive elements, not full-width rows)
- No staggered children animations inside the row

The hover effect should feel like walking through an exhibition and having the work you look at illuminate — not like pressing a button.

---

## Thumbnail Treatment

Because most projects currently have no `image` (they fall through to `ImagePlaceholder`), the thumbnail in the new design serves a different purpose: **it is a presence cue, not a preview**. The visitor does not need to read it in detail. It tells them "this is a real project with a real visual identity."

### For Projects Without Images (most of the current data)

Keep the existing `ImagePlaceholder` component but update its treatment for the new context:

- The large decorative initial (`text-heading/[0.06]`) stays — this is the right move, it creates a letterform shape without pretending to be a screenshot
- Container: `w-[220px] lg:w-[260px] aspect-video rounded-lg overflow-hidden`
- Add a subtle orange gradient overlay on the right edge: `bg-gradient-to-l from-transparent to-page/60` — this blends the thumbnail into the dark background rather than hard-cutting it
- The thumbnail sits absolute at `right-6 top-1/2 -translate-y-1/2` within the row

### For Projects With Images (when added later)

- `object-cover`, no scale-on-hover inside the thumbnail (the row itself handles the interaction)
- Slight desaturation at rest (`filter: grayscale(0.3)`), removed on hover
- Same gradient overlay for blending

---

## ImagePlaceholder Refinement

The current placeholder shows the project initial at enormous size. For the list context, refine it:

```tsx
// Updated for list row context (smaller container)
<div className="w-full h-full bg-card flex items-center justify-center relative overflow-hidden">
  {/* Giant letterform — decorative */}
  <span
    className="font-heading font-bold text-heading/[0.04] absolute leading-none select-none"
    style={{ fontSize: '8rem' }}
    aria-hidden="true"
  >
    {initial}
  </span>
  {/* Category label */}
  <span className="font-mono text-[10px] text-tertiary uppercase tracking-widest z-10">
    {category}
  </span>
</div>
```

The change: show the `category` label (`AI`, `Apps`, `Packages`) instead of the project title. In a small thumbnail context, the project title is already visible in the row title. Showing category in the thumbnail creates a useful second read.

---

## Section Header Refinement

The current header has three stacked elements: mono label, SectionHeading, subtitle text. This is correct. One refinement:

The subtitle `"Building products that solve real problems, from consumer apps to platform infrastructure."` is generic. For the editorial direction, consider removing it entirely and letting the project list speak. The vertical gap between `SectionHeading` and the first project row becomes the visual breath. If a subtitle must exist, reduce it to a single short clause: `"Nine shipped products."` — concrete, not descriptive.

If subtitle is kept, drop to `text-sm text-tertiary` rather than `text-base text-secondary`. In an editorial layout, supporting text recedes further.

---

## Section Composition and Spacing

### Before (current)
```
py-24 lg:py-32   (section vertical padding)
gap-10           (flex-col gap between header, tabs, grid)
gap-6            (grid gap between cards)
```

### After (recommended)
```
py-24 lg:py-32   (keep — section padding is correct)
gap-12 lg:gap-16 (header block → filter tabs: more breath)
mt-2             (filter tabs → first project row: tight, the row's own border creates separation)
```

The project list itself has no `gap` — rows are stacked with `border-b` as the only separator. The padding is inside each row. This is standard editorial list convention.

### Max Width
Expand from `max-w-6xl` to `max-w-5xl` (smaller, not larger). The list layout is inherently narrow-friendly. A full-width list at 1400px reads as a spreadsheet. At `max-w-5xl` (1024px), it reads as a curated index. If the design system uses `max-w-6xl` for consistency across sections, keep it — but be aware the list will feel slightly loose at very wide viewports.

---

## Filter Tab Animation: No Change Needed

The existing `layoutId="filter-indicator"` sliding underline is the right interaction. No changes to the animation. The only change is the visual treatment of the tab labels (mono, uppercase, wider spacing) as described above.

---

## AnimatePresence: Adjust for List

The current `mode="popLayout"` with `scale: 0.95` exit is designed for cards. For list rows, the exit should be:

```tsx
const rowExit = {
  opacity: 0,
  x: -8,                                         // rows slide left on exit
  transition: { duration: 0.15, ease: EASE_IN },
}

const rowEnter = {
  opacity: 0,
  x: 8,                                          // rows enter from right
}
```

The x-axis exit/enter makes filter transitions feel like a horizontal scroll within the list — directional and purposeful. The current scale-down looks like the card is being compressed, which has no semantic meaning in a list.

---

## Tailwind Class Reference by Element

| Element | Classes |
|---|---|
| Section wrapper | `py-24 lg:py-32 px-6 lg:px-16 xl:px-24` |
| Inner container | `max-w-5xl mx-auto flex flex-col gap-12 lg:gap-16` |
| Row (anchor) | `group relative flex items-center gap-4 lg:gap-8 py-8 lg:py-10 border-b border-subtle cursor-pointer transition-all duration-300` |
| Row (supporting) | `group relative flex items-center gap-4 lg:gap-8 py-4 lg:py-5 border-b border-subtle cursor-pointer transition-all duration-300` |
| Row hover (Framer) | `backgroundColor: 'var(--color-card)', pl: '12px', borderBottomColor: 'var(--color-primary)'` |
| Index number | `w-8 lg:w-10 font-mono text-xs text-tertiary text-right flex-shrink-0 transition-colors group-hover:text-primary` |
| Project title (anchor) | `font-heading font-bold text-xl lg:text-2xl text-heading leading-tight` |
| Project title (supporting) | `font-heading font-semibold text-base lg:text-lg text-heading leading-tight` |
| Tagline (anchor only) | `font-body text-xs lg:text-sm text-tertiary leading-snug mt-0.5` |
| Tag cluster | `hidden lg:flex items-center gap-2 ml-auto font-mono text-xs text-tertiary flex-shrink-0` |
| Tag separator | `text-subtle` (the `·` character) |
| Status dot | `w-1.5 h-1.5 rounded-full flex-shrink-0` + `bg-success` (live) or `bg-primary/60` (launching-soon) |
| Arrow | `ml-3 text-tertiary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-sm` |
| Thumbnail container | `hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[220px] aspect-video rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500` |
| Filter tabs wrapper | `flex gap-6` |
| Filter tab button | `relative px-0 py-2 text-xs font-mono uppercase tracking-widest` |

---

## Framer Motion: Recommended whileHover

```tsx
// Anchor row
<motion.article
  whileHover={{
    backgroundColor: 'var(--color-card)',
    paddingLeft: '12px',
    borderBottomColor: 'var(--color-primary)',
  }}
  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
>
```

Do not use `y` or `scale` in `whileHover` for list rows. The existing `FeaturedProjectCard` uses `y: -4` which is correct for cards — but rows are not cards and should not lift.

---

## What to Keep from the Current Implementation

1. **AnimatePresence with `mode="popLayout"`** — keep this, just update the exit animation direction
2. **FilterTabs component** — keep entirely, only update CSS classes on the tab buttons
3. **StatusBadge** — repurpose as a colored dot, or keep the badge on mobile where row density means less space for inference
4. **SectionHeading + mono label** — keep exactly as-is
5. **whileInView stagger** for the section entrance — keep but apply to the list rows with tighter stagger (`staggerChildren: 0.04` instead of `0.12` — nine rows at 0.12s stagger would take over a second)
6. **ImagePlaceholder** component — keep, update as described

---

## What to Remove

1. The `bg-card border border-subtle rounded-xl overflow-hidden` card surface
2. The `aspect-video` image slot above the content (becomes a hover thumbnail)
3. The inline `<Button>` CTA inside each card — replaced by the row's full clickable area and the `→` arrow
4. The `<p className="text-base ... line-clamp-3">` description — description belongs in a detail view, not a list row
5. The `<TechTag>` pill components inside rows — replaced by plain mono text tags
6. The `FeaturedProjectCard` variant (the 2-col layout) — the new tier system replaces the featured pattern

---

## Mobile Behavior

The list layout works natively on mobile — it is already a single column. Adjustments:

- Hide tag cluster on mobile (`hidden lg:flex`) — too much horizontal content for small screens
- Hide thumbnail on mobile (`hidden lg:block`) — thumbnails are a desktop hover interaction
- Status dot remains visible on mobile
- Anchor row taglines remain visible on mobile — they carry the hook text
- The `→` arrow remains visible on mobile but the hover interaction becomes a tap highlight

The filter tabs should be horizontally scrollable on mobile if tabs overflow: `overflow-x-auto scrollbar-hide` on the wrapper. This prevents wrapping.

---

## Summary: Before vs. After

| Dimension | Before | After |
|---|---|---|
| Layout | 3-column card grid | Full-width stacked list |
| Card surface | `bg-card border rounded-xl` always visible | Appears only on hover |
| Image | Aspect-video thumbnail above content, always visible | 220px thumbnail floats at row right, hover-only |
| Description | 3-line clamp in card body | Removed from list; available on project detail |
| CTA button | Inline `<Button>` per card | Full row is clickable; `→` arrow signals it |
| Tech tags | `<TechTag>` pill components | Plain mono text with `·` separator |
| Featured projects | `FeaturedProjectCard` 2-col layout | Anchor rows with more vertical padding |
| Hover effect | `y: -4` lift + orange border + glow shadow | Surface appear + orange border + content nudge |
| Filter tabs | `text-sm font-medium font-body rounded-md px-4` | `text-xs font-mono uppercase tracking-widest` |
| Row count visible at once | ~3-4 cards on first view | All 9 rows visible on desktop |

---

## Implementation Order

1. **ProjectRow component** (new) — replaces `ProjectCard` for the list layout. Keep `ProjectCard` for any future grid view.
2. **Update `Projects.tsx`** — swap grid for list, update stagger timing, update AnimatePresence exit animation.
3. **Update `FilterTabs.tsx`** — CSS class changes only, no logic changes.
4. **Add zone divider** between anchor and supporting rows (Option B: hairline with margin).
5. **Optional**: update `ImagePlaceholder` to show category instead of title in the small thumbnail context.

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md)
- [Color System](../../.claude/rules/design/color-system.md)
- [Visual Direction](./visual-direction.md) (if exists)

---

**Last Updated**: 2026-03-18
**Maintained By**: Art Director (visual-director agent)

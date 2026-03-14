# Nav Active Dot — Resting Position Direction

**Project**: React Portfolio
**Created**: 2026-03-10
**Version**: 1.0.0
**Status**: Active
**Scope**: Header navigation — active dot behavior when no section is active (Hero view)

---

## The Problem, Stated Precisely

The orange dot (`layoutId="nav-active-dot"`) is conditionally rendered only when a `NavLink` has `isActive`. In Hero, no link is active, so the dot simply ceases to exist. When the user scrolls into Work, the dot pops into being from nothing rather than traveling from somewhere. This feels unfinished — like a design system that forgot to answer "where does this live at rest?"

The goal is a **home position**: a place the dot belongs when no section is active, from which it departs and to which it returns. This home must feel intentional, not arbitrary.

---

## Recommended Solution: The Logo Period

**Concept**: The dot parks immediately after the final letter of "Jatin" — as a period.

At rest, the nav reads visually as: `Jatin.`

The dot sits at the baseline of the wordmark, 2–3px to the right of the final "n", at the same vertical position where a typographic period would fall. It is the same 4px orange circle, unchanged in size or color. No shape transformation needed.

When the user scrolls into a section, the dot lifts off from the logo and slides to the active nav link. When they scroll back to Hero, it returns.

### Why This Works

**Narratively**: "Jatin." is a complete sentence. A period after a name is a declaration, not a question. It is the dot saying: *this is the beginning; this is the author.* The brand is built on quiet confidence — the period is the quietest possible form of confidence. No exclamation mark, no ellipsis. A full stop.

**Visually**: At 4px, an orange dot reads as punctuation at this scale without effort. Anyone who sees it will unconsciously parse it as part of the wordmark. The transition from wordmark punctuation to nav indicator is surprising the first time and immediately understood — it does not require explanation.

**Mechanically**: The dot is always present in the DOM. There is no pop-in. The `layoutId` spring carries it across any distance in the navbar because `LayoutGroup` scope can be extended to wrap both logo and links. The animation is the same shared-layout spring that already works between nav links — it just has a longer travel distance when departing from or returning to home.

**Brand alignment**: The craftsman brand values details that earn their place. This detail earns its place — it is not decorative, it is semantic. It tells you where you are (or where you are not yet).

---

## Exact Positioning

The resting dot position:

- **Horizontal**: `right: -7px` relative to the logo `<span>` (2px gap after the "n" descender, 4px dot radius accounts for the rest)
- **Vertical**: Baseline of the "Jatin" text. The logo uses `fontSize: 20px` with `fontWeight: 700`. Baseline sits approximately at `top: 15px` from the element top for this font. Position at `bottom: 0px, translateY(2px)` to align the dot center with the text baseline.
- **Anchor element**: The logo `<motion.a>` already has `position: relative; overflow: hidden`. The resting dot must live outside this element (overflow hidden will clip it). It should be a sibling positioned absolutely relative to the logo's parent wrapper.

Practically: the logo group `<motion.div>` currently wraps the `<motion.a>` and the clock. The resting dot should be a new child of that wrapper, absolutely positioned at the right edge of the wordmark.

---

## Implementation Architecture

### Current structure (simplified)

```
LayoutGroup (wraps only nav links)
  NavLink "Work"   → dot renders here when isActive
  NavLink "Projects" → dot renders here when isActive
  NavLink "About"  → dot renders here when isActive
  NavLink "Contact" → dot renders here when isActive
```

### Required structure

```
LayoutGroup (must now wrap logo area AND nav links)
  Logo wrapper
    "Jatin" wordmark
    [Resting dot — rendered when activeSection is null/undefined]
  NavLink "Work"   → dot renders here when isActive
  NavLink "Projects" → dot renders here when isActive
  NavLink "About"  → dot renders here when isActive
  NavLink "Contact" → dot renders here when isActive
```

The `LayoutGroup` in `Header.tsx` currently wraps only the nav links `<div>`. It needs to expand to wrap the entire `<nav>` interior — or more precisely, a new `LayoutGroup` boundary needs to be set at a level that contains both the logo group and the links group.

The dot `layoutId` string (`"nav-active-dot"`) stays identical everywhere. Framer Motion resolves position from whichever element with that `layoutId` is currently mounted.

### Dot ownership logic

Currently: dot renders inside `NavLink` when `isActive === true`.

New logic:

- If `activeSection` is defined (Work, Projects, About, Contact): dot renders inside the matching `NavLink` as today — no change to `NavLink.tsx`.
- If `activeSection` is undefined or empty string (Hero): dot renders in the logo area of `Header.tsx`.

Only one instance of `layoutId="nav-active-dot"` should be in the DOM at any time. The switch between "logo dot" and "nav dot" is handled by conditional rendering driven by `activeSection`.

---

## Motion Specification

**Spring config**: Keep the existing spring (`stiffness: 400, damping: 30`). The longer travel from logo to "Work" is fine — at this stiffness the dot snaps crisply across the full navbar width without feeling slow.

**No additional easing needed.** The distance-to-stiffness ratio works. The dot will feel like it has intention when it crosses the full width.

**Entrance (logo → first nav link)**: The dot visually "detaches" from the wordmark and becomes a nav indicator. Because the dot is identical in both states (same size, same color, same shape), the transition is seamless — the logo loses its period and the nav link gains its dot in one continuous movement.

**Return (last nav link → logo)**: Dot slides back to the logo and becomes the period again. The wordmark temporarily loses and then regains its punctuation. This return animation should feel like arriving home.

---

## What to Avoid

**Do not change the dot's shape at rest.** Transforming into a dash or line adds complexity without payoff. The period metaphor works precisely because the dot is unchanged. Changing the shape introduces a morph animation (border-radius from 0 to 50%) that fights the layoutId spring and creates a more complicated mental model.

**Do not place the dot at center-nav.** Center is arbitrary and carries no meaning. It would look like a loading indicator, not a resting state.

**Do not add opacity pulsing or breathing animation to the resting dot.** The dot should be fully static when at home. Movement draws attention — the dot at rest should be quiet. If it breathes or pulses, it competes with the actual active state that it is supposed to signal.

**Do not show the resting dot before the nav loads.** The load animation brings the logo and links in with staggered fades. The resting dot should be part of the logo's reveal — it appears with the wordmark, as if it were always part of the lettering.

---

## Secondary Option (If LayoutGroup Refactor Is Blocked)

If extending the `LayoutGroup` to cover the logo area proves technically awkward (e.g., introduces layout shift or breaks the existing ghost-opacity system), use this fallback:

**The dot parks between the clock divider and the first nav link.**

Specifically: in the horizontal space between the right edge of the ghost nav (clock area) and the left edge of "01 Work". This is a neutral zone in the navbar with no existing element. The dot floats there, centered vertically in the nav bar.

This carries less narrative weight than the period concept, but it still gives the dot a home. The transition to "Work" is short (dot barely moves). The transition to "Contact" is satisfying (dot crosses the full link group).

The positioning is simpler: a fixed absolute element inside the nav row, calculated from the gap between the two `motion.div` siblings. No LayoutGroup restructuring required — the dot in this position can be rendered as a standalone `motion.div` with `layoutId="nav-active-dot"` in `Header.tsx`.

---

## Visual Mood Check

The logo period concept should feel like:

- A craftsman's signature. A full stop after a name — complete, declarative, unhurried.
- Something you notice on a second or third visit and think "of course it was always a period."
- A micro-detail that is invisible to a casual visitor and invisible-obvious to someone paying attention.

It should not feel like:
- A clever gimmick. If someone has to be told about it, it failed.
- Decoration. Every orange pixel must earn its presence.
- Distracting. The dot is at the logo, the logo is not the primary focus — it should blend.

---

## Files That Will Change

- `/Users/jatin/Documents/Projects/portfolio/src/components/layout/Header.tsx` — expand `LayoutGroup` scope, add resting dot conditional render in logo area
- `/Users/jatin/Documents/Projects/portfolio/src/components/ui/NavLink.tsx` — no changes required (dot rendering logic inside is already correct)

---

## Related Documents

- [Visual Direction](./visual-direction.md) — Aesthetic principles, animation philosophy
- [Brand Strategy](../brand/brand-strategy.md) — Craftsman brand, quiet confidence

---

**Last Updated**: 2026-03-10
**Maintained By**: visual-director agent

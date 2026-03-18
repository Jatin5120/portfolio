# Scrollbar Design Specification

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Status**: Active

---

## Overview

This document gives a single, decided scrollbar design direction for the portfolio.
It answers each of the eight open questions, explains the reasoning behind each answer,
specifies the exact CSS implementation, and documents the relationship to the existing
navbar scroll progress indicator.

---

## The Decision

**Neutral, minimal, 4px scrollbar. Visible. Gray thumb. Transparent track. Pill shape.**

This is not a compromise. It is the correct answer for this specific portfolio once all
the constraints are held together.

---

## Reasoning: Question by Question

### 1. Hidden or visible?

**Visible.**

Hiding the scrollbar (`scrollbar-width: none`) is a reasonable choice for portfolios
that compensate with a prominent, custom scroll progress indicator — a full-height
sidebar track, a circle counter, a numbered section label in the corner. This portfolio
has none of those. The only scroll position feedback is the navbar progress line, which
is a 1px orange line at the very top of the screen. That line tracks scroll progress but
does not tell the user where they are in absolute terms — it does not show how much
content remains below.

On Windows and Linux, `scrollbar-width: none` removes the scrollbar entirely with no
fallback. Those visitors lose all spatial context for a page with five sections and
significant scroll depth. That is a real usability cost.

The macOS overlay scrollbar behavior is irrelevant to this decision. macOS already hides
the scrollbar when the user is not scrolling with a trackpad, with no CSS required. On a
Mac, a visible custom scrollbar only appears when the user is actively scrolling or using
a mouse — exactly when they need positional feedback. The CSS adds no visual clutter on
trackpad-primary devices.

Verdict: Keep it visible. The cost of hiding it is higher than the cost of showing it.

---

### 2. Orange or neutral?

**Neutral. `#374151` at rest, `#4B5563` on hover.**

This is the most consequential decision in the entire specification.

The current implementation uses orange at 25% opacity. The intent was brand
consistency. The actual effect is that the brand color is leaking into an element
that the user never looks at intentionally. The scrollbar is scanned peripherally, not
focused on. Peripheral orange registers as noise that slightly reduces the signal value
of every intentional orange element on the page — the navbar progress line, the active
nav link underline, the section heading accent, button borders, hover states.

Orange on this portfolio means something: it marks what matters, it signals
interaction, it directs attention. Using it on the scrollbar spends that attention
budget on an element that conveys no information. Worse, the low opacity version is a
washed-out, uncertain orange — not the confident `#FFAB00` — which weakens rather
than reinforces the brand.

The scrollbar's job is to tell the user how far they have scrolled. That is a
navigational utility function. Neutral gray communicates that function without
competing with the design system.

Reference: Linear, Vercel, and Stripe — three of the most visually precise dark-mode
products in the industry — all use neutral gray scrollbars. The orange or brand-color
scrollbar is a pattern from an earlier generation of portfolio design (2018–2021) when
custom scrollbars were a novelty. In 2025–2026 they read as an indicator that the
designer was trying hard rather than thinking clearly.

Verdict: Neutral gray. No orange on the scrollbar.

---

### 3. Width?

**4px.**

- 6px is the width of a default Windows scrollbar. It signals "I didn't style this."
- 2px is too thin to grab reliably with a mouse. Fitts's Law applies: a 2px target on
  a 2560px-wide monitor requires precision that users should not need for a navigational
  element.
- 4px is the standard adopted by Linear, Notion, and most premium dark-mode
  applications. It is narrow enough to be unobtrusive, wide enough to grab.
- The `scrollbar-width: thin` property in Firefox renders approximately 6–8px depending
  on the OS. The `::-webkit-scrollbar { width: 4px }` override on Chromium/Safari
  gives the precise 4px target.

Verdict: 4px.

---

### 4. Track — transparent or faint background?

**Transparent.**

A faint background on the track (even `rgba(255,255,255,0.04)`) creates a vertical
rectangle on the right edge of the viewport. On `#0A0A0A` background, any visible
track is a seam — a thin strip of different value that runs the full height of the
page. On a design that uses generous whitespace and clean section boundaries, that
vertical seam is a distraction.

Transparent track means the scrollbar has no presence when the thumb is not visible.
The thumb alone carries the position information. This is correct hierarchy: the
indicator appears when needed, disappears when not.

Verdict: Transparent track.

---

### 5. Thumb shape?

**Pill (fully rounded, `border-radius: 2px`).**

- Square (0px radius) reads as browser-default on Windows. It signals no design
  intent.
- Fully rounded pill (`border-radius: 3px` on a 4px-wide thumb, which renders as
  a true capsule) is the standard for refined UI tooling. It matches the rounded
  corners used throughout the design system (project cards, buttons, badges, tags).

2px radius rather than 9999px (full pill): on a 4px-wide thumb, the visual result
is identical — the radius saturates at half the width — but `2px` is more explicit
about intent.

Verdict: `border-radius: 2px` (renders as pill on a 4px element).

---

### 6. Should it fade out on inactivity?

**No. CSS-only fade is not reliable enough to use here.**

A CSS-only approach using `::-webkit-scrollbar-thumb` opacity transitions works
in Chromium but has inconsistent behavior across browsers and OS scroll behavior
modes. It also creates a situation where the scrollbar disappears while the user's
hand is resting on the mouse wheel — confusing exactly when positional information
is most needed.

macOS already handles the fade natively for trackpad users. For mouse users on any
OS, the scrollbar should remain visible while the page is scrollable.

If scroll-position awareness is not wanted at all, the answer is `scrollbar-width: none`
(not a fade). The decision above to keep the scrollbar visible means keeping it
consistently visible.

Verdict: Always visible when scrolling. No opacity animation.

---

### 7. Should it match the navbar progress indicator?

**No — and this is precisely why it should not be orange.**

The navbar already has a progress indicator: a 1px horizontal orange line at the
bottom of the header bar, animated with Framer Motion `scaleX: scrollYProgress`.
That line is the brand-colored scroll feedback element. It earns its orange because it
is prominent, intentional, and lives in the primary navigation zone where users look.

If the scrollbar were also orange, there would be two competing orange scroll
indicators. They would say the same thing twice and dilute each other. One orange
progress element is a design decision. Two orange progress elements is redundancy.

The scrollbar and the navbar line serve complementary roles:
- Navbar line: prominent progress signal in the top focal zone, seen on every section
- Scrollbar: peripheral position indicator on the right edge, confirming absolute depth

They should look different. The navbar line is the brand expression. The scrollbar
is the utility.

Verdict: Scrollbar stays neutral. Navbar line owns the orange scroll signal.

---

### 8. What do award-winning dark portfolios actually do?

The portfolios in the reference set (amitsharma.online, maitripatel.webflow.io,
Brittany Chiang's v4) and the design-tool products this portfolio references (Linear,
Vercel, Stripe) converge on the same answer: minimal, neutral, thin scrollbar or no
scrollbar at all with a compensating indicator.

The pattern where no scrollbar is visible is always paired with something else doing
the spatial work — a section counter, a side-rail progress bar, a sticky section
label. This portfolio does not have any of those, which makes the "no scrollbar"
pattern inappropriate here.

The pattern this portfolio should follow: thin neutral scrollbar, dark thumb, no
track, no brand color. The scrollbar becomes invisible at the level of conscious
attention while still serving its navigational purpose.

---

## Final Specification

### Behavior

- Always rendered (not hidden)
- No fade-in/fade-out animation
- No brand color. No orange.
- Color lifts slightly on hover to confirm interactivity

### Colors

| State   | Thumb color           | Track color   |
|---------|-----------------------|---------------|
| Rest    | `#374151` (border-default from design system) | transparent |
| Hover   | `#4B5563` (border-strong from design system)  | transparent |

These values are pulled directly from the existing color system. No new colors are
introduced.

### Dimensions

| Property        | Value  |
|-----------------|--------|
| Width           | `4px`  |
| Border radius   | `2px`  |
| Minimum height  | `40px` (prevents thumb from becoming ungrabbable on long pages) |

### Firefox / Standards-based

```css
body {
  scrollbar-width: thin;
  scrollbar-color: #374151 transparent;
}
```

`scrollbar-width: thin` in Firefox renders at approximately 6–8px depending on the
OS. This is acceptable — Firefox on Windows gets a slightly wider scrollbar, which
is appropriate for a mouse-primary platform.

### Chromium / Safari (WebKit)

```css
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 2px;
  min-height: 40px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
```

---

## Complete Implementation

The following block replaces the existing scrollbar rules in
`src/styles/globals.css`. The change is limited to the `body` rule and the four
`::-webkit-scrollbar*` rules. Nothing else in `globals.css` changes.

```css
body {
  background-color: #0a0a0a;
  color: #f3f4f6;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #374151 transparent;
}

/* Chromium / Safari */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 2px;
  min-height: 40px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
```

The hex values `#374151` and `#4b5563` map to `--color-border` and `--color-border`
strong respectively in the existing design token system. They are written as literals
here because CSS custom properties defined in `@theme` are not available in the
`body` selector's `scrollbar-color` property (a known Tailwind v4 limitation with
the Firefox standard property). The WebKit pseudo-elements accept them as-is.

---

## What This Changes From the Current Implementation

| Property        | Before               | After               | Reason                          |
|-----------------|----------------------|---------------------|---------------------------------|
| Width           | `6px`                | `4px`               | Less intrusive, standard for premium UI |
| Thumb color     | `rgba(255,171,0,0.25)` — orange at 25% | `#374151` — neutral gray | Orange is reserved for intentional brand moments; scrollbar is utility |
| Thumb hover     | `rgba(255,171,0,0.45)` | `#4b5563`          | Consistent with change above   |
| Track           | `transparent`        | `transparent`       | No change — was already correct |
| Border radius   | `3px`                | `2px`               | Marginal refinement, same visual result on a 4px element |
| Min height      | not set              | `40px`              | Prevents ungrabbable thumb on long pages |

---

## Relationship to Existing Components

### Navbar progress line (`Header.tsx`)

The orange `scaleX: scrollYProgress` line at the bottom of the header bar is the
scroll progress indicator for this portfolio. It owns the orange scroll signal.
The scrollbar is subordinate to it. These two elements should remain visually
distinct at all times.

If the navbar progress line is ever removed or redesigned, the scrollbar color
decision should be revisited. The scrollbar's neutrality is partly justified by
the presence of a more prominent orange progress element.

### Film grain overlay (`App.tsx`)

The grain sits at `z-[9999]` with `mix-blend-mode: overlay`. It will apply subtly
to the scrollbar area on some browsers. This is acceptable — the grain adds texture
to the entire viewport edge, which slightly softens the scrollbar's appearance in
a way that is consistent with the overall tactile quality of the design.

---

## What Was Deliberately Not Done

**No JavaScript scroll progress sidebar.** Several premium portfolios add a
right-rail SVG progress indicator or a floating section counter. These are valid
for portfolios where the scrollbar is hidden. Adding one here, on top of the existing
navbar progress line, would create three competing scroll indicators. The navbar line
is sufficient.

**No custom scrollbar component via `overflow: hidden` + `position: absolute`.** This
pattern (completely hiding the native scrollbar and replacing it with a custom
`div`-based scrollbar) gives maximum visual control but introduces focus management
and accessibility concerns, breaks browser find-in-page scrolling, and requires
ongoing JavaScript maintenance. The native scrollbar with CSS styling is the correct
tool here.

**No gradient or opacity animation on the thumb.** A thumb that fades from transparent
to visible as the user scrolls is a legitimate 2025 technique but it requires either
JavaScript to add/remove a class or relies on `::-webkit-scrollbar-thumb:active`
combined with transitions, which have inconsistent cross-browser behavior. The
simplicity of a static gray thumb is more reliable and more appropriate for this
brand's "quiet confidence" personality.

---

## Design Rationale Summary

The scrollbar on this portfolio should be invisible to the conscious mind and
available to the peripheral eye. The user should never think about it. They should
never admire it. It should simply be there when they glance right to check how far
they've scrolled, and it should not compete with anything else for attention.

The orange on this page means something. Every use of `#FFAB00` is a direction —
look here, click this, this is active. Putting orange on the scrollbar sends that
signal to an element nobody is looking at. Neutral gray preserves the signal value
of every other orange element on the page.

That is the design decision. It is not a timid default. It is the correct answer
for this specific system.

---

## Related Documents

- [Visual Direction](./visual-direction.md) — Overall aesthetic, color philosophy
- [Color System](../../.claude/rules/design/color-system.md) — Token definitions
- `src/styles/globals.css` — Implementation location
- `src/components/layout/Header.tsx` — Navbar progress line (the primary scroll indicator)

---

**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Maintained By**: visual-director agent

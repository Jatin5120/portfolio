# Work Section Layout Options

**Project**: React Portfolio
**Created**: 2026-03-17
**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Draft — Awaiting Selection

---

## Brief

4 jobs total (1 current: Foyer, 3 past: Appscrip, PrimoTech, Agumentik).
Dark theme, max-w-5xl (~800px rendered), React + Tailwind + Framer Motion.
Must work at 375px mobile. Current role carries significantly more weight.

**Eliminated patterns (do not revisit):**
- Vertical list with dividers
- Featured card + 3 small cards below (dashboard feel)
- Tab switcher (Brittany Chiang pattern)
- Timeline with left border (VS Code gutter)
- Equal-weight list items

---

## Option 1: Anchored Dossier

### The Concept

Inspired by editorial newspaper layouts and the information architecture of tools like Linear's changelog. The current role occupies a full-width "masthead" at top — large, confident, typographically dominant. Below it, past roles live in a horizontal strip that reads like a dossier index: company name, role title, and a one-line excerpt. No cards. No borders. No equal-weight grid.

The hierarchy is communicated purely through typographic scale and whitespace, not UI chrome. The current role is 3x the visual mass of past roles combined. Past roles feel like footnotes that earn their place — not competing entries.

### Desktop Layout (~800px)

```
┌─────────────────────────────────────────────────────────────┐
│  The work that shaped how I build.                          │
│                                                             │
│  FOYER                                      Dec 2024–Now   │
│  Mobile Lead                                    ● present  │
│                                                             │
│  Two products. One engineer. Zero documentation.            │
│                                                             │
│  Sole mobile decision-maker at an early-stage AI startup,  │
│  shipping two products simultaneously. Merlin AI — a        │
│  Chrome extension brought to mobile — and Thine, a          │
│  journaling app that required solving an iOS background     │
│  audio problem Apple's documentation doesn't cover.         │
│                                                             │
│  Flutter · Swift · iOS Native · AI Integration · Team Lead  │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│  // previously                                              │
│                                                             │
│  APPSCRIP             PRIMOTECH            AGUMENTIK        │
│  Sr. Flutter Dev      Software Dev         Flutter Dev      │
│  Oct '22–Nov '24      Jun '21–Sep '22      Apr '20–May '21  │
│                                                             │
│  One monorepo,        Full rewrites of     First production │
│  four products.       two debt-ridden      apps. Three      │
│  Real-time chat,      codebases, 95%       clients, fully   │
│  live streaming.      issues resolved.     remote. +23% sat │
└─────────────────────────────────────────────────────────────┘
```

**Proportions:** Current role = full width, ~240px tall. Past roles = 3-column equal grid, ~160px each. No cards or boxes — text only, separated by a hairline rule.

### Mobile Layout (375px)

```
┌───────────────────────────────┐
│  FOYER              Dec '24–  │
│  Mobile Lead          Now ●   │
│                               │
│  Two products. One engineer.  │
│  Zero documentation.          │
│                               │
│  Sole mobile decision-maker   │
│  at an early-stage AI         │
│  startup, shipping two        │
│  products simultaneously...   │
│                               │
│  Flutter · Swift · iOS Native │
│                               │
│  ─────────────────────────    │
│  // previously                │
│  ─────────────────────────    │
│                               │
│  APPSCRIP                     │
│  Sr. Flutter Dev              │
│  Oct '22 – Nov '24            │
│  One monorepo, four products. │
│                               │
│  PRIMOTECH                    │
│  Software Dev                 │
│  Jun '21 – Sep '22            │
│  Full rewrites of two         │
│  debt-ridden codebases.       │
│                               │
│  AGUMENTIK                    │
│  Flutter Dev                  │
│  Apr '20 – May '21            │
│  First production apps.       │
└───────────────────────────────┘
```

Mobile stacks naturally: full current role, then a plain vertical list of past roles with no chrome. Each past role is just type — no boxes, no expand toggles.

### Reference Sites

- **Linear.app** — Their changelog and about pages use this same hierarchical text-only pattern. The content carries all the weight. Chrome is invisible.
- **Stripe's engineering blog** — Uses a dominant featured entry with secondary items in a subordinated strip, separated by a thin rule not a container.

### Why It Feels Premium

Most portfolio work sections fail because they make all items feel equal through uniform card containers. This layout says quiet confidence: the current role doesn't need a box to announce its importance, the size of its type does it. Past roles are listed without apology — brief, honest, contextual. The absence of UI chrome is the design decision.

The typographic scale contrast (current role: ~28–32px headline, past roles: ~14–16px) does what a card hierarchy could never do: it communicates career arc through proportion alone, exactly the way a book's table of contents creates hierarchy without any visual ornamentation.

---

## Option 2: Pinned Split — Sticky Left, Scrolling Right

### The Concept

Borrowed from the editorial web (The Pudding, Stripe's product pages, case study sites like ueno.co). The section is a two-column split. The left column (~38% width) is position: sticky — it pins and holds the current role's core identity. The right column (~62% width) scrolls, revealing all four roles sequentially. As the user scrolls through the right column, subtle scroll-driven opacity and position shifts signal which role is "active."

This creates a layered reading experience. The left side is the anchor — who Jatin is now. The right side is the evidence — how he got here. The user always knows where they are in the narrative. It reads like a magazine spread, not a list.

### Desktop Layout (~800px)

```
┌────────────────────┬────────────────────────────────────────┐
│  [STICKY — holds]  │  [SCROLLS]                             │
│                    │                                        │
│  FOYER             │  FOYER              Dec 2024 – Now     │
│  Mobile Lead       │  Mobile Lead                    ●      │
│  Dec '24–Now       │                                        │
│                    │  Two products. One engineer. Zero       │
│  ●● present        │  documentation.                        │
│                    │                                        │
│  Flutter           │  Sole mobile decision-maker at an      │
│  Swift             │  early-stage AI startup, shipping two  │
│  iOS Native        │  products simultaneously. Merlin AI — │
│  AI Integration    │  a Chrome extension brought to mobile  │
│  Team Lead         │  — and Thine, a journaling app that    │
│                    │  required solving an iOS background     │
│                    │  audio problem Apple's documentation   │
│                    │  doesn't cover. Three rewrites. Swift  │
│                    │  and Objective-C bridging.             │
│                    │                                        │
│  ── ── ── ── ──    │  Flutter · Swift · iOS Native         │
│                    │                                        │
│  [Role changes as  │  ─────────────────────────────────    │
│  user scrolls past │                                        │
│  each entry]       │  APPSCRIP           Oct 2022 – Nov '24 │
│                    │  Sr. Flutter Developer                  │
│  APPSCRIP          │                                        │
│  Sr. Flutter Dev   │  One monorepo, four products —         │
│  Oct '22–Nov '24   │  healthcare, fintech, transport, and   │
│                    │  social — with real-time chat, live    │
│                    │  streaming, and audio/video calling.   │
│                    │                                        │
│                    │  Flutter · MVVM · Real-time            │
│                    │                                        │
│                    │  ─────────────────────────────────    │
│                    │                                        │
│                    │  PRIMOTECH          Jun 2021 – Sep '22 │
│                    │  Software Developer                     │
│                    │  ...                                   │
└────────────────────┴────────────────────────────────────────┘
```

**Proportions:** Left: ~300px sticky column. Right: ~500px scrolling column. Left column shows active role identity (company + title + skills). Right column shows full prose for each role. A thin vertical rule or intentional gap separates them.

As the user scrolls through the right column, the left column's content cross-fades to match: Foyer identity becomes Appscrip identity, etc. The active role's left panel entry is full opacity; the inactive ones are muted.

### Mobile Layout (375px)

```
┌───────────────────────────────┐
│  FOYER              Dec '24–  │
│  Mobile Lead          Now ●   │
│                               │
│  Two products. One engineer.  │
│  Zero documentation.          │
│                               │
│  Sole mobile decision-maker   │
│  at an early-stage AI startup │
│  shipping two products...     │
│                               │
│  Flutter · Swift · iOS Native │
│  AI Integration · Team Lead   │
│                               │
│  ─────────────────────────    │
│                               │
│  APPSCRIP   Oct '22–Nov '24   │
│  Sr. Flutter Developer        │
│  One monorepo, four products. │
│  Flutter · MVVM · Real-time   │
│                               │
│  ─────────────────────────    │
│                               │
│  PRIMOTECH  Jun '21–Sep '22   │
│  Software Developer           │
│  Full rewrites of two         │
│  codebases.                   │
│  Flutter · Firebase · Node.js │
│                               │
│  ─────────────────────────    │
│                               │
│  AGUMENTIK  Apr '20–May '21   │
│  Flutter Developer            │
│  First production apps.       │
│  Flutter · Dart · UI/UX       │
└───────────────────────────────┘
```

Mobile collapses the sticky mechanic into a straightforward vertical list. Each role gets full prose and skills — no truncation, no interaction required. The sticky behavior is a progressive enhancement for desktop only.

### Reference Sites

- **Cyd Stumpel Portfolio 2025** (Awwwards SOTD) — Uses the sticky-left / scrolling-right paradigm on her about/work section. Content in the right panel deepens as the user scrolls; left panel holds identity.
- **The Pudding** (pudding.cool) — Their longform scrollytelling pieces perfected this mechanic as an editorial pattern. The pinned side panel has become a premium editorial signal.

### Why It Feels Premium

The sticky-left pattern does something psychologically distinctive: it creates a reading contract. The user understands from the first scroll that the left side is their compass. They never feel lost. This is the opposite of vertical lists, where each new card is a context break.

The mechanic also rewards close reading. Fast scanners get the identity (company + title + skills) in the sticky panel without needing to scroll. Deep readers get the full prose in the right panel. One layout, two reading modes, zero compromise.

The active-state cross-fade on the left panel (Foyer at full opacity → Appscrip at full opacity) creates a subtle narrative momentum that no static layout achieves. The user experiences career arc as movement, not as a collection of equal containers.

This is the most technically ambitious of the three options. Implementation requires `position: sticky` on the left column with `useInView` hooks on each right-column entry to drive the cross-fade. Framer Motion's `useScroll` + `useTransform` handles this cleanly.

---

## Option 3: Large-Type Cascade

### The Concept

Drawn from editorial print (Walker Art Center, typographic editorial spreads) and agency case study sites (BASIC, Instrument). The entire section is driven by oversized typography. The current role's company name runs at ~80–96px — it dominates the viewport horizontally. Below it, role title and duration are in a smaller but still large type (28–32px). The description is normal body size, indented, set in a narrow column to create intentional whitespace.

Past roles descend in a cascade: each one smaller than the previous. Appscrip at ~56px, PrimoTech at ~40px, Agumentik at ~32px. The typographic scaling communicates career recency and importance without any UI scaffolding whatsoever. No boxes. No rules. No grid containers. Just type, scale, and whitespace.

This is the most distinctive option. It will look like nothing else in a developer portfolio because it is borrowed from a completely different design discipline.

### Desktop Layout (~800px)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  The work that shaped how I build.                          │
│                                                             │
│                                                             │
│  FOYER                                     Dec 2024–Now ●  │
│  ← ─ ─ ─ ~88px company name ─ ─ ─ →                       │
│                                                             │
│     Mobile Lead                                             │
│     ← ~32px role title →                                   │
│                                                             │
│        Two products. One engineer. Zero documentation.      │
│        Sole mobile decision-maker at an early-stage AI      │
│        startup, shipping two products simultaneously.       │
│        Merlin AI and Thine — an iOS background audio        │
│        problem Apple's documentation doesn't cover.         │
│        Three rewrites. Swift and Objective-C bridging.      │
│                                                             │
│        Flutter · Swift · iOS Native · AI · Team Lead        │
│                                                             │
│                                                             │
│  APPSCRIP                                Oct 2022–Nov '24  │
│  ← ─ ─ ~56px company name ─ ─ →                           │
│                                                             │
│     Sr. Flutter Developer                                   │
│     ← ~22px role title →                                   │
│                                                             │
│        One monorepo, four products — healthcare,            │
│        fintech, transport, and social. Real-time chat,      │
│        live streaming, audio/video calling.                 │
│                                                             │
│        Flutter · MVVM · Real-time                          │
│                                                             │
│                                                             │
│  PRIMOTECH                               Jun 2021–Sep '22  │
│  ← ~40px →                                                 │
│     Software Developer ← ~18px →                           │
│        Full rewrites of two debt-ridden codebases...        │
│        Flutter · Firebase · Node.js                         │
│                                                             │
│                                                             │
│  AGUMENTIK                               Apr 2020–May '21  │
│  ← ~32px →                                                 │
│     Flutter Developer ← ~16px →                            │
│        First production apps. Three clients. +23% sat.      │
│        Flutter · Dart · UI/UX                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Proportions:** Foyer company name ~88px (font-heading, bold, tracking-tight). Role title ~32px. Description in a right-indented narrow column (~520px wide). Past roles scale down: 56px / 40px / 32px for company names. Past role descriptions compress proportionally — fewer words, tighter copy. The cascade creates a visual rhythm the eye reads as career progression without needing a legend.

**Orange accent placement:** The live pulse indicator sits after "FOYER" — the only orange in the company name row. Duration timestamps are in `text-tertiary` (muted) at the far right, right-aligned, in `font-mono`. This keeps the type cascade clean and directs orange only to the present-state signal.

### Mobile Layout (375px)

```
┌───────────────────────────────┐
│                               │
│  FOYER              Dec '24 ● │
│  ← 52px company name →       │
│                               │
│   Mobile Lead                 │
│   ← 22px role →              │
│                               │
│    Two products. One          │
│    engineer. Zero docs.       │
│    Sole mobile decision-maker │
│    at an early-stage AI       │
│    startup...                 │
│                               │
│    Flutter · Swift · iOS      │
│                               │
│                               │
│  APPSCRIP          Oct '22–   │
│  ← 36px →           Nov '24  │
│   Sr. Flutter Dev             │
│    One monorepo, four         │
│    products. Real-time chat.  │
│    Flutter · MVVM             │
│                               │
│  PRIMOTECH         Jun '21–   │
│  ← 26px →          Sep '22   │
│   Software Dev                │
│    Full rewrites. 95% issues  │
│    resolved. Flutter          │
│                               │
│  AGUMENTIK         Apr '20–   │
│  ← 22px →          May '21   │
│   Flutter Dev                 │
│    First apps. +23% sat.      │
└───────────────────────────────┘
```

Mobile scales the type down proportionally. Foyer: 52px. Appscrip: 36px. PrimoTech: 26px. Agumentik: 22px. The cascade still communicates hierarchy; the drop from 52px to 22px is visually significant even on a small screen. Descriptions compress to 2–3 lines. Skills reduce to 2–3 tags.

### Reference Sites

- **Walker Art Center** (walkerart.org) — Their editorial section pages use oversized institution names as typographic anchors, with subordinated content below. Pure editorial scale as hierarchy.
- **BASIC Agency** (basicagency.com) and **Instrument** (instrument.com) — Agency case study pages use client name lockups at display scale, with body content set at normal size below. The technique says: the name is the identity, the words are the evidence.

### Why It Feels Premium

This option is the furthest from conventional portfolio thinking. Every developer portfolio sections work experience using boxes, cards, or horizontal rules as their organizing logic. This one uses type scale as the only organizing principle — borrowed directly from editorial design, where typographic hierarchy is a discipline in itself.

The scaling creates something that no interactive mechanic can replicate: a visual sense of perspective. The viewer's eye genuinely perceives Foyer as closer (larger, more present) and Agumentik as more distant (smaller, further in the past). It communicates career arc through spatial reasoning, not information architecture.

It is also the simplest to implement of the three. No sticky positioning, no scroll-driven state changes. Pure CSS and a scroll-reveal animation per entry. The visual sophistication comes entirely from typographic decision-making.

The risk is that it requires confidence in the copy. The company names must be legible at large sizes. "FOYER" at 88px works — four letters, strong consonants. "APPSCRIP" is eight letters and slightly less elegant at scale. This is worth testing in browser before committing.

---

## Comparison Summary

| Criterion | Option 1: Anchored Dossier | Option 2: Pinned Split | Option 3: Large-Type Cascade |
|---|---|---|---|
| Implementation complexity | Low | High | Low |
| Mobile degradation | Minimal | Significant (loses sticky) | None |
| Visual distinctiveness | Medium | High | Very High |
| Hierarchy clarity | High | High | Very High |
| Scroll interaction | None (static) | Scroll-driven state | Scroll-reveal only |
| Brand alignment | Strong | Strong | Strong |
| Risk level | Low | Medium | Medium |
| Closest reference | Linear.app | The Pudding / Cyd Stumpel | Walker Art Center / BASIC |

---

## Recommendation Notes

These are structural options only. Color, hover states, animation timing, skill tag styling, and copy are fixed independently and apply to whichever layout is selected.

**If the goal is maximum distinctiveness with manageable complexity:** Option 3. It will look like nothing else in the developer portfolio space and requires no interactive mechanics.

**If the goal is a premium scroll experience that rewards exploration:** Option 2. It is the only option that creates genuine narrative momentum through interaction. The implementation investment is real but the effect is disproportionate.

**If the goal is the cleanest typographic hierarchy with zero interactive complexity:** Option 1. It is the most restrained and the easiest to reason about. The hierarchy is unambiguous. Nothing competes.

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md)
- [Visual Direction](./visual-direction.md)

---

**Last Updated**: 2026-03-17
**Maintained By**: visual-director agent

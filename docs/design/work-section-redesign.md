# Work Section Redesign — Research & Direction

**Project**: React Portfolio
**Created**: 2026-03-17
**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Active — Pre-implementation research document

---

## The Problem with the Current Design

The current Work section is a styled vertical list. It has been improved incrementally — the animated pulse on Foyer, the border accent, the `y: -2` hover lift — but all of those changes are cosmetic surgery on the wrong patient. The structure itself is the problem.

**Why it reads as a resume, not a portfolio:**

- Four entries of equal visual weight create no hierarchy. The most important role (Foyer, current) and the earliest role (Agumentik, 4 years ago) fight for the same amount of space.
- Left-border accents are the industry's most overused pattern for experience sections. Every Tailwind starter kit ships this pattern.
- Cards that are "just rectangles" do not communicate that the person who built them has taste. They communicate that the person who built them followed a template.
- The section does not tell a story — it presents data. The progression from Agumentik to Foyer is a narrative of compounding expertise. Nothing in the current layout communicates that arc.

The brand strategy is explicit: this portfolio is for engineering managers and startup CTOs evaluating senior mobile talent. That audience has seen hundreds of left-border timeline experience sections. They will not remember this one.

---

## What Has Been Researched

Research covered:

1. Awwwards SOTD and Honorable Mention portfolios from 2024–2026
2. Codrops portfolio case studies (Stefan Vitasović, Federico Pian, Isabel Moranta)
3. Brittany Chiang v5 and the split-pane sticky pattern it popularized
4. Linear, Vercel, Stripe, and Raycast careers pages
5. Bento grid trend applied to experience sections
6. Codrops sticky section scroll techniques
7. Neo-brutalism and editorial layout directions
8. Interactive accordion patterns

What follows is a set of five specific design patterns, each described with enough detail to implement. They are ordered from most recommended to least recommended for this specific project.

---

## Pattern 1 — The Foyer Takeover

**Concept**: Current role as a full-bleed featured section. Past roles as a compact secondary row beneath it.

**What it does**: The section opens with a large, cinematic treatment of the Foyer role — not a card, but a stage. The role description, the Thine story detail, and the skill tags live in a spacious, asymmetric layout that takes up roughly 60–70% of the section's vertical space. Below this is a horizontal row of three past roles, each compressed into a small, minimal tile — company name, role title, years, nothing else. The visual hierarchy is unmistakable: one current role that dominates, three past roles that contextualise it.

**Layout detail**:

```
┌────────────────────────────────────────────────────────────────┐
│  FOYER                              Dec 2024 — Present         │
│                                                                │
│  Mobile Lead                        // present                 │
│                                                                │
│  Shipping two products simultaneously                          │
│  as the sole mobile decision-maker...                          │
│  One required solving a background audio problem               │
│  Apple's documentation doesn't cover.                          │
│                                                                │
│  Flutter  ·  Swift  ·  iOS Native  ·  AI Integration          │
│                                                                │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← ambient orange glow area  │
└────────────────────────────────────────────────────────────────┘

┌────────────┐  ┌─────────────────┐  ┌──────────┐
│ Appscrip   │  │   PrimoTech     │  │Agumentik │
│ Sr Flutter │  │ Software Dev    │  │Flutter   │
│ 2022–2024  │  │ 2021–2022       │  │2020–2021 │
└────────────┘  └─────────────────┘  └──────────┘
```

**Interaction**: The Foyer block has a subtle ambient glow behind it — a large, soft radial gradient in `rgba(255, 171, 0, 0.04)` that references the Hero section's glow. On scroll entry, the Foyer block does a staggered reveal: the company name enters first, then the role, then the description, then the tags. The three past tiles enter as a group with a single `fadeUp` variant. Hovering a past tile reveals its description in a smooth height animation (max-height: 0 → auto, or AnimatePresence). No past tile description is visible at rest — they require intent to read.

**Why it works for this portfolio**:

The brand strategy says the hero's one job is to make the visitor want to scroll. The Work section's one job is to prove the hero was not overselling. Foyer is where the Thine story lives. It deserves to be treated as a feature, not a list item. This layout immediately signals to an engineering manager: "this person knows what their most important credential is and leads with it."

**What to take from reference sites**:

- The "featured + secondary grid" pattern appears in portfolio sites like Brittany Chiang v5 (sticky pane with featured left, scrollable right) and is widely cited on Awwwards as effective for experience sections.
- The ambient glow treatment echoes the Hero section, creating visual cohesion across sections.
- Codrops' "On-Scroll Animation Ideas for Sticky Sections" (January 2024) documents the staggered entrance pattern.

**What to avoid**: Do not make the Foyer block a card with a border. It should have no visible bounding container — just space, typography, and the ambient glow. A visible border will immediately reassert the "list of cards" feeling.

**Framer Motion implementation sketch**:

```tsx
// Foyer block: staggered children on scroll entry
const foyerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Past role tiles: reveal description on hover via AnimatePresence
// height: 0 → 'auto' using motion.div with initial={{ height: 0 }}
```

**Accessibility**: The three past tiles must still be navigable by keyboard. Each tile should be a `<button>` that toggles an `aria-expanded` attribute and reveals the description for screen readers regardless of CSS state.

---

## Pattern 2 — The Sticky Left / Scrolling Right Split

**Concept**: A two-column layout where the left column is sticky and shows the active role's full detail, while the right column is a scrollable list of all roles. Scrolling through the right column updates the left panel.

**What it does**: This is the "Brittany Chiang pattern" but reimagined for dark theme with much more aggressive visual treatment. The left panel is not a passive display — it is a full-height canvas. The active role's company name appears at 80–100px, the role title at a secondary size, and a line or two of description below. The right column is a compact vertical list of roles with just company, title, and years. As the visitor scrolls past each right-column item (or hovers it), the left panel crossfades to the corresponding role's content.

**Layout detail**:

```
┌─────────────────────────┬──────────────────────────────┐
│ FOYER               [1] │  ✦ Foyer                     │
│                         │    Mobile Lead  2024–Present  │
│ Mobile Lead             │──────────────────────────────│
│                         │    Appscrip                  │
│ "Shipping two products  │    Sr Flutter Dev  2022–2024 │
│  simultaneously as the  │──────────────────────────────│
│  sole mobile decision-  │    PrimoTech                 │
│  maker at an early-     │    Software Dev  2021–2022   │
│  stage AI startup..."   │──────────────────────────────│
│                         │    Agumentik                 │
│  Flutter · Swift        │    Flutter Dev  2020–2021   │
│  iOS Native             │                              │
│           ↑ sticky      │           ↑ scrollable       │
└─────────────────────────┴──────────────────────────────┘
```

**Interaction**: The active item in the right column is marked with an orange dot or a `//` prefix. The left panel transitions between roles using Framer Motion's `AnimatePresence` with a `mode="wait"` crossfade — outgoing content fades out, incoming content fades in. The transition duration is 200ms, fast enough not to feel sluggish.

On mobile the layout collapses to a vertical accordion (Pattern 5 below).

**Why it works**: This pattern forces the visitor to engage with the section rather than passively scroll past it. The sticky panel means the current role description is always visible — it cannot be scrolled away. This is important because the Foyer/Thine detail is the most important content in this section and a fast-scanning engineering manager should not be able to miss it.

**Reference sites**:

- Brittany Chiang (brittanychiang.com) — the canonical implementation of this pattern. Her version uses a two-column layout with sticky left panel. What to take: the sticky architecture, the active indicator. What to avoid: the subdued pastel green palette and the small typography — this portfolio needs more visual weight.
- Andrey Mitko (andreymitko.com) — Awwwards-featured experience section built with grid and layout components. Noted for clean hierarchy in a structured layout.
- frontend.fyi's Framer Motion scroll animation course — documents the exact `position: sticky` + `useScroll` pattern needed.

**Implementation concern**: With only four roles, the right column will be very short. The sticky panel may sit in an awkward blank space after the user scrolls past all four roles. Solution: give the outer container `min-height: 100vh` and ensure the sticky panel is `position: sticky; top: 10vh; align-self: start`. The four roles in the right column can have generous padding (`py-12`) so the section has enough scroll height to feel deliberate.

**Framer Motion implementation sketch**:

```tsx
const [activeJob, setActiveJob] = useState(workExperience[0])

// Right column: each item sets activeJob on hover or focus
// Left panel: AnimatePresence mode="wait" wrapping job detail content
// Key prop on the inner motion.div triggers exit/enter
<AnimatePresence mode="wait">
  <motion.div
    key={activeJob.id}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2 }}
  >
    {/* active job content */}
  </motion.div>
</AnimatePresence>
```

---

## Pattern 3 — The Timeline Reimagined as a Horizontal Track

**Concept**: Not a vertical list. A horizontal track where the visitor scrubs through roles, or where roles are revealed left-to-right as a career progression.

**What it does**: This is not the horizontal scroll pattern that feels like a carousel. It is a fixed section that uses scroll-linked animation to move through a horizontal track of roles. The section pins to the viewport. As the visitor scrolls down, the content moves horizontally. Foyer is on the right (most recent) and takes up the most horizontal space. Agumentik is on the far left and is the smallest.

This creates a genuine "narrative of progression" — the career story moves left to right, small to large, and the visitor experiences time passing as they scroll.

**Layout detail** (from a bird's-eye view):

```
← SCROLL RIGHT →

[Agumentik, small]  [PrimoTech, medium]  [Appscrip, medium-large]  [FOYER, large]
  2020–2021           2021–2022            2022–2024                  2024–Present
```

**Interaction**: The section uses a tall wrapper (`height: 400vh`) with `position: sticky` on the inner container. Framer Motion's `useScroll` maps scroll progress (0 → 1) to a horizontal translateX of the track. Each role card's opacity and scale is also tied to scroll progress — past roles are slightly dimmer and smaller, the current role is full brightness and size.

**Why it might work**: This is genuinely different from anything the target audience (engineering managers) will have seen in a developer portfolio. It treats the career as a timeline in the most literal, spatial sense. The visual progression from small to large reinforces the "compounding expertise" narrative from the brand strategy.

**Why it might not work**: With only four roles, the horizontal track may feel thin. The technique is most impactful with 6–8 items. At four items, each card needs to be wide enough (possibly 40–50% of viewport width for Foyer, 20–25% for earlier roles) to fill the track convincingly. The mobile fallback also requires significant work — horizontal scroll-linked animations generally degrade to a simple vertical list on mobile, which means building two separate layouts.

**Reference techniques**:

- Codrops "Sticky Grid Scroll" (March 2026) — documents a scroll-driven animated grid with phase-based transitions. The core technique (tall wrapper, sticky inner container, scroll-linked transforms) is directly applicable.
- Codrops "Smooth Panel Scroll Effects" (October 2022) — still the canonical reference for scroll-linked panel animations in CSS/JS.
- Stefan Vitasović's 2025 portfolio (stefanvitasovic.dev) — Awwwards SOTD, uses scroll-linked typographic animations and shader effects. The principle of scroll-as-timeline is present throughout.

**Verdict**: Ambitious. If executed at the quality level the brand strategy demands, it would be genuinely memorable. But it is the highest-effort option and the most likely to feel gimmicky if the execution is even slightly off. Recommended only if the horizontal scroll feeling can be validated in a rapid prototype first.

---

## Pattern 4 — The Bento Grid with Role Cards

**Concept**: The four roles become asymmetric bento cells rather than list items. Foyer gets the largest cell. The three past roles share the remaining space in smaller cells.

**What it does**: This is the Apple marketing page pattern applied to work experience. The grid is not a uniform 2x2 — it is intentionally asymmetric. Foyer occupies a large, spanning cell (e.g., `col-span-2, row-span-2` in a 3-column grid). The three past roles each occupy one smaller cell. Each cell is a distinct surface with its own content treatment.

**Foyer cell content**:
- Large company name (50–60px)
- Role title
- Full description (2–3 sentences)
- Skill tags
- A subtle orange ambient glow in the top-right corner
- A `// present` pulse in the top-left corner

**Past role cell content**:
- Company name (medium, 24–28px)
- Role title
- Duration only (no description at rest)
- On hover: description slides up from bottom of cell

**Layout detail**:

```
┌──────────────────────────┬───────────────┐
│                          │   Appscrip    │
│   FOYER                  │   Sr Flutter  │
│   Mobile Lead            │   2022–2024   │
│   Dec 2024 — Present     ├───────────────┤
│                          │   PrimoTech   │
│   Description...         │   Software Dev│
│   Flutter · Swift · iOS  │   2021–2022   │
│                          ├───────────────┤
└──────────────────────────│   Agumentik   │
                           │   Flutter Dev │
                           │   2020–2021   │
                           └───────────────┘
```

**Why it works**: The bento grid is the dominant visual trend for 2025–2026 portfolio sections. It is used everywhere from Apple's marketing pages to Awwwards-winning portfolios. The asymmetric cell sizes are a direct visual encoding of importance — the large cell communicates "this is what matters" without a single word of explanation.

**What to take from reference sites**:

- bentogrids.com and the Muzli Bento UI Grids article document how major brands (Apple, Notion, GitHub) use this pattern. The key principle: cells should feel like they belong to a system, not like random rectangles.
- The Varshith Hegde interactive bento portfolio (DEV Community) demonstrates physics-based card interactions within a bento layout — worth reviewing for micro-interaction ideas.
- Building a Premium Bento-Style Portfolio with React, GSAP & Tailwind v4 (DEV Community) — documents a direct implementation in the same stack (React + Tailwind) being used here.

**What to avoid**: Do not add borders to all cells. Borders create a grid-within-a-grid feeling that looks like a spreadsheet. Use `gap` between cells and let the background color differentiation (`bg-card` vs `bg-elevated`) create the visual separation.

**Framer Motion implementation sketch**:

```tsx
// Hover on past role cells: description reveal
// Using layoutId is not needed here — just a conditional height animation
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
  transition={{ duration: 0.25 }}
>
  {job.description}
</motion.div>

// Foyer cell: scroll-reveal stagger on entrance
// Standard containerVariants / itemVariants already in codebase
```

**Mobile**: The bento grid collapses to a single column on mobile. Foyer cell maintains its larger visual weight by being taller than the others (`min-height` difference). Past roles collapse to compact rows.

---

## Pattern 5 — The Narrative Accordion

**Concept**: All four roles are visible as labeled rows. Foyer is pre-expanded (not collapsed). Past roles are collapsed to a single line. Expanding a past role reveals its content in place, and the animation makes it feel like opening a chapter, not toggling a UI element.

**What it does**: This is not a traditional accordion. The key differences:

1. Foyer is never collapsed — it is the default open state and has no toggle mechanism. Its content is always visible.
2. Past roles are collapsed by default but have enough visual information in the collapsed state (company, role, years, skill preview) that they communicate without requiring expansion.
3. The expansion animation is slow (400ms, ease-out-expo) and uses a `scaleY` origin at the top so content appears to "unfurl" rather than jump.
4. Only one past role can be open at a time (accordion behavior, not independent toggles).

**Layout detail**:

```
┌────────────────────────────────────────────────────────────┐
│  FOYER  ·  Mobile Lead  ·  Dec 2024 — Present  // present  │
│                                                            │
│  Shipping two products simultaneously as the sole          │
│  mobile decision-maker...                                  │
│                                                            │
│  Flutter  ·  Swift  ·  iOS Native  ·  AI Integration      │
└────────────────────────────────────────────────────────────┘

  ──────────────────────────────────────────────────────────

  Appscrip  ·  Sr Flutter Developer  ·  2022 – 2024   [+ expand]

  ──────────────────────────────────────────────────────────

  PrimoTech  ·  Software Developer  ·  2021 – 2022    [+ expand]

  ──────────────────────────────────────────────────────────

  Agumentik  ·  Flutter Developer  ·  2020 – 2021     [+ expand]
```

**Interaction**: The `[+ expand]` indicator is a small `+` or `→` icon that rotates to `×` or `↓` when expanded. The height animation uses Framer Motion's `AnimatePresence` with a `motion.div` wrapping the collapsible content. The section heading for past roles is slightly smaller (18–20px) than Foyer's heading (24–28px) to reinforce hierarchy even in collapsed state.

**Why it works**: This pattern respects the reading contract — the visitor can understand Jatin's career without any interaction, because all roles are visible in collapsed form. Expansion is for visitors who want depth. The structure is also honest: it visually communicates "Foyer is what matters now, these are context."

**What to take from reference sites**:

- The uiCookies CSS accordion collection (39 Best CSS Accordion Examples 2026) shows how the `+` to `×` rotation pattern creates a clean affordance without icon libraries.
- Subframe's CSS Horizontal Accordion Examples show how accordion behavior can feel premium when the animation timing is right — the lesson is that 200ms is too fast (feels like a toggle, not a reveal) and 600ms is too slow (feels like loading). 350–400ms with ease-out-expo is the target.

**Framer Motion implementation sketch**:

```tsx
// For each past role:
const [isOpen, setIsOpen] = useState(false)

<motion.div
  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
  initial={false}
  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
  style={{ overflow: 'hidden' }}
>
  <div className="pt-4 pb-6">
    <p>{job.description}</p>
    <div className="flex gap-2 mt-3">
      {job.skills.map(s => <TechTag key={s}>{s}</TechTag>)}
    </div>
  </div>
</motion.div>
```

---

## Comparative Recommendation

| Pattern | Premium Feel | Technical Risk | Mobile Simplicity | Brand Alignment |
|---------|-------------|----------------|-------------------|-----------------|
| 1 — Foyer Takeover | Very High | Low | High | Best |
| 2 — Sticky Left Split | High | Medium | Medium | Very Good |
| 3 — Horizontal Track | Potentially Highest | High | Low | Good |
| 4 — Bento Grid | High | Low-Medium | High | Good |
| 5 — Narrative Accordion | Good | Very Low | Best | Good |

**Primary Recommendation: Pattern 1 — The Foyer Takeover**

It has the clearest alignment with the brand strategy. The entire portfolio is built around the idea that Jatin's current role at Foyer — specifically the Thine background audio problem — is the anchor proof point. The Work section must reinforce this, not dilute it by giving equal space to four jobs. Pattern 1 does what none of the other patterns do as cleanly: it makes the hierarchy of importance *spatially obvious* before the visitor reads a single word.

It is also the lowest technical risk of the four ambitious options. No scroll-linked transforms, no IntersectionObserver cursor tracking, no complex state machines — just layout, generous typography, and Framer Motion entrance animations that are already proven in the codebase.

**Secondary Recommendation: Pattern 2 — The Sticky Left Split**

If the team wants maximum interactivity and a more "app-like" feel, Pattern 2 is the right choice. It requires more state management and the hover-to-update-panel interaction adds complexity, but the payoff is a section that actively invites exploration rather than passively presenting data.

**Do not implement Pattern 3 first**. Build and validate it in a separate branch. The horizontal track is the most memorable option if done at the quality level of a Codrops featured article. It is also the most fragile — the detail required to make it feel intentional rather than gimmicky is significant.

---

## What None of These Patterns Should Do

These are explicit prohibitions derived from the brand strategy and design system:

1. **No left-border accent as the primary design element.** The current `border-l-2 border-subtle` pattern is the single most common design treatment for experience sections on the web. Do not replicate it even if it is the base layer.

2. **No equal visual weight across all four roles.** Foyer must dominate. Any layout that gives Agumentik the same spatial footprint as Foyer misrepresents the career.

3. **No dividers between every row at rest.** Dividers impose a list structure. Use space and typographic scale to separate entries instead.

4. **No role titles at the same size as job descriptions.** There must be a clear scale jump between the primary information (company, title) and secondary information (description, dates, skills).

5. **No decorative timeline dots or line graphics.** These are visual noise that add nothing. The temporal progression should be communicated by date labels and scale, not by a literal line with dots.

6. **No "View Resume" CTA inside the Work section.** This undercuts the entire "passive presence, not active outreach" positioning of the brand. If a resume link exists anywhere on the site, it belongs in the Contact section, not in the Work section where it reads as defensive.

---

## Orange Usage in the Work Section

Following the color system rules:

- **Foyer/present indicator**: `text-primary` (#FFAB00) for the `// present` label, `bg-primary/70` animated pulse for any presence signal.
- **Active state in Pattern 2 (left panel)**: Orange dot (`·`) or prefix next to the active role in the right column. Not orange text on the entire row — just the active indicator.
- **Hover glow on the Foyer block (Pattern 1)**: Ambient radial gradient at `rgba(255, 171, 0, 0.04)` — barely perceptible, just enough to make the Foyer area feel "warmer" than the rest.
- **Skill tags**: `TechTag` component in neutral variant (already established in the design system — no orange on tags).
- **No orange headings in the Work section.** The company names and role titles should be `text-heading` (#F3F4F6), not orange. Orange is the Hero section's primary tool. In Work, it appears as accent only — the `// present` label, the active state indicator, the hover glow. This preserves the brand rule: if you removed all orange from this section, it should feel dimmer but not lifeless.

---

## Section Heading

The current heading "The work that shaped how I build." is strong. It passes the brand voice test (specific, human, not corporate). It should stay regardless of which layout pattern is chosen.

One modification worth considering for Pattern 1: make the section heading smaller than the Foyer company name. The section heading is a label, not a feature. If `FOYER` appears at 60–70px and the section heading is 40–44px, the hierarchy is clear. The section heading introduces the section; Foyer owns it.

---

## Suggested Next Step

Before implementing, create a 30-minute prototype of Pattern 1 using only HTML and Tailwind in the existing codebase — no Framer Motion yet. The goal is to validate the spatial hierarchy. If the `FOYER` block feels dominant and the three small tiles feel appropriately secondary, the layout is right. Add Framer Motion animations only after the layout passes the static test.

If Pattern 1 passes the static test, the implementation sequence should be:

1. Layout: two-row structure, Foyer block + three-tile grid
2. Typography: scale and weight hierarchy
3. Entrance animation: staggered reveal on the Foyer block, single-wave on the tile row
4. Hover state: tile height expansion revealing description
5. Orange accents: `// present` pulse, ambient glow

Total estimated implementation time: 2–3 hours for a production-quality result.

---

## Related Documents

- [brand-strategy.md](../brand/brand-strategy.md) — Voice, positioning, and the Thine story anchor
- [visual-direction.md](./visual-direction.md) — Aesthetic direction, orange philosophy
- [portfolio-copy.md](../content/portfolio-copy.md) — Work section copy

---

## Sources Consulted

- [Awwwards Portfolio Category](https://www.awwwards.com/websites/winner_category_portfolio/)
- [Cyd Stumpel Portfolio 2025 — Awwwards SOTD](https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025)
- [Experience Section — Andrey Mitko — Awwwards](https://www.awwwards.com/inspiration/experience-section-andrey-mitko-portfolio)
- [Stefan Vitasović Portfolio 2025 — Codrops Case Study](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/)
- [On-Scroll Animation Ideas for Sticky Sections — Codrops](https://tympanus.net/codrops/2024/01/31/on-scroll-animation-ideas-for-sticky-sections/)
- [Sticky Grid Scroll — Codrops](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [Smooth Panel Scroll Effects — Codrops](https://tympanus.net/codrops/2022/10/12/smooth-panel-scroll-effect/)
- [Brittany Chiang Portfolio](https://brittanychiang.com/)
- [Bento Grid Design Inspiration — Mukesh K Designs](https://mukeshkdesigns.com/blogs/bento-grid-design-inspiration/)
- [Building a Premium Bento-Style Portfolio with React, GSAP & Tailwind v4 — DEV Community](https://dev.to/kiran_balaji_197/building-a-premium-bento-style-portfolio-with-react-gsap-tailwind-v4-2ig8)
- [Interactive Bento Grid Experience — DEV Community](https://dev.to/varshithvhegde/portfolio-interactive-bento-grid-experience-4nfc)
- [Scroll Animations with position sticky — frontend.fyi](https://www.frontend.fyi/course/motion/06-scroll-animations/08-scroll-animations-with-position-sticky)

---

**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Active
**Maintained By**: visual-director agent

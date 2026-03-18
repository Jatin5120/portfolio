# Work Section Layout Proposals

**Project**: React Portfolio
**Created**: 2026-03-17
**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Draft — Awaiting Selection

---

## Context

### What the Section Must Accomplish

This section carries a specific narrative burden. The current role at Foyer is the story the entire portfolio builds toward — solo mobile decision-maker, two simultaneous products, an iOS background audio problem Apple's documentation does not cover. The three prior roles are not equal siblings. They are the evidence that the current role was earned, not assumed.

The layout must make this hierarchy physically legible without resorting to the patterns that flatten it (equal-weight lists, card grids, timelines) or fragment it (tabs, dashboards).

### Why the Current Layout Falls Short

The existing `FoyerCard + // previously + 3-column grid` structure is technically correct in its hierarchy, but it reads as "featured card + supporting cards" — a well-known portfolio pattern that hiring managers have seen enough times to process without stopping. The featured card's rectangular container puts it in the same formal register as the three tiles below it, just larger. The `// previously` label does the structural work in text that the layout should do visually.

### Data

- Entry 1 (Foyer): Mobile Lead, Dec 2024 — Present, Bangalore. Two products. One engineer. Zero documentation. Tagline, full description, 5 skills.
- Entry 2 (Appscrip): Senior Flutter Developer, Oct 2022 — Nov 2024. One monorepo, four products. 3 skills.
- Entry 3 (PrimoTech): Software Developer, Jun 2021 — Sep 2022. Two full rewrites, 95% issues resolved. 3 skills.
- Entry 4 (Agumentik): Flutter Developer, Apr 2020 — May 2021. First production apps, 23% user satisfaction improvement. 3 skills.

### Constraints

- Max container width: ~800px (centered on wider viewports)
- Mobile breakpoint: 375px minimum
- React + Tailwind CSS
- Dark background
- No colors, animations, or hover states in scope — structure only

---

## Proposal 1: The Asymmetric Editorial Split

### Concept

Borrowed from magazine feature layouts — specifically how publications like Wired or Bloomberg Businessweek handle a major story alongside sidebar context. The current role occupies a wide left column that bleeds into most of the horizontal space. The past roles are stacked in a narrow right column that reads as marginalia: present but subordinate.

The asymmetry is the hierarchy. The eye reads left-heavy layouts as "the story is here, the context is there." No label required.

### Desktop Layout (800px container)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SECTION HEADING                                                          │
│  The work that shaped how I build.                                        │
└──────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────┐  ┌──────────────────────────────┐
│                                       │  │                              │
│  FOYER                                │  │  Appscrip                    │
│  Mobile Lead                          │  │  Senior Flutter Developer    │
│  Dec 2024 — Present  // present       │  │  Oct 2022 — Nov 2024         │
│                                       │  │  One monorepo, four...       │
│  Two products. One engineer.          │  │  [skill] [skill] [skill]     │
│  Zero documentation.                  │  │                              │
│                                       │  ├──────────────────────────────┤
│  [Full description paragraph]         │  │                              │
│                                       │  │  PrimoTech                   │
│  [skill] [skill] [skill]              │  │  Software Developer           │
│  [skill] [skill]                      │  │  Jun 2021 — Sep 2022         │
│                                       │  │  Two full rewrites...        │
│                                       │  │  [skill] [skill] [skill]     │
│                                       │  │                              │
│                                       │  ├──────────────────────────────┤
│                                       │  │                              │
│                                       │  │  Agumentik                   │
│                                       │  │  Flutter Developer           │
│                                       │  │  Apr 2020 — May 2021         │
│                                       │  │  First production apps...    │
│                                       │  │  [skill] [skill] [skill]     │
│                                       │  │                              │
└───────────────────────────────────────┘  └──────────────────────────────┘
         ~58% width                               ~38% width
         (approx 460px)                           (approx 300px)
```

**Column ratio**: approximately 3:2. Not 2:1 (too aggressive, right column becomes unreadable) and not 1:1 (defeats the hierarchy purpose).

**Vertical alignment**: The left column base aligns flush with the bottom of the third past role. The left column's content does not need to fill all the vertical space — white space in the lower-left is intentional and signals that the main story does not need to fill space to justify its dominance.

### Mobile Layout (375px)

On mobile the two-column structure collapses to a single column. The narrative logic must be preserved through typographic scale rather than spatial positioning.

```
┌───────────────────────────────┐
│  SECTION HEADING              │
│  The work that shaped         │
│  how I build.                 │
└───────────────────────────────┘

┌───────────────────────────────┐
│                               │
│  FOYER                        │  ← Larger type, more padding,
│  Mobile Lead                  │     treated as the main story
│  Dec 2024 — Present           │
│  // present                   │
│                               │
│  Two products. One engineer.  │
│  Zero documentation.          │
│                               │
│  [Full description]           │
│                               │
│  [skill] [skill] [skill]      │
│  [skill] [skill]              │
│                               │
└───────────────────────────────┘

  ─────────────────────────────
  Previously
  ─────────────────────────────

┌───────────────────────────────┐
│  Appscrip                     │  ← Smaller type, tighter padding
│  Senior Flutter Developer     │
│  Oct 2022 — Nov 2024          │
│  One monorepo, four...        │
│  [skill] [skill] [skill]      │
└───────────────────────────────┘

┌───────────────────────────────┐
│  PrimoTech                    │
│  Software Developer           │
│  Jun 2021 — Sep 2022          │
│  Two full rewrites...         │
│  [skill] [skill] [skill]      │
└───────────────────────────────┘

┌───────────────────────────────┐
│  Agumentik                    │
│  Flutter Developer            │
│  Apr 2020 — May 2021          │
│  First production apps...     │
│  [skill] [skill] [skill]      │
└───────────────────────────────┘
```

**The divider label on mobile** ("Previously") is not redundant here — on a single column, the eye needs a signal that the register is changing. Unlike on desktop where spatial position does this work, on mobile the label is doing structural work, not decorative work.

### Why This Creates Hierarchy

The mechanism is spatial weight. In Western reading patterns, the left side of a two-column layout carries the story. The right side carries context. There is no ambiguity about which column matters. The Foyer entry does not need a "featured" badge, a different background color, or a special border treatment to announce its importance. Its position and proportional width do that before the text is read.

The past roles in the right column also benefit: stacked vertically in a narrow column, they read as a progression — a vertical ladder — rather than three equal options on a grid.

### Real Site Reference

Stripe's engineering blog uses a near-identical 3:2 asymmetric split to distinguish the featured article from the article index on the right. The left column is the read; the right column is the archive. The structural grammar is the same as what is proposed here.

Personal portfolio reference: Josh W. Comeau's portfolio (joshwcomeau.com) uses spatial asymmetry on his articles section — the main content column significantly outweighs the sidebar, and the sidebar content clearly reads as supporting material without needing a label.

---

## Proposal 2: The Cinematic Scroll Stage

### Concept

Borrowed from editorial long-form features and cinematic title sequences — specifically how film credits distinguish the director from the cast. The current role is presented as a full-width stage: company name at large scale, role title, then a brief narrative block. Below the stage, the three past roles are presented in a single horizontal row, much smaller, at a fixed compact height — the credits.

The key structural move: the Foyer entry occupies full container width with generous vertical space, no surrounding box, no card. It exists in open space. The past roles are constrained to a short, dense horizontal band at the bottom. The contrast in spatial treatment is the hierarchy.

### Desktop Layout (800px container)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SECTION HEADING                                                          │
│  The work that shaped how I build.                                        │
└──────────────────────────────────────────────────────────────────────────┘

  [vertical space ~32px]

  FOYER                                               Dec 2024 — Present
  ──────────────────────────────────────────────────────────────────────
  Mobile Lead

  Two products. One engineer. Zero documentation.

  Sole mobile decision-maker at an early-stage AI startup...
  [full description paragraph, max ~65 chars/line]

  [skill] [skill] [skill] [skill] [skill]

  [vertical space ~48px]

  ──────────────────────────────────────────────────────────────────────

  [vertical space ~24px]

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  Appscrip           │  │  PrimoTech          │  │  Agumentik          │
│  Sr. Flutter Dev    │  │  Software Dev       │  │  Flutter Dev        │
│  Oct 2022 – Nov 2024│  │  Jun 2021 – Sep 2022│  │  Apr 2020 – May 2021│
│                     │  │                     │  │                     │
│  [brief line]       │  │  [brief line]       │  │  [brief line]       │
│                     │  │                     │  │                     │
│  [sk] [sk] [sk]     │  │  [sk] [sk] [sk]     │  │  [sk] [sk] [sk]     │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

**Key structural detail**: The Foyer entry has no surrounding container — no card border, no background fill. It lives in the page's negative space. The horizontal rule above and below it define its bounds without boxing it. The past roles below the second rule are explicitly "contained" in cards, which signals that they are archival, not primary.

**The visual logic**: Boxed things are archived. Open things are live.

### Mobile Layout (375px)

```
┌───────────────────────────────┐
│  SECTION HEADING              │
└───────────────────────────────┘

  FOYER
  ─────────────────────────────
  Mobile Lead
  Dec 2024 — Present

  Two products. One engineer.
  Zero documentation.

  [Full description]

  [skill] [skill] [skill]
  [skill] [skill]

  ─────────────────────────────

  [vertical space ~16px]

┌───────────────────────────────┐
│  Appscrip                     │
│  Sr. Flutter Developer        │
│  Oct 2022 – Nov 2024          │
│  [brief line]                 │
│  [sk] [sk] [sk]               │
└───────────────────────────────┘

┌───────────────────────────────┐
│  PrimoTech                    │
│  Software Developer           │
│  Jun 2021 – Sep 2022          │
│  [brief line]                 │
│  [sk] [sk] [sk]               │
└───────────────────────────────┘

┌───────────────────────────────┐
│  Agumentik                    │
│  Flutter Developer            │
│  Apr 2020 – May 2021          │
│  [brief line]                 │
│  [sk] [sk] [sk]               │
└───────────────────────────────┘
```

On mobile the "open vs contained" logic survives: Foyer is open space, the past roles are boxed. The horizontal rules on mobile should be thinner and shorter (not full width) to match the more intimate reading scale.

### Why This Creates Hierarchy

This layout uses a principle from environmental design: things in open space are important; things in containers are catalogued. A painting hangs on an open wall. Reference books go on shelves.

The Foyer entry is the painting. The three past roles are the shelf.

The rule lines do double duty: they separate zones (present vs. past) and they frame the Foyer entry the way a gallery uses wall space to frame an artwork. The content does not need a "featured" label because the treatment says it without words.

This approach also solves a secondary problem: the Foyer entry's description is substantive and earns full-width reading. Putting it in a left column (as in Proposal 1) forces line wrapping that interrupts narrative flow in the long description.

### Real Site Reference

Guillermo Rauch's personal site (rauchg.com) uses a similar "open main + contained index" structure for his writing. The most recent or important entry sits in open typography; older entries are listed compactly below. The absence of a container around the primary item is the signal.

Linear's changelog page (linear.app/changelog) uses horizontal rules rather than cards to separate major releases from minor entries — the spatial weight of the rule itself signals category, not a header label.

---

## Proposal 3: The Narrative Column with Scale Contrast

### Concept

Rather than two-dimensional space (left/right or open/boxed), this layout uses typographic scale as the primary hierarchy signal. The Foyer entry is treated as a typographic feature — company name at display scale, role title large, description at normal reading size. The past roles are presented at a visibly smaller scale in a single column beneath it. No cards anywhere. Everything in the same column, separated only by vertical rhythm.

This is the layout pattern used by personal essays, longform journalism, and designer portfolios that want to feel like editorial work rather than UI. The information architecture is entirely through scale, weight, and vertical spacing.

### Desktop Layout (800px container)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SECTION HEADING                                                          │
│  The work that shaped how I build.                                        │
└──────────────────────────────────────────────────────────────────────────┘

  [vertical space ~48px]

  FOYER                                               [display scale ~48px]
  Mobile Lead · Dec 2024 — Present · Bangalore        [medium ~16px]

  Two products. One engineer. Zero documentation.     [semi-bold ~20px]

  Sole mobile decision-maker at an early-stage...     [body ~16px, max 680px]
  [full description, two sentences]

  [skill] [skill] [skill] [skill] [skill]

  [vertical space ~64px]

  ────────────  Past Roles  ────────────              [label centered, muted]

  [vertical space ~32px]

  Appscrip                                            [~24px]
  Senior Flutter Developer · Oct 2022 — Nov 2024      [~14px]
  One monorepo, four products — healthcare,           [~14px body]
  fintech, transport, and social...
  [skill] [skill] [skill]

  [vertical space ~24px]

  PrimoTech                                           [~24px]
  Software Developer · Jun 2021 — Sep 2022            [~14px]
  Full rewrites of two debt-ridden codebases...       [~14px body]
  [skill] [skill] [skill]

  [vertical space ~24px]

  Agumentik                                           [~24px]
  Flutter Developer · Apr 2020 — May 2021             [~14px]
  First production apps. Three clients...             [~14px body]
  [skill] [skill] [skill]
```

**The structural rule**: Past role company names are approximately half the visual weight of "FOYER" at display scale. This is not subtle — the scale difference must be perceptible on scan, not just on close reading.

**No cards**: Every entry is in the same spatial register. The hierarchy comes entirely from type scale. This creates a more literary, editorial feeling — closer to a written profile than a structured UI.

### Mobile Layout (375px)

```
┌───────────────────────────────┐
│  SECTION HEADING              │
└───────────────────────────────┘

  FOYER                            ← ~36px
  Mobile Lead                      ← ~15px
  Dec 2024 — Present · Bangalore

  Two products. One engineer.      ← ~17px semi-bold
  Zero documentation.

  [Full description paragraph]     ← ~14px

  [skill] [skill] [skill]
  [skill] [skill]

  ── Past Roles ──                 ← muted divider

  Appscrip                         ← ~20px
  Senior Flutter Developer         ← ~13px
  Oct 2022 — Nov 2024
  One monorepo, four products...   ← ~13px
  [sk] [sk] [sk]

  PrimoTech                        ← ~20px
  Software Developer
  Jun 2021 — Sep 2022
  Two full rewrites...
  [sk] [sk] [sk]

  Agumentik                        ← ~20px
  Flutter Developer
  Apr 2020 — May 2021
  First production apps...
  [sk] [sk] [sk]
```

On mobile, the scale contrast survives because the type sizes remain proportionally different. The display "FOYER" at 36px versus past role company names at 20px is a clear signal even on a narrow viewport. No column restructuring needed.

### Why This Creates Hierarchy

This layout trusts type to do the work that layout normally does. It is the least "designed" of the three proposals in the UI sense, and the most editorial. That aligns with the brand strategy's goal of feeling like a curated gallery rather than a structured dashboard.

The risk is that it may read as under-designed on first glance. The payoff is that it reads as confident — a designer or engineering manager who trusts their content does not need to frame it in boxes. The absence of containers is a signal in itself.

This layout also makes the career arc most legible as a story. Reading from top to bottom, the company names shrink as you go further back. The progression is physically encoded in the typography.

### Real Site Reference

Paco Coursey's portfolio (paco.me) uses pure typographic hierarchy with no cards. His work entries are separated by scale and spacing only. It reads as extremely confident precisely because nothing is boxed.

Dan Abramov's personal site uses a similar approach for his writing — the important entry is at a larger scale, the list below it is visibly smaller, and no container delineates them. The type hierarchy is the layout.

---

## Comparative Analysis

| Dimension | Proposal 1 (Asymmetric Split) | Proposal 2 (Cinematic Stage) | Proposal 3 (Scale Contrast) |
|---|---|---|---|
| Hierarchy mechanism | Spatial (left/right columns) | Spatial + containment (open vs boxed) | Typographic (scale only) |
| Memorability | High — unusual two-column for experience sections | High — gallery/stage metaphor is distinctive | Medium — elegant but subtle |
| Risk | Past role column feels narrow at 300px | Foyer entry may feel disconnected without a container | May read as unfinished without clear separation |
| Mobile behavior | Graceful collapse to stacked single-column | Graceful collapse, same open/boxed logic survives | No restructuring needed, scale survives |
| Max container width match | Best — the 3:2 split fills 800px naturally | Good — full-width stage plus 3-column cards fits well | Good — single column is naturally narrow, fits ~680px reading width |
| Brand fit | Curated gallery, confident | Digital studio, editorial | Literary, craftsman |
| Implementation complexity | Medium — CSS grid with span logic | Low — two sections with a rule | Low — typography and spacing only |
| Closest analogy | Magazine feature layout | Film credits / gallery wall | Long-form essay / personal essay |

---

## Recommendation

**Proposal 2 (Cinematic Stage) for desktop, with Proposal 3's typographic logic applied to the Foyer entry.**

The most effective version of this section combines both approaches: the Foyer entry lives in open space (Proposal 2's insight — no container) with display-scale typography for the company name (Proposal 3's insight — scale is the signal). The past roles sit below a rule in compact, card-contained format (three columns on desktop, single column on mobile).

The key change from the current implementation: remove the card container from the Foyer entry. The FoyerCard's `bg-card` background, border, and rounded corners put it in the same formal register as the past role tiles. Removing the container and letting it live in open space is the single structural change that would make the hierarchy feel premium rather than templated.

The left-edge pulse animation and ambient glow currently in the FoyerCard survive this change — they become even more distinctive when the entry has no surrounding box, because they appear as raw light rather than card decoration.

---

## Implementation Notes

These are structural observations for the component designer. Colors, animations, and hover states are out of scope for this document.

### Proposal 2 Implementation Sketch

```
<section>
  <SectionHeading />

  {/* ── Open stage: Foyer entry, no container ── */}
  <div className="py-8 lg:py-12">
    {/* Company name at display scale */}
    {/* Role + duration + location inline */}
    {/* Tagline at semi-bold body scale */}
    {/* Description at normal body */}
    {/* Skill tags */}
  </div>

  {/* ── Rule + label ── */}
  <hr />

  {/* ── Past roles: contained, 3-column desktop / 1-column mobile ── */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
    {/* Each past role in a card container */}
  </div>
</section>
```

### Proposal 1 Implementation Sketch

```
<section>
  <SectionHeading />

  <div className="grid grid-cols-[3fr_2fr] gap-8 items-start">
    {/* Left column: Foyer entry, full height */}
    <div>
      {/* Full Foyer content */}
    </div>

    {/* Right column: Past roles stacked */}
    <div className="flex flex-col gap-4">
      {pastRoles.map(job => <PastRoleTile />)}
    </div>
  </div>
</section>

{/* Mobile: grid-cols-1, Foyer first, past roles after */}
```

### Proposal 3 Implementation Sketch

```
<section>
  <SectionHeading />

  {/* Foyer at display scale — no wrapper needed */}
  <h2 className="text-5xl font-bold">{foyer.company}</h2>
  <p className="text-base text-secondary">{foyer.role} · {foyer.duration}</p>
  <p className="text-xl font-semibold mt-4">{foyer.tagline}</p>
  <p className="text-base mt-3">{foyer.description}</p>
  <SkillTags />

  {/* Rule */}
  <div className="flex items-center gap-4 my-12">
    <hr className="flex-1" />
    <span className="text-tertiary text-xs uppercase tracking-widest">Past Roles</span>
    <hr className="flex-1" />
  </div>

  {/* Past roles at smaller scale */}
  {pastRoles.map(job => (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold">{job.company}</h3>
      <p className="text-sm text-secondary">{job.role} · {job.duration}</p>
      <p className="text-sm mt-2">{job.description}</p>
      <SkillTags small />
    </div>
  ))}
</section>
```

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md)
- [Portfolio Copy](../content/portfolio-copy.md)

---

**Last Updated**: 2026-03-17
**Maintained By**: UX Architect Agent

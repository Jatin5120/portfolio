# Work Section — Metrics-First Copy

**Project**: React Portfolio
**Created**: 2026-03-18
**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Status**: Active

---

## Overview

This document defines the metrics-first copy layer for the Work section. It extracts one
hero metric per role, writes a tight label and a single context sentence for each, and
addresses the section heading question. The data powers a visual treatment where the
NUMBER is the primary anchor — displayed at large display size — not the company name
or job title.

Source data: `src/data/work-experience.ts`
Section component: `src/sections/Work.tsx`
Brand voice reference: `docs/brand/brand-strategy.md`

---

## The Design Principle at Work

Alex Nguyen's approach — and the portfolios that influenced this request — use metrics
as visual anchors because a number performs two jobs simultaneously: it carries
information AND it stops the eye. "300%" stops the eye in a way that "significant
improvement" does not. The number forces a second of attention; the label earns the
next three seconds; the context sentence closes the loop.

The principle from the brand strategy applies directly: "Be specific. 'Reduced load
time from 4s to 0.8s' not 'Made it faster.'" Numbers are the most credible copy in the
document. The Work section is the right place to lead with them.

---

## Hero Metrics by Role

---

### Foyer — Mobile Lead (Current)

**Hero Metric:**
```
3–4%
```

**Label (3–5 words):**
```
Battery drain. Per hour. All night.
```

**Context sentence (15–25 words):**
```
iOS background audio that survives lock screens, OS kill cycles, and memory
pressure — three rewrites to get there.
```

**Character count (label):** 32
**Character count (context):** 95
**Word count (context):** 17

**Rationale:**
"3–4%" is the clock. It is the specific number that makes the Thine story real. A CTO
looking at that figure knows immediately what it means: someone instrumented the battery
draw, ran it overnight, and measured it. You do not get to "3–4% per hour" by guessing.
The label uses short sentences rather than a phrase — three beats that build: what it
is, when it applies, for how long. The context sentence names the technical obstacles
without turning into a tech stack list.

**Alternative label (if shorter is needed):**
```
All night. 3% battery.
```

**Alternative context (if the section shows company/role separately):**
```
Apple's documentation stops before this problem starts. Three rewrites to get past
where the map ends.
```
_Character count: 84 | Word count: 17_

---

### Appscrip — Senior Flutter Developer

**Hero Metric:**
```
4
```

**Label (3–5 words):**
```
Products. One codebase.
```

**Context sentence (15–25 words):**
```
Healthcare, fintech, transport, and social — all shipping from one monorepo, with
real-time chat, live streaming, and audio/video calling.
```

**Character count (label):** 20
**Character count (context):** 107
**Word count (context):** 19

**Rationale:**
"4" is small enough to feel deliberate. The label creates the tension: four different
products sounds like four codebases. "One codebase" resolves the tension immediately.
The context sentence names all four verticals — healthcare, fintech, transport, social —
because the diversity of those domains is the actual proof. A monorepo that holds all
four is a different technical challenge than a monorepo holding four variations of the
same app.

**Alternative label (if design needs more words):**
```
Products shipping from one codebase.
```

**Alternative metric (if the layout needs a more dramatic number):**
```
4×
```
_Label: "The output of four teams. One engineer."_
_Use this only if the design context makes the multiplier read naturally._

---

### PrimoTech — Software Developer

**Hero Metric:**
```
95%
```

**Label (3–5 words):**
```
Open issues. Six months.
```

**Context sentence (15–25 words):**
```
Inherited two debt-ridden codebases — healthcare and EdTech — and resolved 95% of
open technical issues in the first six months.
```

**Character count (label):** 22
**Character count (context):** 110
**Word count (context):** 22

**Rationale:**
"95%" is the strongest resolution metric in the data. The label earns its compression:
"Open issues" sets the domain, "Six months" sets the timeframe. The context sentence
uses "inherited" deliberately — it signals that the mess was not Jatin's, which is the
honest framing and the more impressive one. Engineers who have joined a troubled codebase
will recognize the specific pain of "debt-ridden" without needing it explained.

**Alternative label (if the layout pairs metric with a single phrase):**
```
Issues resolved in six months.
```

**Alternative context (shorter, 15 words):**
```
Two broken codebases, two full rewrites, 95% of open issues closed inside six months.
```
_Character count: 82 | Word count: 15_

---

### Agumentik — Flutter Developer (First Role)

**Hero Metric:**
```
23%
```

**Label (3–5 words):**
```
User satisfaction. First production apps.
```

**Context sentence (15–25 words):**
```
Three clients, fully remote, no hand-holding — and a 23% improvement in user
satisfaction across everything shipped.
```

**Character count (label):** 32
**Character count (context):** 88
**Word count (context):** 17

**Rationale:**
"23%" is the only user-facing metric in the data set. All other metrics are technical
(battery draw, issue resolution, monorepo scale). This one points at users, which
creates useful variety across the four cards — the section moves from user outcomes
(Agumentik) to codebase transformation (PrimoTech) to scale (Appscrip) to the
undocumented hard problem (Foyer). The label pairs "User satisfaction" with "First
production apps" — the juxtaposition is the honest story: first real responsibility,
real result.

**Alternative label (if the design wants a single phrase):**
```
Better for users. From day one.
```

**Alternative context (more direct on the circumstances):**
```
Entry-level role, three clients, fully remote. Left with a 23% improvement in user
satisfaction and zero hand-holding required.
```
_Character count: 101 | Word count: 18_

---

## Section Heading

### The Question

The current heading is: **"The work that shaped how I build."**

This heading positions the section as autobiography — history that explains the present.
It is accurate and it reads well. The question is whether it still serves the section
if the visual anchor shifts from company names to numbers.

The answer is: it still works, but a different heading works better for a metrics-first
layout.

When the visual anchors are numbers, the heading has one job: frame what the numbers
mean. If the heading tells a personal story ("shaped how I build"), the numbers become
exhibits in a biography. If the heading frames the numbers as evidence, the numbers
become the argument.

---

### Recommended Heading (Metrics-First)

```
The numbers behind the work.
```

_Character count: 28_
_Tone: Direct, quietly confident. Uses "behind" rather than "from" — the numbers did not
produce the work, they live inside it._

**Why this heading:**

It does not explain what the numbers are. It does not promise impressive figures. It
simply says: these numbers exist, and they are inside the work. A visitor who has
been scanning the page stops at a large metric, reads the label, reads the context
sentence, and understands. The heading earns that stop before the first metric
appears. Short enough to read in half a second. Says something the previous heading
did not: that the section is evidence-first.

---

### Alternative Heading A

```
Work. And what it actually moved.
```

_Character count: 32_
_Tone: Slightly more reflective. "What it actually moved" implies that moving something
is the measure — output matters, not just effort._

**Use when:** The design can hold a longer heading and the brand voice wants a slight
edge of philosophy alongside the evidence.

---

### Alternative Heading B

```
Four roles. The proof is in the numbers.
```

_Character count: 39_
_Tone: Direct and explicit. Names the structure (four roles) and the approach (proof via
numbers). No ambiguity._

**Use when:** The layout makes it natural to reference the four cards up front, or the
design needs a heading that explicitly sets up a metric-first grid.

---

### Alternative Heading C (Minimal)

```
Experience.
```

_Character count: 11_
_Tone: Single word. Gives the numbers all the space. The heading is almost invisible._

**Use when:** The metrics themselves are visually dominant enough that the heading is
purely navigational. Best if the section is accessed via a "Work" nav item and the
visitor already knows what they are looking at.

---

### The Current Heading — Keep or Replace?

**Keep it if:** The Work section design does not change to be metrics-first. The current
heading fits the current layout (featured card + tile grid) well. It sets a reflective
register that the FoyerCard tagline ("Two products. One engineer. Zero documentation.")
then punctuates.

**Replace it if:** The section redesigns around large metric numbers as visual anchors.
In that case, "The work that shaped how I build" competes with the numbers rather than
framing them. The recommended heading ("The numbers behind the work.") defers to the
numbers rather than narrating them.

---

## Full Data Structure (Implementation-Ready)

The following is a data structure that can be added to `src/data/work-experience.ts`
or a companion file. It adds `heroMetric`, `metricLabel`, and `metricContext` fields
to each role.

```ts
// Proposed additions to WorkExperience type in src/types/index.ts:
//
// heroMetric: string       — The number displayed at large size ("3–4%", "4", "95%", "23%")
// metricLabel: string      — 3–5 word label below the number
// metricContext: string    — 15–25 word context sentence

export const workExperienceMetrics = [
  {
    id: 'foyer',
    heroMetric: '3–4%',
    metricLabel: 'Battery drain. Per hour. All night.',
    metricContext:
      'iOS background audio that survives lock screens, OS kill cycles, and memory pressure — three rewrites to get there.',
  },
  {
    id: 'appscrip',
    heroMetric: '4',
    metricLabel: 'Products. One codebase.',
    metricContext:
      'Healthcare, fintech, transport, and social — all shipping from one monorepo, with real-time chat, live streaming, and audio/video calling.',
  },
  {
    id: 'primotech',
    heroMetric: '95%',
    metricLabel: 'Open issues. Six months.',
    metricContext:
      'Inherited two debt-ridden codebases — healthcare and EdTech — and resolved 95% of open technical issues in the first six months.',
  },
  {
    id: 'agumentik',
    heroMetric: '23%',
    metricLabel: 'User satisfaction. First production apps.',
    metricContext:
      'Three clients, fully remote, no hand-holding — and a 23% improvement in user satisfaction across everything shipped.',
  },
]
```

---

## Implementation Notes for Developer

**Typography for the hero metric:**
The number should be the largest type on the card — significantly larger than the company
name or role. Reference: Alex Nguyen uses display-size type (60px+ equivalent) for his
numbers. At that size, the number is a visual element, not just text. The label below it
should be body-sized or slightly above. The context sentence should be secondary text.

**Color:**
Per the color system (`docs/design/` and `.claude/rules/design/color-system.md`), the
metric number is a strong candidate for `text-primary` (white, `#F3F4F6`) or `text-accent`
(orange, `#FFAB00`). Orange works if the metric is the primary visual anchor and the
design needs energy. White works if the layout is dense and orange would compete. Given
that the FoyerCard already uses orange for the live indicator and left-edge pulse, the
past role cards may benefit from white metric numbers to avoid orange saturation.

**Foyer treatment:**
The current FoyerCard has a tagline: "Two products. One engineer. Zero documentation."
This tagline is strong and should not be replaced by the metric display. The FoyerCard
and the metric approach are compatible — the tagline works as a section-level statement,
the metric (`3–4%`) works as the specific evidence inside the card. Consider showing the
tagline at the top and the metric lower in the card, or making the metric the card's
visual opener with the tagline beneath it.

**Ordering:**
The current order (Foyer → Appscrip → PrimoTech → Agumentik) is chronological-reverse
and is correct. In metrics-first display, the ordering still works: you open on the
hardest, most current problem (3–4% battery), move to scale (4 products), then to
recovery (95% issues resolved), then to the origin story (23% first-role improvement).
The arc reads: depth → scale → rescue → beginning.

---

## A/B Testing Suggestions

**Section heading:**
- Variant A (Recommended): "The numbers behind the work."
- Variant B (Philosophy): "Work. And what it actually moved."
- Variant C (Current, keep if no layout change): "The work that shaped how I build."
- Signal: Scroll depth past the heading, time spent in the Work section.

**Foyer metric display:**
- Variant A: `3–4%` (the range — honest, specific)
- Variant B: `<4%` (the ceiling claim — slightly more aggressive)
- Signal: Qualitative — does "3–4%" read as precise or as uncertain? Gather from
  technical reviewers directly.

---

## Related Documents

- [Portfolio Copy](./portfolio-copy.md) — Full copy document including hero and nav
- [Brand Strategy](../brand/brand-strategy.md) — Voice, tone, audience
- [Work Section Component](../../src/sections/Work.tsx) — Current implementation
- [Work Experience Data](../../src/data/work-experience.ts) — Source data

---

**Last Updated**: 2026-03-18
**Version**: 1.0.0
**Maintained By**: ux-copywriter agent

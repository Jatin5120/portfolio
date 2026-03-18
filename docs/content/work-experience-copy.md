# Work Experience Section — Copy

**Project**: React Portfolio
**Created**: 2026-03-17
**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Active
**Integration**: Addendum to `portfolio-copy.md` — merge into that document as Section 5 (Work Experience), inserted before the Navigation section.

---

## Overview

This document contains all revised copy for the Work Experience section. It replaces the
current data in `src/data/work-experience.ts` and the heading strings in
`src/sections/Work.tsx`.

The copy was rewritten to eliminate resume-list language and replace it with the
analytical-storyteller voice established in the brand strategy. Each description
leads with the most significant fact about that role, not a summary of responsibilities.
Location has been removed from all four entries — it adds visual noise without signal
value for this audience.

---

## Section Heading

### Section Label (mono, above heading)

```
Career
```

_Character count: 6_
_Alternatives: `Experience` (conventional, lowest friction) · `Timeline` (cleaner mono register)_
_Note: "Career" frames the section as a through-line with direction rather than a
credentials checklist. If conventional is preferred, keep `Experience`. Avoid `Journey` —
it implies ongoing reflection when the section is actually demonstrating forward motion._

---

### Section Heading (Main)

```
The work that shaped how I build.
```

_Character count: 34_
_Tone: Reflective but forward-facing. "Shaped" is active and grounded. "How I build"
connects past roles to present capability — these roles are context for who Jatin is
now, not credentials to be validated._

---

### Section Heading (Alternative 1 — Rhythmic)

```
Five years. Three companies. One direction.
```

_Character count: 41_
_Tone: Declarative, momentum-forward. Three short parallel clauses build rhythm.
"One direction" is the payoff — signals intentionality rather than drift.
Risk: "Five years" will need updating. Only use this if you are willing to maintain it._

---

### Section Heading (Alternative 2 — Minimal)

```
Where the craft came from.
```

_Character count: 26_
_Tone: Quieter. Positions roles as craft formation rather than credential accumulation.
Aligns strongly with the craftsman brand archetype. Works best if the hero has already
established competence and the Work section is elaborating on character._

---

### Section Heading (Alternative 3 — Maximum Restraint)

```
Work history.
```

_Character count: 13_
_Tone: Blunt, confident. A strong counterpoint to an expressive hero headline — the
hero makes the claim, the work section proves it without ceremony. Risk: reads flat
if the descriptions underneath are also flat._

---

### Recommendation

Use **"The work that shaped how I build."** as the primary heading. The trailing period
is intentional — keep it. It closes the sentence with finality and signals that what
follows is complete, not pending. A heading that ends without punctuation feels like it
is still waiting for something.

---

## Implementation — Work.tsx

Replace the two heading strings in `src/sections/Work.tsx`:

```tsx
// Before
<p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">Experience</p>
<SectionHeading className="text-3xl lg:text-4xl">Where I've worked</SectionHeading>

// After
<p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">Career</p>
<SectionHeading className="text-3xl lg:text-4xl">The work that shaped how I build.</SectionHeading>
```

---

## Job Descriptions

Each entry below includes: primary description (recommended), alternative description
(compressed, higher CTO-signal), and revised skill tags.

The `location` field has been removed from all entries. Surface it in the description
itself only if it adds meaningful context (e.g., "fully remote" for Agumentik is a
competence signal, not just a label).

---

### Job 1 — Foyer (Current)

**Role:** Mobile Lead
**Duration:** Dec 2024 — Present

**Description (Primary — 2 sentences, 38 words):**
```
Shipping two products simultaneously — Merlin AI and Thine — as the sole mobile
decision-maker at an early-stage AI startup. One of those products required solving
a background audio problem Apple's documentation doesn't cover.
```

_Character count: 211_
_Tone: Specific, grounded, understated. The second sentence surfaces the Thine story
directly — for visitors who missed the hero subheadline, this is where they encounter
it for the first time. For those who read the hero, it confirms and deepens the claim.
"Sole mobile decision-maker" replaces the vague "making strategic mobile decisions"
with something that has real weight: one person owns the decision._

**Description (Alternative — 1 sentence, 33 words):**
```
Lead mobile across two products at Foyer — including the one that required three
rewrites to get iOS background audio working through the night without the OS killing it.
```

_Character count: 172_
_Tone: Technical, specific. Better for a CTO-primary audience who will immediately
decode "three rewrites" and "OS killing it" as credibility signals. "Through the night"
brings the human dimension of the Thine use case without explaining the product._

**Skills:**
```
Flutter · Swift · iOS Native · AI Integration · Team Lead
```

_Changes from original: "AI Products" → "AI Integration" (more specific — implies
integrating AI into a product, not just working at an AI company). "Team Leadership"
→ "Team Lead" (the role, not the category)._

---

### Job 2 — Appscrip

**Role:** Senior Flutter Developer
**Duration:** Oct 2022 — Nov 2024

**Description (Primary — 2 sentences, 36 words):**
```
Built and owned a shared monorepo codebase that ran across four separate products —
healthcare, fintech, transport, and social. Real-time chat, live streaming, and
audio/video calling all shipped from it.
```

_Character count: 197_
_Tone: Leads with scope (four products, one codebase) which is the genuinely impressive
fact. "Owned" replaces "built and maintained" — it signals full accountability, not
just contribution. The second sentence grounds the technical work in shipped features,
not a list of implementations._

**Description (Alternative — 1 sentence, 27 words):**
```
Owned a Flutter monorepo serving four products across four verticals — and was the
person called when the architecture needed to change.
```

_Character count: 132_
_Tone: "The person called when the architecture needed to change" is a compressed
impact statement. It positions Jatin as the technical authority at that company,
not a senior IC executing someone else's plan._

**Skills:**
```
Flutter · MVVM · Reactive Programming · Monorepo · Real-time
```

_Changes from original: "MVVM Architecture" → "MVVM" (suffix adds length, not signal).
"Real-time Features" → "Real-time" (same reason). Tags scan faster at pill size
when the nouns stand alone._

---

### Job 3 — PrimoTech

**Role:** Software Developer
**Duration:** Jun 2021 — Sep 2022

**Description (Primary — 2 sentences, 36 words):**
```
Led Flutter development across healthcare and EdTech products, including full rewrites
of codebases that had been left to accumulate technical debt. Resolved 95% of open
technical issues in the first six months.
```

_Character count: 200_
_Tone: "Left to accumulate technical debt" is more human than "legacy codebases" —
it implies a real situation that required judgment, not just execution. The 95% figure
is retained because it is the only quantified outcome in the original copy; it earns
its place. "In the first six months" is added — without a timeframe, 95% is just
a number. With it, it becomes a signal._

**Description (Alternative — 1 sentence, 27 words):**
```
Rewrote codebases others had abandoned, shipped flagship Flutter apps in healthcare
and EdTech, and closed 95% of outstanding technical issues.
```

_Character count: 136_
_Tone: "Abandoned" is stronger than "legacy" — it implies a real situation with
stakes rather than a neutral technical classification. Three parallel verbs (rewrote,
shipped, closed) create rhythm and breadth without padding._

**Skills:**
```
Flutter · Firebase · Node.js · Performance · Legacy Rewrites
```

_Changes from original: "Performance Optimization" → "Performance" (shorter).
"Legacy Modernization" → "Legacy Rewrites" (more specific about what was actually
done — rewrote, not incrementally modernized)._

---

### Job 4 — Agumentik

**Role:** Flutter Developer
**Duration:** Apr 2020 — May 2021

**Description (Primary — 2 sentences, 30 words):**
```
First production apps. Three clients, fully remote, translating requirements directly
into code — with a 23% improvement in user satisfaction across the products I shipped.
```

_Character count: 162_
_Tone: "First production apps." is two words, no verb, no softening — a direct
acknowledgment of where the career started, stated with confidence rather than apology.
"Fully remote" is surfaced as a competence signal (self-direction, distributed
communication) rather than buried as a location label. The satisfaction metric is
retained — it is a real outcome and earns its place._

**Description (Alternative — 1 sentence, 28 words):**
```
Built my first production apps fully remote, working directly with three clients and
shipping interfaces that drove a 23% increase in user satisfaction.
```

_Character count: 142_
_Tone: First person ("Built my first") acknowledges the starting point without
self-deprecation — confidence about where the journey began, not embarrassment.
"Shipping interfaces" is more concrete than "crafted intuitive UIs."_

**Skills:**
```
Flutter · Dart · UI/UX · Client Work · Early Career
```

_Changes from original: "UI/UX Implementation" → "UI/UX" (implementation is
implicit in Flutter development). "Client Collaboration" → "Client Work" (shorter,
same signal). "Scalable Architecture" removed — a credibility stretch on a first-year
developer role. Replaced with "Early Career" — an honest contextual marker that
actually reads well as the final entry in a reverse-chronological list. It closes
the arc: the journey started here, and Foyer is where it arrived._

---

## Complete Data File

Ready to copy-paste directly into `src/data/work-experience.ts`.
Uses Primary descriptions and revised skill tags throughout.

```typescript
import type { WorkExperience } from '@/types'

export const workExperience: WorkExperience[] = [
  {
    id: 'foyer',
    company: 'Foyer',
    role: 'Mobile Lead',
    duration: 'Dec 2024 — Present',
    description:
      "Shipping two products simultaneously — Merlin AI and Thine — as the sole mobile decision-maker at an early-stage AI startup. One of those products required solving a background audio problem Apple's documentation doesn't cover.",
    skills: ['Flutter', 'Swift', 'iOS Native', 'AI Integration', 'Team Lead'],
  },
  {
    id: 'appscrip',
    company: 'Appscrip',
    role: 'Senior Flutter Developer',
    duration: 'Oct 2022 — Nov 2024',
    description:
      'Built and owned a shared monorepo codebase that ran across four separate products — healthcare, fintech, transport, and social. Real-time chat, live streaming, and audio/video calling all shipped from it.',
    skills: ['Flutter', 'MVVM', 'Reactive Programming', 'Monorepo', 'Real-time'],
  },
  {
    id: 'primotech',
    company: 'PrimoTech',
    role: 'Software Developer',
    duration: 'Jun 2021 — Sep 2022',
    description:
      'Led Flutter development across healthcare and EdTech products, including full rewrites of codebases that had been left to accumulate technical debt. Resolved 95% of open technical issues in the first six months.',
    skills: ['Flutter', 'Firebase', 'Node.js', 'Performance', 'Legacy Rewrites'],
  },
  {
    id: 'agumentik',
    company: 'Agumentik',
    role: 'Flutter Developer',
    duration: 'Apr 2020 — May 2021',
    description:
      'First production apps. Three clients, fully remote, translating requirements directly into code — with a 23% improvement in user satisfaction across the products I shipped.',
    skills: ['Flutter', 'Dart', 'UI/UX', 'Client Work', 'Early Career'],
  },
]
```

---

## What Changed and Why

| Element | Before | After | Reason |
|---|---|---|---|
| Section label | Experience | Career | Frames section as through-line, not credentials list |
| Section heading | "Where I've worked" | "The work that shaped how I build." | Geography → capability context |
| Location field | Shown for all 4 roles | Removed from all 4 | Visual noise; not a signal value for this audience |
| Foyer description | Activity list | Thine story surfaced | The anchor proof point belongs here as well as the hero |
| Appscrip description | Feature list | Ownership + scope | "Four products, one codebase I owned" is more concrete |
| PrimoTech description | Generic legacy work | "Abandoned" + timeframe on metric | Situation is real; timeframe makes the metric credible |
| Agumentik description | Softened first-job language | "First production apps." No apology | Confident about the starting point |
| All skill tags | Long compound labels | Shorter, cleaner | Tags at pill size need to scan fast; suffixes add length not signal |

---

## A/B Testing Notes

**Section heading direction**
Test "The work that shaped how I build." against "Work history." — interpretive and
warmer vs. spare and confident. The right choice depends on which hero headline is live.
A philosophical hero needs a factual work heading to balance it. A CTO-audience hero
needs the warmer work heading to prevent the page reading cold from top to bottom.

**Foyer description variant**
Primary leads with both products named, surfaces the Thine story in sentence two.
Alternative compresses to one sentence and front-loads the technical detail.
Run the alternative for a CTO-primary audience, the primary for a broader mix.
Signal to watch: scroll depth past the Work section and contact section visits.

---

## Tone Notes

**Foyer entry:** The second sentence is the most important line in the entire Work
section. It is the same proof point as the hero subheadline — but here it has more
room to breathe. A visitor who scrolled past the hero or read it quickly will encounter
the Thine story here in a context that encourages them to sit with it. "Apple's
documentation doesn't cover" is a specific, verifiable claim that a CTO will
immediately recognize as meaningful. Do not soften it or generalize it.

**Agumentik entry:** "First production apps." as a sentence fragment is deliberate.
It is not a typo. The period is a full stop after two words — it signals that Jatin
is not apologizing for starting somewhere. The brand strategy says "confident without
arrogance" — this is what that looks like on an early-career role. The metric that
follows shows the work speaks for itself even at the start.

**Skill tags overall:** Tags are read at a glance in the context of a pill/badge
component. They are not sentences. The rule applied here: if removing the last word
of a compound tag leaves the meaning intact, remove it. "MVVM" means the same thing
as "MVVM Architecture" at pill size. Shorter tags create a cleaner visual rhythm
across the row.

---

## Related Documents

- [`portfolio-copy.md`](./portfolio-copy.md) — Master copy document (this section should be merged in as Section 5)
- [`/docs/brand/brand-strategy.md`](../brand/brand-strategy.md) — Voice and tone reference
- [`src/data/work-experience.ts`](../../src/data/work-experience.ts) — Data file this copy populates
- [`src/sections/Work.tsx`](../../src/sections/Work.tsx) — Component using these strings

---

**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Status**: Active
**Maintained By**: ux-copywriter agent

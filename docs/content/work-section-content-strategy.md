# Work Section — Content Strategy

**Project**: React Portfolio
**Created**: 2026-03-17
**Version**: 1.0.0
**Status**: Active — Pre-design content decisions

---

## The Core Insight (Read This First)

Four jobs is not a thin work history. It is a tight narrative arc. The problem is that
the current design treats it as a list, which makes it feel like data. The real value
is the progression: you can trace a clear through-line from first client work to
full technical ownership at an AI startup. That arc is the story. The design and
copy decisions below exist to make that arc legible.

The career narrative in one sentence: "From building for other people's specs to owning
the entire mobile decision surface at an AI company — no handoffs required."

---

## The Four Roles, Strategically Re-framed

Before getting to copy decisions, here is what each role actually represents in the arc:

| Role | What It Actually Signals |
|------|--------------------------|
| Agumentik (2020–21) | First-principles foundation. Client work under real constraints with no safety net. |
| PrimoTech (2021–22) | First evidence of technical judgment. Hired to fix, not to build. |
| Appscrip (2022–24) | Scale and architecture. One codebase, four products, highest complexity. |
| Foyer (2024–Present) | Full ownership. Not just mobile lead in title — sole decision-maker at the mobile layer of a live AI product. |

The arc moves from "executing specs" → "inheriting and fixing" → "architecting at scale" →
"owning completely." Each role is a meaningful step, not a resume entry.

---

## Question 1: What Additional Copy Does Foyer Need?

**The answer: More than it has now, but structured differently than a paragraph.**

The current Foyer description (51 words) does two things: establishes simultaneity
(two products at once) and hints at the iOS problem. It does not do justice to either.

### What a Featured Card Version of Foyer Should Contain

A featured treatment earns a longer narrative. Here is the content hierarchy, in order:

**1. The ownership claim (10–15 words)**
Not "Mobile Lead" as a title — that is already in the role label. The opening sentence
should establish what that actually means in practice. The key detail: sole decision-maker.
No mobile team above or below him. Every architecture choice, every platform tradeoff,
every timeline decision is his.

**2. The simultaneity detail (15–20 words)**
Two products in parallel: Merlin AI (AI assistant) and Thine (the background audio product).
These are not the same problem. Merlin is about AI integration and product velocity.
Thine is about depth and platform constraints. Running both at once is the signal.

**3. The Thine problem (25–35 words)**
This is the anchor proof point from the brand strategy. Do not bury it or reduce it to
a reference. State it plainly: 24/7 background audio, iOS background kill cycles,
Swift and Objective-C bridging, three rewrites, Apple's documentation runs out.
This is the specific hard thing. Name it.

**4. The outcome (10–15 words)**
It shipped. Battery draw measured. Running in production. This closes the proof loop.

**Total copy budget for featured Foyer: 70–90 words.**

The current description is 51 words and carries too much weight in too few sentences.
The featured treatment should feel like a brief case study excerpt, not an expanded
bullet point.

### Draft Copy — Foyer Featured Version

```
Sole mobile decision-maker at an early-stage AI startup — no mobile team above or
below, no one to escalate to.

Shipping Merlin AI (AI assistant) and Thine (24/7 audio recorder) simultaneously.
Both in production. Both owned fully.

Thine required solving a background audio problem Apple's documentation doesn't cover.
Three rewrites. Swift bridging into Objective-C. Battery draw measured at 3–4% per hour.
The OS tries to kill it. It runs.
```

_Word count: 75_
_Tone: Declarative, factual, no adjectives. The specificity earns the weight._

### Alternative — Slightly More Narrative Voice

```
Mobile Lead at Foyer means I'm the only mobile engineer. Every architecture decision,
every platform tradeoff, every production incident — mine.

Currently shipping two products simultaneously: Merlin AI and Thine. The latter required
going past Apple's documentation entirely — 24/7 background audio on iOS, three rewrites,
Swift and Objective-C bridging to get it done. Battery draw: 3–4% per hour.

It ships. It runs. That's the job.
```

_Word count: 79_
_Tone: Slightly more voice-forward, ends with a phrase that reads like Jatin speaking._

### On the "What I'm Working On Now" Angle

The brand strategy explicitly positions Foyer as "the current role" not "a past
achievement." The copy should not read in retrospect. "Currently shipping" is better than
"shipped." "It runs" is better than "it ran." Present tense throughout for Foyer.

Do not add a "what I'm working on now" sub-section as a separate element. The present
tense does that work implicitly. Calling it out explicitly makes the section feel like
a status update rather than a career narrative.

---

## Question 2: What Is the Minimum Copy for Past Roles?

**The answer: One sentence that says what you built AND why it matters. Not the tech.
Not the team size. Not the responsibilities. The one sentence that changes the reader's
understanding of where you are now.**

Past roles exist to make the present role legible. They are context, not proof. The proof
lives at Foyer. The past roles explain how Jatin got to be the kind of engineer who could
take on Foyer.

### The Minimum Viable Copy for Each Past Role

**Appscrip (Senior Flutter Developer, 2022–24)**

Current: 43 words, describes the monorepo structure and what shipped from it.

Minimum needed: The signal is architectural ownership at scale — one shared codebase
running across four distinct product verticals. That is a systems-thinking problem, not
a feature-shipping problem. The current copy has this. The word count is fine as-is for
a compact treatment.

Compact version (for a condensed past-roles layout):
```
Owned a shared monorepo codebase across four products — healthcare, fintech, transport,
social. Real-time chat, live streaming, audio/video calling. All from one foundation.
```
_Word count: 27_

**PrimoTech (Software Developer, 2021–22)**

Current: 36 words, mentions rewrites, technical debt, and a metric (95%).

The signal here is diagnostic judgment — being hired specifically to untangle accumulated
problems rather than build greenfield. That is a different skill and it earns trust
differently than "built features." The 95% metric is real and should stay.

Compact version:
```
Hired to rewrite codebases that had accumulated debt, not to build from scratch.
Resolved 95% of open technical issues in six months.
```
_Word count: 27_

**Agumentik (Flutter Developer, 2020–21)**

Current: 31 words, mentions three clients, remote work, and a satisfaction improvement (23%).

This role needs to do one thing in the narrative: establish that Jatin started with real
constraints, not with a mentor or a structured onboarding program. Client work, fully
remote, early career. The 23% metric is real and should stay as the proof that even
then the quality bar was there.

Compact version:
```
First production apps — three clients, fully remote. A 23% improvement in user
satisfaction across the products I shipped.
```
_Word count: 22_

### The True Minimum

If the design demanded stripping to absolute minimum, here is how far you can go before
the copy loses its job:

| Role | Absolute Minimum Copy |
|------|----------------------|
| Foyer | See featured card — this one never gets compressed |
| Appscrip | "Monorepo architecture across four product verticals. Real-time communications stack shipped from one codebase." (17 words) |
| PrimoTech | "Rewrote debt-laden codebases across healthcare and EdTech. 95% of open issues resolved." (12 words) |
| Agumentik | "First production apps. Three clients, fully remote. 23% user satisfaction improvement." (11 words) |

Below these minimums, the entries become data rather than story. Each entry needs at
least: what you built (signal of scope) + one thing that is true only of this role
(the differentiator that makes the sequence legible).

---

## Question 3: Should There Be a Narrative Thread Connecting the Roles?

**The answer: Yes, but it should be structural, not verbal.**

Do not write a connecting sentence between roles. Do not add a caption that says
"the arc." The progression should be legible from the entries themselves.

What enables that: the copy for each role should use vocabulary that implies direction.
Agumentik uses "first." PrimoTech uses "rewrote" (implies fixing, which comes after
building). Appscrip uses "owned" and "across" (implies scale, which comes after
individual work). Foyer uses "sole" and "simultaneously" (implies full ownership, which
is the culmination).

The verbal thread is: first → fix → scale → own.

A reader scanning the section should feel the momentum without needing a narrator to
explain it. If the copy is doing its job, someone who reads the four descriptions
backwards will notice the progression because each role has a distinct register.

### What the Thread Should NOT Be

Do not write something like: "I started with client work, then moved into product
companies, growing from individual contributor to technical lead."

That is a resume summary. It describes the progression instead of embodying it. The
difference: a summary tells the reader what to think. Good copy shows them and lets them
feel smart for noticing.

---

## Question 4: Should the Section Have an Intro Paragraph?

**The answer: Probably not. But if it does, it should do one specific job.**

The case against an intro paragraph: the section heading already frames the section.
An intro paragraph between the heading and the first role adds a layer of narration
that delays the actual content. Most visitors are scanning, not reading. They will skip
the intro and land on the first role. If the first role is the featured Foyer card, it
needs to carry its own weight without a setup paragraph.

The case for an intro paragraph: if the layout makes Foyer obviously dominant (larger
card, more copy, visual prominence), there is no need to explain the hierarchy. But if
the layout is more ambiguous — if past roles and present role are visually similar —
a single sentence before the roles can cue the reader to what they are looking at.

If an intro is used, it should be one sentence, maximum two. It should not explain the
section. It should frame the relationship between the entries.

**Draft intro options (use only if the layout warrants it):**

Option A — Minimal framing:
```
Four roles. One direction.
```
_4 words. Frames the narrative without narrating it._

Option B — The current role as context:
```
How I got to where I am is a short story with a clear arc.
```
_15 words. Conversational, warm, slightly self-aware. Fits the brand voice._

Option C — The ownership claim as anchor:
```
Every role here was preparation for having no one to hand it off to.
```
_15 words. Makes the Foyer "sole decision-maker" detail land harder. Strong._

**Recommendation: Option C** if an intro is used. It reframes all four roles as
progression toward ownership, which is the actual story, and it does so without
describing the progression explicitly.

---

## Question 5: Does the Section Heading Still Work?

**Current heading: "The work that shaped how I build."**

**The verdict: It works, but only if the content earns it.**

The heading is in the introspective register. It frames the section as a retrospective —
looking back at what made Jatin who he is. That is an appropriate frame for a career
narrative section. The problem is that "shaped how I build" is slightly vague when the
content it introduces is specific. It gestures at an influence without naming it.

For a list-style layout where all roles are equal weight, this heading works well.
It suggests the reader should look for patterns across the entries.

For a featured-role layout where Foyer is dominant, the heading creates a tension:
the section is presented as retrospective ("shaped"), but the dominant card is
present-tense and active. The heading sets up a past orientation, then the first
thing the reader sees is the current role.

### Alternative Headings for a Featured-Role Layout

**Option A — The arc, named:**
```
Five years. One direction.
```
_5 words. Tight, confident. Lets the roles tell the story._

**Option B — The current state as headline:**
```
How I build now — and how I got here.
```
_10 words. The dash is doing the narrative work. Present first, then past. Matches
the featured-role hierarchy where current is dominant._

**Option C — The ownership thread:**
```
Every role was practice for having the whole thing.
```
_9 words. "Having the whole thing" = full ownership. Rewards a reader who finishes
the section and looks back at the heading._

**Option D — Lean into the progression language:**
```
From first client to sole mobile lead.
```
_7 words. Factual, descriptive, no philosophy. Makes the scope of the arc explicit._

**Recommendation for featured-role layout: Option B.**

"How I build now — and how I got here" does something the current heading does not:
it centers the present first. In a featured-role design, the reader sees Foyer first.
The heading should orient them toward the current role, then the past. Option B does
exactly that. The dash creates a visual pause that separates the two orientations.

If Jatin prefers keeping the current heading, it remains defensible — especially for
a layout where the roles are visually similar. The content will carry the narrative
even without the heading explicitly framing it.

---

## Copy Decisions by Layout Type

The copy questions above have different answers depending on which layout is chosen.
Here is a decision matrix:

### Layout Type A — Featured Current + Compact Past
(Foyer gets a large card; Appscrip, PrimoTech, Agumentik get condensed entries)

| Element | Decision |
|---------|----------|
| Section heading | "How I build now — and how I got here." |
| Intro paragraph | Optional. Use Option C if the hierarchy is not visually obvious. |
| Foyer copy | 70–90 words. Full narrative treatment. See drafts above. |
| Appscrip copy | 27 words. Compact version. |
| PrimoTech copy | 27 words. Compact version. |
| Agumentik copy | 22 words. Compact version. |
| Narrative thread | Implicit via vocabulary. No connecting copy between roles. |

### Layout Type B — Timeline / Horizontal Scroll (Equal Visual Weight, Sequential)

| Element | Decision |
|---------|----------|
| Section heading | "The work that shaped how I build." (current heading works here) |
| Intro paragraph | None needed. |
| Foyer copy | 51–60 words. Current copy with minor refinement. |
| Appscrip copy | 40–50 words. Current copy works. |
| PrimoTech copy | 36 words. Current copy works. |
| Agumentik copy | 31 words. Current copy works. |
| Narrative thread | Implicit via entry sequence. |

### Layout Type C — Case Study Style (One Role at a Time, Expandable)

| Element | Decision |
|---------|----------|
| Section heading | "The work that shaped how I build." |
| Intro paragraph | None. The case study format provides its own context. |
| Foyer copy | 100–150 words in expanded state. Shorter teaser for collapsed. |
| Past roles | 30–40 words each in collapsed state. Expandable to 60–80 words. |
| Narrative thread | Can be explicit in expanded state. Keep implicit in collapsed state. |

---

## Word Count Reference

All copy budgets consolidated:

| Element | Minimum | Ideal | Maximum |
|---------|---------|-------|---------|
| Section heading | 5 words | 8 words | 12 words |
| Intro paragraph (if used) | 4 words | 12 words | 18 words |
| Foyer description (featured) | 60 words | 75 words | 95 words |
| Foyer description (equal weight) | 45 words | 55 words | 65 words |
| Appscrip description | 17 words | 27 words | 45 words |
| PrimoTech description | 12 words | 27 words | 40 words |
| Agumentik description | 11 words | 22 words | 35 words |

---

## On Metrics: Which Numbers to Keep

Three metrics exist across the four descriptions:
- 95% technical issues resolved (PrimoTech)
- 23% user satisfaction improvement (Agumentik)
- 3–4% battery per hour (Foyer, currently only in the hero anchor)

**Keep all three. Here is why each one earns its place:**

95% at PrimoTech: This is the rarest kind of metric — a diagnostic completion rate.
Most engineers do not track open issues as a ratio. This signals that Jatin entered
a messy codebase, understood the scope of the problem, and cleared it systematically.

23% at Agumentik: This is an outcome metric from the earliest role. It tells the reader
that even at the start of his career, Jatin was measuring user impact rather than just
shipping features. That instinct is harder to teach than technical skills.

3–4% battery at Foyer: Currently lives only in the hero. It should also appear in the
Foyer work entry. The hero creates the expectation; the Work section fulfills it with
more context. A CTO who was intrigued by the hero will scroll to the Work section to
find out more. The battery number should be there when they arrive.

**One number that is missing: the Appscrip entry has no metric.** This is the only
gap. The Appscrip role is the largest by duration and arguably the most architecturally
significant. Consider adding one of:
- Number of active users across the four products (if Jatin knows this)
- Number of months the monorepo was in production before he left
- Number of engineers who shipped from the shared codebase (team signal)

If no real metric exists, do not invent one. The Appscrip description is strong enough
without it. Just note the gap.

---

## The Agumentik "Early Career" Signal

One tension in the current copy: Agumentik's TechTag list includes "Early Career" as a
tag. This is honest but slightly self-deprecating. On a compact past-roles treatment,
this tag tells the reader "this was the junior role" before they have a chance to notice
that the metrics and context already imply that.

Recommendation: Remove the "Early Career" tag. Let the dates tell that story (2020–21
is visually earlier than the rest). The copy — "first production apps" — already signals
where this sits in the sequence. Adding an explicit "Early Career" label is the copy
doing a job the timeline already handles.

---

## Tone Calibration for the Work Section

The brand strategy places Work copy in the "Analytical storyteller, problem-solver"
register. Specific guidance that applies here:

- First person when discussing decisions: "I owned," "I rewrote," "I chose."
- Present tense for Foyer throughout.
- Past tense for previous roles, but active voice: "Built and owned" not "Was responsible for."
- No adjectives that the facts do not earn. "Complex" is not earned if the complexity
  is not demonstrated. "Challenging" is never earned — it is always vague.
- The one emotion allowed: precision. Numbers, specifics, and named problems signal
  that Jatin was paying attention. Vague claims signal that he was not.

---

## What to Avoid

**The retrospective mistake:** Do not frame every past role as "this taught me X."
The learning arc should be implicit in the progression, not explained. "At Appscrip
I learned about architecture" is exactly the kind of sentence the brand strategy calls
self-describing rather than demonstrating.

**The humility trap:** Four roles in five years is a focused, deliberate career
trajectory. Do not apologize for it or frame it as "still growing." The Foyer role
— sole mobile decision-maker at a live AI product — is not a junior position. The
section should feel earned, not provisional.

**The tech stack audit:** The skill tags on each role handle technology signals.
The descriptions should not re-list the tech stack. "Built with Flutter, Firebase,
and Node.js" belongs in the tags, not the prose.

**The career timeline as biography:** This section is not a chronological record.
It is a case for why Jatin is where he is. Every sentence should serve that case.
Dates, locations, and job titles are structural anchors. The copy exists to answer:
"Why does this role matter to the person who hired you?"

---

## Related Documents

- [Portfolio Copy](./portfolio-copy.md) — Master copy document
- [Brand Strategy](../brand/brand-strategy.md) — Voice, tone, audience
- [Hero Copy Options v2](./hero-copy-options-v2.md) — The Thine proof point detail

---

**Last Updated**: 2026-03-17
**Maintained By**: ux-copywriter agent

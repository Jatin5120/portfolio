# Component Visual Audit

**Project**: React Portfolio
**Created**: 2026-02-20
**Last Updated**: 2026-02-20
**Version**: 1.0.0
**Status**: Active
**Authored By**: Art Director (visual-director agent)

---

## Overview

This document is a formal art direction review of the component playground as it stands before design approval. Every implemented component is evaluated against the intended "Digital Studio at Night" aesthetic, the orange (#FFAB00) restraint doctrine, the motion design values, the card depth system, and the overall brand brief from `docs/brand/brand-strategy.md`.

The evaluation uses three reference sources:

1. `.claude/rules/design/color-system.md` (v3.0, Two-Layer Architecture)
2. `docs/brand/brand-strategy.md` (v1.0, Active)
3. The component source files in `src/components/` and `src/styles/globals.css`

Note: `docs/design/visual-direction.md` and `docs/design/design-system.md` do not yet exist as formal documents. This audit references the color system rules and brand strategy as the closest authoritative specifications. Creating those two documents should be treated as a follow-up action after this audit is resolved.

---

## Overall Alignment Score

**7.5 / 10**

The component set is genuinely well-constructed. The dark-first aesthetic reads clearly, the color restraint is largely respected, and the token architecture is consistent throughout. The gaps that prevent a higher score are specific and fixable: the glow intensity values are slightly too high for the "quiet confidence" positioning, a few typography decisions undercut the bold-but-refined hierarchy, the social icon implementation in the Footer is aesthetically weak, and the ImagePlaceholder inside ProjectCard is the single biggest visual liability in the set. None of these are structural problems. They are craft-level refinements.

---

## Component Verdicts

---

### 1. globals.css — Foundation Layer

**Verdict: APPROVED WITH ONE NOTE**

**What is working:**

The token architecture is exactly right. Semantic names (`--color-page`, `--color-card`, `--color-elevated`, `--color-subtle`, `--color-border`) map cleanly to the two-layer system from the color rules. The decision to set `background-color: #0A0A0A` directly on `body` and not rely on a class is correct — it eliminates any flash of unstyled content before Tailwind loads.

The three glow tokens defined in `:root` are well-calibrated:

```css
--shadow-glow-sm: 0 0 10px rgba(255, 171, 0, 0.3);
--shadow-glow-md: 0 0 20px rgba(255, 171, 0, 0.4);
--shadow-glow-lg: 0 0 30px rgba(255, 171, 0, 0.5);
```

These are the right values for the token definitions. The issue — noted under Button and Footer — is that individual components are not always using these tokens and are instead hardcoding slightly higher values inline.

The skeleton shimmer animation is technically correct and uses the right card-to-elevated color ramp (`#161A22` to `#1F2937`). It reads as depth, not as a gray stripe.

The `prefers-reduced-motion` block is present and correctly collapses all animation durations to near-zero. This is non-negotiable for a 2025-2026 portfolio.

**Issue to address:**

The `@theme` block defines `--color-subtle` and `--color-elevated` both as `#1F2937`. This creates a naming collision. `subtle` is used as a border color (`border-subtle`) in nearly every component, while `elevated` is used as a background surface. They resolve to the same hex, which is semantically confusing and makes the system harder to audit. The border color should map to `#374151` (which is already defined as `--color-border`) and `--color-subtle` should either be renamed `--color-border-subtle` or point to the correct value. This is a token naming issue, not a visual issue — it will not be visible in the browser — but it is a maintenance liability.

---

### 2. Button.tsx

**Verdict: APPROVED WITH MINOR REFINEMENTS**

**What is working:**

The three-variant structure (primary, secondary, ghost) is exactly the right set. The variant styles are clean. The primary button using `bg-primary text-on-primary` with `hover:bg-primary-hover` and `active:bg-primary-active` follows the semantic token chain correctly — this is how it should be done.

The loading spinner is well-implemented: a `border-t-transparent` rotating ring using Framer Motion's `animate={{ rotate: 360 }}` at 0.8s duration. It does not feel cheap. The success and error states using `!bg-success` and `!bg-error` with forced white text are appropriate for the momentary feedback purpose of those states.

The focus ring — `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page` — is correctly implemented with `focus-visible` only (not `focus`), meaning keyboard users get the ring but mouse users do not see spurious outlines. The orange ring against the near-black offset background is high contrast and on-brand.

**Issues to address:**

**Glow intensity is one step too high on primary.** The hover animation defines:

```typescript
primary: { y: -2, boxShadow: '0 0 20px rgba(255, 171, 0, 0.4)' },
```

This is using `--shadow-glow-md` values (correct), but the glow radius of 20px at 0.4 opacity on a button — which is a relatively small element — creates a halo effect that reads as glitchy rather than premium on lower-DPI screens. The spec token `--shadow-glow-sm` (10px, 0.3 opacity) is the appropriate value for a button hover. Reserve `glow-md` for card hovers. Change the primary button to `0 0 12px rgba(255, 171, 0, 0.35)`.

**The secondary button hover fill is aggressive.** On hover, secondary transitions from outlined (transparent background, orange border, orange text) to fully filled (solid orange background, dark text). This is a significant visual jump — the border dissolves into the fill, which is jarring. A more refined approach would be to bring the background to `rgba(255, 171, 0, 0.12)` on hover (a faint orange tint) and save the full fill for the active/pressed state. This matches how Linear and Vercel handle outlined-to-filled button interactions and reads as more intentional.

**The `y: -2` lift on button hover is correct.** -2px is restrained and professional. Do not increase this.

**The success state text** reads `✓ Sent!` — a Unicode checkmark rather than an icon component. This is acceptable for the current phase but will need to be replaced with a proper icon once the icon system is defined, as Unicode characters render inconsistently across operating systems.

---

### 3. Badge.tsx

**Verdict: APPROVED**

**What is working:**

The `StatusBadge` for "live" status is one of the strongest single elements in the playground. `bg-primary/90 text-on-primary` with a `bg-page animate-pulse` inner dot is exactly the right treatment. Orange pill with a dark pulsing dot reads as "active, breathing, real." The backdrop-blur on both badge variants is a good choice — it gives the badges floating presence when overlaid on project images.

The "launching-soon" badge — `bg-elevated/90 text-accent border border-accent/30` — creates the right two-tier distinction. Live = filled orange (confident, present). Launching soon = outlined with orange tint (anticipatory, restrained). The hierarchy is readable at a glance.

`TechTag` using `bg-elevated text-secondary border border-subtle font-mono` is correct. Using `font-mono` for tech names is a subtle but meaningful touch — it signals these are literal technology names, not marketing labels. The muted `text-secondary` color means tags do not compete with the card title for attention.

`AvailableBadge` using a pulsing `bg-primary` dot inside a `rounded-full` pill is clean and the right spot for the single "look, I'm here" animation in the nav. The `border-primary/20` keeps the border visible without overpowering the nav.

**Minor note:** The three badges all use slightly different approaches to backdrop-blur (some have it, some don't) and slightly different border-radius shapes (`rounded-md` vs `rounded-full`). This inconsistency is intentional and contextually justified (status badges = `rounded-md` for seriousness, available badge = `rounded-full` for friendliness), but it should be documented in the forthcoming component spec so future contributors don't accidentally normalize them.

---

### 4. NavLink.tsx

**Verdict: APPROVED**

**What is working:**

The sliding underline via `after:scale-x-0` to `after:scale-x-100` on hover is the right choice. It is a well-worn interaction pattern at this point but it works because it is clearly communicating state without demanding attention. The underline uses `bg-primary after:rounded-full` which gives the line a soft, almost calligraphic endpoint — this is the correct level of detail.

The color transition from `text-secondary` (inactive) to `text-accent` (hover/active) is correct. Not jumping from neutral to white — jumping from gray to orange. This is on-brand.

The `focus-visible:ring-2` on the link itself (not just buttons) is good accessibility practice and shows consistent thinking across the component set.

**The only observation:** The nav links use `text-base` (16px). The font-weight is `font-medium`. On the dark background, this is readable but not particularly assertive. Given that the brand values "confident hierarchy," bumping nav links to `font-semibold` would give them more presence in the header, particularly in the transparent (pre-scroll) state where they render directly against the dark page with no background contrast.

---

### 5. ProjectCard.tsx

**Verdict: CONDITIONALLY APPROVED — IMAGE PLACEHOLDER MUST BE RESOLVED BEFORE PRODUCTION**

**What is working:**

The hover animation is the centerpiece of this component and it is largely correct:

```typescript
whileHover={{
  y: -4,
  borderColor: 'var(--color-primary)',
  boxShadow: '0 0 24px rgba(255, 171, 0, 0.2)',
}}
transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
```

`y: -4` is the specified lift value. The cubic-bezier `[0.4, 0, 0.2, 1]` is Material Design's standard easing curve and it feels natural here — fast out, gradual settle. The border animating from `border-subtle` to `border-primary` is the right signal. The glow at `0.2 opacity` is more restrained than the button glow — this is the correct priority ordering (cards should glow more subtly than buttons).

The featured card uses `0 0 32px rgba(255, 171, 0, 0.2)` — slightly wider radius on a larger surface. This is proportionally correct.

The `group-hover:scale-105` on the image inside the card is good. It creates a parallax-like inset zoom that rewards cursor interaction without the card itself growing.

The type hierarchy inside the card is well-ordered:
- `text-accent uppercase tracking-widest` tagline (orange, small, caps) — draws the eye first as context-setter
- `font-heading font-bold text-heading` title — the primary identifier
- `text-secondary text-sm leading-relaxed line-clamp-3` description — supporting, readable, contained
- `TechTag` row — metadata, appropriately muted
- `Button` — action, appropriately orange

This hierarchy follows the brand brief's "problem → title → context → action" reading order.

**Issues to address:**

**The ImagePlaceholder is a production-blocker.** When no image is provided, the card renders:

```tsx
<div className="w-full h-full bg-elevated flex items-center justify-center">
  <span className="font-mono text-xs text-tertiary uppercase tracking-widest">{title}</span>
</div>
```

A flat `#1F2937` rectangle with the project name centered in it in tiny gray mono text. This looks like a broken component, not a placeholder. In the playground context it is fine for review, but if any real project data lacks an image at launch, this will be immediately visible to the target audience (founders, engineering leads) and will read as unfinished work — directly contradicting the brand brief's "quality risks" guardrail: "Showing unfinished or mediocre work."

The placeholder needs to be replaced before any production deployment. Options in priority order: (a) ensure all projects have images before launch, (b) create a styled placeholder using a subtle grid or noise texture pattern with the project initial as a large typographic element in `text-accent`, or (c) use a gradient placeholder unique per-project based on a hash of the project ID.

**The arrow in the CTA button** (`{project.ctaText} →`) is a Unicode right arrow. The spacing between the text and arrow is governed by the gap in the Button's flex container, which renders as `gap-2`. At `size="small"`, the arrow feels slightly cramped. This is a minor visual tightness issue.

**The featured card's content padding** (`p-8 lg:p-12`) is generous and correct. The `flex flex-col justify-center` vertical centering works well for the two-column layout. One issue: when the description text is long, the content column can overflow its half of the grid on mobile before the `lg:grid-cols-2` breakpoint kicks in. The `space-y-5` spacing compound with `p-8` may need compression at the md breakpoint.

---

### 6. Header.tsx

**Verdict: APPROVED**

**What is working:**

The scroll-triggered background transition is implemented correctly and elegantly. The Framer Motion `animate` prop on the `header` element directly transitions `backgroundColor`, `borderBottomColor`, and `backdropFilter` between pre-scroll and post-scroll states:

```typescript
animate={{
  backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'rgba(10, 10, 10, 0)',
  borderBottomColor: scrolled ? 'rgba(31, 41, 55, 1)' : 'rgba(31, 41, 55, 0)',
  backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
}}
transition={{ duration: 0.3 }}
```

`rgba(10, 10, 10, 0.92)` at 12px backdrop-blur is the correct formula for a glass-dark header. Not fully opaque (would kill the premium feel), not too transparent (would make nav text unreadable against busy sections). The 0.3s duration is at the faster end of the recommended transition window — appropriate for a header since users expect immediate feedback when scrolling.

The logo uses `font-heading font-bold text-xl` with `hover:text-primary` — correct. The logo is intentionally the name "Jatin" in the heading font, not an icon or monogram. This is consistent with the brand positioning as a person, not a company.

The scroll threshold of 60px (`window.scrollY > 60`) is the right value — it clears the hero before triggering, so the transparent nav does not compete with hero content.

The `passive: true` event listener option is correctly applied.

**One structural note:** The `forceScrolled` prop for playground preview is a good pattern — it means the playground can test the scrolled state without requiring actual scroll. This kind of testability prop should be a standard in all stateful layout components.

---

### 7. Footer.tsx

**Verdict: APPROVED WITH ONE SIGNIFICANT REFINEMENT NEEDED**

**What is working:**

The signature block is the strongest visual element in the Footer and one of the strongest in the entire component set. `font-signature text-5xl lg:text-6xl text-accent` renders the Ms Madi script font in orange at a size where it genuinely looks like a handwritten signature. The "Built by" label above it in `text-xs text-tertiary uppercase tracking-widest` provides the interpretive frame without being heavy. This is a premium finish to the page and directly matches the brand brief's "personal touches that reveal personality" guidance.

The border-top separator and the double-padded layout (`py-12 lg:py-16`) give the footer appropriate breathing room.

**Issue to address:**

The social icon buttons use text abbreviations (`in`, `X`, `gh`) rendered in `font-mono text-xs`. This is a fallback for when no icon library is present, but it reads as unfinished. `in` for LinkedIn is particularly unclear — a new visitor may not parse it without prior context. For a portfolio whose primary audience includes founders and engineering leads who will assess every detail, this signals "I haven't finished the icons yet."

The hover animation on social icons is correct in principle:

```typescript
whileHover={{
  color: 'var(--color-primary)',
  borderColor: 'var(--color-primary)',
  boxShadow: 'var(--shadow-glow-sm)',
}}
```

Using `var(--shadow-glow-sm)` for the glow token is the right approach — this is how the token should be consumed. The icon button size (`w-11 h-11`) is the right touch target size (44x44px minimum for accessibility).

The abbreviations must be replaced with proper SVG icons before production. Options: Lucide React (already potentially in the stack), Heroicons, or hand-crafted SVGs for the three specific platforms. The icon style should be `stroke` (line icons) at a consistent 1.5px stroke weight to match the overall aesthetic.

---

### 8. Typography (playground section)

**Verdict: APPROVED**

**What is working:**

The font stack is exactly right for the "Digital Studio at Night" aesthetic:
- **Cabinet Grotesk** (headings) — modern geometric sans with personality, confident without being aggressive
- **Inter** (body) — the industry-standard choice for readability at text sizes in dark interfaces
- **JetBrains Mono** (mono/code) — the most respected developer mono face; using it signals technical literacy
- **Ms Madi** (signature, footer only) — used exactly once, as intended. This is correct restraint.

The `clamp(2.5rem, 6vw, 4.75rem)` hero text scaling is fluid and correct. At 4.75rem (76px) desktop, the hero headline is large enough to command the space without crossing into novelty. At 2.5rem (40px) mobile, it remains readable and confident.

The color hierarchy is sound:
- `text-heading` (#F3F4F6) — near-white, high contrast
- `text-secondary` (#9CA3AF) — readable gray for body
- `text-tertiary` (#6B7280) — dim gray for captions, labels
- `text-accent` (#FFAB00) — orange, used selectively

The mono code block in the typography section is a standout element. The `mobile_lead Jatin` block with the comment `// not a typo` is a small moment of personality that aligns directly with the brand brief's "human moments: brief vulnerability, humor, warmth" guidance. This is exactly the kind of touch that differentiates this portfolio from a template.

**One observation:** The `text-4xl lg:text-5xl` H1 and `text-3xl lg:text-4xl` H2 in the type scale use `font-bold` at the Tailwind default weight (700). Cabinet Grotesk supports weights up to 800 and potentially variable-weight values. If the font is loaded with the full weight range, using `font-extrabold` (800) for the H1/hero would add additional punch without changing the aesthetic direction. This is an enhancement to explore, not a correction required now.

---

### 9. Color System (playground section)

**Verdict: APPROVED**

The swatch panel correctly surfaces all 11 semantic tokens in use. The hex values displayed match the `globals.css` definitions exactly. No drift detected between what is defined and what is rendered.

**Strategic observation:** The playground shows `elevated` and `subtle` both mapped to `#1F2937`. This is the token naming collision noted in the globals.css section above. It is visible here as two swatches that are visually identical — a sharp eye will catch this during design review.

---

### 10. Playground Structure (playground.tsx itself)

**Verdict: APPROVED**

The playground's own header bar — `bg-card/95 backdrop-blur-md border-b border-subtle` — correctly uses the card surface treatment at 95% opacity with blur. The "Component Playground" label in `text-accent uppercase tracking-widest font-mono` with the live pulse indicator is a clean, self-aware design review tool.

The `PGSection`, `PGCard`, and `PGRow` helper components are well-structured and consistent. `PGSection` using `text-xs font-semibold text-tertiary uppercase tracking-widest font-mono border-b border-subtle pb-3` for section titles is appropriate for a utility review view — it clearly labels without impersonating a real UI element.

The `max-w-5xl mx-auto px-6` max-width constraint matches the Header's nav constraint, which means the playground renders within the same column width as the actual portfolio. This is correct — it means the spacing evaluations are accurate.

---

## Cross-Cutting Concerns

### Orange Restraint Assessment

The orange budget across the full component set is appropriate. Counting the intentional uses of `text-accent`, `bg-primary`, `border-primary`, and glow effects:

- **Button primary**: Orange fill (correct — primary CTA)
- **Button secondary**: Orange border and text (correct — secondary CTA)
- **NavLink active/hover**: Orange text + orange underline (correct — nav indicator)
- **AvailableBadge**: Orange dot pulse + orange border (correct — availability signal)
- **StatusBadge live**: Full orange fill (correct — prominent status)
- **StatusBadge launching-soon**: Orange dot + orange text (correct — muted variant)
- **TechTag**: No orange (correct — metadata should not compete)
- **ProjectCard hover**: Orange border + glow (correct — interaction reward)
- **Footer signature**: Orange script (correct — final brand touchpoint)
- **Social icon hover**: Orange text + border + glow (correct — interaction reward)

There is no section where orange appears redundantly or decoratively without purpose. The color is doing the job the color system rules describe: signaling interactivity, hierarchy, and brand identity — not painting the interface.

### Depth System Assessment

The card depth system is working correctly:
- Page background: `#0A0A0A` (deepest)
- Card surfaces: `#161A22` (5.4% relative luminance increase over page)
- Elevated surfaces (TechTag, StatusBadge backgrounds): `#1F2937` (second tier)
- Hover surface: `#1A1D24` (between card and elevated — correct micro-step)

This creates a three-level z-axis that is perceptible without being dramatic. The depth is environmental (like the "Digital Studio at Night" metaphor) rather than theatrical.

### Motion Consistency Assessment

| Component | y value | Duration | Easing | Assessment |
|-----------|---------|----------|--------|------------|
| Button primary hover | -2px | 0.2s | default | Correct for small element |
| Button tap | 0px, scale 0.98 | 0.2s | default | Correct confirmation |
| ProjectCard standard hover | -4px | 0.3s | [0.4, 0, 0.2, 1] | Correct per spec |
| ProjectCard featured hover | -4px | 0.3s | default (missing) | Minor: should use same cubic-bezier |
| Header scroll transition | n/a | 0.3s | default | Correct |
| Footer social hover | n/a | 0.2s | default | Correct |
| Spinner | 360deg | 0.8s | linear | Correct |
| Skeleton shimmer | CSS | 1.5s | ease-in-out | Correct |

**Finding:** The featured `FeaturedProjectCard` hover is missing the explicit easing curve that the standard card uses. The standard card specifies `ease: [0.4, 0, 0.2, 1]` (Material standard easing) while the featured card falls back to Framer's default (`ease: "easeOut"`). These will feel subtly different on hover. The featured card transition should use the same cubic-bezier for consistency.

---

## Issues Summary (Priority Ordered)

### Must Fix Before Production

| # | Component | Issue |
|---|-----------|-------|
| 1 | ProjectCard | ImagePlaceholder renders as a blank gray rect with tiny text — will read as broken for any project without an image |
| 2 | Footer | Social icons using text abbreviations (`in`, `X`, `gh`) — unclear, reads as unfinished |

### Should Fix Before Design Approval

| # | Component | Issue |
|---|-----------|-------|
| 3 | Button | Primary hover glow too intense for button-sized element — reduce to `0 0 12px rgba(255, 171, 0, 0.35)` |
| 4 | Button | Secondary hover fill is too abrupt — consider `rgba(255, 171, 0, 0.12)` tint on hover, full fill on active |
| 5 | ProjectCard | FeaturedProjectCard missing `ease: [0.4, 0, 0.2, 1]` on hover transition |
| 6 | globals.css | `--color-subtle` and `--color-elevated` both resolve to `#1F2937` — naming collision |

### Nice to Have Improvements

| # | Component | Suggestion |
|---|-----------|------------|
| 7 | NavLink | Bump from `font-medium` to `font-semibold` for more confident nav presence |
| 8 | Typography | Explore `font-extrabold` (800) for H1 if Cabinet Grotesk is loaded with full weight range |
| 9 | Button | Replace Unicode `✓` and `✗` with proper icon components once icon system is defined |
| 10 | docs/ | Create `docs/design/visual-direction.md` and `docs/design/design-system.md` — referenced throughout this audit but do not yet exist |

---

## What Is Working Well (Do Not Change)

These decisions are correct and should be preserved exactly:

1. **The signature in the Footer** — `font-signature text-5xl text-accent` is the single best brand moment in the playground. It is human, warm, and unexpected in exactly the right way.

2. **The mono code block in the typography section** — the `mobile_lead Jatin` block with the battery comment. Keep this tone in the actual portfolio.

3. **AvailableBadge pulsing dot** — restrained, on-brand, the right element to animate in the nav.

4. **Header scroll transition values** — `rgba(10, 10, 10, 0.92)` at `blur(12px)` is precisely right. Do not touch these.

5. **ProjectCard hover easing** — `[0.4, 0, 0.2, 1]` at 0.3s on the standard card. Premium feel.

6. **Focus ring implementation** — `focus-visible` only, orange ring, near-black offset. Consistent across all interactive elements.

7. **StatusBadge live variant** — filled orange with pulsing dark dot. The best status badge implementation in this pattern category.

8. **TechTag in `font-mono`** — signals that these are literal technology names. Correct and precise.

9. **The skeleton shimmer** — using the exact card-to-elevated color ramp for the shimmer gradient. Feels native to the surface system.

10. **Token usage discipline** — with only minor exceptions noted above, the components consistently use semantic tokens (`bg-card`, `text-secondary`, `border-subtle`) rather than raw color values. This means the system is maintainable.

---

## Mood Assessment

The "Digital Studio at Night" metaphor translates to the screen. The near-black backgrounds create an environmental darkness that makes the orange feel like light rather than decoration. When the ProjectCard border turns orange on hover, it reads as the card being illuminated — this is the right effect.

The typography has the confident weight the brand brief calls for. The headings command space. The body text is readable without being clinical. The mono annotations throughout the playground (section labels, code blocks) reinforce the "technically literate craftsman" positioning.

The component set reads as a coherent visual system with a single design sensibility behind it. A visitor encountering any one of these components would recognize it as belonging to the same portfolio. That is the baseline test for visual system coherence, and it passes.

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md) — positioning, personality, voice
- `.claude/rules/design/color-system.md` — color token definitions and usage philosophy
- `/Users/jatin/Documents/Projects/portfolio/src/styles/globals.css` — implemented token definitions
- `/Users/jatin/Documents/Projects/portfolio/src/components/ui/Button.tsx`
- `/Users/jatin/Documents/Projects/portfolio/src/components/ui/Badge.tsx`
- `/Users/jatin/Documents/Projects/portfolio/src/components/ui/NavLink.tsx`
- `/Users/jatin/Documents/Projects/portfolio/src/components/ui/ProjectCard.tsx`
- `/Users/jatin/Documents/Projects/portfolio/src/components/layout/Header.tsx`
- `/Users/jatin/Documents/Projects/portfolio/src/components/layout/Footer.tsx`

---

**Last Updated**: 2026-02-20
**Maintained By**: Art Director (visual-director agent)

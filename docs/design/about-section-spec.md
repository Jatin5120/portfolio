# About Section Specification - Timeline Scatter

**Project**: React Portfolio
**Created**: 2026-01-11
**Last Updated**: 2026-01-11
**Version**: 1.0.0
**Status**: Active - SELECTED APPROACH ✅
**Source**: visual-director agent recommendations

---

## Overview

The About section uses a **Timeline Scatter** layout - an organic constellation of **personal milestones** scattered across the viewport in a non-linear, explorable pattern. This approach breaks away from traditional resume-style timelines and creates a memorable, interactive experience.

**IMPORTANT CLARIFICATION** (2026-01-11):
- This section contains **PERSONAL** content (values, hobbies, philosophy, personality)
- **NOT professional** achievements (those go in separate Experience section or Projects)
- Timeline Scatter reveals who Jatin is as a human being, not as a developer
- Content source: `docs/content/about-section-copy-personal.md`

---

## Design Decision

**Selected Concept**: Timeline Scatter (Concept 1 from visual-director agent)

**Rationale**:
- ✅ Most visually unique - nothing like this in typical portfolios
- ✅ Perfect playful/professional balance for Independent Craftsman brand
- ✅ Non-linear storytelling shows confidence (not resume-like)
- ✅ Complements hero easter egg with explorable interaction
- ✅ Orange accent usage aligns with Impact First philosophy
- ✅ Rewards curiosity without overwhelming casual visitors
- ✅ Memorable and shareable experience

---

## Visual Layout

### Core Structure

**Center-anchored scatter pattern:**
```
              ↗️ Node (top-right)
            /
  ↖️ Node ━━ [Profile Photo] ━━ Node ↘️
            \    (Center)
              ↙️ Node (bottom-left)
```

**Positioning Pattern**:
- **Profile photo**: Anchors the center of the viewport
- **Career nodes**: Scattered organically around photo (5-8 nodes)
- **Connecting lines**: Subtle lines linking related nodes
- **Whitespace**: Generous breathing room between elements

### Node Positioning Example

```
Punjab → Bangalore (top-left, -120deg)
    ↖️
         [Profile Photo]
              ↓
    Published Packages (right, 0deg)
         →
              ↓
    60% Performance (bottom-left, -135deg)
    ↙️
              ↓
    Mobile Lead @ 2 (bottom-right, 135deg)
         ↘️
```

**Positioning Guidelines**:
- Nodes placed in circular/radial pattern around center
- Angles: 45deg increments for balance
- Distance from center: 200-400px (varies for visual interest)
- Avoid overlapping node hit areas (minimum 80px clearance)
- Mobile: Condense to smaller radius or vertical stack

---

## Career Milestones (Nodes)

### Node Content (5-8 key moments)

**Confirmed Nodes** (from professional-data.md):

1. **"Started with Flutter"**
   - Year: 2020
   - Position: Top-left
   - Details: First role at Agumentik, remote work, building foundations

2. **"Punjab → Bangalore"**
   - Year: 2021
   - Position: Left
   - Details: Career inflection point, relocated for bigger challenges

3. **"Published Open Source"**
   - Year: 2022-2023
   - Position: Top-right
   - Details: chat_package & livestream_package on pub.dev, 10k+ downloads

4. **"60% Performance Wins"**
   - Year: 2022-2024
   - Position: Bottom-left
   - Details: Optimizations across multiple apps, startup time improvements

5. **"Senior Flutter Developer"**
   - Year: 2022
   - Position: Right
   - Details: Appscrip, MVVM architecture transitions, code review leadership

6. **"Mobile Lead (1st company)"**
   - Year: Dec 2024
   - Position: Bottom-right
   - Details: Merlin AI by Foyer, leadership transition, Swift added to stack

7. **"Mobile Lead (2nd company)"**
   - Year: Jul 2025
   - Position: Bottom (or merge with #6)
   - Details: Thine, concurrent leadership, scaling teams

8. **"5 Years Building" (Optional center node)**
   - Year: 2020-2025
   - Position: Overlaying photo or separate
   - Details: Summary milestone, meta-reflection

### Node Visual Design

**Default State** (unexpanded):
```
┌─────────────────────┐
│                     │
│  Punjab → Bangalore │
│      2021           │
│                     │
└─────────────────────┘
```

**Structure**:
- Background: `bg-white dark:bg-page`
- Border: 1px solid `border-subtle` (dark theme only)
- Border radius: `rounded-2xl` (16px)
- Padding: `p-6` (24px)
- Shadow: Subtle `shadow-sm`
- Size: ~200px x 120px (flexible based on content)

**Default Content**:
- Title: 16-18px, semi-bold, text-primary
- Year: 14px, text-tertiary, positioned below or beside title
- Icon/visual (optional): Small graphic representing milestone

**Hover State**:
```
┌─────────────────────────────────┐ ← Orange glow
│  Punjab → Bangalore             │
│  2021                           │
│  ────────────────────────       │
│  Relocated from Punjab to       │
│  Bangalore to chase bigger      │
│  challenges. Joined PrimoTech   │
│  and leveled up from building   │
│  apps to building systems.      │
│                                 │
│  Stack: Flutter, Firebase       │
│  Impact: Career velocity ↗      │
└─────────────────────────────────┘
```

**Hover Changes**:
- Border: Orange (`border-primary`)
- Shadow: Orange glow `shadow-[0_0_30px_rgba(255,171,0,0.3)]`
- Height: Expands smoothly (auto height, max 400px)
- Content: Full story fades in below title
- Z-index: Raises above other nodes
- Scale: Slight scale up `scale-105` (1.05x)

**Expanded Content**:
- Separator: Thin orange line `border-t border-primary/30`
- Story text: 14-16px, text-secondary, 2-3 sentences
- Stack/Impact: Small metadata below story
- Links: If applicable (published packages → pub.dev)

---

## Interactive Elements

### 1. Magnetic Hover Effect

**Behavior**: Nodes subtly gravitate toward cursor position

**Implementation**:
```javascript
// Pseudo-code
onMouseMove(cursor) {
  nodes.forEach(node => {
    distance = calculateDistance(cursor, node.center);
    if (distance < 300px) {
      pullStrength = (300 - distance) / 300; // 0 to 1
      offset = (cursor - node.center) * pullStrength * 0.1;
      node.transform = `translate(${offset.x}px, ${offset.y}px)`;
    }
  });
}
```

**Details**:
- Activation radius: 300px from cursor
- Pull strength: Maximum 10% of distance (subtle)
- Smooth transition: `transition-transform duration-200`
- Desktop only (disable on touch devices)

### 2. Scroll Reveal Animation

**Behavior**: Nodes fade in one by one as user scrolls into About section

**Sequence**:
1. Profile photo fades in first (center anchor)
2. Nodes appear in chronological order (2020 → 2025)
3. Connecting lines draw after nodes appear
4. Stagger delay: 100-150ms between each node

**Animation Details**:
- Fade in: `opacity 0 → 1` over 600ms
- Scale in: `scale-95 → scale-100` for subtle pop
- Easing: `ease-out` for natural feel
- Trigger: When About section is 20% in viewport

### 3. Click to Focus

**Behavior**: Clicking a node brings it to center, dims others

**Focus State**:
- Clicked node: Moves to center (smooth animation)
- Other nodes: Reduce opacity to 0.3, blur slightly
- Connecting lines: Only show lines connected to focused node
- Background: Subtle dark overlay (`bg-black/10`)
- Close button: "✕" appears in top-right of focused node or overlay

**Exit Focus**:
- Click outside node
- Press Escape key
- Click close button
- All nodes return to original positions

### 4. Connection Lines Animation

**Behavior**: Lines between related nodes fade in/out

**Line Appearance**:
- Style: Dotted or dashed, 1px width
- Color: Orange with low opacity `stroke-primary/20`
- Animation: Draw from node center → connected node (SVG stroke-dashoffset)
- Trigger: After node appears, delay 200ms

**Hover Interaction**:
- Hovering node A: Lines connected to A brighten (`opacity-50`)
- Connected nodes: Subtle highlight or border pulse
- Other lines: Fade further (`opacity-10`)

**Related Node Connections** (suggested):
```
"Started with Flutter" ━━━━ "Published Open Source"
                      ╲
                       ━━━━ "Senior Flutter Developer"

"Punjab → Bangalore" ━━━━━━ "Mobile Lead (1st)"

"60% Performance Wins" ━━━━ "Senior Flutter Developer"
```

---

## Profile Photo (Center Anchor)

### Visual Design

**Size**:
- Desktop: 180px x 180px
- Mobile: 120px x 120px

**Style**:
- Shape: Circular
- Border: 3px solid orange (`border-primary`)
- Outer glow: Subtle pulsing animation (optional)
  ```css
  animation: pulse-glow 3s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(255, 171, 0, 0.4);
  ```
- Image: High quality, professional but approachable

**Positioning**:
- Vertical center of About section viewport
- Horizontal center
- z-index: Above connecting lines, below nodes

### Scroll Interaction (Optional)

**Subtle rotation on scroll**:
- Photo rotates slightly (±5-10deg) based on scroll progress
- Creates parallax depth effect
- Smooth transition, not jarring

**Implementation**:
```javascript
scrollProgress = (scrollY - sectionTop) / sectionHeight;
rotation = scrollProgress * 10 - 5; // Range: -5deg to +5deg
photo.style.transform = `rotate(${rotation}deg)`;
```

---

## Orange Accent Usage (Impact First)

### Node Elements

**Hover State**:
- Border: `border-primary` (2px, decorative feedback)
- Glow: `shadow-[0_0_30px_rgba(255,171,0,0.3)]` (large decorative element)
- Title highlight: Optional orange underline or accent

**Expanded Content**:
- Separator line: `border-primary/30` (decorative)
- Metric numbers: `text-accent` if large text (18px+)
- Links: `text-accent hover:text-primary-hover` (accessible)

### Photo Border

**Always visible**:
- Primary border: 3px `border-primary` (large element, WCAG exempt)
- Pulsing glow (optional): Decorative animation, no text contrast issue

### Connecting Lines

**SVG lines**:
- Default: `stroke-primary/20` (decorative)
- Hover: `stroke-primary/50` (decorative)
- Active/focused: `stroke-primary/70` (decorative)

### Background Accents (Optional)

**Subtle grid or dots**:
- Very faint orange dots at intersection points
- Creates technical/engineering feel
- Opacity: 0.05-0.1 (barely visible, atmospheric)

---

## Responsive Design

### Desktop (1280px+)

**Layout**:
- Full scatter pattern with 5-8 nodes
- Wide spacing (300-400px radius from center)
- Magnetic hover effects enabled
- All animations and interactions active

**Node sizing**: Standard (200px x 120px default)

### Tablet (768px - 1279px)

**Layout**:
- Reduced scatter radius (200-300px from center)
- 5-6 nodes visible (combine or hide less critical milestones)
- Magnetic hover disabled (touch device)
- Tap to expand instead of hover

**Node sizing**: Slightly smaller (180px x 100px)

### Mobile (< 768px)

**Layout Option 1 - Condensed Scatter**:
- Very tight radius (120-180px from center)
- 4-5 nodes only
- Nodes stack more vertically if needed
- Photo size reduced to 120px

**Layout Option 2 - Vertical Timeline** (fallback):
- Switch to vertical list if scatter becomes cramped
- Photo at top
- Nodes stack below in chronological order
- Still maintains card hover/tap expansion
- Connecting lines: Vertical line on left side

**Recommended**: Try Option 1 first, fallback to Option 2 if UX feels cluttered

---

## Animation Specifications

### Timing & Easing

**Scroll reveal**:
- Duration: 600ms per node
- Stagger: 150ms delay between nodes
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)

**Hover expansion**:
- Duration: 400ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo, smooth spring)
- Properties: height (auto), opacity (0 → 1), border-color, box-shadow

**Magnetic pull**:
- Duration: 200ms
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` (ease-in-out)
- Transform: translate(x, y)

**Click to focus**:
- Duration: 600ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- Properties: transform (translate to center), scale, opacity (others dim)

**Connection lines**:
- Duration: 800ms (draw animation)
- Easing: `linear` for stroke-dashoffset
- Delay: 200ms after node appears

### Performance Considerations

**Use transform and opacity only** for animations:
- ✅ `transform: translate()`, `scale()`, `rotate()`
- ✅ `opacity`
- ❌ Avoid animating: `width`, `height`, `top`, `left`, `margin`

**Optimize**:
- `will-change: transform` on nodes during interactions
- Remove `will-change` after animation completes
- Use `requestAnimationFrame` for magnetic hover
- Debounce scroll handlers (60fps max)

**Reduce motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Content Strategy

### Node Copy Guidelines

**Title** (5-8 words max):
- Punchy, memorable
- Action-oriented when possible
- ✅ "Published Open Source"
- ✅ "Punjab → Bangalore"
- ❌ "I published some packages" (too wordy)
- ❌ "Relocation" (too dry)

**Expanded Story** (2-3 sentences, 40-60 words):
- First sentence: What happened
- Second sentence: Impact or learning
- Third sentence (optional): Technical detail or personal insight

**Example**:
```
Title: "60% Performance Wins"

Expanded:
Optimized app startup time from 4.2s to 1.6s through lazy loading
and state management refactoring. Users stayed, retention tripled.
Magic isn't magic—it's profiling, benchmarking, and caring enough
to fix what slows people down.

Stack: BLoC, Custom caching, Flutter DevTools
Impact: 3x retention, 40% smaller bundles
```

**Tone** (per brand strategy):
- Confident yet warm
- Technical yet friendly
- Specific over generic (metrics, not buzzwords)
- First person, conversational
- Show personality through word choice

### Photo Selection

**Criteria**:
- Professional but approachable (not corporate headshot)
- Good lighting, sharp focus
- Neutral or blurred background (not distracting)
- Eye contact with camera (builds connection)
- Natural expression (slight smile, confident)
- High resolution (at least 400px x 400px for 2x displays)

---

## Implementation Roadmap

### Phase 1: Static Layout
- [ ] Profile photo centered
- [ ] 5-8 nodes positioned in scatter pattern
- [ ] Basic hover states (border, shadow)
- [ ] Responsive grid adjustments

### Phase 2: Basic Interactions
- [ ] Hover to expand node content
- [ ] Scroll reveal animation (fade in nodes)
- [ ] Click outside to collapse expanded node

### Phase 3: Advanced Interactions
- [ ] Magnetic hover effect (desktop only)
- [ ] Click to focus (dim others, bring to center)
- [ ] Connecting lines with SVG
- [ ] Line draw animation on scroll

### Phase 4: Polish
- [ ] Smooth easing and timing refinements
- [ ] Prefers-reduced-motion support
- [ ] Mobile touch optimizations
- [ ] Loading states for photo
- [ ] Dark mode color adjustments

### Phase 5: Content
- [ ] Finalize node copy with ux-copywriter agent
- [ ] Select/optimize profile photo
- [ ] Test readability and tone
- [ ] Add links where relevant (published packages)

---

## Technical Stack

**React Components**:
- `AboutSection.tsx` - Main container
- `TimelineScatter.tsx` - Scatter layout manager
- `CareerNode.tsx` - Individual node component
- `ProfilePhoto.tsx` - Center photo with effects
- `ConnectionLines.tsx` - SVG line renderer

**Libraries**:
- **Framer Motion**: All animations and gestures
- **React Intersection Observer**: Scroll reveal triggers
- **React Use**: Utility hooks (useWindowSize, useMouse)
- **clsx / cn**: Conditional classes

**Animation Tools**:
- Framer Motion `motion` components
- `useAnimation` hook for programmatic control
- `AnimatePresence` for enter/exit
- `useScroll` + `useTransform` for scroll effects

---

## Accessibility

### Keyboard Navigation

**Tab order**:
1. Profile photo (focusable, optional)
2. Node 1 (chronologically first)
3. Node 2
4. ...Node N

**Interactions**:
- `Tab`: Move to next node
- `Shift + Tab`: Move to previous node
- `Enter` or `Space`: Expand/collapse focused node
- `Escape`: Close expanded node or exit focus mode

### Screen Reader Support

**Profile photo**:
```jsx
<img
  src="profile.jpg"
  alt="Jatin - Mobile Lead, profile photo"
  role="img"
/>
```

**Nodes**:
```jsx
<article
  role="article"
  aria-label="Career milestone: Punjab to Bangalore, 2021"
  aria-expanded={isExpanded}
>
  <h3>Punjab → Bangalore</h3>
  <span aria-label="Year">2021</span>
  {isExpanded && (
    <div className="expanded-content" aria-live="polite">
      {/* Story content */}
    </div>
  )}
</article>
```

**Connection lines**:
```jsx
<svg aria-hidden="true" role="presentation">
  {/* Decorative lines, hidden from screen readers */}
</svg>
```

### Motion Sensitivity

**Respect prefers-reduced-motion**:
- Disable magnetic hover
- Reduce animation durations to near-instant
- Keep functional interactions (expand/collapse) but remove decorative motion
- Static scroll reveal (no fade-in, just appears)

### Focus Indicators

**Visible focus states**:
- Orange outline: `ring-2 ring-primary ring-offset-2`
- Clear visual difference from hover state
- Maintained during expanded state

---

## Dark Mode

### Color Adjustments

**Nodes**:
- Background: `bg-page` (darker card)
- Border: `border-subtle` (subtle separation)
- Text: `text-primary` (high contrast)
- Secondary text: `text-tertiary`

**Orange accents** (no change, Impact First):
- Primary-500 (#FFAB00) has 8.5:1 contrast on dark backgrounds
- Use freely for borders, glows, highlights

**Photo border**:
- Keep orange: `border-primary` (stands out beautifully in dark)

**Connection lines**:
- Slightly brighter: `stroke-primary/30` (more visible on dark)

**Background** (optional):
- Very dark: `bg-page` or `bg-black`
- Subtle noise texture for depth

---

## Design Principles Summary

**Visual Hierarchy**:
1. Profile photo (center anchor, most important)
2. Node titles (secondary, scannable)
3. Expanded content (tertiary, deep dive)
4. Connecting lines (ambient, context)

**White Space**:
- Generous padding around all elements
- Nodes never crowd each other
- Photo has breathing room (min 150px clear radius)

**Color Usage**:
- Monochrome base (neutral grays)
- Orange as strategic accent (hover, borders, glows)
- Follows Impact First: decorative elements use vibrant #FFAB00 freely

**Interaction Feedback**:
- Immediate hover response (< 100ms)
- Smooth animations (400-600ms)
- Clear affordances (cursor changes, borders, shadows)

**Personality**:
- Playful: Magnetic hover, scatter pattern
- Professional: Clean cards, readable typography
- Confident: Non-linear storytelling
- Warm: Personal stories in expanded content

---

## Content Checklist (To Finalize with ux-copywriter)

- [ ] **Node 1**: "Started with Flutter" - Full story, stack details
- [ ] **Node 2**: "Punjab → Bangalore" - Why relocated, what changed
- [ ] **Node 3**: "Published Open Source" - Package impact, learning
- [ ] **Node 4**: "60% Performance Wins" - Specific examples, metrics
- [ ] **Node 5**: "Senior Flutter Developer" - Leadership, architecture
- [ ] **Node 6**: "Mobile Lead (1st)" - Merlin AI, transition story
- [ ] **Node 7**: "Mobile Lead (2nd)" - Thine, concurrent leadership
- [ ] **Node 8** (optional): "5 Years Building" - Meta reflection

**Per-node requirements**:
- Title: 5-8 words, punchy
- Year: Clearly labeled
- Story: 2-3 sentences, 40-60 words
- Stack: Relevant tech mentioned
- Impact: Metric or outcome included
- Tone: Confident, warm, specific

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md) - Voice, positioning, personality
- [Professional Data](../content/professional-data.md) - Career timeline, achievements
- [Hero Section Reference](./hero-section-reference.md) - Complements hero easter egg
- [Color System Rules](../../.claude/rules/design/color-system.md) - Orange usage guidelines

---

## Discussion History

### Initial Problem (2026-01-11)

**User question**: "Is this much [hero easter egg] about enough or should I add an explicit about section?"

**Analysis**: Hero easter egg alone is insufficient because:
- Not everyone will discover the hidden technical view
- Limited information (code facts ≠ full story)
- Career journey deserves proper space (5 years → Mobile Lead at 2 companies)
- Different audiences need different context (tech leads, collaborators, developers)
- Your narrative is compelling and shouldn't be hidden

**Conclusion**: Yes, need explicit About section. Easter egg = technical credibility hook, About = depth and story.

### Reference Search Results

**User**: "I couldn't find a good reference, every portfolio I saw has only text, or at max have their picture as 2 column layout, 1 image 2 content."

**Problem identified**: Standard portfolio About sections are bland:
- Plain text blocks (boring)
- Basic 2-column layout: image left, content right (overdone)
- Nothing memorable or distinctive
- Doesn't match the elevated design level of hero easter egg

**User request**: "Is there another idea from the agent?"

### Visual Director Agent Consultation

**Task**: Generate creative About section approaches beyond standard layouts

**Agent generated 5 concepts**:
1. **Timeline Scatter** - Organic constellation of career milestones
2. **Code Comment Narrative** - About section as annotated source code
3. **Journey Map** - Geographic map + career timeline split-screen
4. **Performance Dashboard** - Analytics dashboard showing career metrics
5. **Conversation Tabs** - Tabbed interface with audience-aware content

**Agent's top picks**: Timeline Scatter or Conversation Tabs

### Selection Process

**User decision**: "timeline scatter"

**Rationale for selection**:
- Most visually unique among all 5 options
- Nothing like this exists in typical portfolios
- Perfect balance of playful + professional
- Aligns with "Independent Craftsman" brand
- Non-linear storytelling shows confidence
- Complements hero easter egg without repeating interaction pattern
- Orange accents work beautifully (glows, magnetic effects, connections)
- Rewards curiosity (passive presence philosophy)

### Why Other Options Weren't Selected

**Code Comment Narrative**: Too technical-heavy, might alienate non-developer visitors, less warm

**Journey Map**: More complex to implement, geographic focus less relevant to portfolio story, map might dominate content

**Performance Dashboard**: Lacks personal warmth, too metric-focused, could feel clinical

**Conversation Tabs**: Good approach but less visually distinctive, already using tabs/segmentation concept in hero (would feel repetitive)

---

## Design Decision Record

**Date**: 2026-01-11

**Decision**: Timeline Scatter layout for About section

**Alternatives Considered**:
1. ~~Code Comment Narrative~~ - Too technical-heavy, less warm
2. ~~Journey Map~~ - More complex to implement, geographical focus less relevant
3. ~~Performance Dashboard~~ - Lacks personal story, too metric-focused
4. ~~Conversation Tabs~~ - Good but less unique visually

**Why Timeline Scatter Won**:
- Most visually distinctive in portfolio landscape
- Perfect balance of playful interaction + professional content
- Non-linear storytelling aligns with confident brand positioning
- Complements hero easter egg without repeating pattern
- Orange accents work beautifully (glows, connections, borders)
- Rewards exploration (passive presence philosophy)
- User explicitly selected after reviewing all options

**Next Steps**:
1. Use ux-copywriter agent to draft node content
2. Use motion-designer skill to specify animation details
3. Create React component specifications
4. Implement Phase 1 (static layout) first

---

**Last Updated**: 2026-01-11
**Maintained By**: visual-director agent + manual refinements
**Status**: ✅ Specification complete, ready for content creation

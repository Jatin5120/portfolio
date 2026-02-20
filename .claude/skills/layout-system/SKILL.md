---
name: layout-system
description: Layout and spacing system architect for consistent, scalable designs. Use when defining spacing, grids, breakpoints, or layout patterns.
allowed-tools: Read, Write
model: sonnet
---

# Layout & Spacing System

Modern layout expert specializing in responsive grids and spacing scales.

## Quick Process

1. Review brand personality and visual direction
2. Define spacing scale (8px base recommended)
3. Set responsive breakpoints
4. Configure container widths
5. Design grid system
6. Provide spacing guidelines
7. Create implementation code

## Spacing Scale (8px Base System)

The 8px grid is industry standard for several reasons:
- Most screen sizes are divisible by 8
- Scales well across devices
- Maintains visual rhythm
- Easy mental math (8, 16, 24, 32, 40, 48...)

```javascript
const spacing = {
  0: '0',           // No spacing
  1: '0.25rem',     // 4px  - Tiny gaps, icon padding
  2: '0.5rem',      // 8px  - Small spacing
  3: '0.75rem',     // 12px - Compact spacing
  4: '1rem',        // 16px - Base unit
  5: '1.25rem',     // 20px - Comfortable spacing
  6: '1.5rem',      // 24px - Moderate spacing
  8: '2rem',        // 32px - Generous spacing
  10: '2.5rem',     // 40px - Large spacing
  12: '3rem',       // 48px - Extra large
  16: '4rem',       // 64px - Section spacing
  20: '5rem',       // 80px - Major section spacing
  24: '6rem',       // 96px - Extra spacing
  32: '8rem',       // 128px - Huge spacing
  40: '10rem',      // 160px - Massive spacing
  48: '12rem',      // 192px - Maximum spacing
}
```

## Spacing Usage Guidelines

### Component Internal Spacing

**Tight (4-8px):**
- Icon and text combinations
- Button icon spacing
- Input field padding (vertical)
- Badge padding

**Regular (12-24px):**
- Button padding
- Card internal padding
- Form field spacing
- List item spacing

**Loose (32-48px):**
- Between distinct sections within a component
- Card margin between cards
- Modal padding

### Section Spacing

**Mobile (48-64px):**
```javascript
const mobileSectionSpacing = {
  small: '3rem',    // 48px - Tight sections
  medium: '4rem',   // 64px - Standard sections
  large: '5rem',    // 80px - Generous sections
}
```

**Desktop (80-128px):**
```javascript
const desktopSectionSpacing = {
  small: '5rem',    // 80px - Tight sections
  medium: '6rem',   // 96px - Standard sections
  large: '8rem',    // 128px - Generous sections
  xlarge: '10rem',  // 160px - Hero spacing
}
```

### Page Margins/Padding

**Mobile:**
- Minimum: 16px (prevents content touching screen edges)
- Comfortable: 20px
- Generous: 24px

**Tablet:**
- Minimum: 24px
- Comfortable: 32px
- Generous: 48px

**Desktop:**
- Use container max-width instead of fixed margins
- Container padding: 24-48px
- Or centered container with auto margins

## Responsive Breakpoints

### Standard Breakpoint System

```javascript
const breakpoints = {
  xs: '0px',        // Extra small devices (default, mobile-first)
  sm: '640px',      // Small devices (large phones, landscape)
  md: '768px',      // Medium devices (tablets)
  lg: '1024px',     // Large devices (laptops)
  xl: '1280px',     // Extra large devices (desktops)
  '2xl': '1536px',  // 2X large devices (large desktops)
}
```

### Usage Strategy

**Mobile-first approach:**
```css
/* Base styles for mobile */
.element {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    padding: 3rem;
  }
}
```

### Common Breakpoint Uses

| Breakpoint | Common Changes |
|------------|----------------|
| **xs → sm** | Single column → multi-column, larger touch targets |
| **sm → md** | Hamburger menu → horizontal nav, 2 columns → 3 columns |
| **md → lg** | Sidebar appears, font size increases, more whitespace |
| **lg → xl** | Container max-width increases, 3 columns → 4 columns |
| **xl → 2xl** | Maximum scale reached, maintain max container width |

## Container System

### Container Max-Widths

```javascript
const containers = {
  sm: '640px',      // Narrow content (blog posts)
  md: '768px',      // Standard content
  lg: '1024px',     // Wide content
  xl: '1200px',     // Max width for most content
  '2xl': '1400px',  // Very wide content
  full: '100%',     // Full width (no constraint)
}
```

### Container Usage

**Prose/Content Container (640-768px):**
- Blog posts
- Long-form content
- Optimal reading width (60-80 characters per line)

**Standard Container (1024-1200px):**
- Most page sections
- Comfortable width for content + whitespace
- Good for projects, about sections

**Wide Container (1400px+):**
- Hero sections
- Image-heavy sections
- Showcase layouts

**Full Width:**
- Hero backgrounds
- Image backgrounds
- Special full-bleed sections

### Container Implementation

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;  /* Don't exceed for readability */
  }
}
```

## Grid System

### 12-Column Grid (Standard)

```javascript
const grid = {
  columns: 12,
  gaps: {
    mobile: '1rem',     // 16px
    tablet: '1.5rem',   // 24px
    desktop: '2rem',    // 32px
  }
}
```

### CSS Grid Implementation

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 2rem;
  }
}

/* Span columns */
.col-span-6 {
  grid-column: span 6;  /* Half width */
}

.col-span-12 {
  grid-column: span 12;  /* Full width */
}
```

### Common Grid Layouts

**Two Column (50/50):**
```css
.two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .two-col {
    grid-template-columns: 1fr 1fr;
  }
}
```

**Sidebar Layout (70/30):**
```css
.sidebar-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .sidebar-layout {
    grid-template-columns: 2fr 1fr;  /* 66%/33% */
  }
}
```

**Three Column:**
```css
.three-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .three-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .three-col {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Four Column (Projects Grid):**
```css
.four-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .four-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .four-col {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .four-col {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Modern Layout Patterns (2025)

### Bento Grid Layout

Asymmetric grid with varied cell sizes:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  grid-auto-rows: 200px;
}

.bento-item-large {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-item-wide {
  grid-column: span 2;
}

.bento-item-tall {
  grid-row: span 2;
}
```

### Masonry Layout

Pinterest-style layout (CSS Grid + JS or Masonry library):

```css
.masonry {
  columns: 1;
  column-gap: 1.5rem;
}

@media (min-width: 640px) {
  .masonry {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry {
    columns: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
}
```

### Full-Width Sections with Contained Content

```css
.section-full-width {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 4rem 0;
  background: var(--bg-color);
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

## Spacing Best Practices

### Vertical Rhythm

Maintain consistent vertical spacing:

```css
/* Base vertical rhythm */
* + * {
  margin-top: 1.5rem;  /* Base rhythm */
}

/* Adjust for specific elements */
h1, h2, h3 {
  margin-top: 3rem;  /* More space before headings */
  margin-bottom: 1rem;
}

section + section {
  margin-top: 6rem;  /* Section spacing */
}
```

### Optical Spacing

Sometimes mathematical spacing needs adjustment for visual balance:

- Headings may need slightly less top margin (they look heavier)
- Round shapes (circles, rounded cards) may need extra margin
- Icons aligned with text may need slight negative margin for visual alignment

### Don't Use Arbitrary Values

❌ Bad:
```css
.card {
  padding: 23px;  /* Why 23? */
  margin: 37px;   /* Arbitrary */
}
```

✅ Good:
```css
.card {
  padding: 1.5rem;  /* 24px from spacing scale */
  margin: 2rem;     /* 32px from spacing scale */
}
```

## Accessibility Considerations

### Touch Targets

Minimum touch target size: **44x44px** (WCAG AAA)

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;  /* Ensures minimum size */
}
```

### Focus Indicators

Sufficient spacing around interactive elements for focus rings:

```css
.interactive {
  margin: 0.25rem;  /* Space for 2px focus ring */
}

.interactive:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

## Output Format

Provide the following:

### 1. Complete Spacing Scale

```javascript
export const spacing = {
  // Full scale with px and rem values
  // Usage guidelines for each step
}
```

### 2. Breakpoint System

```javascript
export const breakpoints = {
  // All breakpoints
  // When to use each
}
```

### 3. Container Widths

```javascript
export const containers = {
  // All container sizes
  // Use cases for each
}
```

### 4. Grid Configuration

```javascript
export const grid = {
  columns: 12,
  gaps: { /* responsive gaps */ },
}
```

### 5. Implementation Code

**CSS Variables:**
```css
:root {
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ... */

  /* Breakpoints (as custom props) */
  --breakpoint-sm: 640px;
  /* ... */

  /* Container widths */
  --container-sm: 640px;
  /* ... */
}
```

**Tailwind Config:**
```javascript
module.exports = {
  theme: {
    spacing: {
      // spacing scale
    },
    screens: {
      // breakpoints
    },
    container: {
      // container config
    },
  },
}
```

### 6. Layout Recipes

Provide code for common layouts:
- Two-column layout
- Three-column grid
- Hero with content overlay
- Centered container
- Full-width section with contained content
- Bento grid
- Masonry layout

### 7. Responsive Strategy

Document how layouts change at each breakpoint:
- Mobile (xs): Single column, tight spacing
- Mobile landscape (sm): May introduce 2 columns
- Tablet (md): Multi-column, horizontal nav
- Desktop (lg): Full layout, sidebars appear
- Large desktop (xl, 2xl): Maximum widths maintained

### 8. Spacing Guidelines Reference

Quick reference table:

| Use Case | Mobile | Desktop |
|----------|--------|---------|
| Button padding | 12px 24px | 12px 24px |
| Card padding | 16px | 24px |
| Section spacing | 48-64px | 96-128px |
| Container margin | 16-24px | Auto (centered) |
| Grid gap | 16px | 24-32px |

For advanced layout topics, see:
- [CSS Grid Deep Dive](./css-grid.md)
- [Responsive Design Patterns](./responsive-patterns.md)
- [Container Queries](./container-queries.md)

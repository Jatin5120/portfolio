# Layout System

**Project**: React Portfolio (Developer Brand)
**Created**: 2026-01-27
**Version**: 1.0.0
**Status**: Active
**Aligns With**: Visual Direction (asymmetric, spacious, confident)

---

## Executive Summary

This layout system defines the spatial structure for the portfolio—a flexible 12-column grid with generous whitespace, responsive breakpoints, and asymmetric compositions that create visual interest while maintaining usability.

**Philosophy**: Space is a design element. Generous margins, clear section breaks, confident breathing room.

---

## Grid System

### 12-Column Grid (Standard)

**Why 12 columns**: Divisible by 2, 3, 4, 6 → maximum layout flexibility

**Grid Structure**:
```
Desktop (1024px+):  [1][2][3][4][5][6][7][8][9][10][11][12]
Tablet (768px+):    [1][2][3][4][5][6][7][8][9][10][11][12]
Mobile (< 768px):   [-------- Single Column --------]
```

### Column Spans (Common Layouts)

**Full Width** (12 columns):
- Hero sections
- Full-bleed images
- Page headers/footers

**Two-Thirds + One-Third** (8 + 4 columns):
- Project description (8) + metadata (4)
- Main content (8) + sidebar (4)

**Half + Half** (6 + 6 columns):
- Two-column layouts
- Side-by-side comparisons

**Three Equal Columns** (4 + 4 + 4):
- Skills grid
- Technology badges
- Social links

**Asymmetric** (7 + 5, 9 + 3):
- Intentional imbalance (visual interest)
- Use sparingly for emphasis

---

## Container System

### Container Max-Widths

**Purpose**: Prevent content from being too wide on large screens (readability, focus)

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* Mobile (default) */
.container {
  max-width: 100%;
  padding: 0 1rem; /* 16px */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding: 0 2rem; /* 32px */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 0 3rem; /* 48px */
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px; /* Golden ratio from visual direction */
    padding: 0 4rem; /* 64px */
  }
}

/* Extra Large (1536px+) */
@media (min-width: 1536px) {
  .container {
    max-width: 1280px; /* Cap at 1280px, increase margins instead */
    padding: 0 10%; /* 10-15% margins as per visual direction */
  }
}
```

### Container Variants

**Standard Container** (`.container`):
- Max-width: 1280px
- Use for: Main content sections

**Narrow Container** (`.container-narrow`):
- Max-width: 768px
- Use for: Long-form text, about section, blog posts

**Wide Container** (`.container-wide`):
- Max-width: 1440px
- Use for: Project galleries, image grids

**Full Bleed** (`.container-full`):
- Max-width: 100%
- Padding: 0
- Use for: Hero backgrounds, full-width images

---

## Responsive Breakpoints

### Breakpoint Scale

Based on common device sizes and Tailwind CSS defaults:

```css
/* Mobile First Approach */

/* xs: 0px - 639px (Mobile phones) */
@media (min-width: 0px) {
  /* Default styles, no media query needed */
}

/* sm: 640px+ (Large phones, small tablets) */
@media (min-width: 640px) {
  /* Slightly larger mobile, portrait tablets */
}

/* md: 768px+ (Tablets) */
@media (min-width: 768px) {
  /* Tablet portrait, 2-column layouts start */
}

/* lg: 1024px+ (Small desktops, landscape tablets) */
@media (min-width: 1024px) {
  /* Desktop layouts, multi-column grids */
}

/* xl: 1280px+ (Desktops) */
@media (min-width: 1280px) {
  /* Full desktop experience */
}

/* 2xl: 1536px+ (Large desktops) */
@media (min-width: 1536px) {
  /* Increase margins, cap content width */
}
```

### Breakpoint Usage Guidelines

**Mobile (0-639px)**:
- Single column layouts
- Stack all content vertically
- 16px horizontal padding
- 48px section spacing

**Tablet (640-1023px)**:
- 2-column layouts (6+6 or 8+4)
- 32px horizontal padding
- 64px section spacing

**Desktop (1024px+)**:
- Full 12-column grid
- 48-64px horizontal padding
- 96px+ section spacing
- Asymmetric layouts allowed

---

## Spacing System

### Spacing Scale (8px Base Unit)

Based on 8px grid for mathematical consistency:

```css
/* Tailwind-compatible spacing */
--spacing-0: 0px;       /* No space */
--spacing-1: 4px;       /* 0.25rem - Tight grouping */
--spacing-2: 8px;       /* 0.5rem - xs */
--spacing-3: 12px;      /* 0.75rem */
--spacing-4: 16px;      /* 1rem - sm */
--spacing-6: 24px;      /* 1.5rem - md */
--spacing-8: 32px;      /* 2rem */
--spacing-12: 48px;     /* 3rem - lg */
--spacing-16: 64px;     /* 4rem - xl */
--spacing-24: 96px;     /* 6rem - 2xl (section breaks) */
--spacing-32: 128px;    /* 8rem - 3xl (major sections) */
```

### Spacing Application

**Component Internal Spacing**:
- Button padding: `px-6 py-3` (24px × 12px)
- Card padding: `p-6` (24px all sides)
- Input padding: `px-4 py-2` (16px × 8px)

**Between Elements** (Same section):
- Heading → Paragraph: `mb-4` (16px)
- Paragraph → Paragraph: `mb-6` (24px)
- Card → Card: `gap-6` (24px mobile) → `gap-8` (32px desktop)

**Between Sections**:
- Mobile: `py-12` (48px top/bottom)
- Tablet: `py-16` (64px top/bottom)
- Desktop: `py-24` (96px top/bottom)

**Hero Section**:
- Extra spacious: `py-32` (128px top/bottom) on desktop
- Vertically centered: `min-h-screen` (100vh)

---

## Section Spacing

### Section Padding (Vertical)

**Mobile (< 768px)**:
```css
section {
  padding-top: 3rem;    /* 48px */
  padding-bottom: 3rem; /* 48px */
}
```

**Tablet (768px - 1023px)**:
```css
section {
  padding-top: 4rem;    /* 64px */
  padding-bottom: 4rem; /* 64px */
}
```

**Desktop (1024px+)**:
```css
section {
  padding-top: 6rem;    /* 96px */
  padding-bottom: 6rem; /* 96px */
}
```

**Hero Section (All Sizes)**:
```css
.hero {
  min-height: 100vh;
  padding-top: 8rem;    /* 128px */
  padding-bottom: 8rem; /* 128px */
}
```

### Section Horizontal Padding

Handled by `.container` class (see Container System above)

---

## Gutters (Column Gaps)

### Grid Column Gaps

**Mobile**:
```css
.grid {
  gap: 1rem; /* 16px between grid items */
}
```

**Tablet**:
```css
@media (min-width: 768px) {
  .grid {
    gap: 1.5rem; /* 24px */
  }
}
```

**Desktop**:
```css
@media (min-width: 1024px) {
  .grid {
    gap: 2rem; /* 32px between columns */
  }
}
```

**Project Cards** (Larger gaps):
```css
.project-grid {
  gap: 2rem; /* 32px mobile */
}

@media (min-width: 1024px) {
  .project-grid {
    gap: 4rem; /* 64px desktop - extra breathing room */
  }
}
```

---

## Margin Behavior

### Page Margins (Left/Right)

**Mobile (< 768px)**:
- Fixed: 16px (1rem)

**Tablet (768px - 1023px)**:
- Fixed: 32px (2rem)

**Desktop (1024px - 1535px)**:
- Fixed: 48-64px (3-4rem)

**Large Desktop (1536px+)**:
- Fluid: 10-15% of viewport width
- Centers content naturally
- Creates spacious, confident margins

**Implementation**:
```css
@media (min-width: 1536px) {
  .container {
    padding-left: 10vw;
    padding-right: 10vw;
  }
}
```

---

## Asymmetric Grid Examples

### Example 1: Project Showcase (7 + 5 Split)

**Desktop Layout**:
```tsx
<div className="grid grid-cols-12 gap-8">
  {/* Project description (7 columns) */}
  <div className="col-span-7">
    <h2>Project Name</h2>
    <p>Description...</p>
  </div>

  {/* Project metadata (5 columns, offset right) */}
  <div className="col-span-5">
    <img src="project-image.jpg" />
  </div>
</div>
```

**Mobile**: Stacks vertically (image on top, text below)

---

### Example 2: Hero Section (Asymmetric Text Placement)

**Desktop Layout**:
```tsx
<div className="grid grid-cols-12 items-center min-h-screen">
  {/* Heading (8 columns, left-aligned) */}
  <div className="col-span-8">
    <h1 className="text-7xl">Creative Developer</h1>
    <p>Building digital experiences...</p>
  </div>

  {/* Visual element (4 columns, right, offset down) */}
  <div className="col-span-4 col-start-9 mt-24">
    {/* Decorative orange glow or abstract shape */}
  </div>
</div>
```

**Why asymmetric**: Creates visual interest, breaks predictable centering

---

### Example 3: About Section (2/3 + 1/3 Split)

**Desktop Layout**:
```tsx
<div className="grid grid-cols-12 gap-12">
  {/* Main content (8 columns) */}
  <div className="col-span-8">
    <h2>About Me</h2>
    <p>Nearly 5 years into this craft...</p>
  </div>

  {/* Sidebar (4 columns) */}
  <div className="col-span-4">
    <h3>Skills</h3>
    <ul>...</ul>
  </div>
</div>
```

**Tablet (768px)**: 2/3 + 1/3 still works

**Mobile**: Stacks (main content first, sidebar below)

---

## Layout Patterns

### Pattern 1: Full-Width Hero

```tsx
<section className="min-h-screen flex items-center bg-page relative overflow-hidden">
  {/* Background gradient (full bleed) */}
  <div className="absolute inset-0 bg-gradient-radial..." />

  {/* Content (contained) */}
  <div className="container relative z-10">
    <h1 className="text-7xl font-bold text-accent">Hey, I'm Jatin</h1>
    <p className="text-xl text-secondary max-w-2xl">...</p>
  </div>
</section>
```

**Key**: Background is full-bleed, content is contained

---

### Pattern 2: Contained Section with Cards

```tsx
<section className="py-24 bg-page">
  <div className="container">
    <h2 className="text-4xl font-bold mb-12">Projects</h2>

    {/* Card grid with gaps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  </div>
</section>
```

**Key**: Container → Heading → Grid with responsive columns

---

### Pattern 3: Split Section (Image + Text)

```tsx
<section className="py-24">
  <div className="container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text (left) */}
      <div>
        <h2 className="text-4xl font-bold mb-6">About This Project</h2>
        <p className="text-lg text-tertiary">...</p>
      </div>

      {/* Image (right) */}
      <div>
        <img src="project.jpg" className="rounded-lg" />
      </div>
    </div>
  </div>
</section>
```

**Mobile**: Text stacks above image

**Desktop**: Side by side (50/50)

---

### Pattern 4: Bento Grid (Asymmetric Card Sizes)

```tsx
<div className="grid grid-cols-12 gap-4">
  {/* Large card (8 columns, 2 rows) */}
  <div className="col-span-8 row-span-2">
    <LargeCard />
  </div>

  {/* Small card (4 columns, 1 row) */}
  <div className="col-span-4">
    <SmallCard />
  </div>

  {/* Small card (4 columns, 1 row) */}
  <div className="col-span-4">
    <SmallCard />
  </div>

  {/* Medium cards (6 columns each) */}
  <div className="col-span-6">
    <MediumCard />
  </div>
  <div className="col-span-6">
    <MediumCard />
  </div>
</div>
```

**Use for**: Skills section, testimonials, technology showcase

---

## Typography Line-Length

### Max-Width for Readability

**Body Text** (Paragraphs):
```css
.prose {
  max-width: 65ch; /* ~80 characters per line */
}
```

**Hero Text** (Large headings):
```css
.hero-text {
  max-width: 20ch; /* ~40 characters, creates natural line breaks */
}
```

**Subheadings**:
```css
.subheading {
  max-width: 50ch; /* ~70 characters */
}
```

**Why `ch` unit**: Based on character count, not pixels. More predictable readability.

**Implementation**:
```tsx
<div className="container">
  <h1 className="text-7xl font-bold max-w-[20ch]">
    Creative Developer Building Digital Experiences
  </h1>

  <p className="text-xl text-tertiary max-w-[65ch]">
    Nearly 5 years into this craft, and I'm still discovering...
  </p>
</div>
```

---

## Z-Index Scale

### Layer Hierarchy

**Purpose**: Consistent stacking order across the site

```css
/* Background layers */
--z-background: -1;         /* Background patterns, gradients */
--z-base: 0;                /* Default layer (most content) */

/* Content layers */
--z-content: 1;             /* Cards, elevated surfaces */
--z-dropdown: 10;           /* Dropdowns, tooltips */

/* Overlay layers */
--z-sticky: 50;             /* Sticky headers */
--z-modal: 100;             /* Modals, dialogs */
--z-toast: 200;             /* Toast notifications */
--z-tooltip: 300;           /* Always on top tooltips */
```

**Usage**:
```tsx
<nav className="sticky top-0 z-50">Navigation</nav>
<div className="fixed inset-0 z-100">Modal</div>
<div className="absolute z-[-1]">Background pattern</div>
```

---

## Responsive Design Strategy

### Mobile-First Approach

**Default styles = Mobile** (no media query)

**Then enhance for larger screens**:
```css
/* Mobile (default) */
.hero {
  font-size: 2.5rem; /* 40px */
  padding: 3rem 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .hero {
    font-size: 3.5rem; /* 56px */
    padding: 4rem 2rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .hero {
    font-size: 4.75rem; /* 76px */
    padding: 6rem 4rem;
  }
}
```

**Benefits**:
- Better performance (mobile loads faster)
- Progressive enhancement
- Easier to maintain

---

## Common Layout Mistakes to Avoid

### ❌ Don't:

1. **Center everything** - Asymmetric layouts create interest
2. **Equal spacing everywhere** - Vary spacing for hierarchy
3. **Ignore max-width on text** - Long lines are unreadable
4. **Use fixed pixel widths** - Breaks responsiveness
5. **Cramped mobile spacing** - Mobile needs breathing room too
6. **Inconsistent breakpoints** - Stick to the scale (640, 768, 1024, 1280)
7. **Forget horizontal padding** - Content touching screen edges looks unfinished

### ✅ Do:

1. **Use container classes** - Consistent max-widths
2. **Follow spacing scale** - 8px increments (4, 8, 16, 24, 32, 48, 64, 96)
3. **Test on real devices** - Simulators don't show real scroll behavior
4. **Generous whitespace** - More space = more confident
5. **Stack on mobile** - Single column is almost always better
6. **Use CSS Grid** - More powerful than flexbox for layouts
7. **Respect aspect ratios** - 16:9 for images, square for avatars

---

## Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',    // 16px mobile
          sm: '2rem',         // 32px tablet
          lg: '3rem',         // 48px desktop
          xl: '4rem',         // 64px large desktop
          '2xl': '10rem',     // 160px extra large
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',    // Cap at 1280px, increase padding instead
        },
      },
      spacing: {
        '18': '4.5rem',   // 72px (between 16 and 24)
        '128': '32rem',   // 512px (hero spacing)
      },
      maxWidth: {
        '8xl': '1280px',  // Our max content width
      },
    },
  },
}
```

---

## Accessibility Considerations

### Layout Accessibility

**Keyboard Navigation**:
- Logical tab order (top → bottom, left → right on desktop)
- Skip links for long navigation
- Focus visible on all interactive elements

**Screen Readers**:
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`)
- Landmark roles when semantic HTML isn't enough
- Logical heading hierarchy (h1 → h2 → h3)

**Responsive Text**:
- Never set `font-size` below 16px (causes zoom on mobile)
- Use `rem` units (respects user's browser settings)
- Line-height 1.6+ for body text

**Touch Targets** (Mobile):
- Minimum 44×44px for buttons (iOS/Android guidelines)
- Adequate spacing between clickable elements (8px+)

---

## Testing Checklist

### Layout Testing

- [ ] Test on iPhone SE (375px width) - Smallest common phone
- [ ] Test on iPad (768px width) - Common tablet size
- [ ] Test on laptop (1440px width) - Common desktop size
- [ ] Test on 4K display (2560px width) - Large desktop
- [ ] Test text readability (max-width applied?)
- [ ] Test spacing consistency (8px grid maintained?)
- [ ] Test section breaks (clear visual separation?)
- [ ] Test responsive breakpoints (smooth transitions?)
- [ ] Test with browser zoom (150%, 200%)
- [ ] Test dark mode (layout doesn't break?)

---

## Related Documents

- [Visual Direction](./visual-direction.md) - Overall aesthetic, whitespace philosophy
- [Typography System](./typography-system.md) - Font sizes, line-heights, scales
- [Component System](./component-system.md) - Individual component layouts
- [Color System](../../.claude/rules/design/color-system.md) - Background colors, contrast

---

**Last Updated**: 2026-01-27
**Version**: 1.0.0
**Status**: ✅ Active - Ready for Implementation

**Quick Reference**:
- **Grid**: 12 columns, 16-32px gutters
- **Container**: Max 1280px, 16-64px padding
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Section Spacing**: 48px (mobile) → 96px (desktop)
- **Spacing Scale**: 8px base unit (4, 8, 16, 24, 32, 48, 64, 96)
- **Text Max-Width**: 65ch (body), 20ch (hero), 50ch (subheadings)

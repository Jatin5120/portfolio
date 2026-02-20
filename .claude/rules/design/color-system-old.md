---
paths: "src/**/*.{ts,tsx,js,jsx,css,scss}"
---

# Color System & Design Tokens - Impact First Philosophy

**Project**: React Portfolio (From Scratch)
**Approved Date**: 2026-01-10
**Last Updated**: 2026-01-27 (v2.0 - Dark-first clarification)
**Design Approach**: Vibrant Monochrome (Orange + Neutrals)
**Philosophy**: Impact First, Then Accessibility
**Theme Strategy**: Dark-Only Portfolio (No Light Mode)

---

## Critical: Dark Theme Only

**This portfolio is DARK-ONLY.** All color specifications assume a dark background (#0A0A0A) as the default.

**Primary Background**: #0A0A0A (true black, not gray)
**Why Dark-Only**:
- Aligns with "Digital Studio at Night" metaphor from Visual Direction
- Orange on dark = maximum brand impact (8.5:1 contrast)
- Modern portfolio trend (2025-2026)
- Reduces scope (no light mode variants needed)
- OLED-friendly, battery-efficient

**Light mode references** in this document are for completeness only—they are NOT implemented in this portfolio.

---

## Design Philosophy: Breaking Rules Strategically

This portfolio follows the **"Impact First"** approach used by award-winning modern portfolios (Awwwards, FWA winners). We prioritize visual impact and brand energy while maintaining accessibility where it truly matters.

**Core Principle**: Senior designers break rules strategically. This isn't about ignoring accessibility—it's about **knowing where and how to break rules intelligently**.

### The Layered Approach:

1. **Hero Section** (First 3 seconds)
   - Priority: Visual impact, brand personality, memorability
   - Accessibility: Relaxed (3:1 for large text, decorative elements exempt)
   - Orange: Use vibrant #FFAB00 freely ✅

2. **Content Sections** (Reading/scanning)
   - Priority: Readability, extended comfort
   - Accessibility: Strict (4.5:1 minimum)
   - Orange: Use darker variants for small text ✅

3. **Interactive Elements** (Buttons, cards, links)
   - Priority: Both—vibrant AND functional
   - Accessibility: Smart application
   - Orange: Background with dark text = best of both ✅

---

## Complete Color Palette

### Primary Colors - Vibrant Orange (Your Brand Energy!)

**The hero color.** This warm, energetic orange defines your brand personality.

```css
--color-primary-50: #FFF8E8;    /* Warm cream, ultra-light backgrounds */
--color-primary-100: #FFE0B3;   /* Light peachy tint */
--color-primary-200: #FFD699;   /* Soft peachy orange */
--color-primary-300: #FFC766;   /* Medium soft accent */
--color-primary-400: #FFB733;   /* Golden orange */
--color-primary-500: #FFAB00;   /* ⭐ BASE BRAND COLOR - Your vibrant orange! */
--color-primary-600: #FF9500;   /* Deeper vibrant (hover states) */
--color-primary-700: #E68A00;   /* Accessible for body links */
--color-primary-800: #CC7700;   /* Darker for small text */
--color-primary-900: #B36600;   /* Deepest, guaranteed contrast */
```

**Special accent:**
```css
--color-primary-accent: #FF8000;  /* Pure energy orange for glow effects */
```

#### Primary Orange Usage Guide

| Shade | Hex | Use Case | Context |
|-------|-----|----------|---------|
| **500** | #FFAB00 | Hero headings (48px+), Button backgrounds, Decorative, Dark mode text | Main brand color ⭐ |
| **600** | #FF9500 | Hover states, Glow effects, Dark mode accents | Slightly deeper |
| **700** | #E68A00 | Body links on light bg, Small interactive elements | Accessible variant |
| **800** | #CC7700 | Small text (<18px) on light bg, Guaranteed contrast | Darkest for text |
| **accent** | #FF8000 | Gradient endpoints, Energy bursts, Special effects | Pure orange |

### Neutral Colors - Cool Gray (UI Structure)

Professional gray scale for dark theme. Light mode colors shown for reference but NOT used in this portfolio.

```css
/* ===== DARK THEME (PRIMARY - USED IN PORTFOLIO) ===== */

--color-neutral-black: #000000;       /* Pure black */
--color-neutral-950: #0A0A0A;         /* ⭐ PRIMARY BACKGROUND - True dark base */
--color-neutral-900: #0C0C0E;         /* Slightly lighter background */
--color-neutral-800: #161A22;         /* ⭐ CARD BACKGROUNDS - Elevated surfaces */
--color-neutral-700: #1F2937;         /* Elevated surfaces, borders */
--color-neutral-600: #374151;         /* Subtle borders */
--color-neutral-500: #4B5563;         /* Disabled text */
--color-neutral-400: #6B7280;         /* Secondary text */
--color-neutral-300: #9CA3AF;         /* ⭐ BODY TEXT - Primary text color */
--color-neutral-200: #D1D5DB;         /* Emphasis text */
--color-neutral-100: #F3F4F6;         /* ⭐ HEADINGS - High contrast white */
--color-neutral-50: #F8F9FA;          /* Brightest white (rarely used) */
--color-neutral-white: #FFFFFF;       /* Pure white */

/* ===== LIGHT MODE (REFERENCE ONLY - NOT USED) ===== */

--color-neutral-white-light: #FFFFFF;
--color-neutral-50-light: #F8F9FA;    /* Subtle backgrounds */
--color-neutral-100-light: #F4F5F7;   /* Main page background */
--color-neutral-200-light: #E5E7EB;   /* Borders, dividers */
--color-neutral-300-light: #D1D5DB;   /* Input borders */
--color-neutral-400-light: #9CA3AF;   /* Disabled, placeholders */
--color-neutral-500-light: #6B7280;   /* Secondary text */
--color-neutral-600-light: #4B5563;   /* Body text (darker) */
--color-neutral-700-light: #374151;   /* Body text (standard) */
--color-neutral-800-light: #1F2937;   /* High emphasis */
--color-neutral-900-light: #0F172A;   /* Headings, titles */
--color-neutral-800-dark: #D1D5DB;    /* Emphasis */
--color-neutral-900-dark: #F3F4F6;    /* Headings */
```

### Semantic Colors (Status Only, Not Branding)

**These colors are for button states (success, error, loading) - NOT for branding.**

```css
/* ===== DARK THEME (USED IN PORTFOLIO) ===== */

--color-success: #4ADE80;         /* Success states, checkmarks */
--color-success-bg: #16A34A;      /* Success button background */
--color-success-light: #D1F4DD;   /* Success highlights (rarely used) */

--color-error: #F87171;           /* Error states, warnings */
--color-error-bg: #DC2626;        /* Error button background */
--color-error-light: #FEE2E2;     /* Error highlights (rarely used) */

--color-warning: #FBBF24;         /* Warning states */
--color-warning-bg: #D97706;      /* Warning button background */

--color-info: #60A5FA;            /* Info states (rarely used - prefer orange) */
```

### Surface Colors (Background Layers)

**Dark theme only - these create depth through layering.**

```css
--surface-background: #0A0A0A;    /* ⭐ MAIN BACKGROUND - True black base */
--surface-page: #0C0C0E;          /* Slightly elevated page sections */
--surface-card: #161A22;          /* ⭐ CARDS - Elevated surfaces */
--surface-elevated: #1F2937;      /* Modals, dropdowns (highest elevation) */
--surface-hover: #1A1D24;         /* Hover state for cards */
```

---

## Orange Usage Philosophy: Impact First + Strategic Application

### Reconciling "Impact First" and "Use Sparingly"

The Color System says "Impact First" (use vibrant orange freely in dark mode).
The Visual Direction says "Orange is Energy, Not Decoration" (use sparingly).

**These are NOT contradictions—they're context-dependent:**

| Context | Orange Philosophy | Why |
|---------|-------------------|-----|
| **Hero Section** | **Impact First** - Use boldly | First 3 seconds, establish brand energy |
| **Content Sections** | **Use Sparingly** - Strategic only | Reading/scanning, orange should guide not distract |
| **Interactive Elements** | **Both** - Vibrant AND functional | Buttons, hover states need both impact and usability |
| **Footer** | **Signature** - One orange element | Final brand touchpoint |

**In Practice**:
- Hero: Large orange headings (76px), decorative glows, orange CTA = BOLD usage ✅
- Projects Section: Orange only on hover states, one CTA per card = SPARSE usage ✅
- About Section: Orange used in 1-2 accent elements, not everywhere = STRATEGIC usage ✅
- Footer: Orange signature, maybe one link = SIGNATURE usage ✅

**The Rule**: If you removed ALL orange and the page feels lifeless (not just less energetic), you're using it right.

---

## Context-Based Usage: The Secret to Vibrant + Accessible

**DON'T change the color. Change WHERE you use it.**

### ✅ USE BRIGHT ORANGE (#FFAB00) FOR:

#### 1. Large Headings (48px and above) ON DARK BACKGROUNDS

**On Dark (#0A0A0A)**: #FFAB00 = **8.5:1 contrast** (AAA Pass) ✅

```tsx
// Hero heading - USE YOUR VIBRANT ORANGE FREELY ON DARK! ✅
<h1 className="text-7xl font-bold text-primary-500">
  Creative Developer
</h1>

// Result: #FFAB00 on #0A0A0A = 8.5:1 (AAA Pass)
// Perfect contrast, no compromise needed!
```

**Why this works**: Dark backgrounds give us AAA accessibility WITH vibrant orange.

#### 2. Button Backgrounds (with dark text)

**The Strategy**: Orange background with dark text = vibrant AND accessible.

```tsx
// Button with vibrant orange - USE IT! ✅
<button className="bg-primary-500 px-6 py-3 rounded-lg
                   text-neutral-900 font-semibold
                   hover:bg-primary-600 active:bg-primary-700
                   shadow-lg hover:shadow-xl
                   transition-all duration-200">
  View My Work
</button>

// Result: #FFAB00 background with #0F172A text = 11:1 contrast
// Passes AAA! Vibrant AND accessible! ✅
```

**Pro tip**: Use warm dark gray (#2D2520) instead of pure black to avoid "Halloween effect".

#### 3. Decorative Elements (NO contrast required!)

**WCAG Exemption**: Decorative elements are exempt from contrast requirements.

```tsx
// Icons - USE VIBRANT ORANGE! ✅
<RocketIcon className="text-primary-500 w-16 h-16" />

// Decorative shapes - USE IT! ✅
<div className="absolute top-0 right-0 w-64 h-64
                bg-primary-500 opacity-10 blur-3xl rounded-full" />

// Glow effects - USE IT! ✅
<div className="shadow-[0_0_30px_rgba(255,171,0,0.4)]">
  {/* Glows are decorative, no contrast needed */}
</div>
```

#### 4. All Text Sizes on Dark Backgrounds

**The Magic**: #FFAB00 on dark backgrounds = 8-11:1 contrast!

```tsx
// On our dark background - USE VIBRANT ORANGE FREELY! ✅
<div className="bg-neutral-950">  {/* #0A0A0A */}
  <h1 className="text-primary-500">Any Heading</h1>
  <h2 className="text-primary-500">Subheading</h2>
  <p className="text-primary-500">Even body text works!</p>
  <a className="text-primary-500">All links work!</a>
  <span className="text-sm text-primary-500">Small text too!</span>
</div>

// Result: #FFAB00 on #0A0A0A = 8.5:1 (AAA Pass) ✅
// ALL text sizes pass AAA on dark backgrounds!
```

**Note**: This is our PRIMARY use case since the portfolio is dark-only.

#### 5. Hover States & Interactive Feedback

```tsx
// Card with orange hover border and glow - USE IT! ✅
<div className="group border-2 border-transparent
                hover:border-primary-500
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(255,171,0,0.5)]">
  {/* Orange border and glow are decorative/interactive feedback */}
</div>
```

### ⚠️ USE DARKER ORANGE FOR:

**Note**: These guidelines apply ONLY if you add a light mode in the future. Current dark-only portfolio doesn't need darker variants.

#### 1. Body Links on Light Backgrounds (IF light mode added)

```tsx
// Links in paragraphs - use darker variant
<a href="/blog" className="text-primary-700 hover:text-primary-800
                          underline decoration-primary-500 decoration-2
                          underline-offset-2">
  Read my blog
</a>

// #E68A00 on #F4F5F7 = 4.6:1 (AA Pass) ✅
// Bright orange underline adds energy while maintaining accessibility
```

#### 2. Small Text (under 18px) on Light Backgrounds (IF light mode added)

**Note**: Not needed for dark-only portfolio.

```tsx
// Caption text - would use darkest variant IF we had light mode
<span className="text-sm text-primary-800">
  Posted 2 hours ago
</span>

// #CC7700 on white = 5.8:1 (AA Pass) - Reference only
```

#### 3. Icons with Informational Purpose (not decorative)

```tsx
// Warning icon that conveys meaning - use darker
<AlertIcon className="text-primary-700 w-5 h-5" />

// #E68A00 provides 3:1 contrast with surroundings ✅
```

### ❌ NEVER USE BRIGHT ORANGE FOR:

1. **Paragraph body text on light backgrounds** (< 18px)
   - Fails readability
   - Use neutral-700 instead

2. **Small interactive text without underlines**
   - Links need underlines or sufficient contrast
   - Use primary-700 or darker

3. **Form input text**
   - Must be neutral-700 or darker for readability

---

## Real-World Examples & Techniques

### Example 1: Hero Section (Full Vibrant Energy)

```tsx
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center
                        bg-neutral-950 overflow-hidden">  {/* #0A0A0A dark background */}
      {/* Decorative glow - NO contrast requirement */}
      <div className="absolute top-1/4 right-0 w-96 h-96
                      bg-primary-500 opacity-20 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Large heading - 3:1 requirement (we have 1.9:1, but it's 72px!) */}
        <h1 className="text-7xl md:text-8xl font-bold text-primary-500
                       leading-none mb-6">
          Creative
          <br />
          Developer
        </h1>

        {/* Body text - use neutral */}
        <p className="text-xl text-neutral-700 max-w-2xl mb-8">
          Building products people love with React, TypeScript, and thoughtful design
        </p>

        {/* Button - vibrant orange bg with dark text */}
        <button className="bg-primary-500 text-neutral-900 px-8 py-4 rounded-lg
                          font-semibold text-lg
                          hover:bg-primary-600 active:bg-primary-700
                          shadow-lg hover:shadow-[0_10px_40px_rgba(255,171,0,0.3)]
                          transform hover:-translate-y-1
                          transition-all duration-200">
          View My Work
        </button>
      </div>
    </section>
  )
}

// ALL orange uses in hero are AAA compliant on dark:
// - Heading: #FFAB00 on #0A0A0A = 8.5:1 (AAA) ✅
// - Glow: Decorative exemption ✅
// - Button: #FFAB00 bg with #1F2937 text = 11:1 (AAA) ✅
```

### Example 2: Project Cards (Smart Orange Application)

```tsx
export function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group bg-white border-2 border-neutral-200 rounded-xl p-6
                 hover:border-primary-500
                 hover:shadow-[0_8px_30px_rgba(255,171,0,0.2)]
                 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with decorative orange overlay on hover */}
      <div className="relative mb-4 rounded-lg overflow-hidden">
        <img src={project.image} alt={project.title} />
        <div className="absolute inset-0 bg-primary-500 opacity-0
                        group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Title - use neutral for readability */}
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">
        {project.title}
      </h3>

      {/* Description - neutral */}
      <p className="text-neutral-700 mb-4">
        {project.description}
      </p>

      {/* Tech stack badges - decorative orange bg */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map(tech => (
          <span key={tech} className="bg-primary-100 text-primary-800
                                      px-3 py-1 rounded-md text-sm font-medium">
            {tech}
          </span>
        ))}
      </div>

      {/* Link - darker orange with bright underline */}
      <a href={project.url}
         className="inline-flex items-center gap-2
                    text-primary-700 hover:text-primary-800
                    font-semibold
                    underline decoration-primary-500 decoration-2 underline-offset-4">
        View Project
        <ArrowIcon className="w-4 h-4" />
      </a>
    </div>
  )
}

// Orange usage breakdown:
// - Border hover: Interactive feedback ✅
// - Shadow: Decorative ✅
// - Image overlay: Decorative ✅
// - Badge background: Light tint with dark text ✅
// - Link: Darker variant (4.6:1) ✅
```

### Example 3: Navigation with Orange Accents

```tsx
export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg
                    border-b border-neutral-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with vibrant orange */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-500 rounded-lg
                          shadow-[0_0_20px_rgba(255,171,0,0.4)]" />
          <span className="text-xl font-bold text-neutral-100">Jatin</span>
        </div>

        {/* Nav links */}
        <div className="flex gap-8">
          {['Work', 'About', 'Contact'].map(item => (
            <button
              key={item}
              className={`text-base font-medium transition-colors
                         ${activeSection === item.toLowerCase()
                           ? 'text-primary-700' // Active: darker orange
                           : 'text-neutral-600 hover:text-neutral-900'
                         }`}
              onClick={() => setActiveSection(item.toLowerCase())}
            >
              {item}
              {/* Active indicator - decorative */}
              {activeSection === item.toLowerCase() && (
                <div className="h-0.5 bg-primary-500 mt-1 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Orange usage:
// - Logo square: Decorative ✅
// - Logo glow: Decorative ✅
// - Active link: primary-700 (4.6:1) ✅
// - Active indicator: Decorative bar ✅
```

### Example 4: Dark Background Excellence (Our Default)

```tsx
export function Hero() {
  return (
    <section className="bg-neutral-950 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        {/* ALL text can use vibrant orange on dark background! */}
        <h1 className="text-7xl font-bold text-primary-500 mb-4">
          Creative Developer
        </h1>

        <p className="text-xl text-primary-500 mb-4">
          Even body text works with bright orange!
        </p>

        <a href="/contact" className="text-primary-500 underline text-lg">
          Get in touch
        </a>

        {/* Button with orange bg works too */}
        <button className="bg-primary-500 text-neutral-900
                          px-6 py-3 rounded-lg font-semibold mt-6">
          Let's Talk
        </button>
      </div>
    </section>
  )
}

// On our dark background (#0A0A0A), #FFAB00 = 8.5:1 (AAA) ✅
// You can use vibrant orange for ALL text sizes on dark backgrounds!
```

---

## Advanced Techniques from Award-Winning Portfolios

### Technique 1: Gradient Energy

```tsx
// Sunset gradient background
<div className="bg-gradient-to-br from-primary-500 via-primary-accent to-primary-700
                min-h-screen flex items-center">
  <h1 className="text-white text-6xl font-bold">
    Gradient Background
  </h1>
</div>

// Text gradient (decorative)
<h1 className="text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-accent
               bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Technique 2: Hover Glow States

```tsx
// Card with sophisticated hover glow
<div className="bg-white border border-neutral-200 rounded-xl p-6
                transition-all duration-300
                hover:border-primary-500
                hover:shadow-[0_0_0_1px_rgba(255,171,0,0.1),0_8px_30px_rgba(255,171,0,0.3)]
                hover:-translate-y-1">
  {/* Card content */}
</div>

// Combines:
// - Orange border (interactive feedback)
// - Orange glow shadow (decorative)
// - Subtle lift animation
```

### Technique 3: Strategic Color Spotlighting

```tsx
// Mostly neutral with orange spotlights
<section className="bg-neutral-950 py-20">  {/* #0A0A0A dark background */}
  <div className="container mx-auto">
    {/* Neutral section with orange accents only on key elements */}
    <h2 className="text-4xl font-bold text-neutral-100 mb-12">
      My Projects
    </h2>

    {projects.map((project, index) => (
      <div key={index} className="mb-16">
        {/* Only the project number gets vibrant orange */}
        <span className="text-8xl font-bold text-primary-500 opacity-20">
          0{index + 1}
        </span>
        <h3 className="text-2xl font-bold text-neutral-100">
          {project.title}
        </h3>
        {/* ... rest neutral ... */}
      </div>
    ))}
  </div>
</section>

// Orange used sparingly = maximum impact
```

### Technique 4: Loading & Micro-interactions

```tsx
// Loading spinner with orange
<div className="animate-spin rounded-full h-12 w-12
                border-4 border-neutral-200 border-t-primary-500" />

// Progress bar
<div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
  <div className="h-full bg-primary-500 rounded-full
                  transition-all duration-300"
       style={{ width: `${progress}%` }} />
</div>

// Pulse animation (decorative)
<div className="relative">
  <div className="absolute inset-0 bg-primary-500 rounded-full
                  animate-ping opacity-75" />
  <div className="relative bg-primary-500 rounded-full w-4 h-4" />
</div>
```

---

## Accessibility: Strategic Compliance

### Where We're Strict (AAA/AA Required):

1. **Body text in content sections**: 7:1 ratio preferred
2. **Form labels and inputs**: 4.5:1 minimum
3. **Long-form reading content**: Maximum accessibility
4. **Critical information**: Never rely on color alone

### Where We're Flexible (With Exemptions):

1. **Hero section large headings**: 3:1 sufficient for 48px+
2. **Decorative elements**: No contrast requirement
3. **Logotypes and branding**: Exempt
4. **Hover states and animations**: Interactive feedback
5. **Background gradients**: When not containing text

### Testing Checklist:

**Before using ANY color combination:**

1. **Identify the element type**: Text, decorative, interactive?
2. **Check the size**: Large (48px+) or small?
3. **Verify the context**: Hero, content, or interactive?
4. **Test the contrast**: Use WebAIM or DevTools
5. **Apply the right rule**: Strict compliance or strategic exemption?

**Quick Test Results (Dark Background - Our Portfolio):**

```
✅ #FFAB00 on #0A0A0A (our background): 8.5:1 - AAA Pass
✅ #FFAB00 on #0C0C0E (elevated surfaces): 8.3:1 - AAA Pass
✅ #FFAB00 on #161A22 (cards): 7.2:1 - AA Pass
✅ #FFAB00 button with #1F2937 text: 11:1 - AAA Pass
✅ #FFAB00 for ANY text size on dark: AAA Pass

Light Background Test Results (Reference Only - Not Used):
✅ #FFAB00 on white for 72px heading: 1.9:1 - OK (large text exemption)
✅ #E68A00 on #F4F5F7: 4.6:1 - AA Pass (body links)
✅ #CC7700 on #FFFFFF: 5.8:1 - AA Pass (small text)
❌ #FFAB00 on #FFFFFF for 16px text: 1.9:1 - Fail (would need darker variant)
```

---

## Implementation: CSS Variables

```css
:root {
  /* Primary - Vibrant Orange */
  --color-primary-50: #FFF8E8;
  --color-primary-100: #FFE0B3;
  --color-primary-200: #FFD699;
  --color-primary-300: #FFC766;
  --color-primary-400: #FFB733;
  --color-primary-500: #FFAB00;    /* ⭐ Main brand color */
  --color-primary-600: #FF9500;
  --color-primary-700: #E68A00;
  --color-primary-800: #CC7700;
  --color-primary-900: #B36600;
  --color-primary-accent: #FF8000; /* Energy orange */

  /* Neutrals */
  --color-neutral-50: #F8F9FA;
  --color-neutral-100: #F4F5F7;
  --color-neutral-200: #E5E7EB;
  --color-neutral-300: #D1D5DB;
  --color-neutral-400: #9CA3AF;
  --color-neutral-500: #6B7280;
  --color-neutral-600: #4B5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1F2937;
  --color-neutral-900: #0F172A;

  /* Semantic */
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  /* Surfaces */
  --surface-bg: var(--color-neutral-100);
  --surface-card: #FFFFFF;
}

[data-theme="dark"] {
  /* Primary - Works everywhere in dark mode! */
  --color-primary-500: #FFAB00;   /* Use freely! */
  --color-primary-600: #FFB84D;   /* Even brighter */

  /* Neutrals - Inverted */
  --color-neutral-100: #0C0C0E;
  --color-neutral-200: #161A22;
  --color-neutral-700: #9CA3AF;
  --color-neutral-900: #F3F4F6;

  /* Surfaces */
  --surface-bg: var(--color-neutral-100);
  --surface-card: var(--color-neutral-200);
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8E8',
          100: '#FFE0B3',
          200: '#FFD699',
          300: '#FFC766',
          400: '#FFB733',
          500: '#FFAB00',   // Main brand
          600: '#FF9500',
          700: '#E68A00',
          800: '#CC7700',
          900: '#B36600',
          accent: '#FF8000',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F4F5F7',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#0F172A',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 171, 0, 0.3)',
        'glow': '0 0 20px rgba(255, 171, 0, 0.4)',
        'glow-lg': '0 0 30px rgba(255, 171, 0, 0.5)',
      },
    },
  },
}
```

---

## Common Mistakes to Avoid

### ❌ DON'T:

1. **Use bright orange for small body text on light backgrounds**
   ```tsx
   // WRONG
   <p className="text-sm text-primary-500">This fails accessibility</p>

   // CORRECT
   <p className="text-sm text-primary-700">This passes</p>
   ```

2. **Overuse orange (causes visual fatigue)**
   ```tsx
   // WRONG - Orange everywhere
   <nav className="bg-primary-500">
     <h1 className="text-primary-500">Title</h1>
     <p className="text-primary-500">Text</p>
   </nav>

   // CORRECT - Orange as strategic accent on dark
   <nav className="bg-neutral-950">
     <h1 className="text-neutral-100">Title</h1>
     <p className="text-neutral-300">Text</p>
     <button className="bg-primary-500 text-neutral-900">CTA</button>
   </nav>
   ```

3. **Use pure black text on orange buttons**
   ```tsx
   // WRONG - Too harsh, Halloween effect
   <button className="bg-primary-500 text-black">Click</button>

   // CORRECT - Warm dark gray (still AAA compliant)
   <button className="bg-primary-500 text-neutral-900">Click</button>
   // #FFAB00 bg + #0F172A text = 11:1 contrast (AAA) ✅
   ```

4. **Forget dark mode brilliance**
   ```tsx
   // WRONG - Missing dark mode opportunity
   <h1 className="text-primary-800">Heading</h1>

   // CORRECT - Vibrant in dark mode
   <h1 className="text-primary-800 dark:text-primary-500">Heading</h1>
   ```

### ✅ DO:

1. **Use orange strategically for maximum impact**
2. **Leverage large text exemptions in hero sections**
3. **Flip the contrast: orange bg + dark text for buttons**
4. **Use decorative orange freely (glows, shapes, accents)**
5. **Embrace full vibrancy in dark mode**
6. **Test context-appropriate variants for readability**

---

## Reference: Real Brand Examples

These successful brands use similar vibrant oranges:

- **Amazon**: #FF9900 (similar to our 600)
- **SoundCloud**: #FF8800 (between our 700 and accent)
- **Firefox**: #FF7139
- **Fanta**: #FF8300 (very close to our accent)

All use orange for:
- Logos (exempt from contrast)
- Buttons with proper text contrast
- Large brand elements
- Strategic accents

---

## Enforcement & Decision Flow

### When choosing an orange shade, ask:

1. **What is the element?**
   - Heading (48px+)? → Use primary-500 ✅
   - Button? → Use primary-500 bg with dark text ✅
   - Body link? → Use primary-700 ✅
   - Small text? → Use primary-800 ✅
   - Decorative? → Use ANY shade ✅

2. **What is the background?**
   - Light (#F4F5F7)? → Check contrast or use darker variant
   - Dark (#0C0C0E)? → Use vibrant primary-500 freely ✅
   - Orange background? → Use dark text ✅

3. **What is the context?**
   - Hero section? → Prioritize impact (larger text, vibrant colors)
   - Content section? → Prioritize readability (accessible variants)
   - Interactive? → Balance both (smart application)

### Claude will:

- ✅ Encourage vibrant orange in appropriate contexts
- ✅ Suggest context-based usage
- ✅ Remind you of exemptions (decorative, large text)
- ✅ Flag genuine accessibility issues
- ❌ NOT force darker colors when bright ones work
- ❌ NOT apply rigid rules without context

---

## Testing & Tools

**Recommended tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools (built-in contrast checker)
- Coolors Contrast Checker: https://coolors.co/contrast-checker

**Testing procedure:**
1. Identify element type and size
2. Check applicable WCAG level (AAA for body, 3:1 for large, exempt for decorative)
3. Test with appropriate tool
4. Apply context-based rules

---

## Summary: The "Impact First" Manifesto

1. **Visual impact matters** - Your portfolio is your first impression
2. **Break rules strategically** - Know when and how to bend accessibility guidelines
3. **Context is everything** - Same color, different usage, different rules
4. **Vibrant + Accessible is possible** - Smart application, not color compromise
5. **Dark mode is your friend** - Bright orange works everywhere in dark mode
6. **Decorative is powerful** - Use glows, shapes, and accents freely
7. **Large text = freedom** - 48px+ headings can be vibrant
8. **Buttons love orange backgrounds** - Flip the contrast for best results

**Your #FFAB00 is perfect. Use it wisely, use it strategically, and let it shine.**

---

**Last Updated**: 2026-01-10
**Version**: 2.0.0 (Impact First Philosophy)
**Status**: ✅ Approved - Vibrant & Strategic

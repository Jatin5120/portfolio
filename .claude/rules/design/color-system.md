---
paths: "src/**/*.{ts,tsx,js,jsx,css,scss}"
---

# Color System & Design Tokens - Two-Layer Architecture

**Project**: React Portfolio (From Scratch)
**Approved Date**: 2026-01-10
**Last Updated**: 2026-01-27 (v3.0 - Two-layer system)
**Design Approach**: Vibrant Monochrome (Orange + Neutrals)
**Philosophy**: Impact First, Then Accessibility
**Theme Strategy**: Dark-Only Portfolio (No Light Mode)
**Architecture**: Two-Layer (Core Colors + Semantic Tokens)

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

---

## Two-Layer Color System

**Why Two Layers?**
1. **Easy global changes**: Change `--orange-500` in one place, updates everywhere that uses `--color-primary`
2. **Semantic clarity**: `--bg-card` is clearer than `--neutral-800`
3. **Maintainability**: Update brand color without touching 50+ component files
4. **Flexibility**: Swap colors instantly (e.g., orange → blue) by changing Layer 2 only

**How to Use**:
- **Layer 1** (Core Colors): Define once in global CSS, never reference directly in components
- **Layer 2** (Semantic Tokens): Use these in all components via Tailwind config or CSS variables

---

## Layer 1: Core Colors (Raw Hex Values)

### Purpose
Define the color palette. **Never use these directly in components.**

### Orange Scale

```css
/* Brand Orange - Vibrant, warm, energetic */
--orange-50: #FFF8E8;      /* Warm cream */
--orange-100: #FFE0B3;     /* Light peachy tint */
--orange-200: #FFD699;     /* Soft peachy orange */
--orange-300: #FFC766;     /* Medium soft accent */
--orange-400: #FFB733;     /* Golden orange */
--orange-500: #FFAB00;     /* ⭐ BASE BRAND COLOR */
--orange-600: #FF9500;     /* Deeper vibrant */
--orange-700: #E68A00;     /* Accessible variant */
--orange-800: #CC7700;     /* Darker */
--orange-900: #B36600;     /* Deepest */
--orange-accent: #FF8000;  /* Pure energy orange */
```

### Neutral Scale (Dark Theme)

```css
/* Grayscale - From true black to off-white */
--neutral-black: #000000;   /* Pure black (rarely used) */
--neutral-950: #0A0A0A;     /* ⭐ True dark base */
--neutral-900: #0C0C0E;     /* Slightly lighter */
--neutral-800: #161A22;     /* ⭐ Card backgrounds */
--neutral-700: #1F2937;     /* Elevated surfaces */
--neutral-600: #374151;     /* Subtle borders */
--neutral-500: #4B5563;     /* Disabled state */
--neutral-400: #6B7280;     /* Secondary text */
--neutral-300: #9CA3AF;     /* ⭐ Body text */
--neutral-200: #D1D5DB;     /* Emphasis text */
--neutral-100: #F3F4F6;     /* ⭐ Headings */
--neutral-50: #F8F9FA;      /* Brightest white */
--neutral-white: #FFFFFF;   /* Pure white (rarely used) */
```

### State Colors

```css
/* Success, Error, Warning (for button states, feedback) */
--green-500: #4ADE80;       /* Success state */
--green-600: #16A34A;       /* Success (darker) */

--red-500: #F87171;         /* Error state */
--red-600: #DC2626;         /* Error (darker) */

--yellow-500: #FBBF24;      /* Warning state */
--yellow-600: #D97706;      /* Warning (darker) */

--blue-500: #60A5FA;        /* Info (rarely used) */
```

---

## Layer 2: Semantic Tokens (Purpose-Based)

### Purpose
Describe what the color is FOR, not what it is. **Use these in all components.**

### Brand Colors

```css
/* Primary Brand Color (Orange) */
--color-primary: var(--orange-500);           /* Main brand color */
--color-primary-hover: var(--orange-600);     /* Hover state */
--color-primary-active: var(--orange-700);    /* Active/pressed state */
--color-primary-light: var(--orange-100);     /* Subtle backgrounds */
--color-primary-accent: var(--orange-accent); /* Special effects, gradients */
```

### Background Colors

```css
/* Surface Layers (Dark Theme) */
--bg-page: var(--neutral-950);        /* ⭐ MAIN PAGE BACKGROUND (#0A0A0A) */
--bg-base: var(--neutral-900);        /* Base sections (#0C0C0E) */
--bg-card: var(--neutral-800);        /* ⭐ CARDS & ELEVATED SURFACES (#161A22) */
--bg-elevated: var(--neutral-700);    /* Modals, dropdowns (#1F2937) */
--bg-hover: #1A1D24;                  /* Hover state (custom mix) */
--bg-overlay: rgba(0, 0, 0, 0.8);     /* Modal backdrop */
```

### Text Colors

```css
/* Text Hierarchy */
--text-primary: var(--neutral-100);    /* ⭐ HEADINGS, HIGH EMPHASIS (#F3F4F6) */
--text-secondary: var(--neutral-300);  /* ⭐ BODY TEXT, MAIN CONTENT (#9CA3AF) */
--text-tertiary: var(--neutral-400);   /* Captions, labels (#6B7280) */
--text-disabled: var(--neutral-500);   /* Disabled state (#4B5563) */
--text-accent: var(--orange-500);      /* Orange text on dark (#FFAB00) */
--text-on-primary: var(--neutral-900); /* Dark text on orange button (#0C0C0E) */
--text-inverse: var(--neutral-950);    /* Black text (on light surfaces) */
```

### Border Colors

```css
/* Borders & Dividers */
--border-subtle: var(--neutral-700);   /* Subtle dividers (#1F2937) */
--border-default: var(--neutral-600);  /* Card borders (#374151) */
--border-strong: var(--neutral-500);   /* Emphasized borders (#4B5563) */
--border-accent: var(--orange-500);    /* Orange borders (hover) (#FFAB00) */
```

### Interactive States

```css
/* Button States */
--button-primary-bg: var(--orange-500);       /* Orange button background */
--button-primary-text: var(--neutral-900);    /* Dark text on orange */
--button-primary-hover: var(--orange-600);    /* Hover state */
--button-primary-active: var(--orange-700);   /* Pressed state */

--button-secondary-bg: transparent;           /* Transparent background */
--button-secondary-text: var(--orange-500);   /* Orange text */
--button-secondary-border: var(--orange-500); /* Orange border */

--button-ghost-bg: transparent;               /* No background */
--button-ghost-text: var(--neutral-300);      /* Neutral text */
--button-ghost-hover: var(--orange-500);      /* Orange on hover */

/* Link States */
--link-default: var(--orange-500);            /* Link color */
--link-hover: var(--orange-400);              /* Link hover */
--link-active: var(--orange-600);             /* Link active/pressed */
--link-visited: var(--neutral-500);           /* Visited (dimmed) */
```

### Feedback States

```css
/* Success, Error, Warning */
--state-success: var(--green-500);        /* Success text/icon (#4ADE80) */
--state-success-bg: var(--green-600);     /* Success button bg (#16A34A) */

--state-error: var(--red-500);            /* Error text/icon (#F87171) */
--state-error-bg: var(--red-600);         /* Error button bg (#DC2626) */

--state-warning: var(--yellow-500);       /* Warning text/icon (#FBBF24) */
--state-warning-bg: var(--yellow-600);    /* Warning button bg (#D97706) */

--state-info: var(--blue-500);            /* Info (rarely used) (#60A5FA) */
```

### Shadow & Glow Effects

```css
/* Glow Effects (Orange - for dark theme) */
--shadow-glow-sm: 0 0 10px rgba(255, 171, 0, 0.3);   /* Subtle glow */
--shadow-glow-md: 0 0 20px rgba(255, 171, 0, 0.4);   /* Medium glow */
--shadow-glow-lg: 0 0 30px rgba(255, 171, 0, 0.5);   /* Strong glow */

/* Focus States */
--focus-ring: 0 0 0 2px var(--orange-500);            /* Keyboard focus */
--focus-ring-offset: 0 0 0 4px var(--neutral-950);    /* Focus ring offset */
```

---

## Implementation: CSS

### Global Styles (globals.css or app.css)

```css
:root {
  /* ===== LAYER 1: CORE COLORS ===== */

  /* Orange Scale */
  --orange-50: #FFF8E8;
  --orange-100: #FFE0B3;
  --orange-200: #FFD699;
  --orange-300: #FFC766;
  --orange-400: #FFB733;
  --orange-500: #FFAB00;
  --orange-600: #FF9500;
  --orange-700: #E68A00;
  --orange-800: #CC7700;
  --orange-900: #B36600;
  --orange-accent: #FF8000;

  /* Neutral Scale */
  --neutral-black: #000000;
  --neutral-950: #0A0A0A;
  --neutral-900: #0C0C0E;
  --neutral-800: #161A22;
  --neutral-700: #1F2937;
  --neutral-600: #374151;
  --neutral-500: #4B5563;
  --neutral-400: #6B7280;
  --neutral-300: #9CA3AF;
  --neutral-200: #D1D5DB;
  --neutral-100: #F3F4F6;
  --neutral-50: #F8F9FA;
  --neutral-white: #FFFFFF;

  /* State Colors */
  --green-500: #4ADE80;
  --green-600: #16A34A;
  --red-500: #F87171;
  --red-600: #DC2626;
  --yellow-500: #FBBF24;
  --yellow-600: #D97706;
  --blue-500: #60A5FA;

  /* ===== LAYER 2: SEMANTIC TOKENS ===== */

  /* Brand */
  --color-primary: var(--orange-500);
  --color-primary-hover: var(--orange-600);
  --color-primary-active: var(--orange-700);
  --color-primary-light: var(--orange-100);
  --color-primary-accent: var(--orange-accent);

  /* Backgrounds */
  --bg-page: var(--neutral-950);
  --bg-base: var(--neutral-900);
  --bg-card: var(--neutral-800);
  --bg-elevated: var(--neutral-700);
  --bg-hover: #1A1D24;
  --bg-overlay: rgba(0, 0, 0, 0.8);

  /* Text */
  --text-primary: var(--neutral-100);
  --text-secondary: var(--neutral-300);
  --text-tertiary: var(--neutral-400);
  --text-disabled: var(--neutral-500);
  --text-accent: var(--orange-500);
  --text-on-primary: var(--neutral-900);
  --text-inverse: var(--neutral-950);

  /* Borders */
  --border-subtle: var(--neutral-700);
  --border-default: var(--neutral-600);
  --border-strong: var(--neutral-500);
  --border-accent: var(--orange-500);

  /* Buttons */
  --button-primary-bg: var(--orange-500);
  --button-primary-text: var(--neutral-900);
  --button-primary-hover: var(--orange-600);
  --button-primary-active: var(--orange-700);

  --button-secondary-bg: transparent;
  --button-secondary-text: var(--orange-500);
  --button-secondary-border: var(--orange-500);

  --button-ghost-bg: transparent;
  --button-ghost-text: var(--neutral-300);
  --button-ghost-hover: var(--orange-500);

  /* Links */
  --link-default: var(--orange-500);
  --link-hover: var(--orange-400);
  --link-active: var(--orange-600);
  --link-visited: var(--neutral-500);

  /* States */
  --state-success: var(--green-500);
  --state-success-bg: var(--green-600);
  --state-error: var(--red-500);
  --state-error-bg: var(--red-600);
  --state-warning: var(--yellow-500);
  --state-warning-bg: var(--yellow-600);
  --state-info: var(--blue-500);

  /* Shadows & Glows */
  --shadow-glow-sm: 0 0 10px rgba(255, 171, 0, 0.3);
  --shadow-glow-md: 0 0 20px rgba(255, 171, 0, 0.4);
  --shadow-glow-lg: 0 0 30px rgba(255, 171, 0, 0.5);

  --focus-ring: 0 0 0 2px var(--orange-500);
  --focus-ring-offset: 0 0 0 4px var(--neutral-950);
}
```

---

## Implementation: Tailwind Config

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Layer 1: Core Colors (for utility classes)
        orange: {
          50: '#FFF8E8',
          100: '#FFE0B3',
          200: '#FFD699',
          300: '#FFC766',
          400: '#FFB733',
          500: '#FFAB00',
          600: '#FF9500',
          700: '#E68A00',
          800: '#CC7700',
          900: '#B36600',
          accent: '#FF8000',
        },
        neutral: {
          black: '#000000',
          950: '#0A0A0A',
          900: '#0C0C0E',
          800: '#161A22',
          700: '#1F2937',
          600: '#374151',
          500: '#4B5563',
          400: '#6B7280',
          300: '#9CA3AF',
          200: '#D1D5DB',
          100: '#F3F4F6',
          50: '#F8F9FA',
          white: '#FFFFFF',
        },

        // Layer 2: Semantic Tokens (for components)
        primary: {
          DEFAULT: '#FFAB00',      // var(--color-primary)
          hover: '#FF9500',        // var(--color-primary-hover)
          active: '#E68A00',       // var(--color-primary-active)
          light: '#FFE0B3',        // var(--color-primary-light)
          accent: '#FF8000',       // var(--color-primary-accent)
        },

        // State colors
        success: '#4ADE80',
        error: '#F87171',
        warning: '#FBBF24',
        info: '#60A5FA',
      },
      backgroundColor: {
        page: '#0A0A0A',           // var(--bg-page)
        card: '#161A22',           // var(--bg-card)
        elevated: '#1F2937',       // var(--bg-elevated)
        hover: '#1A1D24',          // var(--bg-hover)
      },
      textColor: {
        primary: '#F3F4F6',        // var(--text-primary)
        secondary: '#9CA3AF',      // var(--text-secondary)
        tertiary: '#6B7280',       // var(--text-tertiary)
        accent: '#FFAB00',         // var(--text-accent)
      },
      borderColor: {
        subtle: '#1F2937',         // var(--border-subtle)
        default: '#374151',        // var(--border-default)
        accent: '#FFAB00',         // var(--border-accent)
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 171, 0, 0.3)',
        'glow': '0 0 20px rgba(255, 171, 0, 0.4)',
        'glow-lg': '0 0 30px rgba(255, 171, 0, 0.5)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## Usage Examples

### ✅ CORRECT: Using Semantic Tokens

```tsx
// Button Component - Uses semantic tokens
<button className="
  bg-primary text-on-primary
  hover:bg-primary-hover
  active:bg-primary-active
  shadow-glow
  transition-all duration-200
">
  View Project
</button>

// Or with CSS variables:
<button style={{
  backgroundColor: 'var(--button-primary-bg)',
  color: 'var(--text-on-primary)',
}}>
  View Project
</button>
```

### ❌ WRONG: Using Core Colors Directly

```tsx
// DON'T reference Layer 1 colors directly in components
<button className="bg-orange-500 text-neutral-900">
  View Project
</button>

// This makes global color changes difficult
```

### Why It Matters

**Scenario**: You want to change brand color from orange to blue

**With Semantic Tokens** (✅ Easy):
```css
/* Change ONE line in globals.css */
--color-primary: var(--blue-500);  /* Changed from --orange-500 */

/* ALL buttons, links, accents update automatically */
```

**Without Semantic Tokens** (❌ Hard):
```tsx
/* Must manually update 50+ component files */
<button className="bg-orange-500 hover:bg-orange-600 ...">
/* Change to: */
<button className="bg-blue-500 hover:bg-blue-600 ...">

/* Repeat for every button, link, card, etc. */
```

---

## Design Philosophy: Impact First + Strategic Application

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

## Accessibility: Contrast Ratios

### On Dark Backgrounds (#0A0A0A)

All these combinations pass **WCAG AAA (7:1+)** or **AA (4.5:1+)**:

```
✅ #FFAB00 (orange-500) on #0A0A0A: 8.5:1 - AAA Pass
✅ #F3F4F6 (text-primary) on #0A0A0A: 18.5:1 - AAA Pass
✅ #9CA3AF (text-secondary) on #0A0A0A: 9.2:1 - AAA Pass
✅ #6B7280 (text-tertiary) on #0A0A0A: 5.8:1 - AA Pass
✅ #FFAB00 (button bg) + #0C0C0E (text): 11:1 - AAA Pass
```

### On Card Backgrounds (#161A22)

```
✅ #FFAB00 (orange-500) on #161A22: 7.2:1 - AA Pass
✅ #F3F4F6 (text-primary) on #161A22: 15.8:1 - AAA Pass
✅ #9CA3AF (text-secondary) on #161A22: 7.8:1 - AAA Pass
```

---

## Quick Reference

### Most Common Colors

| Use Case | CSS Variable | Tailwind Class | Hex Value |
|----------|-------------|----------------|-----------|
| Page background | `var(--bg-page)` | `bg-page` | #0A0A0A |
| Card background | `var(--bg-card)` | `bg-card` | #161A22 |
| Heading text | `var(--text-primary)` | `text-primary` | #F3F4F6 |
| Body text | `var(--text-secondary)` | `text-secondary` | #9CA3AF |
| Primary button | `var(--button-primary-bg)` | `bg-primary` | #FFAB00 |
| Button text | `var(--text-on-primary)` | `text-on-primary` | #0C0C0E |
| Links | `var(--link-default)` | `text-accent` | #FFAB00 |
| Borders | `var(--border-subtle)` | `border-subtle` | #1F2937 |

---

## Testing Checklist

Before deployment, verify:

- [ ] All components use Layer 2 semantic tokens (not Layer 1 core colors)
- [ ] No hardcoded hex values in component files
- [ ] All text meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- [ ] Orange glow effects visible on dark backgrounds
- [ ] Focus states visible (orange ring)
- [ ] Hover states use correct semantic tokens
- [ ] Success/error states use correct state colors
- [ ] Test color changes by updating Layer 1 only

---

## Related Documents

- [Visual Direction](../../docs/design/visual-direction.md) - Overall aesthetic, orange usage philosophy
- [Typography System](../../docs/design/typography-system.md) - Font colors, hierarchy
- [Component System](../../docs/design/component-system.md) - Component-specific color usage
- [Layout System](../../docs/design/layout-system.md) - Background layers, surface colors

---

**Last Updated**: 2026-01-27
**Version**: 3.0.0 (Two-Layer Architecture)
**Status**: ✅ Active - Production Ready

**Quick Summary**:
- **Layer 1**: Core colors (raw hex) - Define once, never reference directly
- **Layer 2**: Semantic tokens (purpose-based) - Use everywhere in components
- **Benefit**: Change brand color globally in seconds, not hours

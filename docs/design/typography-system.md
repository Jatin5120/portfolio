# Typography System

**Project**: React Portfolio
**Created**: 2026-01-15
**Version**: 2.0.0 (Cleaned)
**Status**: ✅ Ready for Implementation
**Brand Alignment**: Independent Craftsman - modern, clean, confident

---

## Final Typography System

**Fonts:**
- **Heading:** [Cabinet Grotesk](https://www.fontshare.com/fonts/cabinet-grotesk) (Variable)
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) (Variable)
- **Code:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Signature:** [Ms Madi](https://fonts.google.com/specimen/Ms+Madi) (footer only)

**Why this pairing works:**
- ✅ **Cabinet Grotesk** = Distinctive condensed geometric for headings
- ✅ **Inter** = Ultra-readable neutral body text
- ✅ **Strong contrast** = Clear visual hierarchy
- ✅ **Professional + memorable** = Editorial + technical mix
- ✅ **Free fonts** = Cabinet Grotesk (Fontshare), Inter (Google Fonts)

---

## Visual Hierarchy Preview

```
[Cabinet Grotesk, Bold, 76px]
Hey, I'm Jatin — Mobile Lead
↓ Distinctive, condensed, commands attention

[Inter, Regular, 18px]
Building 24x7 audio recording on iOS isn't just hard—it's a
battle with the platform itself. iOS kills background audio...
↓ Readable, neutral, effortless

[Cabinet Grotesk, Bold, 32px]
Thine
↓ Strong project heading

[Inter, Regular, 18px]
The result: 24x7 recording that uses only 3-4% battery per hour...
↓ Body text fades into background
```

**Key Principles:**
- **Cabinet Grotesk** = Personality, attention, structure
- **Inter** = Invisibility, readability, flow
- **Result** = Clear hierarchy without fighting for attention

---

## Type Scale

### Mobile (Base: 16px, Ratio: 1.25)

```javascript
{
  xs: '0.75rem',      // 12px - Small labels, captions
  sm: '0.875rem',     // 14px - Secondary text, code
  base: '1rem',       // 16px - Body text (minimum!)
  lg: '1.25rem',      // 20px - Large body, small headings
  xl: '1.563rem',     // 25px - h3
  '2xl': '1.953rem',  // 31px - h2
  '3xl': '2.441rem',  // 39px - h1
  '4xl': '3.052rem',  // 49px - Hero
  '5xl': '3.815rem',  // 61px - Large display
}
```

### Desktop (Base: 18px, Ratio: 1.333)

```javascript
{
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1.125rem',   // 18px - Body text (larger for desktop!)
  lg: '1.5rem',       // 24px
  xl: '2rem',         // 32px - h3
  '2xl': '2.667rem',  // 43px - h2
  '3xl': '3.555rem',  // 57px - h1
  '4xl': '4.740rem',  // 76px - Hero
  '5xl': '6.320rem',  // 101px - Large display
}
```

---

## Text Styles

### Hero (Main hero section)

```javascript
{
  fontSize: { mobile: '3xl', desktop: '4xl' },  // 39px → 76px
  fontWeight: 700,
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  fontFamily: 'Cabinet Grotesk',
}
```

### H1 (Section headings)

```javascript
{
  fontSize: { mobile: '2xl', desktop: '3xl' },  // 31px → 57px
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  fontFamily: 'Cabinet Grotesk',
}
```

### H2 (Subsection headings)

```javascript
{
  fontSize: { mobile: 'xl', desktop: '2xl' },  // 25px → 43px
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: '-0.005em',
  fontFamily: 'Cabinet Grotesk',
}
```

### H3 (Card headings)

```javascript
{
  fontSize: { mobile: 'lg', desktop: 'xl' },  // 20px → 32px
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: '0',
  fontFamily: 'Cabinet Grotesk',
}
```

### Body (Main text)

```javascript
{
  fontSize: { mobile: 'base', desktop: 'base' },  // 16px → 18px
  fontWeight: 400,
  lineHeight: 1.6,
  letterSpacing: '0',
  fontFamily: 'Inter',
}
```

### Body Large (Intro paragraphs)

```javascript
{
  fontSize: { mobile: 'lg', desktop: 'lg' },  // 20px → 24px
  fontWeight: 400,
  lineHeight: 1.6,
  letterSpacing: '0',
  fontFamily: 'Inter',
}
```

### Body Small (Secondary text)

```javascript
{
  fontSize: { mobile: 'sm', desktop: 'sm' },  // 14px
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0',
  fontFamily: 'Inter',
}
```

### Label (UI text, form labels)

```javascript
{
  fontSize: { mobile: 'sm', desktop: 'sm' },  // 14px
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: '0.01em',
  fontFamily: 'Inter',
}
```

### Code (Code blocks, inline code)

```javascript
{
  fontSize: { mobile: 'sm', desktop: 'sm' },  // 14px
  fontWeight: 400,
  lineHeight: 1.6,
  letterSpacing: '0',
  fontFamily: 'JetBrains Mono',
}
```

### Button (CTA text)

```javascript
{
  fontSize: { mobile: 'base', desktop: 'base' },  // 16px → 18px
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: '0.01em',
  fontFamily: 'Inter',
}
```

### Signature (Decorative - footer only)

```javascript
{
  fontSize: { mobile: '2xl', desktop: '3xl' },  // 31px → 57px
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: '0',
  fontFamily: 'Ms Madi',
}
```

**Critical:** Ms Madi should ONLY be used once in the entire portfolio (footer signature).

---

## Font Loading

### Implementation Code

```html
<!-- Step 1: Load Cabinet Grotesk from Fontshare -->
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@variable&display=swap" rel="stylesheet">

<!-- Step 2: Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Step 3: Load remaining fonts from Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Ms+Madi&display=swap" rel="stylesheet">
```

### Font Weights Loaded

- **Cabinet Grotesk:** Variable (includes all weights 100-900)
- **Inter:** 400, 500, 600
- **JetBrains Mono:** 400
- **Ms Madi:** 400 (only weight available)

**Total:** 4 font families, ~8 weights

---

## CSS Implementation

### CSS Variables

```css
:root {
  /* Font Families */
  --font-heading: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --font-signature: 'Ms Madi', cursive;

  /* Font Sizes - Mobile */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
  --text-5xl: 3.815rem;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;

  /* Letter Spacing */
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
}

/* Desktop - Larger base size */
@media (min-width: 1024px) {
  :root {
    --text-base: 1.125rem;   /* 18px */
    --text-lg: 1.5rem;       /* 24px */
    --text-xl: 2rem;         /* 32px */
    --text-2xl: 2.667rem;    /* 43px */
    --text-3xl: 3.555rem;    /* 57px */
    --text-4xl: 4.740rem;    /* 76px */
    --text-5xl: 6.320rem;    /* 101px */
  }
}
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      heading: ['Cabinet Grotesk', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      signature: ['Ms Madi', 'cursive'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.4' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.25rem', { lineHeight: '1.6' }],
      xl: ['1.563rem', { lineHeight: '1.3' }],
      '2xl': ['1.953rem', { lineHeight: '1.2' }],
      '3xl': ['2.441rem', { lineHeight: '1.1' }],
      '4xl': ['3.052rem', { lineHeight: '1.05' }],
      '5xl': ['3.815rem', { lineHeight: '0.95' }],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
}
```

---

## Usage Examples

### Hero Section

```html
<section class="hero">
  <h1 class="text-3xl lg:text-4xl font-bold font-heading leading-tight tracking-tight">
    Hey, I'm Jatin — Mobile Lead building cross-platform experiences
    that feel smooth, scale well, and actually solve problems.
  </h1>
</section>
```

### Section Heading

```html
<h2 class="text-2xl lg:text-3xl font-bold font-heading leading-tight tracking-tight">
  Work
</h2>
```

### Project Card

```html
<article class="project-card">
  <h3 class="text-xl lg:text-2xl font-bold font-heading mb-4">
    Thine
  </h3>
  <p class="text-base font-body leading-relaxed text-primary">
    Building 24x7 audio recording on iOS isn't just hard—it's a battle
    with the platform itself...
  </p>
</article>
```

### Code Block (Easter Egg)

```html
<pre class="text-sm font-mono leading-relaxed bg-page p-6 rounded">
mobile_lead Jatin {
  value_proposition: "I ship products, not just features"
  ...
}
</pre>
```

### Footer Signature

```html
<footer class="border-t border-subtle py-12">
  <div class="text-sm font-body text-tertiary">
    Built by
  </div>
  <div class="text-3xl font-signature text-accent mt-2">
    Jatin
  </div>
</footer>
```

**Signature color options:**
- Orange (#FFAB00) = Bold personal statement
- White/neutral = Subtle elegance

---

## Best Practices

### Readability

- **Line length:** 60-80 characters (use `max-w-prose` or `max-w-[65ch]`)
- **Line height:** 1.6 for body, 1.1-1.3 for headings ✅
- **Paragraph spacing:** At least 1.5x line height
- **Contrast:** #F5F5F5 on #0A0A0A (WCAG AAA compliant) ✅

### Performance

- **Preconnect:** Always preconnect to font CDNs ✅
- **display=swap:** Prevents invisible text (FOIT) ✅
- **Variable fonts:** Use for Cabinet Grotesk (one file, all weights) ✅
- **Limit weights:** Only load what you need ✅

### Accessibility

- **Minimum size:** Body text never below 16px ✅
- **Line height:** Minimum 1.5 for body (WCAG) ✅
- **Color contrast:** 7:1 for AAA (text on background) ✅
- **Font smoothing:**
  ```css
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

---

## Implementation Checklist

### Setup
- [ ] Add font loading code to `<head>` (see "Font Loading" section)
- [ ] Configure CSS variables or Tailwind config
- [ ] Test fonts load correctly (check Network tab)

### Apply Styles
- [ ] Hero section: Cabinet Grotesk bold, large size
- [ ] Section headings (h1, h2): Cabinet Grotesk bold
- [ ] Project cards (h3): Cabinet Grotesk bold
- [ ] Body text: Inter regular, 16px mobile / 18px desktop
- [ ] Code blocks: JetBrains Mono
- [ ] Footer signature: Ms Madi (ONE instance only)

### Test
- [ ] Responsive scaling (mobile → tablet → desktop)
- [ ] Line length comfortable (60-80 characters)
- [ ] Contrast sufficient (WCAG AAA)
- [ ] Hierarchy clear (headings stand out)
- [ ] Body text effortless to read

### Performance
- [ ] Fonts load quickly (preconnect working)
- [ ] No FOIT (invisible text flash)
- [ ] Variable fonts used where possible
- [ ] Only necessary weights loaded

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md) - Voice and personality
- [Color System](../../.claude/rules/design/color-system.md) - Text colors and contrast
- [Hero Section Copy](../content/hero-section-copy.md) - Typography in context
- [Projects Section Copy](../content/projects-section-copy.md) - Body text examples

---

**Status**: ✅ FINALIZED - Ready for Implementation

**Quick Start:**
```html
<!-- Add to <head> -->
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@variable&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Ms+Madi&display=swap" rel="stylesheet">
```

**Last Updated**: 2026-01-15
**Version**: 2.0.0 (Cleaned)

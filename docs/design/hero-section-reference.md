# Hero Section Reference

**Project**: React Portfolio
**Created**: 2026-01-10
**Last Updated**: 2026-01-10
**Version**: 1.0.0
**Status**: Active
**Source**: User-provided screenshot reference

---

## Overview

This document captures the hero section design pattern that Jatin is envisioning for the portfolio, based on a reference screenshot shared on 2026-01-10.

---

## Reference Pattern Analysis

### Layout Structure

**Centered Layout with Whitespace**
- Hero content is centered on the page
- Generous whitespace around all elements
- Typography-focused (text is the hero, not graphics)
- Minimal decorative elements

### Introduction Pattern

**Conversational Inline Photo Style**
```
"Hey, I'm [circular profile photo] Michael /
Product Designer keen on mobile apps & interactions"
```

**Key Characteristics**:
- Warm, conversational opening: "Hey, I'm..."
- Profile photo embedded inline with text (not separate)
- Photo acts as visual break in text flow
- Role/description on same line or immediately after
- Simple, approachable tone

### Navigation

**Top Navigation Bar**
- **Left side**: Core sections
  - Projects
  - Photos
  - About
- **Right side**: Social/contact actions
  - Twitter
  - LinkedIn
  - Copy Email

**Style**: Clean, minimal, horizontal layout

### Call-to-Action / Scroll Indicator

**"Selected Projects" with down arrow**
- Positioned at bottom of hero section
- Guides users to scroll down
- Text-based indicator (not just icon)
- Clear next step without being pushy

---

## Adaptation for Jatin's Portfolio

### Alignment with Brand Strategy

**Matches Brand Positioning**:
- ✅ Independent Craftsman - personal, direct introduction
- ✅ Confident yet Warm - conversational "Hey, I'm" approach
- ✅ Technically Deep - role description shows expertise
- ✅ Passive Presence - no aggressive CTAs, just "here I am"

### Personalization Notes

**Copy Pattern** (adapt from reference):
```
Reference: "Hey, I'm [photo] Michael / Product Designer keen on mobile apps & interactions"

For Jatin: "Hey, I'm [photo] Jatin / Mobile Lead building cross-platform experiences with Flutter & Swift"

Alternative: "Hey, I'm [photo] Jatin / Craftsman specializing in mobile engineering & performance optimization"
```

**Navigation Sections** (from brand strategy):
- Projects (confirmed)
- ~~Photos~~ (not mentioned in user's list)
- About (confirmed)
- ~~Contact~~ (may be separate page or section)

**Social/Contact Links**:
- Twitter (twitter.com/jatin5120)
- LinkedIn (linkedin.com/in/jatin5120)
- Copy Email (contact.dev.jatin@gmail.com)
- GitHub (github.com/jatin5120)

**Scroll Indicator**:
- "Selected Projects" or "Featured Work" with down arrow
- Guides to projects section

---

## Design Elements

### Typography

**Hero Text**:
- Large display type (likely 48px-64px+)
- Left-aligned or center-aligned
- High contrast for readability
- Line height: generous (1.2-1.4)

**Role Description**:
- Same size or slightly smaller
- Natural text flow with introduction
- Not separated by visual breaks

### Profile Photo

**Style**:
- Circular shape
- Inline with text (not floating or separate)
- Acts as visual punctuation in the sentence
- Appropriate size: medium (80px-120px diameter)

**Positioning**:
- Embedded directly in text flow
- Between name and role, or after name
- Creates visual rhythm in the typography

### Whitespace

**Generous Spacing**:
- Large top margin before content
- Wide side margins (horizontal centering)
- Breathing room around navigation
- No visual clutter

### Color Usage (from color-system.md)

**Hero Section Colors**:
- Primary text: Neutral 800/900 (dark mode: Neutral 100)
- Accent color: #FFAB00 (vibrant orange) - use for name or key word
- Profile photo border: Optional subtle accent
- Navigation: Neutral 600 (subtle)
- Scroll indicator: Neutral 500 with orange accent on hover

**Impact First Application**:
- Large hero text (48px+): Can use #FFAB00 directly (WCAG large text exemption)
- Name highlight: Use vibrant orange for visual impact
- Decorative elements: Free to use #FFAB00

---

## Implementation Considerations

### Responsive Behavior

**Desktop** (reference shows):
- Centered layout with wide margins
- Horizontal navigation
- Large typography scale

**Mobile**:
- Maintain centered approach
- Stack navigation if needed
- Adjust photo size (smaller)
- Reduce text size proportionally

### Interactions

**Subtle Animations** (when user scrolls in):
- Fade in hero text
- Profile photo scale in
- Staggered entrance (text → photo → role)

**Navigation Hover States**:
- Subtle color change
- Underline or highlight
- Orange accent on active/hover

**Scroll Indicator**:
- Subtle pulse animation
- Changes opacity on hover
- Disappears after user scrolls

---

## Reference Comparison

### What This Reference Demonstrates

**Strengths**:
- ✅ Warm, approachable introduction
- ✅ Profile photo integrated naturally
- ✅ Clear navigation without clutter
- ✅ Guides user to content (scroll indicator)
- ✅ Lots of whitespace = focus on content

**Unique Aspects**:
- Inline photo pattern (not common, but effective)
- Very minimal decorative elements
- Text-driven design
- Personal, conversational tone

---

## Hero Section Variants

### Variant A: Simple Centered Introduction (First Reference)

**Pattern**: Conversational intro with inline profile photo

```
"Hey, I'm [circular photo] Jatin /
Mobile Lead building cross-platform experiences with Flutter & Swift"
```

**Characteristics**:
- Warm, approachable
- Profile photo embedded inline
- Single message for all visitors
- Clean, minimal, typography-focused

**Source**: First hero section reference (Michael portfolio)

---

### Variant B: Audience-Segmented Messaging (Second Reference)

**Pattern**: Multiple tabs with tailored messages for different audiences

```
Tabs: For anyone | For tech leads | For engineers | For recruiters
Content changes based on selected tab
```

**Adapted for Jatin** (3 tabs):
1. **For anyone**: Warm intro
2. **For engineers**: Technical, code-style syntax
3. **For tech leads**: Leadership & measurable impact

**Characteristics**:
- Strategic audience awareness
- Technical tab with code syntax
- Shows range without overwhelming
- Passive positioning maintained

**Source**: Second hero section reference (audience-segmented designer)

---

### Variant C: Hybrid Easter Egg (SELECTED ✅)

**Pattern**: Default message for everyone + hidden technical reveal

**Default State** (what everyone sees):
```
"Hey, I'm Jatin — Mobile Lead building cross-platform
experiences that are fast, scalable, and delightfully smooth."
```

**Hidden Technical State** (revealed via interaction):
```javascript
const jatin = {
  role: 'Mobile_Lead',
  experience: '5_years',
  stack: ['Flutter', 'Swift', 'Node.js', 'Firebase'],
  specialties: {
    performance: '60%_improvement',
    architecture: 'MVVM_clean_code',
    leadership: 'concurrent_teams'
  },
  published: ['chat_package', 'livestream_package'],
  location: 'Bangalore',
  status: 'building_cool_things',
  openTo: 'interesting_conversations'
};
```

**Trigger Methods** (choose one or combine):

1. **Keyboard Shortcut**:
   - Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
   - Shows toast: "Developer mode activated 🧑‍💻"
   - Hero text morphs into code block

2. **Hover on Name**:
   - Hover over "Jatin" in hero text
   - Name gets monospace font + orange highlight
   - Entire hero transitions to technical view
   - Hover away → returns to default

3. **Click on Profile Photo**:
   - Click photo → flips like a card
   - Reveals code-style bio on back
   - Click again → returns to front

4. **Konami Code** (playful):
   - Type secret sequence: `↑ ↑ ↓ ↓ ← → ← → B A`
   - Or custom sequence: `m o b i l e`
   - Easter egg for developers who explore

**Why This Works for Jatin's Brand:**

✅ **Passive Presence**
- Default message is warm, approachable, not sales-focused
- Technical side is hidden, not aggressive
- "Here I am" philosophy maintained

✅ **Rewards Curiosity**
- Developers who explore discover technical depth
- Shows craft without overwhelming casual visitors
- Easter egg signals "I'm one of you" to fellow developers

✅ **Playful + Professional**
- Hidden interaction shows personality
- Code syntax demonstrates fluency
- Sophisticated without being pretentious

✅ **Technical Credibility**
- Code-style bio is authentic, not gimmicky
- Shows real technical details (published packages, measurable impact)
- Speaks the language of developers

✅ **Memorable**
- Unique interaction pattern
- Visitors will remember and share it
- Creates "aha!" moment for technical audience

**Implementation Approach:**

1. **Visual Transition**:
   - Smooth morph animation (not jarring cut)
   - Text transforms from prose → code over 400-600ms
   - Profile photo → terminal prompt or code editor icon
   - Background could subtly shift (lighter → darker, or add subtle grid)

2. **Animation Details**:
   ```
   Default → Technical:
   - Fade out prose text (200ms)
   - Scale in code block (300ms, slight bounce)
   - Change font: Sans-serif → Monospace
   - Add syntax highlighting colors
   - Show blinking cursor at end

   Technical → Default:
   - Reverse animation
   - Smooth return to original state
   ```

3. **Accessibility**:
   - Hidden trigger should be discoverable
   - Add subtle hint: Small icon or text saying "Press Cmd+K" (fades after 3s)
   - Screen reader support: "Developer view available, press Command K"
   - Don't hide critical information in easter egg

4. **Mobile Considerations**:
   - Keyboard shortcuts don't work on mobile
   - Use **tap on profile photo** or **double-tap on name**
   - Or add small "{ }" icon button (subtle, bottom corner)
   - Touch interaction should feel natural

**Example Code Syntax Variations:**

**JavaScript Style** (recommended - familiar to most):
```javascript
const jatin = {
  role: 'Mobile_Lead',
  stack: ['Flutter', 'Swift', 'Node.js'],
  metrics: {
    performance: '+60%_startup_speed',
    codebase: '-40%_reduction',
    projects: '10+_successful'
  },
  openSource: ['chat_package', 'livestream_package'],
  alwaysLearning: true
};
```

**Dart Style** (his primary language):
```dart
class Jatin extends Developer {
  final String role = 'Mobile Lead';
  final List<String> stack = ['Flutter', 'Swift', 'Firebase'];
  final Map<String, String> achievements = {
    'performance': '60% faster startup',
    'codebase': '40% size reduction',
    'leadership': 'concurrent teams'
  };

  @override
  bool get alwaysLearning => true;
}
```

**Swift Style** (shows iOS native depth):
```swift
struct Jatin: Developer {
    let role = "Mobile Lead"
    let stack = ["Flutter", "Swift", "Node.js"]
    let published = ["chat_package", "livestream_package"]

    var passions: [String] {
        ["Performance", "Architecture", "Craft"]
    }
}
```

**Pseudo-code Style** (universal, playful):
```
mobile_lead Jatin {
  experience: 5_years
  current_roles: [Thine, Merlin_AI]
  stack: Flutter + Swift + Backend

  achievements:
    ↑ 60% performance improvements
    ↓ 40% codebase reductions
    ✓ 10+ successful projects

  published_packages: 📦 chat + livestream
  status: building_cool_things()
}
```

**Recommendation**: JavaScript or Dart style (most authentic to his work)

---

## Design Decision Record

**Date**: 2026-01-10

**Decision**: Variant C - Hybrid Easter Egg approach

**Rationale**:
- Aligns with "Independent Craftsman" passive presence positioning
- Rewards technical audience without overwhelming general visitors
- Demonstrates personality and craft authentically
- Creates memorable, shareable experience
- Shows technical depth without being aggressive

**Trigger Method** (to be finalized):
- Primary: Keyboard shortcut (Cmd/Ctrl + K)
- Secondary: Hover on name or click profile photo
- Mobile: Tap profile photo or double-tap name
- Hint: Subtle "Press Cmd+K" tooltip (fades after 3s)

**Code Style** (to be finalized with ux-copywriter):
- JavaScript or Dart syntax
- Include real metrics and published packages
- Keep it authentic, not gimmicky
- Show personality through code comments or variable names

---

## Next Steps

1. **Gather more portfolio references** (user will share 3-5 examples)
2. **Use portfolio-structure agent** to design complete site architecture
3. **Create hero section copy variations** with ux-copywriter agent
4. **Design complete hero component** with visual-director agent
5. **Specify animations** with motion-designer skill

---

## Related Documents

- [Brand Strategy](../brand/brand-strategy.md) - Brand voice and positioning
- [Professional Data](../content/professional-data.md) - Jatin's background and role
- [Color System Rules](../../.claude/rules/design/color-system.md) - Color usage guidelines

---

**Last Updated**: 2026-01-10 (Added Variant C: Hybrid Easter Egg - SELECTED)
**Maintained By**: Manual + visual-director agent (future)
**Status**: ✅ Hero pattern selected (Variant C), awaiting additional portfolio references

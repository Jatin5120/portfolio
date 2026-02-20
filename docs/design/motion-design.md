# Motion Design System

**Project**: React Portfolio (Developer Brand)
**Created**: 2026-01-27
**Version**: 1.0.0
**Status**: Active
**Aligns With**: Visual Direction principle "Motion Enhances, Never Distracts"

---

## Executive Summary

This motion design system defines all animations, transitions, and micro-interactions for the portfolio. Every motion is purposeful: it provides feedback, guides attention, or rewards interaction—never decorative fireworks.

**Philosophy**: Smooth, subtle, sophisticated. Motion enhances understanding and delight without demanding attention.

---

## Animation Library

### Primary: Framer Motion

**Choice**: [Framer Motion](https://www.framer.com/motion/) for React

**Why Framer Motion**:
- ✅ React-first (declarative, component-based)
- ✅ Physics-based animations (spring, inertia)
- ✅ Gesture support (drag, hover, tap)
- ✅ Layout animations (automatic)
- ✅ SVG animations (path drawing, morphing)
- ✅ Great performance (GPU-accelerated)
- ✅ Built-in accessibility (`prefers-reduced-motion`)

**Installation**:
```bash
npm install framer-motion
```

**Basic Usage**:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Fallback: CSS Transitions

**For simple state changes** (hover, focus):
```css
.button {
  transition: all 200ms ease-out;
}

.button:hover {
  transform: translateY(-2px);
}
```

**When to use CSS instead of Framer Motion**:
- Simple hover states (color, transform)
- Single-property transitions
- Performance-critical repeated animations

---

## Easing Curves

### Standard Easing Functions

**Primary Easing** (Use 80% of the time):
```javascript
// Ease-out (default for most animations)
easing: [0.4, 0, 0.2, 1]  // cubic-bezier
// Same as: ease-out, "easeOut"

// Use for: Entrances, reveals, any motion that starts fast and decelerates
```

**Secondary Easing**:
```javascript
// Ease-in-out (position changes)
easing: [0.4, 0, 0.6, 1]  // cubic-bezier
// Same as: ease-in-out, "easeInOut"

// Use for: Modals opening, elements changing position
```

**Special Easing**:
```javascript
// Ease-in (exits only)
easing: [0.4, 0, 1, 1]  // cubic-bezier
// Same as: ease-in, "easeIn"

// Use for: Elements exiting, fading out
```

**Bouncy/Spring** (Framer Motion specific):
```javascript
// Spring physics (playful, energetic)
transition: {
  type: "spring",
  stiffness: 300,
  damping: 30
}

// Use for: Button clicks, modal opens, fun micro-interactions
```

### Easing Reference Table

| Name | Curve | Best For | Feel |
|------|-------|----------|------|
| `ease-out` | [0.4, 0, 0.2, 1] | Entrances, reveals, fade-ins | Smooth, natural |
| `ease-in-out` | [0.4, 0, 0.6, 1] | Position changes, swaps | Balanced |
| `ease-in` | [0.4, 0, 1, 1] | Exits, dismissals | Accelerating away |
| `spring` | Physics | Clicks, snappy interactions | Playful, bouncy |
| `linear` | [0, 0, 1, 1] | Loading spinners, constant | Mechanical |

**Framer Motion Implementation**:
```tsx
// Ease-out (default)
<motion.div
  transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.5 }}
/>

// Spring
<motion.div
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

---

## Animation Duration Scale

### Duration Guidelines

Based on distance traveled and element size:

| Element Type | Duration | Use Case |
|--------------|----------|----------|
| Color change | 150ms | Hover state color transitions |
| Small elements | 200ms | Button hover, icon hover |
| Medium elements | 300ms | Card hover, dropdown open |
| Large elements | 500ms | Image zoom, large card entrance |
| Page entrance | 800ms | Hero fade-in, full section reveal |
| Scroll reveals | 600ms | Elements appearing as you scroll |
| Modal open/close | 300ms | Overlay fade + content slide |

### Duration Scale (Reference)

```javascript
const durations = {
  instant: 0,          // No animation
  fast: 150,           // Micro-interactions (hover color)
  normal: 200,         // Button hover, focus states
  moderate: 300,       // Card hover, state changes
  slow: 500,           // Image zoom, large transitions
  slower: 800,         // Page load, hero entrance
  slowest: 1200,       // Complex sequences (rarely used)
}
```

**Rule of Thumb**:
- Smaller distance = shorter duration
- Larger element = longer duration
- Subtle change = shorter duration
- Complex animation = longer duration

**Never exceed 1200ms** - Users will perceive it as slow/broken

---

## Animation Patterns

### Pattern 1: Fade In Up (Page Load)

**Usage**: Hero section, section headings, any content entrance

**Implementation**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
>
  <h1>Creative Developer</h1>
</motion.div>
```

**Staggered Sequence** (multiple elements):
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2 // 200ms delay between each child
      }
    }
  }}
>
  <motion.h1
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    Heading
  </motion.h1>

  <motion.p
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    Subtext
  </motion.p>

  <motion.button
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    CTA
  </motion.button>
</motion.div>
```

**Result**: Heading → Subtext → Button (200ms apart each)

---

### Pattern 2: Card Hover (Lift + Glow)

**Usage**: Project cards, clickable cards, interactive elements

**Implementation**:
```tsx
<motion.div
  className="project-card"
  whileHover={{
    y: -4,  // Lift up 4px
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }}
  whileTap={{ scale: 0.98 }}  // Slight press on click
>
  <img src="project.jpg" />
  <h3>Project Name</h3>
</motion.div>
```

**With orange glow** (CSS):
```css
.project-card {
  border: 1px solid transparent;
  transition: all 300ms ease-out;
}

.project-card:hover {
  border-color: #FFAB00;
  box-shadow: 0 0 24px rgba(255, 171, 0, 0.2);
}
```

**Combined** (best approach):
```tsx
<motion.div
  className="project-card border border-transparent"
  whileHover={{
    y: -4,
    borderColor: "#FFAB00",
    boxShadow: "0 0 24px rgba(255, 171, 0, 0.2)",
    transition: { duration: 0.3 }
  }}
>
  {/* Card content */}
</motion.div>
```

---

### Pattern 3: Scroll-Triggered Reveal

**Usage**: Projects appearing as you scroll, section entrances

**Implementation** (Intersection Observer + Framer Motion):
```tsx
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function ProjectCard({ project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,  // Only animate once
    margin: "-100px"  // Trigger 100px before entering viewport
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </motion.div>
  )
}
```

**Staggered scroll reveals** (multiple cards):
```tsx
function ProjectGrid({ projects }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1  // 100ms delay between cards
          }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map(project => (
        <motion.div
          key={project.id}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

### Pattern 4: Button Interactions

**Usage**: All CTA buttons, interactive buttons

**Implementation**:
```tsx
<motion.button
  className="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold"
  whileHover={{
    y: -2,  // Lift up
    boxShadow: "0 0 30px rgba(255, 171, 0, 0.4)",  // Orange glow
    transition: { duration: 0.2 }
  }}
  whileTap={{
    scale: 0.98,  // Press down
    transition: { duration: 0.1 }
  }}
>
  View My Work
</motion.button>
```

**With loading state**:
```tsx
<motion.button
  disabled={isLoading}
  whileHover={!isLoading ? { y: -2 } : {}}
  whileTap={!isLoading ? { scale: 0.98 } : {}}
>
  {isLoading ? (
    <>
      <motion.div
        className="inline-block w-4 h-4 border-2 border-[--bg-page] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="ml-2">Loading...</span>
    </>
  ) : (
    "View My Work"
  )}
</motion.button>
```

---

### Pattern 5: Navigation Link Underline

**Usage**: Navigation active/hover states

**Implementation**:
```tsx
function NavLink({ href, children, isActive }) {
  return (
    <a href={href} className="relative">
      <span>{children}</span>

      {/* Underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
          transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
        }}
        style={{ originX: 0 }}
      />
    </a>
  )
}
```

**Hover variant**:
```tsx
<motion.a
  href={href}
  className="relative"
  whileHover="hover"
>
  <span>{children}</span>

  <motion.div
    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
    variants={{
      initial: { scaleX: 0 },
      hover: { scaleX: 1 }
    }}
    initial="initial"
    transition={{ duration: 0.2 }}
  />
</motion.a>
```

---

### Pattern 6: Image Zoom on Hover

**Usage**: Project images, gallery items

**Implementation**:
```tsx
<div className="overflow-hidden rounded-lg">
  <motion.img
    src="project.jpg"
    alt="Project name"
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }}
    className="w-full h-auto"
  />
</div>
```

**Parent container must have `overflow: hidden`** to prevent zoom from breaking layout

---

### Pattern 7: Modal Open/Close

**Usage**: Dialogs, overlays, contact forms

**Implementation**:
```tsx
import { AnimatePresence } from 'framer-motion'

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="bg-card rounded-xl p-8 max-w-2xl w-full">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Key**: Use `AnimatePresence` to animate exit transitions

---

### Pattern 8: Loading Skeleton Shimmer

**Usage**: While content loads (images, text)

**Implementation**:
```tsx
<motion.div
  className="h-48 bg-card rounded-lg"
  animate={{
    backgroundPosition: ["0% 0%", "100% 0%"],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }}
  style={{
    backgroundImage: "linear-gradient(90deg, #161A22 0%, #1F2937 50%, #161A22 100%)",
    backgroundSize: "200% 100%"
  }}
/>
```

**Or with CSS** (simpler):
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #161A22 0%,
    #1F2937 50%,
    #161A22 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

### Pattern 9: Page Transitions

**Usage**: Navigating between pages (if using client-side routing)

**Implementation** (with Next.js or React Router):
```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}
```

**Simpler fade**:
```tsx
<motion.div
  key={router.pathname}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  <Component {...pageProps} />
</motion.div>
```

---

## Scroll Animations

### Intersection Observer Setup

**Why Intersection Observer**:
- Native browser API (no library needed for basic version)
- Great performance (doesn't block main thread)
- Customizable triggers (margin, threshold)

**Framer Motion's `useInView`** (recommended):
```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,           // Animate once, don't reverse
    margin: "-100px",     // Trigger 100px before element enters viewport
    amount: 0.3           // Trigger when 30% of element is visible
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Section Heading</h2>
      <p>Content...</p>
    </motion.section>
  )
}
```

### Scroll-Triggered Patterns

**Pattern A: Fade In on Scroll**
```tsx
// Each section fades in as you scroll
<motion.section
  ref={ref}
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.section>
```

**Pattern B: Slide In From Side**
```tsx
// Alternating left/right entrances
<motion.div
  ref={ref}
  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Project {index}
</motion.div>
```

**Pattern C: Scale Up**
```tsx
// Element scales up from 90% to 100%
<motion.div
  ref={ref}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={isInView ? { opacity: 1, scale: 1 } : {}}
  transition={{ duration: 0.5 }}
>
  Card content
</motion.div>
```

---

## Special Effects

### Mouse Tracking Glow (Advanced)

**Usage**: Hero section, interactive areas

**Implementation**:
```tsx
function MouseTrackingGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      className="relative min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Glow follows cursor */}
      <motion.div
        className="absolute w-96 h-96 bg-primary-500 opacity-10 blur-3xl rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 192,  // Center glow on cursor (96px radius * 2)
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h1>Creative Developer</h1>
      </div>
    </div>
  )
}
```

---

### Animated Signature (SVG Path Drawing)

**Usage**: Footer signature, personal branding

**Implementation**:
```tsx
import { motion } from 'framer-motion'

function AnimatedSignature() {
  return (
    <motion.svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      initial="hidden"
      whileHover="visible"
    >
      <motion.path
        d="M10 30 Q 50 10, 90 30 T 170 30"  // Your actual signature path
        stroke="#FFAB00"
        strokeWidth="2"
        fill="none"
        variants={{
          hidden: {
            pathLength: 0,
            opacity: 0
          },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 2,
              ease: "easeInOut"
            }
          }
        }}
      />
    </motion.svg>
  )
}
```

---

### Magnetic Button (Cursor Attraction)

**Usage**: Hero CTA, primary buttons

**Implementation**:
```tsx
function MagneticButton({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Move button 20% toward cursor
    setPosition({
      x: distanceX * 0.2,
      y: distanceY * 0.2
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className="bg-primary-500 px-6 py-3 rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}
```

---

## Accessibility: Reduced Motion

### Critical Requirement

**ALWAYS respect `prefers-reduced-motion`** media query

**Why**: Users with vestibular disorders, motion sensitivity, or preference for minimal motion

### Implementation

**Option A: CSS Media Query** (Global)
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Option B: Framer Motion Hook** (Per-component)
```tsx
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.8
      }}
    >
      Content
    </motion.div>
  )
}
```

**Option C: Global Framer Motion Config** (Recommended)
```tsx
// _app.tsx or App.tsx
import { MotionConfig } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <Component {...pageProps} />
    </MotionConfig>
  )
}
```

**Testing**:
```javascript
// Chrome DevTools: Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"
// Or in System Preferences → Accessibility → Display → Reduce Motion
```

---

## Performance Optimization

### GPU-Accelerated Properties

**Use these properties** (hardware accelerated, 60fps):
- `opacity`
- `transform` (translate, scale, rotate)

**Avoid animating these** (slow, causes repaints):
- `width`, `height` (use `scale` instead)
- `top`, `left` (use `translate` instead)
- `margin`, `padding`
- `border-width`

**Example**:
```tsx
// ❌ BAD (animates width, causes reflow)
<motion.div
  animate={{ width: isOpen ? 300 : 0 }}
/>

// ✅ GOOD (animates scaleX, GPU-accelerated)
<motion.div
  style={{ width: 300 }}
  animate={{ scaleX: isOpen ? 1 : 0 }}
/>
```

### Will-Change CSS Property

**Use sparingly** for elements that will animate:
```css
.animated-element {
  will-change: transform, opacity;
}
```

**Remove after animation completes**:
```tsx
<motion.div
  style={{ willChange: "transform" }}
  onAnimationComplete={() => {
    // Remove will-change
  }}
/>
```

**Don't overuse**: Too many `will-change` declarations hurt performance

---

## Testing Checklist

### Motion Testing

- [ ] Test all animations at 60fps (Chrome DevTools Performance tab)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Test on low-end devices (throttle CPU 6x in DevTools)
- [ ] Test scroll performance (should never drop below 60fps)
- [ ] Test modal open/close animations
- [ ] Test button hover states (all variants)
- [ ] Test page load sequence (hero entrance)
- [ ] Verify no janky animations (use frame rate meter)
- [ ] Test on mobile (touch interactions)
- [ ] Test with keyboard navigation (focus states animate?)

---

## Common Mistakes to Avoid

### ❌ Don't:

1. **Animate layout properties** (`width`, `height`, `top`, `left`)
2. **Ignore reduced motion** (always respect user preferences)
3. **Overuse animations** (not everything needs to move)
4. **Use long durations** (> 1000ms feels slow)
5. **Animate everything on page load** (overwhelming)
6. **Forget exit animations** (use `AnimatePresence`)
7. **Use linear easing** (feels robotic, except for loading spinners)

### ✅ Do:

1. **Use transform and opacity** (GPU-accelerated)
2. **Respect reduced motion** (`useReducedMotion` hook)
3. **Animate purposefully** (feedback, guidance, delight)
4. **Keep durations short** (150-800ms for most animations)
5. **Stagger entrances** (200ms delay between elements)
6. **Exit gracefully** (`AnimatePresence` for unmounting)
7. **Use ease-out** (default for 80% of animations)

---

## Related Documents

- [Visual Direction](./visual-direction.md) - Animation philosophy, principles
- [Component System](./component-system.md) - Component-specific animations
- [Color System](../../.claude/rules/design/color-system.md) - Orange glow colors

---

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Easing Functions Reference](https://easings.net/)
- [Web Animation Performance](https://web.dev/animations/)
- [Reduced Motion Guide](https://web.dev/prefers-reduced-motion/)

---

**Last Updated**: 2026-01-27
**Version**: 1.0.0
**Status**: ✅ Active - Ready for Implementation

**Quick Reference**:
- **Library**: Framer Motion (primary), CSS transitions (simple states)
- **Default Easing**: `[0.4, 0, 0.2, 1]` (ease-out)
- **Default Duration**: 200-300ms (hover), 600-800ms (entrances)
- **Scroll Library**: Framer Motion `useInView` hook
- **Accessibility**: Always respect `prefers-reduced-motion`
- **Performance**: Only animate `transform` and `opacity`

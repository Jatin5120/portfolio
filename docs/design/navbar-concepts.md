# Navbar Concepts

**Project**: React Portfolio
**Created**: 2026-03-08
**Last Updated**: 2026-03-08
**Version**: 1.0.0
**Status**: Active — Ideation for Design Review

---

## Context

The current Header (`src/components/layout/Header.tsx`) is technically solid — correct scroll behavior, proper mobile overlay, good focus ring handling — but visually it is a generic template. Logo left, links right, badge after a separator. Nothing wrong. Nothing memorable.

The brief: take the brand (dark studio at night, orange energy, calm confidence) and find a navbar concept that makes someone visiting for the first time think "this person has taste" before they've read a single word.

Research basis: Awwwards SOTD winners 2025–2026, Navbar Gallery's portfolio category, Muzli's top 100 for 2025, Framer's emerging trends report, and surveying techniques used across the creative developer community (Bruno Simon, Cyd Stumpel, Samsy/SMSY, Elliott Mangham, Olha Lazarieva).

---

## Concept 1 — The Slow Brand Burn

**Codename**: `BRAND-BURN`
**Vibe**: Linear, Vercel, Stripe — but with warmth and personality sneaking through

### What It Looks Like

Transparent at hero. The word "Jatin" sits left in Cabinet Grotesk Bold at exactly 22px — pure `#F3F4F6`, no glow, no decoration. Dead serious. On the right: three nav links in Inter at 14px tracking-wide uppercase — `WORK`, `ABOUT`, `CONTACT` — spaced at `gap-10`. The available badge is hidden entirely at hero state.

On scroll past ~80px, a transformation sequence fires:
1. The navbar background fades in as a pill — not full-width, but a contained `max-w-fit mx-auto` floating pill with `rounded-full`, 1px border at `rgba(55,65,81,0.5)`, background `rgba(10,10,10,0.85)` and `backdrop-blur-xl`. The pill is centered horizontally.
2. The logo shifts from left-aligned to sitting inside the pill alongside the links — they become one unified floating island.
3. The available badge materializes inside the pill to the right of the links, sliding in from `x: 8, opacity: 0`.

The pill itself has a very subtle orange gradient at the bottom edge only: `border-bottom-color: rgba(255,171,0,0.15)`. Not a glow. A whisper.

### Hover States

Nav links: on hover, the text transitions from `#9CA3AF` to `#FFAB00` in 150ms. Below the text, a 1px underline draws from center outward using a CSS `scaleX` transform from 0 to 1, `transform-origin: center`. No bounce, just clean.

Logo: `filter: drop-shadow(0 0 8px rgba(255,171,0,0.35))` on hover. Same as current but only fires in the scrolled pill state — not at hero.

Active section: the active link has a persistent orange dot (2px diameter, `bg-primary`, `rounded-full`) sitting centered below it, always visible, not just on hover.

### What Makes It Memorable

The pill-to-island transition. Most navbars slide down background opacity. This one physically shrinks and centers, changing its geometric form. The user notices the navbar has transformed into something different — a contained artifact floating in space — not just become opaque. It signals: this person thinks about state transitions, not just states.

Reference closest to: Linear's marketing site + Vercel's dashboard, but warmer.

### Implementation Notes

```tsx
// Framer Motion layout animation handles the pill morphing cleanly
// Key: use layout="position" on the nav container so Framer
// auto-animates the geometry change without fighting CSS

const navVariants = {
  hero: {
    maxWidth: '100%',
    borderRadius: '0px',
    border: '1px solid transparent',
    backgroundColor: 'rgba(10,10,10,0)',
    backdropFilter: 'blur(0px)',
    x: 0,
  },
  scrolled: {
    maxWidth: '520px',
    borderRadius: '9999px',
    border: '1px solid rgba(55,65,81,0.5)',
    backgroundColor: 'rgba(10,10,10,0.88)',
    backdropFilter: 'blur(20px)',
    x: 0,  // centered via mx-auto on parent
  },
}

// The active dot indicator
<motion.span
  layoutId="active-dot"
  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[3px] h-[3px]
             rounded-full bg-primary"
/>
// Using layoutId means the dot physically travels between links on
// section change — a shared layout animation that reads as polished.
```

**Tailwind classes for pill container (scrolled state)**:
`fixed top-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full border border-border/50 bg-page/88 backdrop-blur-xl`

**Mobile**: Pill is full-width minus `mx-4` with `rounded-2xl`. Hamburger lives inside the pill on the right.

---

## Concept 2 — The Split Stage

**Codename**: `SPLIT-STAGE`
**Vibe**: Editorial, asymmetric, quietly brutal — like a well-designed print magazine navigating into digital

### What It Looks Like

The navbar is divided into two distinct zones separated by a single vertical 1px line (`bg-border/40`) running the full height of the nav bar:

**Left zone**: "Jatin" in Cabinet Grotesk Bold. Beneath it, in JetBrains Mono at 10px, `tracking-widest`, `text-tertiary` (#6B7280): the current time in Bangalore. Live. Updating every second. `"Bangalore · 21:34"`

**Right zone**: The three nav links and the available badge. Standard horizontal layout.

This creates an asymmetric weight distribution that is immediately unusual. The left zone feels like a byline. The right zone feels like a magazine's section headers.

### The State Transitions

At hero: full transparent, the 1px divider is `opacity-0`.

On scroll: the background fades in — not a pill, but full-width — as `rgba(10,10,10,0.92)` with `backdrop-blur-lg`. The divider fades in at `opacity-40`. The entire bottom edge of the navbar has a gradient separator that goes from `transparent → rgba(255,171,0,0.12) → transparent` horizontally — very subtle orange tint, not a full orange line.

### The Logo Clock Detail

The time display beneath "Jatin" is the creative risk. It does three things:
1. It is genuinely informational (lets visitors know the person is in Bangalore, implicitly the timezone)
2. It makes the logo zone feel alive — there is motion in an area that is typically completely static
3. It signals: this person builds things that think. Even their name badge has a live data feed.

The clock ticks with a CSS `opacity` animation on the colon — `:` flickers from `opacity-100` to `opacity-40` every 500ms. The numbers themselves just re-render without animation.

### Hover on Logo Zone

The entire left zone (logo + clock) gets a very faint `bg-primary/4` background on hover with 200ms transition. No border. Just warmth appearing.

### What Makes It Memorable

Nobody puts a live clock in their navbar. Clocks in navbars are almost universally either SaaS dashboards or early-2000s websites. Reclaiming the clock in 2025/2026 as an editorial device — timezone as identity, motion as personality — is distinctly unexpected. A recruiter from New York seeing `"Bangalore · 21:34"` understands immediately: person, place, time. Human.

The asymmetry also breaks the logo-left-links-right formula without abandoning legibility.

### Implementation Notes

```tsx
// The live clock hook
function useBangaloreTime() {
  const [time, setTime] = useState('')
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const bangaloreTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      )
      const h = bangaloreTime.getHours().toString().padStart(2, '0')
      const m = bangaloreTime.getMinutes().toString().padStart(2, '0')
      setTime(`${h}:${m}`)
      setBlink(prev => !prev)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return { time, blink }
}

// Rendered as:
<div className="flex flex-col gap-0.5">
  <span className="font-heading font-bold text-heading text-xl leading-none">
    Jatin
  </span>
  <span className="font-mono text-[10px] tracking-widest text-tertiary uppercase">
    Bangalore{' '}
    <span style={{ opacity: blink ? 1 : 0.3, transition: 'opacity 0.1s' }}>
      ·
    </span>
    {' '}{time}
  </span>
</div>
```

**Mobile**: Clock is hidden on mobile (`hidden sm:block`). Logo renders as plain "Jatin" only on small screens.

---

## Concept 3 — The Orange Rail

**Codename**: `ORANGE-RAIL`
**Vibe**: Dark studio tools, code editor, Raycast, Linear — technical luxury

### What It Looks Like

This is a left-side vertical navbar. Fixed rail on the left edge, `w-14` wide, full height of viewport. Background `rgba(10,10,10,0)` at load — invisible at first. On scroll or after a 1.2s delay post-load, it settles into visibility.

The rail contains, from top to bottom:
- "J" (just the first letter of Jatin) in Cabinet Grotesk Bold, 20px, `text-primary`. This is the logo on the rail.
- A `flex-1` spacer
- Three nav items as vertical text — each link is rotated 90 degrees counter-clockwise: `W`, `A`, `C` (just initials, not full words). They sit at `writing-mode: vertical-rl; transform: rotate(180deg)` to read bottom-to-top. Color `text-secondary`. Active is `text-primary`.
- Below the initials, a short orange vertical line (`w-px, h-6, bg-primary`) sits below the active initial.
- At the bottom, the available badge rotated to match the vertical axis.

### The Reveal Behavior

On page load, the rail elements enter staggered with `x: -8, opacity: 0` animating to `x: 0, opacity: 1`, each delayed by 120ms. The "J" enters first, then the nav items from top to bottom, then the badge. Total animation time: ~600ms. Feels like tools appearing on a workbench.

### The Hover Expansion

When hovering any of the three nav items, the full label expands outward from the rail to the right. A tooltip-like label: `"Work"`, `"About"`, `"Contact"` — appears to the right of the rail in a small pill (`bg-elevated, rounded-md, px-3 py-1, text-sm`) with a left-pointing arrow indicator. Uses `AnimatePresence` with `x: -6, opacity: 0` entering to `x: 0, opacity: 1`.

### What Makes It Memorable

The vertical rail breaks every single convention of portfolio navigation. It gives the content area 100% of the horizontal span — no nav stealing top space. It reads like a professional tool (VS Code, Figma, Linear) rather than a portfolio template. The "J" as solo logo is confident: one letter, maximum weight, no explanation needed.

The staggered load animation is rare in navbars specifically — most navbars either just appear or fade in uniformly. A staggered build communicates assembly, craft, intentionality.

Also notable: the entire rail disappears on mobile and falls back to a bottom tab bar (`fixed bottom-0, w-full, flex justify-around, bg-page/95 backdrop-blur-lg, border-t border-subtle`) — Work, About, Contact as bottom navigation. This is the iOS-native pattern, which feels right for a mobile developer's portfolio specifically.

### Implementation Notes

```tsx
// The container for the full-height rail
<motion.nav
  className="fixed left-0 top-0 h-screen w-14 flex flex-col
             items-center py-6 z-50"
  style={{ backgroundColor: 'rgba(10,10,10,0)' }}
>
  {/* J Logo */}
  <motion.a
    href="#"
    className="font-heading font-bold text-primary text-xl leading-none"
    initial={{ x: -8, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    J
  </motion.a>

  {/* Middle spacer + nav items */}
  <div className="flex-1 flex flex-col items-center justify-center gap-8">
    {NAV_LINKS.map((link, i) => (
      <RailNavItem key={link.label} link={link} delay={0.4 + i * 0.12} />
    ))}
  </div>

  {/* Available badge — rotated */}
  <motion.div
    className="[writing-mode:vertical-rl] rotate-180"
    initial={{ x: -8, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    <AvailableBadge />
  </motion.div>
</motion.nav>

// RailNavItem with hover expansion
function RailNavItem({ link, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative flex items-center"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
      <motion.a
        href={link.href}
        className="font-mono text-xs text-secondary hover:text-primary
                   transition-colors [writing-mode:vertical-rl] rotate-180
                   tracking-widest uppercase"
        initial={{ x: -8, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {link.label[0]}
      </motion.a>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-full ml-3 px-3 py-1.5 bg-elevated
                       rounded-md text-sm text-heading font-body
                       whitespace-nowrap pointer-events-none"
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {link.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Key layout implication**: The page `<main>` needs `pl-14` on desktop to clear the rail. On mobile `pl-0` and a bottom tab bar replaces the rail.

---

## Concept 4 — The Redacted Line

**Codename**: `REDACTED`
**Vibe**: Found document, editorial dark, slightly editorial brutalist — confident enough to subvert its own format

### What It Looks Like

The navbar is a single horizontal line — exactly 1px — that runs full-width at the very top of the viewport. `border-top: 1px solid rgba(255,171,0,0.6)`. Just a line. Nothing else.

Below this line, spaced 20px from it: the logo "Jatin" (left) and nav links (right) sit in a row. But they float freely — no background, no container, no pill — just typography against the hero content. At this state the nav is completely transparent and type is white.

Here is the key move: the 1px orange top line is present from the very first frame. It is the only brand color in the entire navbar at rest. Everything else — logo, links, badge — is white on transparent. The line is the navbar's only declaration of identity. This is the "redacted" idea: the rest of the information is legible but the signature is a single orange stroke at the top.

### On Scroll

When scrolled, a full-width bar slides down from that 1px line — `height` animates from `1px` to `64px` using a `scaleY` transform from `scaleY(0.015)` to `scaleY(1)` with `transform-origin: top`. Background is `rgba(10,10,10,0.94)`, blur activates. The logo and links were already positioned — the bar expands to fill behind them. The 1px orange line remains at the very top edge of the now-opaque bar.

The effect: the navbar grows out of its own edge. It does not slide in from above, does not fade in opacity. It unfolds downward from its own signature line.

### Typography Behavior

In scrolled state, the logo "Jatin" gains a very subtle orange left-border treatment. Not a border in CSS — instead a thin orange bar rendered as a `before` pseudo element or a Framer Motion child: `4px wide, 18px tall, bg-primary, rounded-full, mr-3`. Appears with the bar expansion. This marks the active state of the logo.

Nav links: same as current implementation but the active section link gets `text-primary` plus a very faint `bg-primary/8 rounded-sm px-1.5` background tint — not a pill border, just warmth.

### What Makes It Memorable

The 1px orange line at the very top of every page is a signature. It is the first orange the user sees, before they've seen the hero, before any scroll. It is so small and precise that it rewards noticing — "was that intentional?" Yes. Always.

The bar-grows-from-line animation is directionally unique. Every other navbar either: appears on scroll (opacity transition), slides in from the top (translateY), or was always there. This one physically grows from its own edge. It says: this element has an origin point. It came from somewhere.

This concept is the most restrained of the five and the most likely to age well. It will still feel considered in three years.

### Implementation Notes

```tsx
// The orange top rule — permanent, always rendered
<div
  className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
  style={{ height: '1px', backgroundColor: 'rgba(255,171,0,0.55)' }}
/>

// The expanding bar — sits just below the rule (top: 1px)
<motion.header
  className="fixed left-0 right-0 z-40 overflow-hidden"
  style={{ top: '1px' }}
  animate={{
    height: scrolled ? 63 : 0,
    backgroundColor: scrolled ? 'rgba(10,10,10,0.94)' : 'rgba(10,10,10,0)',
    backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
  }}
  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
/>

// The nav content — always visible, floats over both the rule and the bar
<nav
  className="fixed top-0 left-0 right-0 z-50 flex items-center
             justify-between px-8 h-16"
  // top-0 so it starts at the top including the 1px rule
>
  <div className="flex items-center gap-3">
    {/* Orange left bar — appears on scroll */}
    <AnimatePresence>
      {scrolled && (
        <motion.span
          className="w-1 rounded-full bg-primary"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 18, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        />
      )}
    </AnimatePresence>
    <a href="#" className="font-heading font-bold text-heading text-xl">
      Jatin
    </a>
  </div>
  {/* ... links and badge */}
</nav>
```

**Reduced motion**: When `prefers-reduced-motion` is set, the bar simply fades in (opacity only) — no height animation. The 1px rule stays.

---

## Concept 5 — The Text Pressure System

**Codename**: `TEXT-PRESSURE`
**Vibe**: Kinetic typography, Awwwards experimental, the navbar as a design statement in itself

### What It Looks Like

This one is the most technically ambitious and the most Awwwards-forward. It should only be chosen if Jatin wants the navbar to be a talking point.

The logo "Jatin" is rendered using a variable font weight driven by cursor proximity. Cabinet Grotesk's weight axis (it has one) responds to how close the mouse is to the logo. Full distance: `font-weight: 700`. Cursor directly on the logo: `font-weight: 900` (maximum slab, thicker strokes). The weight transitions in real time as you move across it — a subtle pressure field.

This technique, sometimes called "text pressure" or "magnetic weight," has appeared on a handful of Awwwards SOTD sites in 2024–2025. It was pioneered in more extreme forms on experimental typographic websites. Applied to a logo in a navbar it is refined rather than extreme.

### The Rest of the Navbar

To avoid competing with the variable font logo, everything else is completely quiet:

- Links: plain Inter, 14px, `text-secondary`. No underlines, no dots. Just weight change on hover (`font-weight: 400 → 600`). Same variable font trick but milder.
- Available badge: present but at reduced opacity (`opacity: 70`) at hero state, coming to full opacity on scroll.
- No pill, no special container. The navbar is fully transparent always. The separation between hero and scrolled is handled by a `position: sticky` sentinel element triggering an IntersectionObserver, not by scroll Y position.

### The Scroll State

On scroll, instead of a background, the links get a very fine `border-bottom: 1px solid rgba(55,65,81,0.3)` applied to the navbar container — a quiet underline beneath the entire nav row. Just a horizontal edge to signal "this is a fixed element." It is genuinely minimal. The background stays transparent. The only concession to legibility is the logo gaining `text-shadow: 0 1px 8px rgba(0,0,0,0.6)` as a dark halo — enough contrast on any hero image, not visible as a separate effect.

### The Magnetic Pull (Optional Layer)

Each nav link has a magnetic attraction effect: as the cursor enters a ~40px radius around any link, the link smoothly translates toward the cursor by up to 4px in both x and y. The movement is `useSpring` from Framer Motion with `stiffness: 300, damping: 30`. On cursor leave, it springs back. This is the "magnetic button" pattern seen frequently on Awwwards-nominated sites in 2025.

### What Makes It Memorable

Variable font weight driven by cursor position is an interaction that is impossible to ignore once you've seen it and impossible to explain without showing someone. It is the type of thing that makes a developer recruiter say to a colleague "look at this navbar" — which is exactly the social proof mechanism the brand strategy describes as "curiosity: what else could this person build?"

The restraint surrounding this one effect matters. If everything were animated it would read as chaos. Because everything else is plain, the weight-responsive logo reads as mastery.

### Implementation Notes

```tsx
// Variable font weight on cursor proximity
// Requires Cabinet Grotesk variable font with wght axis

function useMagneticWeight(ref: React.RefObject<HTMLElement>) {
  const weight = useMotionValue(700)
  const springWeight = useSpring(weight, { stiffness: 200, damping: 25 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120
      const normalized = Math.max(0, 1 - distance / maxDist) // 0 far, 1 close
      // Map: 0 → 700 (normal), 1 → 900 (heavy)
      weight.set(700 + normalized * 200)
    }

    const handleMouseLeave = () => weight.set(700)

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, weight])

  return springWeight
}

// In the component:
const logoRef = useRef<HTMLAnchorElement>(null)
const fontWeight = useMagneticWeight(logoRef)

<motion.a
  ref={logoRef}
  href="#"
  className="font-heading text-heading text-xl leading-none"
  style={{ fontWeight }}
>
  Jatin
</motion.a>
```

**Important**: Cabinet Grotesk variable font must be loaded with the full `wght` axis range:
```css
@font-face {
  font-family: 'Cabinet Grotesk';
  src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2');
  font-weight: 100 900;  /* Full range for variable axis */
  font-display: swap;
}
```

Check that the variable font file is actually available — if the project is using a static weight subset from Google Fonts or Fontshare, the weight animation will snap in jumps rather than interpolate smoothly. This concept only works with a proper variable font file.

**Magnetic button for links** (Framer Motion `useSpring`):
```tsx
function MagneticLink({ href, children, isActive }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30 })
  const sy = useSpring(y, { stiffness: 300, damping: 30 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.a
        href={href}
        style={{ x: sx, y: sy }}
        className={cn(
          'text-sm font-body transition-[font-weight] duration-150',
          isActive ? 'text-primary font-semibold' : 'text-secondary'
        )}
      >
        {children}
      </motion.a>
    </div>
  )
}
```

**Reduced motion**: When `prefers-reduced-motion` is set, skip all proximity/magnetic effects entirely. The logo renders at `font-weight: 700` static, links are non-magnetic. The navbar still works fully, just without the kinetic layer.

---

## Comparison Matrix

| | Brand-Burn | Split-Stage | Orange-Rail | Redacted | Text-Pressure |
|---|---|---|---|---|---|
| **Technical complexity** | Low | Low | Medium | Low | High |
| **Visual distinctiveness** | Medium | High | Very High | High | Very High |
| **Scroll behavior** | Pill morph | Opacity + divider | Load animation | Bar unfold | Minimal |
| **Brand alignment** | Strong | Strong | Strong | Very Strong | Strong |
| **Mobile experience** | Good | Good | Excellent (bottom tabs) | Good | Good |
| **Risk level** | Low | Low | Medium | Low | Medium-High |
| **"This person has taste" signal** | Moderate | High | Very High | Very High | Very High |
| **Ages well (3yr horizon)** | Good | Excellent | Good | Excellent | Moderate |

---

## Recommendation

**Best fit for the brand: Concept 4 (Redacted) as primary, Concept 5 (Text Pressure) as the ambitious alternative.**

The Redacted concept matches "calm confidence" most precisely. The 1px orange line at the top of every page is a signature that does not demand attention but rewards it — which is exactly how the brand strategy describes the portfolio's relationship with its audience. The bar-grows-from-line animation is mechanically distinctive without being performative. It will not exhaust the viewer.

If Jatin wants the navbar to be something people screenshot and send to other developers — if he wants it to be a proof of technical ability in itself — then Text Pressure. The variable font weight interaction driven by cursor proximity is genuinely rare in production portfolios and directly demonstrates the kind of attention to micro-interaction that the brand positions around.

Concept 2 (Split Stage / live Bangalore clock) is the strongest "human moment" option and worth considering as an enhancement layer that could be added to any of the other concepts.

---

## Related Documents

- [`src/components/layout/Header.tsx`](../../src/components/layout/Header.tsx) — Current implementation
- [`docs/design/visual-direction.md`](./visual-direction.md) — Overall aesthetic system
- [`docs/brand/brand-strategy.md`](../brand/brand-strategy.md) — Brand personality and tone
- [`.claude/rules/design/color-system.md`](../../.claude/rules/design/color-system.md) — Token reference

---

**Last Updated**: 2026-03-08
**Maintained By**: Art Director / visual-director agent

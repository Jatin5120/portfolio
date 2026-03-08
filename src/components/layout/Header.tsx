import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useScroll, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/ui/NavLink'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

// ── Load animation variants ───────────────────────────────────────────────────
// Defined at module scope — stable references, no recreation on each render.
//
// Architecture: two-layer opacity.
//   Outer motion.div: style={{ opacity: navOpacity }} — ghost nav spring (0.4 at rest)
//   Inner motion.div: itemVariants — load animation (opacity 0 → 1)
//   Composite: 0.4 × 0 = 0 initially → 0.4 × 1.0 = 0.4 at rest
//
// The ghost nav spring is never touched by the load animation.
// After the load animation completes, inner items stay at opacity 1 permanently.

const LOAD_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

// Per-element entrance: fades in from -7px above.
const itemVariants = {
  hidden: { opacity: 0, y: -7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: LOAD_EASE },
  },
}

// Logo group — fires logo at t=80ms (delayChildren: 0.08)
const logoGroupVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08 } },
}

// Links group — first link at t=280ms, staggered 80ms apart
const linksGroupVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.28 },
  },
}

// Hamburger — mirrors link timing on mobile (only nav control after logo)
const hamburgerVariants = {
  hidden: { opacity: 0, y: -7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.28, ease: LOAD_EASE },
  },
}

// Live Bangalore clock — updates every second, colon blinks
function BangaloreClock() {
  const [time, setTime] = useState('')
  const [colonVisible, setColonVisible] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(now)
      setColonVisible((v) => !v)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null
  const [hh, mm] = time.split(':')

  return (
    <span className="font-mono text-[10px] tracking-widest text-tertiary leading-none tabular-nums">
      BLR{' '}
      <span className="text-secondary">{hh}</span>
      <span style={{ opacity: colonVisible ? 1 : 0, transition: 'none' }}>:</span>
      <span className="text-secondary">{mm}</span>
    </span>
  )
}

interface HeaderProps {
  activeSection?: string
  /** Force scrolled style (for playground preview) */
  forceScrolled?: boolean
}

export function Header({ activeSection, forceScrolled = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(forceScrolled)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolledRef = useRef(forceScrolled)

  // Ghost nav — dims to 40% at rest, wakes on cursor proximity or scroll
  const rawOpacity = useMotionValue(forceScrolled ? 1 : 0.4)
  const navOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 })

  const prefersReducedMotion = useReducedMotion()

  // Scroll progress for the orange line (0 → 1 as page is consumed)
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (forceScrolled) return

    const handleScroll = () => {
      const isScrolled = window.scrollY > 60
      scrolledRef.current = isScrolled
      setScrolled(isScrolled)
      if (isScrolled) rawOpacity.set(1)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (scrolledRef.current) return
      // Wake up as cursor enters top 140px of viewport
      const proximity = Math.max(0, 1 - e.clientY / 140)
      rawOpacity.set(0.4 + 0.6 * proximity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [forceScrolled, rawOpacity])

  // Lock body scroll + full opacity when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      rawOpacity.set(1)
    } else {
      document.body.style.overflow = ''
      if (!scrolledRef.current) rawOpacity.set(0.4)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, rawOpacity])

  const closeMobileNav = () => setMobileOpen(false)

  return (
    <>
      {/* motion.header is a pure variant orchestrator — it propagates "hidden"/"visible"
          down the tree. Its own background animation lives in the sibling motion.div below,
          separated to avoid mixing variant strings with property objects on animate. */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={forceScrolled ? false : 'hidden'}
        animate="visible"
      >
        {/* ── Background layer — scroll-reactive, not part of variant system ── */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundColor:
              scrolled || mobileOpen
                ? 'rgba(10, 10, 10, 0.92)'
                : 'rgba(10, 10, 10, 0)',
            backdropFilter:
              scrolled || mobileOpen ? 'blur(12px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
        />

        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ── Logo side ── */}
          {/* Outer: ghost nav spring — opacity only, no variants */}
          <motion.div style={{ opacity: navOpacity }} className="flex items-center">
            {/* Load animation orchestrator — wraps logo only */}
            <motion.div variants={logoGroupVariants}>
              <motion.div variants={itemVariants}>
                <motion.a
                  href="#"
                  className="relative overflow-hidden outline-none rounded-sm
                             focus-visible:ring-2 focus-visible:ring-primary
                             focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  style={{ lineHeight: 1, display: 'block' }}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  {/* White layer — base, always visible behind */}
                  <span className="font-heading font-bold text-2xl leading-none tracking-tight text-heading"
                    style={{ display: 'block', position: 'relative', zIndex: 1 }}>
                    Jatin
                  </span>
                  {/* Orange layer — clips in from bottom to top on hover */}
                  <motion.span
                    className="absolute inset-0 font-heading font-bold text-2xl leading-none tracking-tight text-accent"
                    style={{ zIndex: 2 }}
                    variants={{
                      rest: {
                        clipPath: 'inset(100% 0 0 0)',
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.18,
                          ease: LOAD_EASE,
                        },
                      },
                      hover: {
                        clipPath: 'inset(0% 0 0 0)',
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.22,
                          ease: LOAD_EASE,
                        },
                      },
                    }}
                  >
                    Jatin
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Bangalore clock — sibling of orchestrator in the flex row,
                appears to the right of the logo on scroll */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  className="ml-3 pl-3 border-l border-subtle"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.3, ease: LOAD_EASE }}
                >
                  <BangaloreClock />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Desktop nav links ── */}
          {/* Outer: ghost nav spring — opacity only, no variants */}
          <motion.div
            style={{ opacity: navOpacity }}
            className="hidden md:flex items-center"
          >
            {/* Inner: load animation orchestrator */}
            <motion.div
              variants={linksGroupVariants}
              className="flex items-center gap-8"
            >
              <LayoutGroup>
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <NavLink
                      href={link.href}
                      index={i + 1}
                      isActive={activeSection === link.href.replace('#', '')}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </LayoutGroup>
            </motion.div>
          </motion.div>

          {/* ── Hamburger — load animation matches link timing on mobile ── */}
          <motion.div variants={hamburgerVariants} className="md:hidden">
            <button
              className={cn(
                'w-10 h-10 flex flex-col items-center justify-center gap-[5px]',
                'rounded-lg outline-none',
                'focus-visible:ring-2 focus-visible:ring-primary',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <motion.span
                className="block w-5 h-px bg-heading rounded-full origin-center"
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: LOAD_EASE }}
              />
              <motion.span
                className="block w-5 h-px bg-heading rounded-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px bg-heading rounded-full origin-center"
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: LOAD_EASE }}
              />
            </button>
          </motion.div>
        </nav>

        {/* Scroll progress line — fills left→right as page is consumed */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left pointer-events-none"
          style={{
            backgroundColor: 'rgba(255, 171, 0, 0.45)',
            scaleX: progressScaleX,
          }}
        />
      </motion.header>

      {/* ── Mobile nav overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-page/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav
              className="flex flex-col items-center gap-10"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileNav}
                  className={cn(
                    'text-4xl font-heading font-bold text-heading',
                    'hover:text-accent transition-colors duration-200',
                    'outline-none focus-visible:text-accent',
                    activeSection === link.href.replace('#', '') && 'text-accent',
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.07,
                    ease: LOAD_EASE,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Kbd } from '@/components/ui/Kbd'
import { EASE_OUT_EXPO } from '@/lib/motion'

// ─── Animation variants ───────────────────────────────────────────────────────

const switchVariants = {
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
  hidden: { opacity: 0, y: 10 },
}

// Module-level flag: prevents stagger from re-running when toggling views
let hasPlayedEntrance = false

// ─── Profile photo ───────────────────────────────────────────────────────────

function ProfilePhoto() {
  const [errored, setErrored] = useState(false)

  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden mx-2 lg:mx-3.5"
      style={{
        width: '0.78em',
        height: '0.78em',
        verticalAlign: 'middle',
        position: 'relative',
        top: '-0.08em',
        border: '2px solid var(--color-primary)',
        boxShadow: '0 0 0 3px rgb(var(--color-primary-rgb) / 0.2), 0 0 20px rgb(var(--color-primary-rgb) / 0.2), 0 0 60px rgb(var(--color-primary-rgb) / 0.06)',
      }}
      aria-hidden="true"
    >
      {errored ? (
        <span
          className="w-full h-full flex items-center justify-center bg-primary font-heading font-bold text-on-primary select-none"
          style={{ fontSize: '0.38em' }}
        >
          J
        </span>
      ) : (
        <img
          src="/profile.jpg"
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </span>
  )
}

// ─── Default view ────────────────────────────────────────────────────────────

function DefaultView() {
  const isFirst = !hasPlayedEntrance

  useEffect(() => {
    hasPlayedEntrance = true
  }, [])

  const stagger = (delay: number) => ({
    initial: isFirst ? { opacity: 0, y: 24 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: isFirst ? delay : 0, ease: EASE_OUT_EXPO },
  })

  return (
    <motion.div
      key="default"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={switchVariants}
    >
      {/* ── Headline with inline photo ── */}
      <motion.h1
        {...stagger(0)}
        className="font-heading font-extrabold text-heading tracking-tighter"
        style={{
          fontSize: 'clamp(2.4rem, 6.2vw, 5.5rem)',
          lineHeight: 1.05,
        }}
      >
        Hey, I'm
        <ProfilePhoto />
        Jatin —{' '}
        <span className="text-accent">Mobile Lead</span>.{' '}
        I ship products, not just features.
      </motion.h1>

      {/* ── Sub-line ── */}
      <motion.p
        {...stagger(0.15)}
        className="mt-8 lg:mt-10 text-secondary font-body text-base leading-relaxed max-w-lg"
      >
        Shipping two products simultaneously at{' '}
        <span className="text-heading font-medium">Foyer</span>.{' '}
        One required solving a problem Apple doesn't document.
      </motion.p>

      {/* ── Contact link — visible but understated ── */}
      <motion.div
        {...stagger(0.3)}
        className="mt-10 lg:mt-12"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-accent transition-colors duration-200 font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm"
        >
          Let's talk
          <span aria-hidden="true">→</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

// ─── Technical (easter egg) view ─────────────────────────────────────────────

const CODE_LINES: Array<{
  type: 'comment' | 'key' | 'value' | 'symbol' | 'blank'
  text: string
}> = [
  { type: 'comment', text: '// Full-stack mobile ownership. Strategy to App Store, no handoffs.' },
  { type: 'blank', text: '' },
  { type: 'key', text: 'mobile_lead ' },
  { type: 'value', text: 'Jatin' },
  { type: 'symbol', text: ' {' },
  { type: 'key', text: '  value_proposition: ' },
  { type: 'value', text: '"full-stack mobile ownership — strategy to App Store, no handoffs required"' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  bridges {' },
  { type: 'key', text: '    platforms: ' },
  { type: 'value', text: '[Flutter, Swift, iOS_native]' },
  { type: 'comment', text: '      ↳ cross-platform by default, native when constraints demand' },
  { type: 'key', text: '    backend: ' },
  { type: 'value', text: '[Node.js, Firebase, MongoDB]' },
  { type: 'comment', text: '      ↳ full-stack capable, unblocks teams' },
  { type: 'key', text: '    thinking: ' },
  { type: 'value', text: '[MVVM, BLoC, Clean_Architecture]' },
  { type: 'comment', text: "      ↳ builds for maintainability, not just today's deadline" },
  { type: 'symbol', text: '  }' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  solves {' },
  { type: 'key', text: '    hard_constraints: {' },
  { type: 'key', text: '      iOS: ' },
  { type: 'value', text: "'24x7 audio recording that survives battery, memory, background kills'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '      performance: ' },
  { type: 'value', text: "'60% faster startups (4.2s → 1.6s)'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '      scale: ' },
  { type: 'value', text: "'40% smaller codebases through architecture'" },
  { type: 'symbol', text: ',' },
  { type: 'symbol', text: '    },' },
  { type: 'key', text: '    team_velocity: {' },
  { type: 'key', text: '      reusability: ' },
  { type: 'value', text: "'4 monorepo packages (chat, livestream, +2)'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '      architecture: ' },
  { type: 'value', text: "'3 projects migrated to MVVM'" },
  { type: 'symbol', text: ',' },
  { type: 'symbol', text: '    }' },
  { type: 'symbol', text: '  }' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  delivers {' },
  { type: 'key', text: '    speed: ' },
  { type: 'value', text: "'Two products shipped simultaneously — no velocity lost'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '    cost: ' },
  { type: 'value', text: "'One engineer. Full cross-platform team output.'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '    autonomy: ' },
  { type: 'value', text: "'Strategy to App Store — no handoffs, no gaps'" },
  { type: 'symbol', text: ',' },
  { type: 'symbol', text: '  }' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  current: ' },
  { type: 'value', text: 'Mobile_Lead @ Foyer' },
  { type: 'symbol', text: ' [' },
  { type: 'value', text: 'Merlin_AI, Thine' },
  { type: 'symbol', text: ']' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  status {' },
  { type: 'key', text: '    building: ' },
  { type: 'value', text: 'ai_products_in_production' },
  { type: 'key', text: '    learning: ' },
  { type: 'value', text: 'native_iOS_depth' },
  { type: 'comment', text: '  // currently: Objective-C bridging' },
  { type: 'key', text: '    open_to: ' },
  { type: 'value', text: '[hard_problems, technical_partnerships]' },
  { type: 'symbol', text: '  }' },
  { type: 'symbol', text: '}' },
]

function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  const colorClass = {
    comment: 'text-tertiary',
    key: 'text-secondary',
    value: 'text-accent',
    symbol: 'text-secondary',
    blank: '',
  }[line.type]

  return (
    <span className={`font-mono text-sm leading-relaxed ${colorClass}`}>
      {line.text}
    </span>
  )
}

function CodeBlock() {
  return (
    <pre
      className="overflow-x-auto text-left whitespace-pre-wrap break-words"
      aria-label="Technical profile in pseudo-code"
    >
      {CODE_LINES.map((line, i) => {
        if (line.type === 'blank')
          return <span key={i} className="block h-3" />
        return (
          <span key={i} className="block">
            <CodeLine line={line} />
          </span>
        )
      })}
      <span
        className="inline-block w-2 h-4 bg-accent align-middle ml-0.5"
        style={{ animation: 'blink-cursor 1.1s step-end infinite' }}
        aria-hidden="true"
      />
    </pre>
  )
}

function TechnicalView() {
  return (
    <motion.div
      key="technical"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={switchVariants}
    >
      <p className="font-mono text-xs text-tertiary tracking-wide mb-4">
        // tl_dr.jatin
      </p>

      <div
        className="bg-card border border-border rounded-xl overflow-hidden max-w-3xl max-h-[70vh] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-border) transparent',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-elevated" />
            <span className="w-2.5 h-2.5 rounded-full bg-elevated" />
            <span className="w-2.5 h-2.5 rounded-full bg-elevated" />
          </div>
          <span className="ml-2 font-mono text-xs text-tertiary">
            tl_dr.jatin
          </span>
        </div>

        <div className="p-6 lg:p-8">
          <CodeBlock />
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-tertiary">
        // press <Kbd>Esc</Kbd> or <Kbd>Cmd+K</Kbd> to switch back
      </p>
    </motion.div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export function Hero() {
  const [isTechnical, setIsTechnical] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(true)

  // Keyboard: Cmd+K toggles; Esc exits
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsTechnical((v) => !v)
      }
      if (e.key === 'Escape' && isTechnical) {
        setIsTechnical(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isTechnical])

  // Track hero visibility for mobile FAB
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="bg-page min-h-screen flex flex-col justify-center relative px-6 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* ── Ambient glow layers ── */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[50vw] h-[40vw] pointer-events-none"
        animate={{ opacity: isTechnical ? 0.3 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            'radial-gradient(ellipse at 80% 0%, rgb(var(--color-primary-rgb) / 0.18) 0%, rgb(var(--color-primary-rgb) / 0.06) 40%, transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[28vw] h-[28vw] pointer-events-none rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--color-primary-rgb) / 0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Decorative ruled line — subtle craft signal ── */}
      <div
        aria-hidden="true"
        className="absolute left-6 lg:left-16 xl:left-24 top-[20%] bottom-[20%] w-px pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgb(var(--color-primary-rgb) / 0.12) 30%, rgb(var(--color-primary-rgb) / 0.12) 70%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full py-28 lg:py-36 lg:pl-10">
        {/* ── Entrance wrapper ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isTechnical ? <TechnicalView /> : <DefaultView />}
          </AnimatePresence>
        </motion.div>

        {/* ── Keyboard hint ── */}
        <AnimatePresence>
          {!isTechnical && (
            <motion.p
              className="mt-12 font-mono text-xs select-none text-tertiary/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              Developer?{' '}
              <Kbd className="text-tertiary">Cmd+K</Kbd>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll cue ── */}
      <AnimatePresence>
        {!isTechnical && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                className="text-tertiary opacity-40"
              >
                <path
                  d="M1 1L10 10L19 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile FAB ── */}
      <AnimatePresence>
        {heroInView && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="md:hidden fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-mono text-sm text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            onClick={() => setIsTechnical((v) => !v)}
            whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow-sm)' }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'tween' as const,
              duration: 0.2,
              ease: EASE_OUT_EXPO,
            }}
            aria-label={
              isTechnical ? 'Exit tl;dr mode' : 'Enter tl;dr mode'
            }
            style={{
              boxShadow: isTechnical ? 'var(--shadow-glow-sm)' : undefined,
            }}
          >
            {isTechnical ? '×' : '{ }'}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

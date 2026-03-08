import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

// ─── Animation variants ───────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
}

const switchVariants = {
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  hidden: { opacity: 0, y: 10 },
}

// ─── Profile photo (inline, circular) ────────────────────────────────────────

function ProfilePhoto() {
  const [errored, setErrored] = useState(false)

  return (
    <span
      className="inline-flex items-center justify-center rounded-full border-2 border-primary align-middle mx-2 shrink-0 overflow-hidden"
      style={{
        width: 'clamp(72px, 8vw, 100px)',
        height: 'clamp(72px, 8vw, 100px)',
        // Pull slightly above the baseline so the photo sits mid-cap
        verticalAlign: 'middle',
        boxShadow: 'var(--shadow-glow-sm)',
      }}
      aria-hidden="true"
    >
      {errored ? (
        // Fallback: orange background with initial
        <span
          className="w-full h-full flex items-center justify-center bg-primary font-heading font-bold text-on-primary select-none"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          J
        </span>
      ) : (
        <img
          src="/profile.jpg"
          alt="Jatin"
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </span>
  )
}

// ─── Default (human-readable) headline view ───────────────────────────────────

function DefaultView() {
  return (
    <motion.div
      key="default"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={switchVariants}
    >
      {/* Greeting + inline photo */}
      <h1
        className="font-heading font-bold text-heading leading-tight"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
      >
        Hey, I'm{' '}
        <ProfilePhoto />
        Jatin —{' '}
        <span className="text-accent">Mobile Lead</span> building cross&#8209;platform{' '}
        experiences that feel smooth, scale well, and actually solve problems.
      </h1>

      {/* Sub-line */}
      <motion.p
        className="mt-6 text-secondary font-body text-lg"
        custom={0.1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        Currently at{' '}
        <span className="text-heading font-medium">Foyer</span>.{' '}
        Building{' '}
        <span className="text-heading font-medium">Thine</span>{' '}
        +{' '}
        <span className="text-heading font-medium">Merlin AI</span>.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-10 flex flex-wrap gap-4"
        custom={0.2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="primary" size="large" href="#projects">
          View Work
        </Button>
        <Button variant="secondary" size="large" href="#contact">
          Get in Touch
        </Button>
      </motion.div>
    </motion.div>
  )
}

// ─── Technical (easter egg) view ─────────────────────────────────────────────

const CODE_LINES: Array<{ type: 'comment' | 'key' | 'value' | 'symbol' | 'blank'; text: string }> = [
  { type: 'comment', text: '// Mobile Lead who bridges engineering and business' },
  { type: 'blank', text: '' },
  { type: 'key', text: 'mobile_lead ' },
  { type: 'value', text: 'Jatin' },
  { type: 'symbol', text: ' {' },
  { type: 'key', text: '  value_proposition: ' },
  { type: 'value', text: '"I ship products, not just features"' },
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
  { type: 'comment', text: '      ↳ strategic architecture, not just shipping features' },
  { type: 'symbol', text: '  }' },
  { type: 'blank', text: '' },
  { type: 'key', text: '  solves {' },
  { type: 'key', text: '    hard_constraints: {' },
  { type: 'key', text: '      iOS: ' },
  { type: 'value', text: "'Built 24x7 audio recording (battery, memory, background)'" },
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
  { type: 'value', text: "'Ships cross-platform without compromising quality'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '    scale: ' },
  { type: 'value', text: "'Architectures that reduce maintenance costs'" },
  { type: 'symbol', text: ',' },
  { type: 'key', text: '    autonomy: ' },
  { type: 'value', text: "'Owns mobile strategy end-to-end'" },
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
  { type: 'value', text: 'products_at_scale' },
  { type: 'key', text: '    learning: ' },
  { type: 'value', text: 'always' },
  { type: 'key', text: '    open_to: ' },
  { type: 'value', text: '[interesting_problems, collaboration]' },
  { type: 'symbol', text: '  }' },
  { type: 'symbol', text: '}' },
]

// Renders a single code line with appropriate color per token type
function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  if (line.type === 'blank') return <br />

  const colorClass = {
    comment: 'text-tertiary',
    key: 'text-secondary',
    value: 'text-accent',
    symbol: 'text-secondary',
  }[line.type]

  return <span className={`font-mono text-sm leading-relaxed ${colorClass}`}>{line.text}</span>
}

// Reconstructs the full block by grouping consecutive lines into <div> rows
function CodeBlock() {
  // Group lines into rows — each item in CODE_LINES is its own render unit,
  // but consecutive non-blank tokens on the same "logical line" need to be
  // on the same DOM row. The source array already has one token per array
  // entry; blank entries act as spacers.
  // Strategy: wrap each entry in a block-level element (pre keeps whitespace).
  return (
    <pre
      className="overflow-x-auto text-left leading-7 whitespace-pre-wrap break-words"
      aria-label="Technical profile in pseudo-code"
    >
      {CODE_LINES.map((line, i) => {
        if (line.type === 'blank') return <div key={i} className="h-3" />
        return (
          <div key={i}>
            <CodeLine line={line} />
          </div>
        )
      })}
      {/* Blinking cursor */}
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
      animate="enter"
      exit="exit"
      variants={switchVariants}
    >
      {/* Label */}
      <p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">
        // CTO Mode
      </p>

      {/* Code block card */}
      <div
        className="bg-card border border-border rounded-xl p-6 lg:p-8 max-h-[70vh] overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        <CodeBlock />
      </div>

      {/* Dismiss hint */}
      <p className="mt-4 font-mono text-xs text-tertiary">
        Press <kbd className="px-1.5 py-0.5 rounded bg-elevated text-secondary font-mono text-xs border border-border">Esc</kbd>{' '}
        or{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-elevated text-secondary font-mono text-xs border border-border">Cmd+K</kbd>{' '}
        to exit
      </p>
    </motion.div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export function Hero() {
  const [isTechnical, setIsTechnical] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fade out the keyboard hint after 3 s
  useEffect(() => {
    hintTimerRef.current = setTimeout(() => setShowHint(false), 3000)
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    }
  }, [])

  // Keyboard listener: Cmd+K (Mac) / Ctrl+K (Win/Linux) toggles; Esc exits
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const modKey = isMac ? e.metaKey : e.ctrlKey

      if (modKey && e.key.toLowerCase() === 'k') {
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

  return (
    <>
      {/* Blinking cursor keyframe — injected once in the DOM */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <section
        id="hero"
        aria-label="Introduction"
        className="min-h-screen flex flex-col justify-center relative px-6 lg:px-16"
      >
        <div className="max-w-5xl mx-auto w-full py-32 lg:py-40">

          {/* ── Entrance wrapper — stagger the whole block on mount ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* ── Animated switch between default ↔ technical ── */}
            <AnimatePresence mode="wait" initial={false}>
              {isTechnical ? <TechnicalView /> : <DefaultView />}
            </AnimatePresence>
          </motion.div>

          {/* ── Keyboard hint (fades out after 3 s, hidden in technical mode) ── */}
          <AnimatePresence>
            {showHint && !isTechnical && (
              <motion.p
                className="mt-8 font-mono text-xs text-tertiary select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-elevated text-tertiary font-mono text-xs border border-border">
                  Cmd+K
                </kbd>{' '}
                for CTO mode
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile { } toggle button (bottom-right of section) ── */}
        <motion.button
          className="md:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-mono text-sm text-accent"
          onClick={() => setIsTechnical((v) => !v)}
          whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow-sm)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label={isTechnical ? 'Exit CTO mode' : 'Enter CTO mode'}
          style={{ boxShadow: isTechnical ? 'var(--shadow-glow-sm)' : undefined }}
        >
          {isTechnical ? '×' : '{ }'}
        </motion.button>
      </section>
    </>
  )
}

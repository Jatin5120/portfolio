import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

// ─── Animation variants ───────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Default ↔ Technical switch animation — "enter" renamed to "visible"
// for consistency with every other variant in the codebase.
const switchVariants = {
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
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
        // aria-hidden="true" on parent makes the alt redundant for AT —
        // use alt="" to mark explicitly decorative.
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

// ─── Default (human-readable) headline view ───────────────────────────────────
//
// Sub-line and CTAs are plain elements — NOT motion wrappers with fadeUpVariants.
// The parent motion.div already handles the entrance / exit animation via
// switchVariants; adding per-child variants here would re-run the entrance
// every time the user toggles CTO mode (AnimatePresence unmounts/remounts).

function DefaultView() {
  return (
    <motion.div
      key="default"
      initial="hidden"
      animate="visible"
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
        <span className="text-accent">Mobile Lead</span>.{' '}
        I ship products, not just features.
      </h1>

      {/* Sub-line */}
      <p className="mt-8 text-secondary font-body text-lg">
        Shipping two products simultaneously at{' '}
        <span className="text-heading font-medium">Foyer</span>.{' '}
        One required solving a problem Apple doesn't document.
      </p>

      {/* CTAs */}
      <div className="mt-12 flex flex-wrap gap-4">
        <Button variant="primary" size="large" href="#work">
          View Work
        </Button>
        <Button variant="secondary" size="large" href="#contact">
          Let's Talk
        </Button>
      </div>
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
  { type: 'value', text: "'Two apps live simultaneously — zero dropped balls'" },
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
  { type: 'value', text: 'products_at_scale' },
  { type: 'key', text: '    learning: ' },
  { type: 'value', text: 'always' },
  { type: 'key', text: '    open_to: ' },
  { type: 'value', text: '[interesting_problems, collaboration]' },
  { type: 'symbol', text: '  }' },
  { type: 'symbol', text: '}' },
]

// Renders a single code token with appropriate color
function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  const colorClass = {
    comment: 'text-tertiary',
    key: 'text-secondary',
    value: 'text-accent',
    symbol: 'text-secondary',
    blank: '',
  }[line.type]

  return <span className={`font-mono text-sm leading-relaxed ${colorClass}`}>{line.text}</span>
}

// Each CODE_LINES entry is its own row.
// Use <span className="block"> instead of <div> — div inside pre is invalid HTML.
function CodeBlock() {
  return (
    <pre
      className="overflow-x-auto text-left leading-7 whitespace-pre-wrap break-words"
      aria-label="Technical profile in pseudo-code"
    >
      {CODE_LINES.map((line, i) => {
        if (line.type === 'blank') return <span key={i} className="block h-3" />
        return (
          <span key={i} className="block">
            <CodeLine line={line} />
          </span>
        )
      })}
      {/* Blinking cursor — keyframe defined in globals.css */}
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
      {/* Label */}
      <p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">
        // tl_dr.jatin
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
        // press{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-elevated text-secondary font-mono text-xs border border-border">Esc</kbd>{' '}
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

  // Keyboard listener: Cmd+K or Ctrl+K toggles; Esc exits.
  // navigator.platform is deprecated — use e.metaKey || e.ctrlKey directly.
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

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center relative px-6 lg:px-16 overflow-hidden"
    >
      {/* ── Ambient orange glow — upper-right corner, decorative ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255,171,0,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full py-32 lg:py-40">

        {/* ── Entrance wrapper — fades in from below on mount ── */}
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

        {/* ── Keyboard hint — persistent, hidden in technical mode ── */}
        <AnimatePresence>
          {!isTechnical && (
            <motion.p
              className="mt-8 font-mono text-xs select-none"
              style={{ color: 'rgba(107,114,128,0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              In a hurry?{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-elevated text-tertiary font-mono text-xs border border-border">
                Cmd+K
              </kbd>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll depth cue — bouncing chevron, hidden in technical mode ── */}
      <AnimatePresence>
        {!isTechnical && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                className="text-tertiary opacity-50"
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

      {/* ── Mobile { } toggle button — z-30 keeps it below header's z-40 overlay ── */}
      <motion.button
        className="md:hidden fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-mono text-sm text-accent"
        onClick={() => setIsTechnical((v) => !v)}
        whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow-sm)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label={isTechnical ? 'Exit tl;dr mode' : 'Enter tl;dr mode'}
        style={{ boxShadow: isTechnical ? 'var(--shadow-glow-sm)' : undefined }}
      >
        {isTechnical ? '×' : '{ }'}
      </motion.button>
    </section>
  )
}

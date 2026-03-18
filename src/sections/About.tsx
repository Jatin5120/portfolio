import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { aboutNodes } from '@/data/about-nodes'
import { EASE_OUT_EXPO } from '@/lib/motion'
import type { AboutNode } from '@/types'

// ─── Node title map ─────────────────────────────────────────────────────────
const NODE_TITLES: Record<string, string> = {
  'node-1': 'Punjab → Bangalore',
  'node-2': 'Work Now, Rest Later',
  'node-3': 'The Quiet One',
  'node-4': 'Learning by Breaking Things',
  'node-5': 'Helping Where I Can',
  'node-6': 'Travel & Freedom',
  'node-7': 'Action Over Comfort',
  'node-8': 'Reset Button',
}

// ─── Desktop scatter positions (tuned for collision avoidance) ───────────────
const DESKTOP_POSITIONS: Record<string, React.CSSProperties> = {
  'node-1': { top: '4%',  left: '6%'  },
  'node-2': { top: '4%',  left: '60%' },
  'node-3': { top: '78%', left: '42%' },
  'node-4': { top: '40%', left: '5%'  },
  'node-5': { top: '72%', left: '10%' },
  'node-6': { top: '40%', left: '74%' },
  'node-7': { top: '16%', left: '32%' },
  'node-8': { top: '22%', left: '64%' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProfilePhoto({ size }: { size: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 120 : 96
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      style={{
        width: dim,
        height: dim,
        background: 'radial-gradient(135deg, #1f2937 0%, #0f1318 100%)',
        border: '2px solid rgba(255, 171, 0, 0.5)',
        boxShadow: '0 0 0 4px rgba(255,171,0,0.08), 0 0 20px rgba(255,171,0,0.15)',
      }}
    >
      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
      <span
        className="font-heading font-bold text-accent relative z-10"
        style={{ fontSize: size === 'lg' ? 44 : 34, letterSpacing: '-0.03em' }}
      >
        J
      </span>
    </div>
  )
}

// ─── Chevron SVG ────────────────────────────────────────────────────────────

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <motion.div
      className="ml-auto flex-shrink-0 text-tertiary"
      animate={{ rotate: isExpanded ? 180 : 0 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}

// ─── Node Card ──────────────────────────────────────────────────────────────

interface NodeCardProps {
  node: AboutNode
  isExpanded: boolean
  onToggle: () => void
}

function NodeCard({ node, isExpanded, onToggle }: NodeCardProps) {
  const title = NODE_TITLES[node.id] ?? node.id
  const contentId = `${node.id}-content`

  return (
    <div style={{ maxWidth: isExpanded ? 280 : 200 }}>
      <motion.div
        layout
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(22, 26, 34, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        animate={{
          boxShadow: isExpanded
            ? '0 0 0 1px rgba(255,171,0,0.35), 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,171,0,0.10)'
            : '0 0 0 1px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.3)',
          backgroundColor: isExpanded
            ? 'rgba(26, 30, 40, 0.92)'
            : 'rgba(22, 26, 34, 0.82)',
        }}
        whileHover={isExpanded ? undefined : {
          boxShadow: '0 0 0 1px rgba(255,171,0,0.18), 0 8px 24px rgba(0,0,0,0.45)',
          backgroundColor: 'rgba(26, 30, 40, 0.90)',
        }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Collapsed header — always visible */}
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="w-full flex items-center gap-2.5 px-4 py-3 select-none text-left transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded-2xl"
          style={{
            backgroundColor: isExpanded ? 'rgba(255,171,0,0.06)' : 'transparent',
          }}
        >
          <span className="text-base leading-none flex-shrink-0 opacity-75" role="img" aria-hidden="true">
            {node.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-sm text-heading leading-tight truncate">
              {title}
            </p>
            {node.year && (
              <p className="font-mono text-xs text-tertiary mt-px">
                {node.year}
              </p>
            )}
          </div>
          <ChevronIcon isExpanded={isExpanded} />
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={contentId}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                  opacity: { duration: 0.18, delay: 0.12, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  opacity: { duration: 0.08 },
                  height: { duration: 0.18, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
                },
              }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {/* Animated gradient divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.16, ease: EASE_OUT_EXPO }}
                  style={{
                    height: '1px',
                    marginBottom: '12px',
                    background: 'linear-gradient(90deg, rgba(255,171,0,0.5) 0%, rgba(255,171,0,0.05) 100%)',
                    transformOrigin: 'left',
                  }}
                />
                {node.content.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-secondary text-sm leading-[1.65] mb-3 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// ─── Bangalore map background (desktop only) ─────────────────────────────────

function MapBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <img
        src="/bangalore-map.webp"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover max-w-none opacity-[0.3]"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 48%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 48%, black 20%, transparent 85%)',
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function About() {
  const prefersReduced = useReducedMotion()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Close expanded node when clicking outside the scatter area
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setExpandedId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setExpandedId(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleToggle(id: string) {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.065, delayChildren: 0.2 } },
  }

  const nodeVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: EASE_OUT_EXPO },
    },
  }

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay: 0 },
    },
  }

  return (
    <section
      id="about"
      aria-label="About"
      className="relative py-24 lg:py-32 px-6 lg:px-16 xl:px-24 overflow-hidden"
      ref={sectionRef}
    >
      {/* Full-bleed map background */}
      <div className="hidden lg:block">
        <MapBackground />
      </div>

      <div className="relative max-w-6xl mx-auto">
      {/* Section heading */}
      <div className="mb-10 lg:mb-14">
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-heading">
          Beyond the code.
        </h2>
      </div>

      {/* ── Desktop: scatter layout ── */}
      <div className="hidden lg:block">
        <motion.div
          className="relative"
          style={{ minHeight: 700 }}
          variants={containerVariants}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {/* Profile photo — centred absolutely */}
          <motion.div
            variants={photoVariants}
            className="absolute z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Pulse ring */}
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(255,171,0,0.25)' }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />
            )}
            {/* Outer glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-8px',
                background: 'radial-gradient(circle, rgba(255,171,0,0.09) 0%, transparent 70%)',
              }}
            />
            <ProfilePhoto size="lg" />
          </motion.div>

          {/* Node cards */}
          {aboutNodes.map(node => {
            const isActive = expandedId === node.id
            const hasExpanded = expandedId !== null

            return (
              <motion.div
                key={node.id}
                variants={nodeVariants}
                className="absolute"
                style={{
                  ...DESKTOP_POSITIONS[node.id],
                  zIndex: isActive ? 20 : 10,
                }}
                animate={{
                  opacity: hasExpanded && !isActive ? 0.45 : 1,
                  scale: hasExpanded && !isActive ? 0.97 : 1,
                  filter: hasExpanded && !isActive ? 'saturate(0.6)' : 'saturate(1)',
                }}
                whileHover={isActive ? undefined : { y: -3 }}
                transition={{ type: 'spring' as const, stiffness: 500, damping: 35 }}
              >
                <NodeCard
                  node={node}
                  isExpanded={isActive}
                  onToggle={() => handleToggle(node.id)}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ── Mobile: vertical list layout ── */}
      <div className="lg:hidden">
        <motion.div
          variants={containerVariants}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {/* Profile photo centred */}
          <motion.div
            variants={photoVariants}
            className="flex justify-center mb-10"
          >
            <ProfilePhoto size="sm" />
          </motion.div>

          {/* Vertical list of node cards */}
          <div className="flex flex-col gap-4">
            {aboutNodes.map(node => (
              <motion.div key={node.id} variants={nodeVariants}>
                <NodeCard
                  node={node}
                  isExpanded={expandedId === node.id}
                  onToggle={() => handleToggle(node.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

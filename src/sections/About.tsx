import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutNodes } from '@/data/about-nodes'
import type { AboutNode } from '@/types'

// ─── Node title map (emoji → human-readable title) ───────────────────────────
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

// ─── Desktop scatter positions ────────────────────────────────────────────────
// Each value is { top?, bottom?, left?, right? } as percentage strings.
// The profile photo sits at centre (top 50 / left 50 via transform).
const DESKTOP_POSITIONS: Record<string, React.CSSProperties> = {
  'node-1': { top: '5%',  left: '8%'  },
  'node-2': { top: '5%',  left: '62%' },
  'node-3': { top: '74%', left: '40%' },
  'node-4': { top: '42%', left: '2%'  },
  'node-5': { top: '76%', left: '12%' },
  'node-6': { top: '42%', left: '76%' },
  'node-7': { top: '18%', left: '36%' },
  'node-8': { top: '22%', left: '62%' },
}

// ─── SVG connection lines (desktop only, very subtle) ────────────────────────
// Pairs: [fromNodeId, toNodeId]
// Approximate centre-point coordinates for each node in the 900 × 620 px
// scatter canvas (these match the percentage positions above at that size).
// node centre-x ≈ left% × 900  +  collapsed-card-half-width (~80px)
// node centre-y ≈ top%  × 620  +  collapsed-card-half-height (~22px)
const APPROX_CENTRES: Record<string, { x: number; y: number }> = {
  'node-1': { x: 152, y: 53  },
  'node-2': { x: 638, y: 53  },
  'node-3': { x: 440, y: 481 },
  'node-4': { x: 98,  y: 282 },
  'node-5': { x: 188, y: 493 },
  'node-6': { x: 764, y: 282 },
  'node-7': { x: 404, y: 134 },
  'node-8': { x: 638, y: 158 },
}

const CONNECTION_PAIRS: [string, string][] = [
  ['node-1', 'node-6'],
  ['node-2', 'node-8'],
  ['node-4', 'node-5'],
  ['node-5', 'node-7'],
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProfilePhoto({ size }: { size: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 120 : 96
  return (
    <div
      className="rounded-full bg-elevated flex items-center justify-center flex-shrink-0"
      style={{
        width: dim,
        height: dim,
        border: '4px solid var(--color-primary)',
      }}
    >
      <span
        className="font-heading font-bold text-accent"
        style={{ fontSize: size === 'lg' ? 48 : 38 }}
      >
        J
      </span>
    </div>
  )
}

interface NodeCardProps {
  node: AboutNode
  isExpanded: boolean
  onToggle: () => void
}

function NodeCard({ node, isExpanded, onToggle }: NodeCardProps) {
  const title = NODE_TITLES[node.id] ?? node.id

  return (
    <motion.div
      layout
      onClick={onToggle}
      className="cursor-pointer select-none"
      style={{ maxWidth: isExpanded ? 280 : undefined }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.div
        layout
        className="rounded-xl border border-subtle overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)' }}
        animate={{
          borderColor: isExpanded
            ? 'rgba(255, 171, 0, 0.4)'
            : 'var(--border-subtle)',
          boxShadow: isExpanded
            ? '0 0 16px rgba(255, 171, 0, 0.12)'
            : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Collapsed header — always visible */}
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="text-xl leading-none flex-shrink-0" role="img" aria-hidden="true">
            {node.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-heading leading-tight truncate">
              {title}
            </p>
            {node.year && (
              <p className="font-mono text-xs text-tertiary mt-0.5">
                {node.year}
              </p>
            )}
          </div>
          {/* Expand/collapse chevron */}
          <motion.span
            className="ml-auto text-tertiary flex-shrink-0 text-xs"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▾
          </motion.span>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div
                  className="h-px mb-3"
                  style={{ backgroundColor: 'rgba(255,171,0,0.15)' }}
                />
                {node.content.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-secondary text-sm leading-relaxed mb-2 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Connection lines SVG (desktop only) ─────────────────────────────────────

function ConnectionLines() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 900 620"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
    >
      {CONNECTION_PAIRS.map(([fromId, toId]) => {
        const from = APPROX_CENTRES[fromId]
        const to = APPROX_CENTRES[toId]
        if (!from || !to) return null
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(255,171,0,0.15)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        )
      })}
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function About() {
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

  function handleToggle(id: string) {
    setExpandedId(prev => (prev === id ? null : id))
  }

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const nodeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
    },
  }

  return (
    <section
      id="about"
      aria-label="About"
      className="py-24 lg:py-32 px-6 lg:px-16 max-w-5xl mx-auto"
      ref={sectionRef}
    >
      {/* Section header */}
      <div className="mb-16">
        <p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">
          About
        </p>
        <SectionHeading className="text-3xl lg:text-4xl">
          Beyond the code
        </SectionHeading>
      </div>

      {/* ── Desktop: scatter layout ── */}
      <div className="hidden lg:block">
        <motion.div
          className="relative"
          style={{ minHeight: 620 }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {/* Subtle connection lines behind everything */}
          <ConnectionLines />

          {/* Profile photo — centred absolutely */}
          <motion.div
            variants={nodeVariants}
            className="absolute z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="rounded-full p-1"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,171,0,0.08) 0%, transparent 70%)',
              }}
            >
              <ProfilePhoto size="lg" />
            </div>
          </motion.div>

          {/* Node cards */}
          {aboutNodes.map(node => (
            <motion.div
              key={node.id}
              variants={nodeVariants}
              className="absolute z-10"
              style={DESKTOP_POSITIONS[node.id]}
            >
              <NodeCard
                node={node}
                isExpanded={expandedId === node.id}
                onToggle={() => handleToggle(node.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Mobile: vertical list layout ── */}
      <div className="lg:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {/* Profile photo centred */}
          <motion.div
            variants={nodeVariants}
            className="flex justify-center mb-10"
          >
            <ProfilePhoto size="sm" />
          </motion.div>

          {/* Vertical list of node cards */}
          <div className="flex flex-col gap-3">
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
    </section>
  )
}

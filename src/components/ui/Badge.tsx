import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Status Badges ────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: 'live' | 'launching-soon'
  text?: string
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary/90 text-on-primary backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-page animate-pulse" />
        {text ?? 'Live'}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-elevated/90 text-accent border border-accent/30 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      {text ?? 'Launching Soon'}
    </span>
  )
}

// ─── Tech Stack Tag ───────────────────────────────────────────────────────────

interface TechTagProps {
  children: React.ReactNode
  className?: string
}

export function TechTag({ children, className }: TechTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md',
        'text-xs font-medium font-mono',
        'bg-elevated text-secondary border border-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}

// ─── Available Badge (nav) ────────────────────────────────────────────────────
// VU-meter strip — hardware panel aesthetic, not a software pill
// Three LED bars at staggered heights animate like a status indicator

export function AvailableBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 rounded-sm bg-elevated border border-primary/15"
      style={{
        height: 28,
        boxShadow: 'inset 0 1px 0 rgba(255,171,0,0.08), 0 0 0 1px rgba(255,171,0,0.12)',
      }}
      role="status"
      aria-label="Currently open for work"
    >
      <div className="flex items-end gap-[3px]" style={{ height: 12 }} aria-hidden="true">
        {([0, 1, 2] as const).map((i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent"
            style={{ height: `${(i + 1) * 33}%` }}
            animate={{ opacity: [0.2, 0.8, 1, 0.8, 0.2] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.22,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-accent leading-none">
        OPEN
      </span>
    </div>
  )
}

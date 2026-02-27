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

export function AvailableBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated text-accent border border-primary/20">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      Available
    </span>
  )
}

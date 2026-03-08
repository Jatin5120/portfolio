import { cn } from '@/lib/utils'

interface TechTagProps {
  children: React.ReactNode
  className?: string
}

/**
 * Neutral monospace pill for WorkExperience skill tags.
 * Decision #2: NOT orange. bg-elevated, text-secondary, border-subtle, font-mono.
 */
export function TechTag({ children, className }: TechTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'bg-elevated text-secondary border border-subtle',
        'font-mono text-xs',
        'px-2.5 py-1 rounded-full',
        'select-none',
        className,
      )}
    >
      {children}
    </span>
  )
}

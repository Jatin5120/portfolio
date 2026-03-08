import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types'

type FilterValue = 'all' | ProjectCategory

interface Tab {
  id: FilterValue
  label: string
}

const TABS: Tab[] = [
  { id: 'all', label: 'All' },
  { id: 'apps', label: 'Apps' },
  { id: 'packages', label: 'Packages' },
  { id: 'ai', label: 'AI' },
]

interface FilterTabsProps {
  active: FilterValue
  onChange: (value: FilterValue) => void
  className?: string
}

/**
 * Project category filter tabs.
 * Decision #6: layoutId sliding orange pill indicator, NOT filled bg on active.
 * Active tab: orange text + animated underline. Keyboard nav: ArrowLeft/Right.
 */
export function FilterTabs({ active, onChange, className }: FilterTabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const current = TABS.findIndex((t) => t.id === active)
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      onChange(TABS[(current + 1) % TABS.length].id)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onChange(TABS[(current - 1 + TABS.length) % TABS.length].id)
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={cn('flex gap-1', className)}
      onKeyDown={handleKeyDown}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-pressed={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium font-body rounded-md',
            'transition-colors duration-200',
            'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
            active === tab.id ? 'text-accent' : 'text-tertiary hover:text-secondary',
          )}
        >
          {tab.label}
          {active === tab.id && (
            <motion.span
              layoutId="filter-indicator"
              aria-hidden="true"
              className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

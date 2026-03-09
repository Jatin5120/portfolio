import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  index: number
}

export function NavLink({ href, children, isActive = false, index }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'relative flex items-baseline gap-2 pb-2.5 group',
        'outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Index number — JetBrains Mono, ignites before the label */}
      <span
        className={cn(
          'font-mono text-[10px] tracking-widest leading-none tabular-nums select-none',
          'transition-colors duration-150',
          isActive ? 'text-accent' : 'text-tertiary group-hover:text-accent',
        )}
      >
        0{index}
      </span>

      {/* Label */}
      <span
        className={cn(
          'font-body text-sm font-semibold tracking-wide',
          'transition-colors duration-200',
          isActive ? 'text-heading' : 'text-secondary group-hover:text-heading',
        )}
      >
        {children}
      </span>

      {/* Shared sliding marker — springs magnetically between active links */}
      {isActive && (
        <motion.div
          layoutId="nav-active-bar"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
          style={{ boxShadow: '0 0 8px rgba(255, 171, 0, 0.65)' }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}
    </a>
  )
}

import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

export function NavLink({ href, children, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'relative font-medium text-base font-body',
        'transition-colors duration-200',
        'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        // Underline bar
        'after:absolute after:-bottom-1 after:left-0 after:right-0',
        'after:h-0.5 after:bg-primary after:rounded-full',
        'after:transition-transform after:duration-200',
        isActive
          ? 'text-accent after:scale-x-100'
          : 'text-secondary hover:text-accent after:scale-x-0 hover:after:scale-x-100',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}

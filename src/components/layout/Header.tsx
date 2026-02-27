import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/ui/NavLink'
import { AvailableBadge } from '@/components/ui/Badge'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

interface HeaderProps {
  activeSection?: string
  /** Force scrolled style (for playground preview) */
  forceScrolled?: boolean
}

export function Header({ activeSection, forceScrolled = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(forceScrolled)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (forceScrolled) return
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [forceScrolled])

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobileNav = () => setMobileOpen(false)

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor:
            scrolled || mobileOpen
              ? 'rgba(10, 10, 10, 0.92)'
              : 'rgba(10, 10, 10, 0)',
          borderBottomColor:
            scrolled || mobileOpen
              ? 'rgba(31, 41, 55, 1)'
              : 'rgba(31, 41, 55, 0)',
          backdropFilter:
            scrolled || mobileOpen ? 'blur(12px)' : 'blur(0px)',
        }}
        style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-bold text-heading text-xl hover:text-primary transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            Jatin
          </a>

          {/* Desktop links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                isActive={activeSection === link.href.replace('#', '')}
              >
                {link.label}
              </NavLink>
            ))}
            <AvailableBadge />
          </div>

          {/* Hamburger button — visible on mobile only */}
          <button
            className={cn(
              'md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]',
              'rounded-lg outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <motion.span
              className="block w-5 h-px bg-heading rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="block w-5 h-px bg-heading rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-heading rounded-full origin-center"
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-page/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav
              className="flex flex-col items-center gap-10"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileNav}
                  className={cn(
                    'text-4xl font-heading font-bold text-heading',
                    'hover:text-accent transition-colors duration-200',
                    'outline-none focus-visible:text-accent',
                    activeSection === link.href.replace('#', '') && 'text-accent',
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.07,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{
                  duration: 0.3,
                  delay: NAV_LINKS.length * 0.07,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <AvailableBadge />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: string
  isActive?: boolean
  isAnyActive?: boolean
  index?: string
}

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 }

export function NavLink({ href, children, isActive = false, isAnyActive = false, index }: NavLinkProps) {
  const [dotMounted, setDotMounted] = useState(false)
  const [dotExiting, setDotExiting] = useState(false)
  const exitControls = useAnimation()
  const prevIsActiveRef = useRef(isActive)

  // Effect 1: react to isActive changes → set mount/exit flags
  useEffect(() => {
    const wasActive = prevIsActiveRef.current
    prevIsActiveRef.current = isActive

    if (isActive && !wasActive) {
      // Becoming active — mount dot, entry animation via initial → animate
      setDotExiting(false)
      setDotMounted(true)
    } else if (!isActive && wasActive) {
      if (isAnyActive) {
        // Switching to another link — unmount immediately so layoutId can FLIP
        setDotMounted(false)
        setDotExiting(false)
      } else {
        // Returning to Hero — set flag; Effect 2 runs the animation after commit
        setDotExiting(true)
      }
    }
  }, [isActive, isAnyActive])

  // Effect 2: fires after React commits dotExiting=true (so animate=exitControls is live)
  useEffect(() => {
    if (!dotExiting) return
    exitControls
      .start({
        y: 8,
        opacity: 0,
        transition: {
          y: { type: 'spring' as const, stiffness: 500, damping: 28, mass: 0.6 },
          opacity: { duration: 0.12, ease: 'easeIn' as const },
        },
      })
      .then(() => {
        setDotMounted(false)
        setDotExiting(false)
      })
  }, [dotExiting, exitControls])

  return (
    <motion.a
      href={href}
      className={cn(
        'relative flex items-center',
        'rounded-sm outline-none select-none',
        'focus-visible:ring-2 focus-visible:ring-primary',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-page',
      )}
      whileHover="hover"
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Index — desktop only, fires orange on parent hover */}
      {index && (
        <motion.span
          className="font-mono mr-2 hidden lg:inline-block leading-none"
          style={{ fontSize: '9px', letterSpacing: '0.08em' }}
          animate={{
            color: isActive ? 'var(--color-primary)' : 'var(--color-tertiary)',
            opacity: isActive ? 1 : 0.65,
          }}
          variants={{
            hover: {
              color: 'var(--color-primary)',
              opacity: 1,
              transition: { duration: 0.12, ease: 'linear' as const },
            },
          }}
          transition={{ duration: 0.12, ease: 'linear' as const }}
          aria-hidden="true"
        >
          {index}
        </motion.span>
      )}

      {/* Label — dot anchors here */}
      <span className="relative inline-flex items-center">
        {dotMounted && (
          <motion.span
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
            layoutId="nav-active-dot"
            initial={{ y: 8, opacity: 0 }}
            animate={dotExiting ? exitControls : { y: 0, opacity: 1 }}
            transition={{
              layout: SPRING,
              y: { type: 'spring' as const, stiffness: 500, damping: 28, mass: 0.6 },
              opacity: { duration: 0.12, ease: 'easeOut' as const },
            }}
          />
        )}
        <motion.span
          className="font-heading font-medium"
          style={{ fontSize: '13px', letterSpacing: '-0.01em', color: 'var(--color-heading)' }}
          animate={{ opacity: isActive ? 1 : 0.85 }}
          variants={{
            hover: {
              opacity: 1,
              transition: { duration: 0.12, ease: 'linear' as const },
            },
          }}
          transition={{ duration: 0.12, ease: 'linear' as const }}
        >
          {children}
        </motion.span>
      </span>
    </motion.a>
  )
}

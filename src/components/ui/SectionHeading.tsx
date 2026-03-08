import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

/**
 * Section heading with scroll-reveal underline.
 * Decision #5 (Modified): scaleX 0→1 as section enters viewport, once.
 * Height 0.12em. Color primary at 70% opacity. NOT hover-triggered.
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <h2
      ref={ref}
      className={cn('relative inline-block font-heading font-bold text-heading', className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 right-0 rounded-full origin-left"
        style={{
          height: '0.12em',
          backgroundColor: 'var(--color-primary)',
          opacity: 0.7,
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </h2>
  )
}

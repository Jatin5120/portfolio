import { motion, type TargetAndTransition } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize, ButtonState } from '@/types'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  disabled?: boolean
  href?: string
  onClick?: () => void
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-on-primary font-semibold font-body',
    'hover:bg-primary-hover',
    'active:bg-primary-active',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  secondary: [
    'bg-transparent text-accent border-2 border-border font-semibold font-body',
    'hover:bg-primary hover:text-on-primary hover:border-primary',
    'active:bg-primary-active active:border-primary-active',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  ghost: [
    'bg-transparent text-heading font-medium font-body',
    'hover:text-accent hover:bg-card',
    'active:text-primary-active',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  small: 'px-4 py-2 text-sm rounded-md',
  medium: 'px-6 py-3 text-base rounded-lg',
  large: 'px-8 py-4 text-lg rounded-lg',
}

const hoverAnimation: Record<ButtonVariant, TargetAndTransition> = {
  primary: { y: -2, boxShadow: 'var(--shadow-glow-sm)' },
  secondary: { y: -2, boxShadow: 'var(--shadow-glow-sm)' },
  ghost: { y: -1 },
}

function Spinner() {
  return (
    <motion.span
      className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  state = 'idle',
  disabled,
  href,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || state === 'loading'

  const stateStyles = {
    idle: '',
    loading: 'opacity-75 cursor-not-allowed',
    success: '!bg-success !text-white cursor-default',
    error: '!bg-error !text-white cursor-default',
  }

  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    'outline-none transition-all duration-200',
    variantStyles[variant],
    sizeStyles[size],
    state !== 'idle' && stateStyles[state],
    className,
  )

  const content = () => {
    if (state === 'loading') return <><Spinner />Loading...</>
    if (state === 'success') return <>✓ Sent!</>
    if (state === 'error') return <>✗ Failed — Retry</>
    return children
  }

  if (href && state === 'idle') {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!isDisabled ? hoverAnimation[variant] : undefined}
        whileTap={!isDisabled ? { y: 0, scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {content()}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      whileHover={!isDisabled ? hoverAnimation[variant] : undefined}
      whileTap={!isDisabled ? { y: 0, scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {content()}
    </motion.button>
  )
}

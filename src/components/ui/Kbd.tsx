interface KbdProps {
  children: React.ReactNode
  className?: string
}

/** Keyboard shortcut badge — consistent styling for <kbd> elements across the app. */
export function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={`px-1.5 py-0.5 rounded bg-elevated text-secondary font-mono text-xs border border-border ${className}`}
    >
      {children}
    </kbd>
  )
}

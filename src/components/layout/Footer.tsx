import { motion } from 'framer-motion'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jatin5120', icon: 'in' },
  { label: 'X / Twitter', href: '#', icon: 'X' },
  { label: 'GitHub', href: '#', icon: 'gh' },
]

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-page mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Signature block */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-tertiary uppercase tracking-widest font-body">
              Built by
            </p>
            <p className="font-signature text-5xl lg:text-6xl text-accent leading-none">
              Jatin
            </p>
            <p className="text-xs text-tertiary font-body">
              Crafted with React, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-11 h-11 flex items-center justify-center rounded-lg font-mono text-xs font-medium text-tertiary border border-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
                whileHover={{
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary)',
                  boxShadow: 'var(--shadow-glow-sm)',
                }}
                transition={{ duration: 0.2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-subtle">
          <p className="text-xs text-tertiary text-center font-body">
            © {new Date().getFullYear()} Jatin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

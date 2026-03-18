import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

// ─── Social link icons ──────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jatin5120', Icon: LinkedInIcon },
  { label: 'Twitter', href: 'https://twitter.com/jatin5120', Icon: TwitterIcon },
  { label: 'GitHub', href: 'https://github.com/jatin5120', Icon: GitHubIcon },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
}

// ─── Contact Section ──────────────────────────────────────────────────────────

export function Contact() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 lg:py-32 px-6 lg:px-16 xl:px-24"
    >
      {/* Top gradient separator */}
      <div aria-hidden="true" className="max-w-6xl mx-auto mb-16 lg:mb-20">
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,171,0,0.25) 0%, rgba(255,255,255,0.06) 40%, transparent 100%)',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Headline */}
        <motion.div variants={itemVariants} className="mb-3">
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-heading">
            Let's build something.
          </h2>
        </motion.div>

        {/* Body */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-secondary leading-relaxed max-w-2xl mb-10"
        >
          Working on interesting problems or need someone who thinks strategically about
          mobile? Let's talk.
        </motion.p>

        {/* Email CTA */}
        <motion.div variants={itemVariants} className="mb-6">
          <a
            href="mailto:heythere.jatin@gmail.com?subject=Let's%20work%20together"
            className="group inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm"
          >
            <span className="font-mono text-lg lg:text-xl text-heading transition-colors duration-200 group-hover:text-accent">
              heythere.jatin@gmail.com
            </span>
            <span
              className="text-heading/50 text-base translate-x-0 group-hover:translate-x-1 transition-all duration-200 group-hover:text-accent"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-sm text-tertiary">Or find me on</span>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in new tab)`}
                className="group relative flex items-center gap-1.5 text-sm text-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm"
              >
                <span className="transition-colors duration-200 group-hover:text-accent">
                  <Icon />
                </span>
                <span className="transition-colors duration-200 group-hover:text-heading">
                  {label}
                </span>
                {/* Animated underline */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px left-0 h-px bg-primary/50 w-0 group-hover:w-full transition-[width] duration-300 ease-out"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EASE_OUT_EXPO } from '@/lib/motion'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jatin5120' },
  { label: 'Twitter', href: 'https://twitter.com/jatin5120' },
  { label: 'GitHub', href: 'https://github.com/jatin5120' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 lg:py-32 px-6 lg:px-16 xl:px-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="max-w-6xl mx-auto flex flex-col items-start gap-8"
      >
        {/* Section label */}
        <motion.p variants={itemVariants} className="font-mono text-xs text-tertiary uppercase tracking-widest">
          Contact
        </motion.p>

        {/* Headline */}
        <motion.div variants={itemVariants}>
          <SectionHeading className="text-4xl lg:text-5xl">
            Let's build something
          </SectionHeading>
        </motion.div>

        {/* Body */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-secondary leading-relaxed max-w-lg"
        >
          Working on interesting problems or need someone who thinks strategically about
          mobile? Let's talk.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          variants={itemVariants}
          href="mailto:contact.dev.jatin@gmail.com"
          className="
            inline-flex items-center gap-2
            bg-primary text-on-primary
            px-8 py-4 rounded-lg
            font-semibold font-body text-base
            transition-all duration-200
            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page
          "
          whileHover={{ y: -2, boxShadow: 'var(--shadow-glow-sm)' }}
          whileTap={{ y: 0, scale: 0.98 }}
        >
          Send an email →
        </motion.a>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex items-center gap-1 text-sm">
          <span className="text-tertiary mr-2">Or find me on</span>
          {SOCIAL_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center gap-1">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-secondary hover:text-accent
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded
                "
              >
                {link.label}
              </a>
              {i < SOCIAL_LINKS.length - 1 && (
                <span className="text-tertiary mx-1">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

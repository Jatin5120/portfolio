import { motion, useReducedMotion } from 'framer-motion'
import { TechTag } from '@/components/ui/TechTag'
import { workExperience } from '@/data/work-experience'
import { EASE_OUT_EXPO } from '@/lib/motion'

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
}

const metricsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const metricVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

// ─── Work Section ────────────────────────────────────────────────────────────

export function Work() {
  const prefersReduced = useReducedMotion()
  const [foyer, ...pastRoles] = workExperience

  return (
    <section
      id="work"
      aria-label="Work Experience"
      className="py-24 lg:py-32 px-6 lg:px-16 xl:px-24"
    >
      <motion.div
        variants={containerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-5% 0px' }}
        className="max-w-6xl mx-auto"
      >
        {/* Section heading */}
        <motion.div variants={itemVariants} className="mb-10 lg:mb-14">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-heading">
            The work that shaped how I build.
          </h2>
        </motion.div>

        {/* ── Foyer — current role, two-column layout ─────────────────── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-x-16 mb-16 lg:mb-20"
        >
          {/* Left column — narrative */}
          <div>
            {/* Company name + pulse */}
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="absolute w-3.5 h-3.5 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                <span className="relative w-2 h-2 rounded-full bg-primary" />
              </span>
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-heading tracking-tighter leading-none">
                {foyer.company}
              </h3>
            </div>

            {/* Role + location + date */}
            <p className="text-secondary text-base font-body mb-5">
              {foyer.role}
              {foyer.location && (
                <span className="text-tertiary"> · {foyer.location}</span>
              )}
              <span className="font-mono text-xs text-tertiary ml-3">
                {foyer.duration}
              </span>
            </p>

            {/* Tagline */}
            {foyer.tagline && (
              <p className="font-heading font-semibold text-lg lg:text-xl text-heading/85 tracking-tight leading-snug mb-5">
                {foyer.tagline}
              </p>
            )}

            {/* Description */}
            <p className="text-secondary text-[15px] leading-[1.8] max-w-[60ch] mb-8">
              {foyer.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {foyer.skills.map((skill) => (
                <TechTag key={skill}>{skill}</TechTag>
              ))}
            </div>
          </div>

          {/* Right column — metrics (proof points) */}
          {foyer.metrics && foyer.metrics.length > 0 && (
            <motion.div
              variants={prefersReduced ? undefined : metricsContainerVariants}
              className="flex flex-row lg:flex-col gap-8 lg:gap-7 lg:items-end lg:pt-1 mt-8 lg:mt-0"
            >
              {foyer.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={prefersReduced ? undefined : metricVariants}
                  className="lg:text-right"
                >
                  <span className="font-mono font-bold text-2xl lg:text-3xl text-primary leading-none block">
                    {m.value}
                  </span>
                  <p className="text-tertiary text-xs mt-1.5">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ── Separator — gradient with orange tint ────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            className="h-px"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to right, rgb(255 171 0 / 0.15) 0%, rgb(55 65 81 / 0.5) 30%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* ── Past roles — editorial rows ─────────────────────────────── */}
        {pastRoles.map((job) => {
          const metric = job.metrics?.[0]

          return (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="group py-8 lg:py-10 border-b border-subtle/30 last:border-b-0"
            >
              {/* Company + date row */}
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-heading font-semibold text-xl lg:text-2xl text-heading/75 tracking-tight leading-tight transition-colors duration-200 group-hover:text-heading">
                  {job.company}
                </h3>
                <span className="font-mono text-xs text-tertiary whitespace-nowrap">
                  {job.duration}
                </span>
              </div>

              {/* Role */}
              <p className="text-secondary text-sm mb-3">{job.role}</p>

              {/* Description + metric */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10">
                <p className="text-secondary/70 text-sm leading-relaxed flex-1 max-w-[55ch]">
                  {job.description}
                </p>
                {metric && (
                  <div className="mt-3 sm:mt-0 shrink-0">
                    <span className="font-mono font-bold text-xl text-primary/80 leading-none block">
                      {metric.value}
                    </span>
                    <p className="text-tertiary text-[11px] mt-0.5">{metric.label}</p>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {job.skills.map((skill) => (
                  <TechTag key={skill} className="text-[11px] px-2 py-0.5">{skill}</TechTag>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

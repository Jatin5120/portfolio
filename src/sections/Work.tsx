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

        {/* ── Foyer — current role, no card ──────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-14 lg:mb-20">
          {/* Company name — the visual anchor */}
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <div className="flex items-center gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-sm bg-primary shrink-0" aria-hidden="true" />
              <h3 className="font-heading font-bold text-4xl lg:text-5xl text-heading tracking-tight leading-none">
                {foyer.company}
              </h3>
            </div>
            <span className="font-mono text-xs text-primary/60 whitespace-nowrap hidden sm:block">
              {foyer.duration}
            </span>
          </div>

          {/* Role + mobile date */}
          <div className="flex items-baseline justify-between gap-4 mt-2 mb-6">
            <p className="text-secondary text-lg font-body">
              {foyer.role}
              {foyer.location && (
                <span className="text-tertiary"> · {foyer.location}</span>
              )}
            </p>
            <span className="font-mono text-xs text-primary/60 whitespace-nowrap sm:hidden">
              {foyer.duration}
            </span>
          </div>

          {/* Tagline */}
          {foyer.tagline && (
            <p className="font-heading font-semibold text-xl lg:text-2xl text-heading/85 tracking-tight leading-snug mb-5">
              {foyer.tagline}
            </p>
          )}

          {/* Description */}
          <p className="text-secondary text-[15px] leading-[1.8] max-w-[60ch] mb-6">
            {foyer.description}
          </p>

          {/* Metrics — inline, no panel */}
          {foyer.metrics && foyer.metrics.length > 0 && (
            <div className="flex flex-wrap gap-8 lg:gap-12 mb-6">
              {foyer.metrics.map((m) => (
                <div key={m.label}>
                  <span className="font-mono font-bold text-2xl lg:text-3xl text-primary leading-none block">
                    {m.value}
                  </span>
                  <p className="text-secondary text-xs mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {foyer.skills.map((skill) => (
              <TechTag key={skill}>{skill}</TechTag>
            ))}
          </div>
        </motion.div>

        {/* ── Separator ──────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="h-px bg-subtle/50" aria-hidden="true" />
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

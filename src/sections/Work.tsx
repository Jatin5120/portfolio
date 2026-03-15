import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechTag } from '@/components/ui/TechTag'
import { workExperience } from '@/data/work-experience'
import { EASE_OUT_EXPO } from '@/lib/motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

export function Work() {
  return (
    <section
      id="work"
      aria-label="Work Experience"
      className="py-24 lg:py-32 px-6 lg:px-16 max-w-5xl mx-auto"
    >
      {/* Section heading */}
      <div className="mb-16">
        <p className="font-mono text-xs text-tertiary uppercase tracking-widest mb-4">Experience</p>
        <SectionHeading className="text-3xl lg:text-4xl">Where I've worked</SectionHeading>
      </div>

      {/* Experience list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="divide-y divide-subtle"
      >
        {workExperience.map((job) => (
          <motion.article
            key={job.id}
            variants={itemVariants}
            className="py-8 first:pt-0 last:pb-0"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="font-heading font-semibold text-xl text-heading leading-tight">
                  {job.role}
                </h3>
                <p className="text-secondary text-sm mt-0.5">
                  {job.company}
                  <span className="text-tertiary mx-2">·</span>
                  {job.location}
                </p>
              </div>
              <span className="font-mono text-xs text-tertiary whitespace-nowrap sm:mt-1">
                {job.duration}
              </span>
            </div>

            {/* Description */}
            <p className="text-secondary text-sm leading-relaxed mb-4">
              {job.description}
            </p>

            {/* TechTag pills — max 5, neutral, NOT orange */}
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skill) => (
                <TechTag key={skill}>{skill}</TechTag>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

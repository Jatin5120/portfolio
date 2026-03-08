import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types'

type FilterValue = 'all' | ProjectCategory

// ─── Animation helpers ────────────────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number]
const EASE_IN = [0.4, 0, 1, 1] as [number, number, number, number]

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const cardEnter = {
  opacity: 0,
  y: 20,
}

const cardAnimate = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.3, ease: EASE_OUT },
}

const cardExit = {
  opacity: 0,
  scale: 0.95,
  transition: { duration: 0.2, ease: EASE_IN },
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 lg:py-32 px-6 lg:px-16 max-w-5xl mx-auto"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="flex flex-col gap-10"
      >
        {/* Header block */}
        <motion.div variants={childVariants} className="space-y-4">
          <p className="text-xs font-semibold font-mono text-accent uppercase tracking-widest">
            Selected Work
          </p>

          <SectionHeading className="text-4xl lg:text-5xl">Projects</SectionHeading>

          <p className="text-base text-secondary leading-relaxed max-w-xl">
            Building products that solve real problems, from consumer apps to platform infrastructure.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div variants={childVariants}>
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {/* Card grid */}
        <motion.div variants={childVariants}>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={project.id}
                  initial={cardEnter}
                  animate={cardAnimate}
                  exit={cardExit}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

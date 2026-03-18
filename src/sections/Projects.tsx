import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types'
import { EASE_OUT_EXPO, EASE_IN } from '@/lib/motion'

type FilterValue = 'all' | ProjectCategory

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}

const rowEnter = { opacity: 0, x: 8 }
const rowAnimate = {
  opacity: 1,
  x: 0,
  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
}
const rowExit = {
  opacity: 0,
  x: -8,
  transition: { duration: 0.15, ease: EASE_IN },
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export function Projects() {
  const prefersReduced = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  // Build global index map so numbers stay stable across filters
  const globalIndex = new Map(projects.map((p, i) => [p.id, i + 1]))

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 lg:py-32 px-6 lg:px-16 xl:px-24"
    >
      <motion.div
        variants={sectionVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-5% 0px' }}
        className="max-w-6xl mx-auto"
      >
        {/* Section heading */}
        <motion.div variants={childVariants} className="mb-10 lg:mb-14">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-heading">
            What I've shipped.
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div variants={childVariants} className="mb-2">
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {/* Separator below filters */}
        <motion.div variants={childVariants}>
          <div className="h-px bg-subtle/50" aria-hidden="true" />
        </motion.div>

        {/* Project rows */}
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => {
            const idx = globalIndex.get(project.id) ?? 0
            const idxStr = String(idx).padStart(2, '0')
            const hasLink = Boolean(project.ctaLink && project.ctaLink !== '#')
            const isLive = project.status === 'live'
            const isLaunching = project.status === 'launching-soon'

            return (
              <motion.div
                key={project.id}
                layoutId={project.id}
                initial={rowEnter}
                animate={rowAnimate}
                exit={rowExit}
                className="group border-b border-subtle/30 last:border-b-0"
              >
                {hasLink ? (
                  <a
                    href={project.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-6 lg:py-8 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm"
                  >
                    <ProjectRowContent
                      idxStr={idxStr}
                      project={project}
                      isLive={isLive}
                      isLaunching={isLaunching}
                      hasLink={hasLink}
                    />
                  </a>
                ) : (
                  <div className="py-6 lg:py-8">
                    <ProjectRowContent
                      idxStr={idxStr}
                      project={project}
                      isLive={isLive}
                      isLaunching={isLaunching}
                      hasLink={hasLink}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// ─── Row content (shared between link and non-link variants) ──────────────────

interface ProjectRowContentProps {
  idxStr: string
  project: (typeof projects)[number]
  isLive: boolean
  isLaunching: boolean
  hasLink: boolean
}

function ProjectRowContent({
  idxStr,
  project,
  isLive,
  isLaunching,
  hasLink,
}: ProjectRowContentProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Top row: index + title + status + tech + arrow */}
      <div className="flex items-baseline gap-4 lg:gap-6">
        {/* Index */}
        <span className="font-mono text-xs text-tertiary transition-colors duration-200 group-hover:text-primary shrink-0 tabular-nums w-6">
          {idxStr}
        </span>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl lg:text-2xl text-heading/80 tracking-tight leading-tight transition-colors duration-200 group-hover:text-heading flex-1 min-w-0">
          {project.title}
        </h3>

        {/* Status dot */}
        {(isLive || isLaunching) && (
          <span
            className={`shrink-0 w-1.5 h-1.5 rounded-full hidden sm:block ${
              isLive ? 'bg-success' : 'bg-primary/60'
            }`}
            aria-label={isLive ? 'Live' : 'Launching soon'}
            role="img"
          />
        )}

        {/* Tech stack — desktop only */}
        <span className="font-mono text-xs text-tertiary whitespace-nowrap hidden lg:block shrink-0 max-w-[280px] truncate">
          {project.techStack.slice(0, 3).join(' · ')}
        </span>

        {/* Arrow — appears on hover for linked projects */}
        {hasLink && (
          <span
            className="font-mono text-sm text-tertiary opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary shrink-0 hidden sm:block"
            aria-hidden="true"
          >
            →
          </span>
        )}
      </div>

      {/* Bottom row: tagline + tech (mobile) */}
      <div className="flex items-baseline gap-4 lg:gap-6">
        <span className="w-6 shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-secondary/60 text-sm leading-relaxed line-clamp-1 lg:line-clamp-none">
            {project.tagline}
          </p>
          {/* Tech stack — mobile only */}
          <p className="font-mono text-xs text-tertiary/60 mt-1.5 lg:hidden">
            {project.techStack.slice(0, 3).join(' · ')}
          </p>
        </div>
      </div>
    </div>
  )
}

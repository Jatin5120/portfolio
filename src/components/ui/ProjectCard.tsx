import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatusBadge, TechTag } from './Badge'
import { Button } from './Button'
import type { Project } from '@/types'

// ─── Image placeholder (used when no real image provided) ─────────────────────

function ImagePlaceholder({ title }: { title: string }) {
  const initial = title.charAt(0).toUpperCase()
  return (
    <div className="w-full h-full bg-elevated flex flex-col items-center justify-center gap-3 relative overflow-hidden select-none">
      {/* Large decorative initial */}
      <span
        className="font-heading font-bold text-heading/[0.06] leading-none absolute"
        style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}
        aria-hidden="true"
      >
        {initial}
      </span>
      {/* Project title */}
      <span className="font-mono text-xs text-tertiary uppercase tracking-widest z-10">
        {title}
      </span>
    </div>
  )
}

function ImageWithFallback({ src, alt, title }: { src?: string; alt: string; title: string }) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return <ImagePlaceholder title={title} />
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}

// ─── Standard Project Card ────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (featured) return <FeaturedProjectCard project={project} />

  return (
    <motion.article
      className="group bg-card border border-subtle rounded-xl overflow-hidden"
      whileHover={{
        y: -4,
        borderColor: 'var(--color-primary)',
        boxShadow: 'var(--shadow-glow-sm)',
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-page">
        <ImageWithFallback src={project.image} alt={project.title} title={project.title} />
        {project.status && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest font-body">
          {project.tagline}
        </p>

        <h3 className="text-xl font-bold font-heading text-heading leading-tight">
          {project.title}
        </h3>

        <p className="text-base text-secondary leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        <div className="pt-1">
          <Button variant="primary" size="small" href={project.ctaLink}>
            {project.ctaText} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Featured (full-width, side-by-side on desktop) ──────────────────────────

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group bg-card border border-subtle rounded-xl overflow-hidden lg:grid lg:grid-cols-2"
      whileHover={{
        y: -4,
        borderColor: 'var(--color-primary)',
        boxShadow: 'var(--shadow-glow-sm)',
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Image */}
      <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-page min-h-64">
        <ImageWithFallback src={project.image} alt={project.title} title={project.title} />
        {project.status && (
          <div className="absolute top-4 right-4">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 lg:p-12 flex flex-col justify-center space-y-5">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest font-body">
          {project.tagline}
        </p>

        <h3 className="text-3xl font-bold font-heading text-heading leading-tight">
          {project.title}
        </h3>

        <p className="text-base text-secondary leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        <div className="pt-2">
          <Button variant="primary" size="large" href={project.ctaLink}>
            {project.ctaText} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function ProjectCardSkeleton() {
  return (
    <article className="bg-card border border-subtle rounded-xl overflow-hidden">
      <div className="aspect-video skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <div className="h-3 skeleton-shimmer rounded w-1/3" />
        <div className="h-5 skeleton-shimmer rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 skeleton-shimmer rounded" />
          <div className="h-4 skeleton-shimmer rounded w-5/6" />
          <div className="h-4 skeleton-shimmer rounded w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 skeleton-shimmer rounded w-16" />
          <div className="h-6 skeleton-shimmer rounded w-20" />
          <div className="h-6 skeleton-shimmer rounded w-14" />
        </div>
        <div className="h-9 skeleton-shimmer rounded w-28 mt-2" />
      </div>
    </article>
  )
}

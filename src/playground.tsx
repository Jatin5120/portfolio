/**
 * Component Playground
 * Design review page — shows every component with all variants and states.
 * This file is temporary and will be replaced by the real App once approved.
 */

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusBadge, TechTag, AvailableBadge } from '@/components/ui/Badge'
import { NavLink } from '@/components/ui/NavLink'
import { ProjectCard, ProjectCardSkeleton } from '@/components/ui/ProjectCard'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { ButtonState, Project } from '@/types'

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_PROJECT: Project = {
  id: 'thine',
  title: 'Thine',
  tagline: 'The iOS Audio Recording Challenge That Seemed Impossible',
  description:
    "Building 24x7 audio recording on iOS isn't just hard — it's a battle with the platform itself. iOS kills background audio for battery reasons. I spent 2-3 months rewriting this feature three times. The result: 24x7 recording that uses only 3-4% battery per hour.",
  techStack: ['Swift', 'Objective-C', 'Background Audio', 'Battery Optimization'],
  status: 'launching-soon',
  ctaText: 'View Project',
  ctaLink: '#',
  category: 'ai',
}

const SAMPLE_PROJECT_LIVE: Project = {
  id: 'merlin',
  title: 'Merlin AI',
  tagline: 'AI-Powered Mobile Product',
  description:
    "Consumer AI product that needed to feel fast, smart, and reliable across iOS and Android. The challenge wasn't just integrating AI — it was making the experience feel instant even on slow connections.",
  techStack: ['Flutter', 'AI Integration', 'Offline-first'],
  status: 'live',
  ctaText: 'View Project',
  ctaLink: '#',
  category: 'ai',
}

const SAMPLE_PROJECT_NO_BADGE: Project = {
  id: 'foyer',
  title: 'Foyer',
  tagline: 'Mobile Lead — Fintech Platform',
  description:
    'Led mobile engineering at Foyer, building cross-platform features for a fintech product used by thousands of users across India. Focused on performance, reliability, and shipping on time.',
  techStack: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
  ctaText: 'View Project',
  ctaLink: '#',
  category: 'apps',
}

// ─── Playground helpers ───────────────────────────────────────────────────────

function PGSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-xs font-semibold text-tertiary uppercase tracking-widest font-mono border-b border-subtle pb-3">
        {title}
      </h2>
      {children}
    </section>
  )
}

function PGCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-subtle rounded-xl p-6 space-y-4">
      {title && (
        <p className="text-xs text-tertiary font-mono mb-2">{title}</p>
      )}
      {children}
    </div>
  )
}

function PGRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs text-tertiary font-mono">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function ButtonSection() {
  const [loadingState, setLoadingState] = useState<ButtonState>('idle')

  const simulateLoad = () => {
    setLoadingState('loading')
    setTimeout(() => {
      setLoadingState('success')
      setTimeout(() => setLoadingState('idle'), 2000)
    }, 2000)
  }

  return (
    <PGSection title="01 — Buttons">
      {/* Primary */}
      <PGCard title="Primary button">
        <PGRow label="Sizes">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </PGRow>
        <PGRow label="States (hover to see lift + glow)">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button state="loading">Trigger Loading</Button>
          <Button state="success">Success</Button>
          <Button state="error">Error</Button>
        </PGRow>
        <PGRow label="Live loading cycle (click me)">
          <Button state={loadingState} onClick={loadingState === 'idle' ? simulateLoad : undefined}>
            {loadingState === 'idle' ? 'Send Message' : 'Send Message'}
          </Button>
        </PGRow>
      </PGCard>

      {/* Secondary */}
      <PGCard title="Secondary button (outlined)">
        <PGRow label="Sizes">
          <Button variant="secondary" size="small">Small</Button>
          <Button variant="secondary" size="medium">Medium</Button>
          <Button variant="secondary" size="large">Large</Button>
        </PGRow>
        <PGRow label="States">
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="secondary" state="loading">Loading</Button>
        </PGRow>
      </PGCard>

      {/* Ghost */}
      <PGCard title="Ghost button (text only)">
        <PGRow label="Sizes">
          <Button variant="ghost" size="small">Small</Button>
          <Button variant="ghost" size="medium">Medium</Button>
          <Button variant="ghost" size="large">Large</Button>
        </PGRow>
        <PGRow label="States">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </PGRow>
      </PGCard>

      {/* Focus */}
      <PGCard title="Focus state (tab to reach)">
        <PGRow>
          <Button>Tab to me</Button>
          <Button variant="secondary">Or me</Button>
          <Button variant="ghost">Or me</Button>
        </PGRow>
        <p className="text-xs text-tertiary font-mono">
          Press Tab — orange ring should appear on the focused button
        </p>
      </PGCard>
    </PGSection>
  )
}

function BadgeSection() {
  return (
    <PGSection title="02 — Badges & Tags">
      <PGCard title="Status badges">
        <PGRow label="Live (pulsing dot)">
          <StatusBadge status="live" />
          <StatusBadge status="live" text="Live on App Store & Play Store" />
        </PGRow>
        <PGRow label="Launching soon">
          <StatusBadge status="launching-soon" />
          <StatusBadge status="launching-soon" text="Coming Q1 2026" />
        </PGRow>
      </PGCard>

      <PGCard title="Tech stack tags">
        <PGRow>
          <TechTag>Flutter</TechTag>
          <TechTag>Swift</TechTag>
          <TechTag>Objective-C</TechTag>
          <TechTag>React</TechTag>
          <TechTag>TypeScript</TechTag>
          <TechTag>Firebase</TechTag>
          <TechTag>AI Integration</TechTag>
          <TechTag>Background Audio</TechTag>
        </PGRow>
      </PGCard>

      <PGCard title="Available badge (nav)">
        <PGRow>
          <AvailableBadge />
        </PGRow>
      </PGCard>
    </PGSection>
  )
}

function TypographySection() {
  return (
    <PGSection title="03 — Typography">
      <PGCard>
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Hero — Cabinet Grotesk 700, ~76px desktop</p>
            <p className="font-heading font-bold text-heading leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)' }}>
              Hey, I'm Jatin — Mobile Lead
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">H1 / Section — Cabinet Grotesk 700, ~57px desktop</p>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-heading leading-tight tracking-tight">
              Work
            </h1>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">H2 / Subsection — Cabinet Grotesk 700, ~43px desktop</p>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-heading leading-tight tracking-tight">
              About Me
            </h2>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">H3 / Card heading — Cabinet Grotesk 700, ~32px desktop</p>
            <h3 className="text-2xl lg:text-3xl font-bold font-heading text-heading leading-snug">
              Thine
            </h3>
          </div>

          <div className="h-px bg-subtle" />

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Body — Inter 400, 16px mobile / 18px desktop</p>
            <p className="text-base font-body text-secondary leading-relaxed max-w-prose">
              Building 24x7 audio recording on iOS isn't just hard — it's a battle with the platform itself.
              iOS kills background audio for battery reasons. I spent 2–3 months rewriting this feature three times.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Body large — Inter 400, 20px / 24px</p>
            <p className="text-lg font-body text-secondary leading-relaxed max-w-prose">
              Mobile Lead with 5+ years building Flutter, Swift, and AI products that scale.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Code / Mono — JetBrains Mono 400, 14px</p>
            <pre className="text-sm font-mono text-accent bg-page/80 rounded-lg p-4 border border-subtle">
{`mobile_lead Jatin {
  ships_products: true
  values: ["impact", "craft", "curiosity"]
  battery_usage: "3-4% per hour"  // not a typo
}`}
            </pre>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Signature — Ms Madi 400 (footer ONLY)</p>
            <p className="font-signature text-5xl text-accent leading-none">Jatin</p>
          </div>

          <div className="h-px bg-subtle" />

          <div className="space-y-1">
            <p className="text-xs text-tertiary font-mono">Text colours</p>
            <div className="flex flex-wrap gap-4 text-sm font-body">
              <span className="text-heading">text-heading #F3F4F6</span>
              <span className="text-secondary">text-secondary #9CA3AF</span>
              <span className="text-tertiary">text-tertiary #6B7280</span>
              <span className="text-accent">text-accent #FFAB00</span>
            </div>
          </div>
        </div>
      </PGCard>
    </PGSection>
  )
}

function ProjectCardSection() {
  return (
    <PGSection title="04 — Project Cards">
      {/* Featured */}
      <div className="space-y-2">
        <p className="text-xs text-tertiary font-mono">Featured card (full-width, side-by-side on desktop)</p>
        <ProjectCard project={SAMPLE_PROJECT} featured />
      </div>

      {/* Standard grid */}
      <div className="space-y-2">
        <p className="text-xs text-tertiary font-mono">Standard cards — 3 variants: live / launching-soon / no badge</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCard project={SAMPLE_PROJECT_LIVE} />
          <ProjectCard project={SAMPLE_PROJECT} />
          <ProjectCard project={SAMPLE_PROJECT_NO_BADGE} />
        </div>
      </div>

      {/* Skeleton */}
      <div className="space-y-2">
        <p className="text-xs text-tertiary font-mono">Loading skeleton (shimmer animation)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </PGSection>
  )
}

function NavigationSection() {
  return (
    <PGSection title="05 — Navigation Links">
      <PGCard title="Nav links — hover to see underline slide in">
        <PGRow label="Default (inactive)">
          <NavLink href="#">Work</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Contact</NavLink>
        </PGRow>
        <PGRow label="Active (current page)">
          <NavLink href="#" isActive>Work</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Contact</NavLink>
        </PGRow>
      </PGCard>

      <div className="space-y-2">
        <p className="text-xs text-tertiary font-mono">Full header preview (transparent — before scroll)</p>
        <div className="relative h-20 bg-page border border-subtle rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <Header />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-tertiary font-mono">Full header preview (scrolled state — with blur bg)</p>
        <div className="relative h-20 rounded-xl overflow-hidden">
          <Header forceScrolled />
        </div>
      </div>
    </PGSection>
  )
}

function FooterSection() {
  return (
    <PGSection title="06 — Footer">
      <p className="text-xs text-tertiary font-mono">
        Full-width footer — hover social icons to see orange glow
      </p>
      <div className="rounded-xl overflow-hidden border border-subtle">
        <Footer />
      </div>
    </PGSection>
  )
}

function ColorSection() {
  const swatches = [
    { label: 'page', hex: '#0A0A0A', tw: 'bg-page' },
    { label: 'card', hex: '#161A22', tw: 'bg-card' },
    { label: 'elevated', hex: '#1F2937', tw: 'bg-elevated' },
    { label: 'primary', hex: '#FFAB00', tw: 'bg-primary' },
    { label: 'primary-hover', hex: '#FF9500', tw: 'bg-primary-hover' },
    { label: 'primary-active', hex: '#E68A00', tw: 'bg-primary-active' },
    { label: 'heading', hex: '#F3F4F6', tw: 'bg-heading' },
    { label: 'secondary', hex: '#9CA3AF', tw: 'bg-secondary' },
    { label: 'tertiary', hex: '#6B7280', tw: 'bg-tertiary' },
    { label: 'subtle', hex: '#1F2937', tw: 'bg-subtle' },
    { label: 'border', hex: '#374151', tw: 'bg-border' },
  ]

  return (
    <PGSection title="07 — Color System">
      <PGCard title="All semantic tokens">
        <div className="flex flex-wrap gap-3">
          {swatches.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-12 h-12 rounded-lg border border-subtle ${s.tw}`}
              />
              <p className="text-xs text-tertiary font-mono text-center leading-tight">
                {s.label}
                <br />
                <span className="text-[10px]">{s.hex}</span>
              </p>
            </div>
          ))}
        </div>
      </PGCard>
    </PGSection>
  )
}

// ─── Playground root ──────────────────────────────────────────────────────────

export default function Playground() {
  return (
    <div className="min-h-screen bg-page">
      {/* Playground header bar */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-subtle">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest font-mono">
              Component Playground
            </p>
            <p className="text-xs text-tertiary font-mono">Design review — not for production</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-tertiary font-mono">Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <ButtonSection />
        <BadgeSection />
        <TypographySection />
        <ProjectCardSection />
        <NavigationSection />
        <FooterSection />
        <ColorSection />
      </main>
    </div>
  )
}

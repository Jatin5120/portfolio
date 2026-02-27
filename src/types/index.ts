export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  image?: string
  techStack: string[]
  status?: 'live' | 'launching-soon'
  ctaText: string
  ctaLink: string
}

export interface AboutNode {
  id: string
  content: string
  year?: string
  emoji?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonState = 'idle' | 'loading' | 'success' | 'error'

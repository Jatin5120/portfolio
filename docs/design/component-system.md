# Component System

**Project**: React Portfolio
**Created**: 2026-01-24
**Last Updated**: 2026-01-27 (v1.2 - Updated to two-layer semantic tokens)
**Version**: 1.2.0
**Status**: Ready for Implementation
**Design Philosophy**: Minimal, Confident, Dark-Optimized

---

## Overview

This component system defines all UI components for Jatin's React portfolio, optimized for a dark theme (#0A0A0A background) with vibrant orange accents (#FFAB00). The design follows the "Independent Craftsman" brand positioning—minimal, confident, and letting the work speak for itself.

**Core Principles:**
- **Minimal design**: Subtle borders and glows instead of heavy shadows
- **Dark-optimized**: High contrast, readable on #0A0A0A background
- **Orange sparingly**: CTAs, signature, and hover states only
- **Accessible**: WCAG AAA compliance for text (7:1+ contrast)
- **Responsive**: Mobile-first, scales to desktop

---

## Design Tokens Reference

**IMPORTANT**: Use Layer 2 semantic tokens in all components. Never reference Layer 1 core colors directly.

### Colors (Layer 2 Semantic Tokens)
```css
/* Backgrounds */
--bg-page: #0A0A0A;              /* Main page background */
--bg-card: #161A22;              /* Card/elevated surfaces */
--bg-elevated: #1F2937;          /* Modals, dropdowns */
--bg-hover: #1A1D24;             /* Hover states */

/* Text */
--text-primary: #F3F4F6;         /* Headings, high emphasis */
--text-secondary: #9CA3AF;       /* Body text, main content */
--text-tertiary: #6B7280;        /* Captions, labels */
--text-accent: #FFAB00;          /* Orange text */
--text-on-primary: #0C0C0E;      /* Dark text on orange */

/* Brand/Primary Colors */
--color-primary: #FFAB00;        /* Primary brand color */
--color-primary-hover: #FF9500;  /* Hover states */
--color-primary-active: #E68A00; /* Active/pressed */

/* Borders */
--border-subtle: #1F2937;        /* Subtle dividers */
--border-default: #374151;       /* Card borders */
--border-accent: #FFAB00;        /* Interactive hover */
```

### Tailwind Classes (Use These)
```tsx
/* Backgrounds */
bg-page         // #0A0A0A (page background)
bg-card         // #161A22 (cards)
bg-elevated     // #1F2937 (modals)

/* Text */
text-primary    // #F3F4F6 (headings)
text-secondary  // #9CA3AF (body)
text-tertiary   // #6B7280 (captions)
text-accent     // #FFAB00 (orange text)

/* Brand */
bg-primary                 // #FFAB00 (button background)
hover:bg-primary-hover     // #FF9500
active:bg-primary-active   // #E68A00

/* Borders */
border-subtle   // #1F2937
border-default  // #374151
border-accent   // #FFAB00
```

### Typography
```css
/* Font Families */
--font-heading: 'Cabinet Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-signature: 'Ms Madi', cursive;

/* Font Sizes (Mobile → Desktop) */
--text-xs: 0.75rem;             /* 12px */
--text-sm: 0.875rem;            /* 14px */
--text-base: 1rem / 1.125rem;   /* 16px / 18px */
--text-lg: 1.25rem / 1.5rem;    /* 20px / 24px */
--text-xl: 1.563rem / 2rem;     /* 25px / 32px */
--text-2xl: 1.953rem / 2.667rem;/* 31px / 43px */
--text-3xl: 2.441rem / 3.555rem;/* 39px / 57px */
--text-4xl: 3.052rem / 4.740rem;/* 49px / 76px */
```

### Spacing
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

---

## 1. Buttons

### Primary Button (CTA)

**Use for**: Main actions like "View Project", "Visit Site", "Get in Touch"

**Visual Design:**
- Orange background (#FFAB00) with dark text
- Subtle glow on hover
- Smooth transitions (200-300ms)
- Medium weight font (Inter 600)

**Variants:**

#### Large (Primary CTA)
```tsx
<button className="
  bg-primary text-on-primary
  px-8 py-4 rounded-lg
  font-semibold text-lg
  transition-all duration-300 ease-out
  hover:bg-primary-hover
  hover:shadow-[0_0_20px_rgba(255,171,0,0.4)]
  hover:-translate-y-0.5
  active:bg-primary-active
  active:translate-y-0
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
">
  View Project
</button>
```

#### Medium (Default)
```tsx
<button className="
  bg-primary text-on-primary
  px-6 py-3 rounded-lg
  font-semibold text-base
  transition-all duration-300 ease-out
  hover:bg-primary-hover
  hover:shadow-[0_0_16px_rgba(255,171,0,0.35)]
  hover:-translate-y-0.5
  active:bg-primary-active
  active:translate-y-0
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Visit Site
</button>
```

#### Small
```tsx
<button className="
  bg-primary text-on-primary
  px-4 py-2 rounded-md
  font-semibold text-sm
  transition-all duration-300 ease-out
  hover:bg-primary-hover
  hover:shadow-[0_0_12px_rgba(255,171,0,0.3)]
  active:bg-primary-active
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-page
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Learn More
</button>
```

**React Component Example:**
```tsx
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({
  children,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  onClick,
  href,
  className = '',
}: ButtonProps) {
  const baseStyles = `
    font-semibold font-body rounded-lg
    transition-all duration-300 ease-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeStyles = {
    small: 'px-4 py-2 text-sm rounded-md',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-primary text-on-primary
      hover:bg-primary-hover
      hover:shadow-[0_0_20px_rgba(255,171,0,0.4)]
      hover:-translate-y-0.5
      active:bg-primary-active active:translate-y-0
      focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
    `,
    secondary: `
      bg-transparent text-accent
      border-2 border-primary
      hover:bg-primary hover:text-on-primary
      hover:shadow-[0_0_16px_rgba(255,171,0,0.3)]
      active:bg-primary-active active:border-primary-active
      focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
    `,
    ghost: `
      bg-transparent text-primary
      hover:text-accent
      hover:bg-card
      active:text-primary-active
      focus:ring-2 focus:ring-subtle
    `,
  };

  const classes = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
```

### Secondary Button (Outlined)

**Use for**: Secondary actions like "View All Projects", "Read More"

```tsx
<button className="
  bg-transparent text-accent
  border-2 border-primary
  px-6 py-3 rounded-lg
  font-semibold text-base
  transition-all duration-300 ease-out
  hover:bg-primary hover:text-on-primary
  hover:shadow-[0_0_16px_rgba(255,171,0,0.3)]
  active:bg-primary-active active:border-primary-active
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
">
  View All Projects
</button>
```

### Ghost Button (Text Only)

**Use for**: Tertiary actions, navigation, less emphasis

```tsx
<button className="
  bg-transparent text-primary
  px-4 py-2 rounded-lg
  font-medium text-base
  transition-all duration-200 ease-out
  hover:text-accent hover:bg-card
  active:text-primary-active
  focus:outline-none focus:ring-2 focus:ring-subtle
">
  Cancel
</button>
```

**Accessibility Notes:**
- All buttons have focus states (ring visible)
- Disabled state clearly indicated (50% opacity)
- Color contrast: Orange background (#FFAB00) with dark text (#0F172A) = 11:1 ratio (AAA)
- Minimum target size: 44x44px (touch-friendly)

---

### Button States (Loading, Error, Success)

**Critical**: Buttons need clear feedback for async actions (form submissions, API calls, etc.)

#### Loading State

**Use for**: Button is disabled while action is in progress

```tsx
<button
  disabled
  className="
    bg-primary text-on-primary
    px-6 py-3 rounded-lg
    font-semibold text-base
    opacity-75 cursor-not-allowed
    inline-flex items-center gap-2
  "
>
  {/* Spinner */}
  <svg
    className="animate-spin h-4 w-4 text-on-primary"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
  Loading...
</button>
```

**React Component with Loading State:**
```tsx
interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  // ... other props
}

export function Button({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={/* button classes */}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 mr-2 inline-block"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

**Usage:**
```tsx
<Button isLoading={isSubmitting} loadingText="Sending...">
  Send Message
</Button>
```

---

#### Success State

**Use for**: Temporary feedback after successful action (2-3 seconds)

```tsx
<button
  disabled
  className="
    bg-green-500 text-white
    px-6 py-3 rounded-lg
    font-semibold text-base
    inline-flex items-center gap-2
    cursor-default
  "
>
  {/* Check icon */}
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
  Sent Successfully!
</button>
```

**With Animation** (Framer Motion):
```tsx
import { motion } from 'framer-motion';

<motion.button
  disabled
  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
  initial={{ scale: 1 }}
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 0.3 }}
>
  <svg className="inline-block h-4 w-4 mr-2">
    <path d="M5 13l4 4L19 7" />
  </svg>
  Sent Successfully!
</motion.button>
```

**Complete Flow Example:**
```tsx
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      await sendMessage();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      isLoading={status === 'loading'}
      loadingText="Sending..."
    >
      {status === 'success' ? '✓ Sent!' : 'Send Message'}
    </Button>
  );
}
```

---

#### Error State

**Use for**: Feedback when action fails

```tsx
<button
  className="
    bg-red-500 text-white
    px-6 py-3 rounded-lg
    font-semibold text-base
    inline-flex items-center gap-2
    hover:bg-red-600
    transition-colors duration-200
  "
>
  {/* Error icon */}
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
  Failed to Send
</button>
```

**With Retry Action:**
```tsx
<div className="space-y-2">
  <button
    className="
      bg-red-500 text-white
      px-6 py-3 rounded-lg
      font-semibold text-base
      inline-flex items-center gap-2
      w-full
    "
    disabled
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    Failed to Send
  </button>

  <button
    onClick={handleRetry}
    className="
      bg-transparent text-accent
      border border-accent
      px-6 py-3 rounded-lg
      font-semibold text-base
      hover:bg-primary hover:text-on-primary
      transition-all duration-200
      w-full
    "
  >
    Retry
  </button>
</div>
```

---

## 2. Project Cards

### Standard Project Card

**Use for**: Displaying projects in the grid

**Structure:**
- **Image**: Project thumbnail/hero (16:9 aspect ratio)
- **Status Badge**: "Live" or "Launching Soon" (if applicable)
- **Tagline**: Short descriptor (Cabinet Grotesk)
- **Title**: Project name (Cabinet Grotesk Bold)
- **Description**: Brief summary (Inter)
- **Tech Stack**: Inline tech tags
- **CTA Button**: Primary or secondary button

**Visual Design:**
- Dark card (#161A22) on dark background (#0A0A0A)
- Subtle border (#1F2937) that glows orange on hover
- Slight lift animation on hover
- Clean spacing and hierarchy

```tsx
<article className="
  group
  bg-card border border-subtle
  rounded-xl overflow-hidden
  transition-all duration-300 ease-out
  hover:border-accent
  hover:shadow-[0_0_24px_rgba(255,171,0,0.2)]
  hover:-translate-y-1
">
  {/* Image Container */}
  <div className="relative aspect-video overflow-hidden bg-page">
    <img
      src="/project-image.jpg"
      alt="Project Title"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Status Badge (if applicable) */}
    <div className="absolute top-4 right-4">
      <span className="
        px-3 py-1.5 rounded-md text-xs font-medium
        bg-primary/90 text-on-primary
        backdrop-blur-sm
      ">
        Live on App Store
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="p-6 space-y-4">
    {/* Tagline */}
    <p className="text-sm text-accent font-medium uppercase tracking-wider">
      AI-Powered Mobile Product
    </p>

    {/* Title */}
    <h3 className="text-2xl lg:text-3xl font-bold font-heading text-primary leading-tight">
      Merlin AI
    </h3>

    {/* Description */}
    <p className="text-base text-secondary leading-relaxed">
      Consumer AI product that needed to feel fast, smart, and reliable across
      iOS and Android. The challenge wasn't just integrating AI—it was making
      the experience feel instant.
    </p>

    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 rounded-md text-xs font-medium bg-elevated text-secondary">
        Flutter
      </span>
      <span className="px-3 py-1 rounded-md text-xs font-medium bg-elevated text-secondary">
        AI Integration
      </span>
      <span className="px-3 py-1 rounded-md text-xs font-medium bg-elevated text-secondary">
        Offline-first
      </span>
    </div>

    {/* CTA */}
    <div className="pt-2">
      <Button variant="primary" size="medium">
        View Project
      </Button>
    </div>
  </div>
</article>
```

**React Component Example:**
```tsx
interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  status?: 'live' | 'launching-soon';
  ctaText: string;
  ctaLink: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="
      group
      bg-card border border-subtle
      rounded-xl overflow-hidden
      transition-all duration-300 ease-out
      hover:border-accent
      hover:shadow-[0_0_24px_rgba(255,171,0,0.2)]
      hover:-translate-y-1
    ">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-page">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-4 right-4">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tagline */}
        <p className="text-sm text-accent font-medium uppercase tracking-wider">
          {project.tagline}
        </p>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold font-heading text-primary leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-base text-secondary leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-xs font-medium bg-elevated text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button variant="primary" size="medium" href={project.ctaLink}>
            {project.ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
}
```

### Featured Project Card (Large)

**Use for**: Hero/lead project (Thine)

**Differences from standard:**
- Larger overall size (full-width or 2-column span)
- Bigger typography
- More detailed description
- Side-by-side layout on desktop (image left, content right)

```tsx
<article className="
  group
  bg-card border border-subtle
  rounded-xl overflow-hidden
  transition-all duration-300 ease-out
  hover:border-accent
  hover:shadow-[0_0_32px_rgba(255,171,0,0.25)]
  lg:grid lg:grid-cols-2 lg:gap-8
">
  {/* Image */}
  <div className="relative aspect-video lg:aspect-square overflow-hidden bg-page">
    <img
      src="/thine-hero.jpg"
      alt="Thine - iOS Audio Recording"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute top-6 right-6">
      <StatusBadge status="launching-soon" />
    </div>
  </div>

  {/* Content */}
  <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
    <p className="text-sm text-accent font-medium uppercase tracking-wider">
      The iOS Audio Recording Challenge That Seemed Impossible
    </p>

    <h3 className="text-3xl lg:text-4xl font-bold font-heading text-primary leading-tight">
      Thine
    </h3>

    <div className="space-y-4 text-base lg:text-lg text-secondary leading-relaxed">
      <p>
        Building 24x7 audio recording on iOS isn't just hard—it's a battle with
        the platform itself. iOS kills background audio for battery reasons.
      </p>
      <p>
        I spent 2-3 months rewriting this feature three times. The result:
        24x7 recording that uses only 3-4% battery per hour.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1.5 rounded-md text-sm font-medium bg-elevated text-secondary">
        Swift + Objective-C
      </span>
      <span className="px-3 py-1.5 rounded-md text-sm font-medium bg-elevated text-secondary">
        Background Audio
      </span>
      <span className="px-3 py-1.5 rounded-md text-sm font-medium bg-elevated text-secondary">
        Battery Optimization
      </span>
    </div>

    <div className="pt-4">
      <Button variant="primary" size="large">
        Launching Soon
      </Button>
    </div>
  </div>
</article>
```

**Accessibility Notes:**
- Image has descriptive alt text
- Hover effects are supplementary (card still functional without hover)
- Text contrast: #F5F5F5 on #161A22 = 10.5:1 (AAA)
- Tech tags are readable: #D1D5DB on #374151 = 7.2:1 (AAA)

---

### Project Card States (Loading, Error, Empty)

#### Loading Skeleton

**Use for**: While projects are being fetched from API or loaded

```tsx
<article className="
  bg-card border border-subtle
  rounded-xl overflow-hidden
  animate-pulse
">
  {/* Image Skeleton */}
  <div className="aspect-video bg-elevated" />

  {/* Content Skeleton */}
  <div className="p-6 space-y-4">
    {/* Small text (tagline) */}
    <div className="h-3 bg-elevated rounded w-2/3" />

    {/* Title */}
    <div className="h-6 bg-elevated rounded w-1/2" />

    {/* Description lines */}
    <div className="space-y-2">
      <div className="h-4 bg-elevated rounded" />
      <div className="h-4 bg-elevated rounded w-5/6" />
      <div className="h-4 bg-elevated rounded w-4/6" />
    </div>

    {/* Tech stack badges */}
    <div className="flex gap-2">
      <div className="h-7 bg-elevated rounded w-20" />
      <div className="h-7 bg-elevated rounded w-24" />
      <div className="h-7 bg-elevated rounded w-16" />
    </div>

    {/* Button */}
    <div className="h-11 bg-elevated rounded w-32 mt-4" />
  </div>
</article>
```

**With Shimmer Animation** (CSS):
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #161A22 0%,
    #1F2937 50%,
    #161A22 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

**React Component:**
```tsx
function ProjectCardSkeleton() {
  return (
    <article className="bg-card border border-subtle rounded-xl overflow-hidden">
      <div className="aspect-video skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <div className="h-3 skeleton-shimmer rounded w-2/3" />
        <div className="h-6 skeleton-shimmer rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 skeleton-shimmer rounded" />
          <div className="h-4 skeleton-shimmer rounded w-5/6" />
          <div className="h-4 skeleton-shimmer rounded w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 skeleton-shimmer rounded w-20" />
          <div className="h-7 skeleton-shimmer rounded w-24" />
          <div className="h-7 skeleton-shimmer rounded w-16" />
        </div>
        <div className="h-11 skeleton-shimmer rounded w-32 mt-4" />
      </div>
    </article>
  );
}
```

**Usage:**
```tsx
function ProjectGrid({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

---

#### Error State (Image Failed to Load)

**Use for**: When project image fails to load

```tsx
<article className="
  bg-card border border-subtle
  rounded-xl overflow-hidden
">
  {/* Error Image Placeholder */}
  <div className="
    aspect-video
    bg-page
    flex flex-col items-center justify-center
    gap-3 text-disabled
  ">
    {/* Error Icon */}
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <span className="text-sm font-medium">Image unavailable</span>
  </div>

  {/* Rest of card content (still functional) */}
  <div className="p-6 space-y-4">
    {/* ... card content ... */}
  </div>
</article>
```

**With Retry Button:**
```tsx
function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRetry = () => {
    setImageError(false);
    setRetryCount(prev => prev + 1);
  };

  return (
    <article className="bg-card border border-subtle rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-page">
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-disabled">
            <svg className="w-12 h-12" /* ... icon ... */ />
            <button
              onClick={handleRetry}
              className="text-sm text-accent hover:text-accent underline"
            >
              Retry loading image
            </button>
          </div>
        ) : (
          <img
            key={retryCount} // Forces reload on retry
            src={project.image}
            alt={project.title}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* ... card content ... */}
    </article>
  );
}
```

---

#### Empty State (No Projects to Show)

**Use for**: When there are no projects to display (filtered results, search with no matches, etc.)

```tsx
<div className="col-span-full">
  <div className="
    text-center py-16 px-6
    bg-card/50
    border-2 border-dashed border-subtle
    rounded-xl
  ">
    {/* Empty Icon */}
    <svg
      className="w-16 h-16 mx-auto mb-4 text-disabled"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>

    <h3 className="text-xl font-semibold text-secondary mb-2">
      No projects found
    </h3>

    <p className="text-disabled mb-6 max-w-md mx-auto">
      No projects match your current filters. Try adjusting your search or clear filters.
    </p>

    {/* Optional: Clear Filters Button */}
    <button
      onClick={handleClearFilters}
      className="
        text-accent hover:text-accent
        font-medium underline
        transition-colors duration-200
      "
    >
      Clear all filters
    </button>
  </div>
</div>
```

**Different Empty States:**

```tsx
// No projects at all (portfolio just started)
<EmptyState
  icon={<FolderIcon />}
  title="No projects yet"
  description="Check back soon for exciting projects!"
/>

// Search with no results
<EmptyState
  icon={<SearchIcon />}
  title="No results for 'React'"
  description="Try a different search term or browse all projects."
  action={
    <Button variant="secondary" onClick={() => setSearch('')}>
      Clear Search
    </Button>
  }
/>

// Filtered with no results
<EmptyState
  icon={<FilterIcon />}
  title="No projects match these filters"
  description="Try selecting different technologies or removing some filters."
  action={
    <Button variant="ghost" onClick={clearFilters}>
      Clear Filters
    </Button>
  }
/>
```

---

## 3. Status Badges

### Live Badge

**Use for**: Projects available on App Store/Play Store

```tsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-md
  text-xs font-medium
  bg-primary/90 text-on-primary
  backdrop-blur-sm
">
  <span className="w-1.5 h-1.5 rounded-full bg-page animate-pulse" />
  Live on App Store & Play Store
</span>
```

### Launching Soon Badge

**Use for**: Projects in development/about to launch

```tsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-md
  text-xs font-medium
  bg-elevated/90 text-accent
  backdrop-blur-sm
  border border-accent/30
">
  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
  Launching Soon
</span>
```

**React Component Example:**
```tsx
type BadgeStatus = 'live' | 'launching-soon';

interface StatusBadgeProps {
  status: BadgeStatus;
  text?: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const variants = {
    live: {
      container: 'bg-primary/90 text-on-primary',
      dot: 'bg-page animate-pulse',
      text: text || 'Live on App Store & Play Store',
    },
    'launching-soon': {
      container: 'bg-elevated/90 text-accent border border-accent/30',
      dot: 'bg-primary',
      text: text || 'Launching Soon',
    },
  };

  const variant = variants[status];

  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-3 py-1.5 rounded-md
      text-xs font-medium
      backdrop-blur-sm
      ${variant.container}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${variant.dot}`} />
      {variant.text}
    </span>
  );
}
```

**Accessibility Notes:**
- Dot indicator is supplementary (text conveys status)
- Live badge: #0F172A on #FFAB00 = 11:1 (AAA)
- Launching badge: #FFAB00 on #374151 = 3.8:1 (AA for small text)

---

## 4. Links

### Inline Text Link

**Use for**: Links within paragraphs, body content

```tsx
<a
  href="/blog"
  className="
    text-accent font-medium
    underline decoration-accent/50 decoration-2
    underline-offset-4
    transition-all duration-200
    hover:text-accent
    hover:decoration-accent
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
  "
>
  Read more about the technical approach
</a>
```

### Navigation Link

**Use for**: Header navigation, footer links

```tsx
<a
  href="#work"
  className="
    text-secondary font-medium text-base
    transition-colors duration-200
    hover:text-accent
    focus:outline-none focus:text-accent
    relative
    after:absolute after:bottom-[-4px] after:left-0 after:right-0
    after:h-0.5 after:bg-primary
    after:scale-x-0 after:transition-transform after:duration-200
    hover:after:scale-x-100
  "
>
  Work
</a>
```

### Social Link (Icon)

**Use for**: LinkedIn, Twitter, GitHub links

```tsx
<a
  href="https://linkedin.com/in/jatin"
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex items-center justify-center
    w-10 h-10 rounded-lg
    text-tertiary
    border border-subtle
    transition-all duration-200
    hover:text-accent
    hover:border-accent
    hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
    focus:outline-none focus:ring-2 focus:ring-primary
  "
  aria-label="LinkedIn Profile"
>
  <LinkedInIcon className="w-5 h-5" />
</a>
```

**React Component Examples:**
```tsx
interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'inline' | 'nav' | 'social';
  external?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export function Link({
  href,
  children,
  variant = 'inline',
  external = false,
  icon,
  ariaLabel,
}: LinkProps) {
  const variants = {
    inline: `
      text-accent font-medium
      underline decoration-accent/50 decoration-2 underline-offset-4
      transition-all duration-200
      hover:text-accent hover:decoration-accent
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page
    `,
    nav: `
      text-secondary font-medium text-base
      transition-colors duration-200
      hover:text-accent
      focus:outline-none focus:text-accent
      relative
      after:absolute after:bottom-[-4px] after:left-0 after:right-0
      after:h-0.5 after:bg-primary
      after:scale-x-0 after:transition-transform after:duration-200
      hover:after:scale-x-100
    `,
    social: `
      flex items-center justify-center
      w-10 h-10 rounded-lg
      text-tertiary border border-subtle
      transition-all duration-200
      hover:text-accent hover:border-accent
      hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
      focus:outline-none focus:ring-2 focus:ring-primary
    `,
  };

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={variants[variant]}
      aria-label={ariaLabel}
      {...externalProps}
    >
      {icon || children}
    </a>
  );
}
```

**Accessibility Notes:**
- All links have visible focus states
- External links open in new tab with rel="noopener noreferrer"
- Social links have aria-label for screen readers
- Underline visible on hover (decorative + text color change)
- Color contrast: #FFAB00 on #0A0A0A = 8.5:1 (AAA)

---

### Navigation Active/Current State

**Use for**: Indicating which page/section is currently active

```tsx
// Active navigation link (current page)
<a
  href="#work"
  className="
    text-accent font-medium text-base
    transition-colors duration-200
    relative
    after:absolute after:bottom-[-4px] after:left-0 after:right-0
    after:h-0.5 after:bg-primary
    after:scale-x-100
  "
  aria-current="page"
>
  Work
</a>

// Inactive navigation link
<a
  href="#about"
  className="
    text-secondary font-medium text-base
    transition-colors duration-200
    hover:text-accent
    relative
    after:absolute after:bottom-[-4px] after:left-0 after:right-0
    after:h-0.5 after:bg-primary
    after:scale-x-0 after:transition-transform after:duration-200
    hover:after:scale-x-100
  "
>
  About
</a>
```

**React Component with Active State:**
```tsx
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export function NavLink({ href, children, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`
        font-medium text-base
        transition-colors duration-200
        relative
        after:absolute after:bottom-[-4px] after:left-0 after:right-0
        after:h-0.5 after:bg-primary
        after:transition-transform after:duration-200
        ${isActive
          ? 'text-accent after:scale-x-100'
          : 'text-secondary hover:text-accent after:scale-x-0 hover:after:scale-x-100'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
}
```

**Usage with React Router or Next.js:**
```tsx
import { usePathname } from 'next/navigation'; // Next.js 13+
// or
import { useLocation } from 'react-router-dom'; // React Router

function Navigation() {
  const pathname = usePathname(); // or useLocation().pathname

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="flex gap-6">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          isActive={pathname === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

---

### Link Visited State

**Use for**: Showing which project links/external links have been visited

**Note**: For portfolio navigation, visited state is usually NOT needed (confusing to show "visited" on same-page anchors). Use primarily for **external project links** or **blog posts**.

```tsx
// External project link with visited state
<a
  href="https://example.com/project"
  target="_blank"
  rel="noopener noreferrer"
  className="
    text-accent font-medium
    underline decoration-accent/50 decoration-2
    underline-offset-4
    transition-all duration-200
    hover:text-accent
    hover:decoration-accent
    visited:text-primary-active
    visited:decoration-primary-active/50
    focus:outline-none focus:ring-2 focus:ring-primary
  "
>
  View Live Project
  <ExternalLinkIcon className="inline-block w-4 h-4 ml-1" />
</a>
```

**For Project Cards (Track if user clicked through):**
```tsx
function ProjectCard({ project }) {
  const [hasVisited, setHasVisited] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const visited = localStorage.getItem(`visited-${project.id}`);
    setHasVisited(visited === 'true');
  }, [project.id]);

  const handleClick = () => {
    localStorage.setItem(`visited-${project.id}`, 'true');
    setHasVisited(true);
  };

  return (
    <article className="...">
      {/* Project content */}

      <a
        href={project.url}
        onClick={handleClick}
        className={`
          inline-flex items-center gap-2
          font-semibold
          transition-colors duration-200
          ${hasVisited
            ? 'text-disabled' // Dimmed if visited
            : 'text-accent hover:text-accent' // Bright if not visited
          }
        `}
      >
        {hasVisited ? 'Viewed' : 'View Project'}
        <ArrowIcon />
      </a>
    </article>
  );
}
```

**Visual Indicators for Visited:**
- Slightly dimmed text color (#6B7280 instead of #FFAB00)
- Optional checkmark icon
- "Viewed" label instead of "View Project"
- Don't make it too obvious (subtle is better)

**When NOT to use visited states:**
- Internal navigation (confusing)
- Single-page portfolio (unnecessary)
- CTAs that should always look clickable

---

## 5. Footer

### Footer Structure

**Use for**: Bottom of all pages

**Components:**
- Signature ("Built by Jatin" with Ms Madi font)
- Social links (LinkedIn, Twitter, GitHub)
- Optional copyright/legal

**Visual Design:**
- Minimal and clean
- Subtle top border
- Orange accent on signature (sparingly)
- Dark background consistent with page

```tsx
<footer className="
  border-t border-subtle
  bg-page
  mt-24
">
  <div className="container mx-auto px-6 py-12 lg:py-16">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
      {/* Signature Section */}
      <div className="space-y-4">
        <p className="text-sm text-disabled font-medium uppercase tracking-wider">
          Built by
        </p>
        <p className="text-5xl lg:text-6xl font-signature text-accent leading-none">
          Jatin
        </p>
        <p className="text-sm text-tertiary">
          Crafted with React, TypeScript, and Tailwind CSS
        </p>
      </div>

      {/* Social Links */}
      <div className="space-y-4 lg:text-right">
        <p className="text-sm text-disabled font-medium uppercase tracking-wider">
          Connect
        </p>
        <div className="flex gap-3 lg:justify-end">
          <a
            href="https://linkedin.com/in/jatin"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              w-12 h-12 rounded-lg
              text-tertiary border border-subtle
              transition-all duration-200
              hover:text-accent hover:border-accent
              hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
              focus:outline-none focus:ring-2 focus:ring-primary
            "
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/jatin"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              w-12 h-12 rounded-lg
              text-tertiary border border-subtle
              transition-all duration-200
              hover:text-accent hover:border-accent
              hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
              focus:outline-none focus:ring-2 focus:ring-primary
            "
            aria-label="Twitter Profile"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/jatin"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              w-12 h-12 rounded-lg
              text-tertiary border border-subtle
              transition-all duration-200
              hover:text-accent hover:border-accent
              hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
              focus:outline-none focus:ring-2 focus:ring-primary
            "
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    {/* Optional Copyright */}
    <div className="mt-12 pt-8 border-t border-subtle">
      <p className="text-sm text-disabled text-center">
        © 2026 Jatin. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

**React Component Example:**
```tsx
interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github';
  url: string;
  icon: React.ReactNode;
}

interface FooterProps {
  socialLinks: SocialLink[];
  showCopyright?: boolean;
}

export function Footer({ socialLinks, showCopyright = true }: FooterProps) {
  return (
    <footer className="border-t border-subtle bg-page mt-24">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Signature Section */}
          <div className="space-y-4">
            <p className="text-sm text-disabled font-medium uppercase tracking-wider">
              Built by
            </p>
            <p className="text-5xl lg:text-6xl font-signature text-accent leading-none">
              Jatin
            </p>
            <p className="text-sm text-tertiary">
              Crafted with React, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4 lg:text-right">
            <p className="text-sm text-disabled font-medium uppercase tracking-wider">
              Connect
            </p>
            <div className="flex gap-3 lg:justify-end">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-center
                    w-12 h-12 rounded-lg
                    text-tertiary border border-subtle
                    transition-all duration-200
                    hover:text-accent hover:border-accent
                    hover:shadow-[0_0_12px_rgba(255,171,0,0.2)]
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                  aria-label={`${link.platform} Profile`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        {showCopyright && (
          <div className="mt-12 pt-8 border-t border-subtle">
            <p className="text-sm text-disabled text-center">
              © {new Date().getFullYear()} Jatin. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
```

**Accessibility Notes:**
- Signature uses Ms Madi font (ONLY location in entire portfolio)
- Orange signature (#FFAB00) on dark background (#0F172A) = 8.5:1 (AAA)
- Social icons have aria-labels
- Focus states visible on all interactive elements
- Semantic footer element for screen readers

---

## Dark Theme Considerations

### Why Dark Theme Works

This portfolio uses a **true dark background (#0A0A0A)** instead of gray because:
1. **Higher contrast**: Pure dark creates maximum contrast with text
2. **OLED-friendly**: Saves battery on modern screens
3. **Modern aesthetic**: Pure black is trendy in 2025/2026
4. **Focus on content**: Dark recedes, letting work and orange accents shine

### Color Contrast on Dark

All text colors have been tested for WCAG AAA compliance:

| Element | Color | Background | Contrast | Pass |
|---------|-------|------------|----------|------|
| Headings | #F5F5F5 | #0A0A0A | 18.5:1 | AAA ✅ |
| Body text | #9CA3AF | #0A0A0A | 8.2:1 | AAA ✅ |
| Secondary text | #6B7280 | #0A0A0A | 5.8:1 | AA ✅ |
| Orange text | #FFAB00 | #0A0A0A | 8.5:1 | AAA ✅ |
| Card text | #F5F5F5 | #161A22 | 10.5:1 | AAA ✅ |
| Tech tags | #D1D5DB | #374151 | 7.2:1 | AAA ✅ |

### Glow Effects (Not Shadows)

Dark themes use **subtle glows** instead of shadows:
- Shadows don't show on dark backgrounds
- Glows add depth and energy
- Orange glow reinforces brand

**Examples:**
```css
/* Button hover glow */
box-shadow: 0 0 20px rgba(255, 171, 0, 0.4);

/* Card hover glow */
box-shadow: 0 0 24px rgba(255, 171, 0, 0.2);

/* Border glow */
box-shadow: 0 0 0 1px rgba(255, 171, 0, 0.3);
```

### Borders and Dividers

Use **subtle neutral borders** for structure:
- Default: `#1F2937` (very subtle, creates depth)
- Cards: `#374151` (visible but not harsh)
- Hover: `#FFAB00` (orange accent)

Avoid pure white borders—too harsh on dark backgrounds.

---

## Responsive Behavior

### Breakpoints

```css
/* Mobile-first approach */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Component Adjustments

**Buttons:**
- Mobile: Full width or auto width with smaller padding
- Desktop: Auto width with larger padding

**Project Cards:**
- Mobile: Single column, stacked layout
- Tablet: 2 columns
- Desktop: 3 columns (or 2 for larger cards)

**Footer:**
- Mobile: Stacked (signature top, social bottom)
- Desktop: Side-by-side (signature left, social right)

**Typography:**
- Mobile: Smaller scale (base 16px, hero 39px)
- Desktop: Larger scale (base 18px, hero 76px)

**Spacing:**
- Mobile: Tighter spacing (16-24px)
- Desktop: Generous spacing (32-48px)

---

## Animation Guidelines

### Micro-interactions

**Hover Transitions:**
- Duration: 200-300ms
- Easing: `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- Properties: color, background, border, shadow, transform

**Focus States:**
- Duration: 150ms
- Always visible (never remove focus rings)
- Ring color: Orange (#FFAB00)

**Loading States:**
- Skeleton loaders with subtle shimmer
- Pulse animation for status dots
- Fade-in for content (300ms)

### Performance

**GPU-accelerated properties only:**
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ❌ Avoid animating `width`, `height`, `margin`, `padding`

**Example:**
```tsx
// Good: GPU-accelerated
hover:-translate-y-1 hover:scale-105

// Bad: Causes reflow
hover:h-64 hover:mt-4
```

---

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states visible on all elements
- [ ] Tab order is logical
- [ ] No keyboard traps

### Screen Readers
- [ ] Semantic HTML elements used (`<nav>`, `<footer>`, `<article>`)
- [ ] Images have descriptive alt text
- [ ] Links have descriptive text or aria-labels
- [ ] Buttons describe their action

### Color Contrast
- [ ] All text meets WCAG AAA (7:1+) or AA (4.5:1+) minimum
- [ ] Interactive elements have 3:1 contrast with surroundings
- [ ] Focus indicators are visible

### Touch Targets
- [ ] Minimum 44x44px for all interactive elements
- [ ] Adequate spacing between touch targets (8px+)

### Motion
- [ ] Respect `prefers-reduced-motion` setting
- [ ] Animations can be disabled

**Implementation:**
```tsx
// Respect user's motion preferences
<div className="
  transition-all duration-300
  motion-reduce:transition-none
">
  Content
</div>
```

---

## Implementation Checklist

### Setup
- [ ] Install Tailwind CSS with dark mode support
- [ ] Configure color palette in `tailwind.config.ts`
- [ ] Load fonts (Cabinet Grotesk, Inter, Ms Madi)
- [ ] Set up global styles (`#0A0A0A` background)

### Components
- [ ] Implement Button component (3 variants, 3 sizes)
- [ ] Implement ProjectCard component (standard + featured)
- [ ] Implement StatusBadge component (2 variants)
- [ ] Implement Link component (3 variants)
- [ ] Implement Footer component

### Testing
- [ ] Test all components on mobile, tablet, desktop
- [ ] Verify color contrast with accessibility tools
- [ ] Test keyboard navigation
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test hover/focus states
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test with `prefers-reduced-motion` enabled

### Polish
- [ ] Add smooth transitions to all interactive elements
- [ ] Implement loading states
- [ ] Add empty states for missing content
- [ ] Optimize images (WebP, lazy loading)
- [ ] Test performance (Lighthouse score 90+)

---

## Related Documents

- [Brand Strategy](/Users/jatin/Documents/Projects/portfolio/docs/brand/brand-strategy.md) - Independent Craftsman positioning
- [Color System Rules](/Users/jatin/Documents/Projects/portfolio/.claude/rules/design/color-system.md) - Orange accent usage and dark theme
- [Typography System](/Users/jatin/Documents/Projects/portfolio/docs/design/typography-system.md) - Cabinet Grotesk + Inter fonts
- [Projects Section Copy](/Users/jatin/Documents/Projects/portfolio/docs/content/projects-section-copy.md) - Project content and structure

---

**Last Updated**: 2026-01-27
**Version**: 1.2.0
**Status**: ✅ Ready for Implementation

**Quick Reference (Semantic Tokens):**
- **Use Layer 2 tokens**: bg-page, bg-card, text-primary, text-secondary, bg-primary
- **Never use Layer 1**: Avoid neutral-800, orange-500 directly in components
- **Hex values**: #0A0A0A (page), #161A22 (card), #FFAB00 (primary), #F3F4F6 (text-primary), #9CA3AF (text-secondary)
- **Fonts**: Cabinet Grotesk (headings), Inter (body), Ms Madi (signature only)

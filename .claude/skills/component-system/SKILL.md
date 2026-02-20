---
name: component-system
description: Design system architect for UI components. Defines buttons, cards, forms, navigation, and component variants. Use when designing or specifying UI components.
allowed-tools: Read, Write
model: sonnet
---

# Component Design System

Modern component system designer for React applications.

## Quick Process

1. Review brand, colors, typography, and spacing systems
2. Define core components with all variants and states
3. Specify responsive behavior
4. Document accessibility requirements
5. Provide React + Tailwind implementation examples
6. Create comprehensive component specification

## Component Categories

### Foundational Components

1. **Buttons** - Primary, secondary, outlined, text, icon
2. **Links** - Inline, standalone, nav links
3. **Inputs** - Text, email, textarea, select
4. **Cards** - Content card, project card, testimonial card
5. **Badges** - Tags, skill badges, status badges

### Navigation Components

6. **Navigation Bar** - Desktop and mobile
7. **Mobile Menu** - Drawer, modal, dropdown
8. **Footer** - Simple, multi-column
9. **Breadcrumbs** (if multi-page)

### Content Components

10. **Hero Section** - Landing hero with variants
11. **Section Container** - Reusable section wrapper
12. **Project Grid** - Grid of project cards
13. **Testimonial** - Single testimonial display
14. **Skill List** - Display technical skills

### Feedback Components

15. **Loading Spinner** - Various sizes
16. **Skeleton Screen** - For loading states
17. **Toast Notification** - Success, error, info, warning
18. **Modal/Dialog** - Centered, side panel
19. **Tooltip** - Hover hints

## Complete Component Specifications

### 1. Button Component

#### Variants

**Primary Button (Main CTAs):**
```typescript
{
  background: 'primary-600',
  color: 'white',
  padding: '12px 24px',  // spacing-3 spacing-6
  borderRadius: '8px',   // rounded-lg
  fontSize: 'base',      // text-base
  fontWeight: 600,       // font-semibold
  border: 'none',
  cursor: 'pointer',
  transition: 'all 200ms ease',

  hover: {
    background: 'primary-700',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(primary, 0.3)',
  },

  active: {
    background: 'primary-800',
    transform: 'translateY(0)',
  },

  focus: {
    outline: '2px solid primary-600',
    outlineOffset: '2px',
  },

  disabled: {
    background: 'neutral-300',
    color: 'neutral-500',
    cursor: 'not-allowed',
    transform: 'none',
  },

  loading: {
    opacity: 0.7,
    cursor: 'wait',
    // Show spinner inside button
  }
}
```

**Secondary Button (Alternative actions):**
```typescript
{
  background: 'secondary-600',
  color: 'white',
  // ... similar states to primary
}
```

**Outlined Button (Less emphasis):**
```typescript
{
  background: 'transparent',
  color: 'primary-600',
  border: '2px solid primary-600',
  padding: '10px 22px',  // Slightly less to account for border

  hover: {
    background: 'primary-50',
    borderColor: 'primary-700',
    color: 'primary-700',
  },

  active: {
    background: 'primary-100',
  },

  disabled: {
    borderColor: 'neutral-300',
    color: 'neutral-400',
  }
}
```

**Text/Ghost Button (Minimal emphasis):**
```typescript
{
  background: 'transparent',
  color: 'primary-600',
  border: 'none',
  padding: '8px 12px',

  hover: {
    background: 'primary-50',
  },

  active: {
    background: 'primary-100',
  }
}
```

**Icon Button (Icon only):**
```typescript
{
  background: 'transparent',
  padding: '8px',
  borderRadius: '8px',
  minWidth: '44px',   // Accessibility
  minHeight: '44px',  // Touch target

  hover: {
    background: 'neutral-100',
  }
}
```

#### Sizes

```typescript
const buttonSizes = {
  sm: {
    padding: '8px 16px',
    fontSize: 'sm',     // 14px
    height: '36px',
  },
  md: {
    padding: '12px 24px',
    fontSize: 'base',   // 16-18px
    height: '44px',     // Default
  },
  lg: {
    padding: '16px 32px',
    fontSize: 'lg',     // 18-20px
    height: '52px',
  }
}
```

#### React Implementation

```tsx
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-neutral-300',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
    outlined: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-base h-11',
    lg: 'px-8 py-4 text-lg h-13',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner size="sm" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
```

### 2. Card Component

#### Variants

**Project Card:**
```typescript
{
  background: 'white',
  border: '1px solid neutral-200',
  borderRadius: '12px',      // rounded-xl
  padding: '24px',           // p-6
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'all 300ms ease',

  hover: {
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    transform: 'translateY(-4px)',
    borderColor: 'primary-300',
  },

  // Content structure
  image: {
    borderRadius: '8px',
    marginBottom: '16px',
    aspectRatio: '16/9',
    objectFit: 'cover',
  },

  title: {
    fontSize: 'xl',          // text-xl
    fontWeight: 600,         // font-semibold
    marginBottom: '8px',
    color: 'neutral-900',
  },

  description: {
    fontSize: 'base',
    color: 'neutral-600',
    lineHeight: 1.6,
    marginBottom: '16px',
  },

  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },

  actions: {
    display: 'flex',
    gap: '12px',
  }
}
```

**Testimonial Card:**
```typescript
{
  background: 'neutral-50',
  border: '1px solid neutral-200',
  borderRadius: '16px',
  padding: '32px',
  position: 'relative',

  // Quote mark decoration (optional)
  before: {
    content: '"',
    fontSize: '4xl',
    color: 'primary-200',
    position: 'absolute',
    top: '16px',
    left: '24px',
  },

  quote: {
    fontSize: 'lg',
    fontStyle: 'italic',
    color: 'neutral-700',
    marginBottom: '24px',
  },

  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },

  authorInfo: {
    name: {
      fontWeight: 600,
      color: 'neutral-900',
    },
    title: {
      fontSize: 'sm',
      color: 'neutral-600',
    }
  }
}
```

### 3. Input/Form Components

#### Text Input

```typescript
{
  // Container
  container: {
    marginBottom: '20px',
  },

  // Label
  label: {
    display: 'block',
    fontSize: 'sm',
    fontWeight: 500,
    color: 'neutral-700',
    marginBottom: '6px',
  },

  // Input
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: 'base',
    border: '2px solid neutral-300',
    borderRadius: '8px',
    backgroundColor: 'white',
    transition: 'all 200ms ease',

    focus: {
      borderColor: 'primary-600',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(primary, 0.1)',
    },

    error: {
      borderColor: 'error',
    },

    disabled: {
      backgroundColor: 'neutral-100',
      color: 'neutral-500',
      cursor: 'not-allowed',
    }
  },

  // Helper text
  helperText: {
    fontSize: 'sm',
    color: 'neutral-600',
    marginTop: '4px',
  },

  // Error message
  errorMessage: {
    fontSize: 'sm',
    color: 'error',
    marginTop: '4px',
  }
}
```

#### Textarea

```typescript
{
  // Same as input, but:
  minHeight: '120px',
  resize: 'vertical',
  lineHeight: 1.5,
}
```

### 4. Navigation Bar

#### Desktop Navigation

```typescript
{
  // Container
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid neutral-200',
    transition: 'all 300ms ease',

    // Scroll behavior
    scrolled: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }
  },

  // Inner container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Logo/Brand
  logo: {
    fontSize: 'xl',
    fontWeight: 700,
    color: 'neutral-900',
  },

  // Nav Links Container
  links: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },

  // Nav Link
  link: {
    fontSize: 'base',
    fontWeight: 500,
    color: 'neutral-600',
    textDecoration: 'none',
    transition: 'color 200ms ease',

    hover: {
      color: 'primary-600',
    },

    active: {
      color: 'primary-600',
      fontWeight: 600,
    }
  }
}
```

#### Mobile Navigation

```typescript
{
  // Hamburger Button
  hamburger: {
    display: 'block',    // Only on mobile
    padding: '8px',
    background: 'transparent',
    border: 'none',
    minWidth: '44px',
    minHeight: '44px',

    // Icon (3 lines)
    icon: {
      width: '24px',
      height: '2px',
      backgroundColor: 'neutral-900',
      transition: 'all 300ms ease',
    }
  },

  // Mobile Menu (Drawer)
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '80%',
    maxWidth: '320px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
    transform: 'translateX(100%)',  // Hidden by default
    transition: 'transform 300ms ease',
    zIndex: 100,

    open: {
      transform: 'translateX(0)',
    }
  },

  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 300ms ease',
    zIndex: 99,

    open: {
      opacity: 1,
      pointerEvents: 'auto',
    }
  },

  // Mobile Links
  mobileLinks: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  mobileLink: {
    fontSize: 'lg',
    fontWeight: 500,
    color: 'neutral-700',
  }
}
```

### 5. Badge/Tag Component

```typescript
{
  // Base styles
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    fontSize: 'sm',
    fontWeight: 500,
    borderRadius: '6px',
    whiteSpace: 'nowrap',
  },

  // Variants
  variants: {
    primary: {
      background: 'primary-100',
      color: 'primary-700',
    },
    secondary: {
      background: 'secondary-100',
      color: 'secondary-700',
    },
    neutral: {
      background: 'neutral-100',
      color: 'neutral-700',
    },
    success: {
      background: 'success-light',
      color: 'success-dark',
    },
    // Outlined variant
    outlined: {
      background: 'transparent',
      border: '1px solid neutral-300',
      color: 'neutral-700',
    }
  }
}
```

### 6. Loading States

#### Spinner

```typescript
{
  // Container
  spinner: {
    display: 'inline-block',
    animation: 'spin 1s linear infinite',
  },

  // Sizes
  sizes: {
    sm: { width: '16px', height: '16px' },
    md: { width: '24px', height: '24px' },
    lg: { width: '32px', height: '32px' },
  },

  // SVG circle
  circle: {
    stroke: 'primary-600',
    strokeWidth: '4',
    strokeLinecap: 'round',
    fill: 'none',
    strokeDasharray: '80, 200',
    strokeDashoffset: '-20',
  }
}

// Animation keyframes
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Skeleton Screen

```typescript
{
  skeleton: {
    backgroundColor: 'neutral-200',
    borderRadius: '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },

  // Variants
  text: {
    height: '16px',
    marginBottom: '8px',
    borderRadius: '4px',
  },

  heading: {
    height: '28px',
    width: '60%',
    marginBottom: '16px',
  },

  image: {
    aspectRatio: '16/9',
    borderRadius: '8px',
    marginBottom: '16px',
  },

  card: {
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid neutral-200',
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 7. Toast Notification

```typescript
{
  // Container
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    minWidth: '320px',
    maxWidth: '480px',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'slideInRight 300ms ease',
    zIndex: 9999,
  },

  // Variants
  variants: {
    success: {
      backgroundColor: 'success',
      color: 'white',
    },
    error: {
      backgroundColor: 'error',
      color: 'white',
    },
    info: {
      backgroundColor: 'info',
      color: 'white',
    },
    warning: {
      backgroundColor: 'warning',
      color: 'white',
    }
  },

  // Icon
  icon: {
    width: '20px',
    height: '20px',
  },

  // Message
  message: {
    flex: 1,
    fontSize: 'base',
  },

  // Close button
  closeButton: {
    padding: '4px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    opacity: 0.8,

    hover: {
      opacity: 1,
    }
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## Responsive Behavior

### Component Breakpoint Changes

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Button | Full width optional | Inline | Inline |
| Card | 1 column | 2 columns | 3-4 columns |
| Navigation | Hamburger | Hamburger or horizontal | Horizontal |
| Input | Full width | Full width | May constrain width |
| Section padding | 16-24px | 32px | 48px |

## Accessibility Requirements

### All Interactive Components

- [ ] Keyboard navigable (Tab, Enter, Space, Arrow keys where appropriate)
- [ ] Focus states clearly visible (2px outline, 2px offset)
- [ ] Minimum touch target 44x44px
- [ ] ARIA labels where needed
- [ ] Semantic HTML (button, a, input, etc.)
- [ ] Color contrast meets WCAG AAA
- [ ] Screen reader compatible

### Forms

- [ ] Labels properly associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Required fields marked
- [ ] Error states have aria-invalid
- [ ] Helper text has aria-describedby

### Navigation

- [ ] Skip to main content link
- [ ] Current page indicated (aria-current="page")
- [ ] Semantic nav element
- [ ] Mobile menu keyboard accessible

## Output Format

For each component, provide:

### 1. Component Specification
- Visual description
- All variants
- All states (default, hover, active, focus, disabled, loading, error)
- Responsive behavior
- Spacing and sizing

### 2. Implementation Code
- React TypeScript component
- Tailwind CSS classes
- Props interface
- Usage examples

### 3. Accessibility Notes
- Keyboard interactions
- ARIA attributes
- Screen reader considerations

### 4. Usage Guidelines
- When to use
- When NOT to use
- Common patterns
- Best practices

### 5. Figma/Design Tool Specs
- Exact measurements
- Color tokens
- Typography tokens
- Spacing tokens

This complete component specification ensures consistent implementation across the entire portfolio.

For advanced component patterns, see:
- [Advanced React Patterns](./react-patterns.md)
- [Compound Components](./compound-components.md)
- [Headless UI Patterns](./headless-ui.md)

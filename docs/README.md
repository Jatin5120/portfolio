# Portfolio Documentation

This directory contains all design, brand, content, and technical documentation for the React portfolio project.

## Folder Structure

```
docs/
├── brand/          # Brand strategy, positioning, personality
├── design/         # Design specifications, component systems, visual direction
├── content/        # Copy, messaging, content strategy
└── technical/      # Technical architecture, implementation specs
```

## Naming Conventions

- **Files**: Use kebab-case (e.g., `brand-strategy.md`, `color-system-spec.md`)
- **Folders**: Lowercase, single word or hyphenated (e.g., `brand/`, `design/`)
- **Format**: Markdown (`.md`) for all documentation

## Document Types by Folder

### `/brand/`
- `brand-strategy.md` - Core brand positioning, personality, voice (✅ Created)
- `target-audience.md` - Audience definition and personas (if needed)
- `brand-guidelines.md` - Usage guidelines (if needed)

### `/design/`
- `design-system.md` - Complete design system specification
- `visual-direction.md` - Visual aesthetic and mood board
- `hero-section-reference.md` - Hero section design pattern and reference (✅ Created)
- `about-section-spec.md` - About section Timeline Scatter specification (✅ Created)
- `component-specs.md` - Individual component specifications
- `motion-design.md` - Animation and interaction design
- `typography-spec.md` - Type system details
- `layout-system.md` - Grid, spacing, responsive design

### `/content/`
- `professional-data.md` - Complete professional history and project data (✅ Created)
- `about-section-copy-v4-final.md` - 8 personal nodes (✅ FINAL APPROVED)
- `hero-section-copy.md` - Default + Cmd+K easter egg copy (✅ FULLY FINALIZED)
- `hero-section-technical-easter-egg-cto-optimized.md` - Easter egg detailed copy (✅ Created)
- `hero-easter-egg-approaches.md` - Easter egg approach exploration (reference only)
- `projects-section-copy.md` - Project descriptions and metadata (✅ Created)
- `contact-section-copy.md` - Contact section copy (✅ Created)
- `testimonials-strategy.md` - Decision: zero testimonials (✅ Decided)
- `about-section-copy-v3.md` - ~~V3 draft (superseded by V4)~~
- `about-section-copy-personal.md` - ~~V2 - too generic (deprecated)~~
- `about-section-copy.md` - ~~V1 - professional (deprecated)~~

### `/technical/`
- `tech-stack.md` - Technologies and libraries used (✅ Created)
- `architecture.md` - Project structure, data flow, design token integration (✅ Created)
- `implementation-plan.md` - 4-phase development roadmap with checklists (✅ Created)

## How Docs Are Used

1. **Design Agents** create documents in this folder
2. **Claude Rules** (`.claude/rules/`) reference these docs for enforcement
3. **Implementation** follows specs from these docs
4. **Version Control** tracks all changes via git

## Creating New Documents

When creating a new document:
1. Choose the appropriate folder
2. Use descriptive kebab-case filename
3. Include frontmatter with metadata (optional but recommended)
4. Cross-reference related documents

## Related

- Design rules: `.claude/rules/design/`
- Project rules: `.claude/rules/project-context.md`
- Agents: `.claude/agents/`
- Skills: `.claude/skills/`

---

**Last Updated**: 2026-02-20
**Maintained By**: Design agents and manual updates

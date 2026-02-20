# Project Context & Code Reference Rules

**Project**: React Portfolio (Building From Scratch)
**Status**: New project - no existing React codebase yet
**Old Project**: Flutter portfolio exists in this directory but is NOT relevant

---

## Critical Rule: Don't Reference Flutter Code

**DO NOT reference, read, or suggest code from the existing Flutter project** unless the user explicitly asks for it.

### Why:

1. **Different tech stack**: Building React portfolio, not Flutter
2. **Fresh start**: Creating from scratch, not porting
3. **Different architecture**: React patterns vs Flutter patterns
4. **Clean slate**: Want modern React best practices, not Flutter translations

### The Flutter Project:

The directory contains an existing Flutter portfolio with:
- `lib/` - Flutter/Dart source code
- `pubspec.yaml` - Flutter dependencies
- Flutter-specific architecture and patterns

**These files are NOT relevant to the new React portfolio** being built.

---

## When to Reference Flutter Code

**ONLY when the user explicitly asks**, such as:
- "Compare this with my Flutter version"
- "What did I do in the Flutter portfolio for X?"
- "Show me how I handled Y in the Flutter app"
- "Read `lib/something.dart` and..."

**Until then, assume the user wants:**
- Modern React/TypeScript patterns
- Fresh architectural decisions
- Current best practices (2025/2026)
- No legacy code influence

---

## What TO Reference

**DO reference these from this project:**

1. **Design rules** (`.claude/rules/design/`)
   - Color system (enforced rules)
   - Typography rules (when created)
   - Layout rules (when created)
   - Component specifications (when created)

2. **Documentation** (`docs/`)
   - **Brand**: `docs/brand/brand-strategy.md` (positioning, personality, voice)
   - **Design**: `docs/design/` (design system specs, visual direction)
   - **Content**: `docs/content/` (copy, messaging)
   - **Technical**: `docs/technical/` (architecture, implementation plans)

3. **Content about Jatin** (from brand strategy or user-provided)
   - Professional background
   - Projects to showcase
   - Skills and expertise
   - Contact information

4. **Modern React examples** (from web search or general knowledge)
   - Current best practices
   - Popular libraries and patterns
   - Performance optimizations

---

## Project Structure Assumption

Assume the user is creating a standard modern React project:

```
portfolio/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── styles/          # CSS/Tailwind config
│   ├── lib/             # Utilities
│   └── App.tsx          # Root component
├── public/              # Static assets
├── docs/                # All documentation (kebab-case filenames)
│   ├── brand/           # Brand strategy, positioning
│   ├── design/          # Design specs, visual direction
│   ├── content/         # Copy, messaging
│   └── technical/       # Architecture, implementation
├── .claude/             # Claude rules, agents, skills
│   ├── rules/           # Enforced rules
│   ├── agents/          # Specialized subagents
│   └── skills/          # Reusable knowledge
├── package.json         # Dependencies
└── tailwind.config.ts   # Tailwind setup
```

**Don't confuse with Flutter structure** (`lib/`, `pubspec.yaml`, etc.)

---

## Content Extraction Exception

**IF the user wants to extract CONTENT (not code) from Flutter project**, such as:
- Text copy (about me, project descriptions)
- Project metadata (titles, tech stacks)
- Personal information

**THEN you can:**
1. Ask permission first: "Would you like me to extract content from your Flutter portfolio?"
2. Read only for content, not implementation patterns
3. Translate content to new format, not code structure

---

## Example Scenarios

### ❌ DON'T DO THIS:

```
User: "Create a Hero component for my portfolio"

Claude: "I see you have a Hero component in lib/views/dashboard/views/landing/
Let me adapt that pattern for React..."

// WRONG - Don't reference Flutter code unprompted
```

### ✅ DO THIS:

```
User: "Create a Hero component for my portfolio"

Claude: "I'll create a modern React Hero component using Tailwind CSS and
Framer Motion, following the color system rules and Impact First philosophy..."

// CORRECT - Fresh React implementation
```

### ✅ ALSO CORRECT (When user asks):

```
User: "Show me how I did the hero section in my Flutter app"

Claude: "Let me read your Flutter Hero component to compare..."

// CORRECT - User explicitly requested Flutter reference
```

---

## File Reading Guidelines

**Before reading any file, consider:**

1. **Is this a Flutter file?** (`.dart`, `pubspec.yaml`)
   - Don't read unless explicitly asked

2. **Is this a design rule?** (`.claude/rules/design/`)
   - DO read and follow

3. **Is this a React file?** (`src/`, `.tsx`, `.jsx`)
   - DO read (when it exists)

4. **Is this configuration?** (`package.json`, `tsconfig.json`, `tailwind.config.ts`)
   - DO read for project setup

---

## When User Says "My Portfolio"

**Assume they mean the NEW React portfolio** being built, not the existing Flutter one.

### Clarify only if ambiguous:

```
User: "Update my portfolio's color system"

Claude: "I'll update the React portfolio's color system (color-system.md rules).
Are you referring to the new React version?"

// Ask for confirmation if unclear
```

---

## Exception: Design Assets

**DO use these from existing Flutter project** if applicable:
- Images in `assets/images/`
- Icons in `assets/icons/`
- Logos in `assets/logo/`
- Animations in `assets/animations/`

These are content/assets, not code, and can be reused in React.

**Ask first:**
```
"I can see you have design assets in the Flutter project's assets/ folder.
Would you like to reuse those images/icons in the new React portfolio?"
```

---

## Summary

| Scenario | Action |
|----------|--------|
| User asks for React component | Create fresh, don't reference Flutter |
| User asks "how did I do X in Flutter?" | Read Flutter code and explain |
| Need professional bio/content | Ask if should extract from Flutter project |
| Following design rules | Use `.claude/rules/design/` files |
| Creating new functionality | Use modern React best practices |
| Reusing images/assets | Ask permission, then copy over |

---

## Enforcement

Claude will:
- ✅ Build React components from scratch
- ✅ Follow modern React/TypeScript patterns
- ✅ Use design rules from `.claude/rules/`
- ✅ Ask before reading Flutter files
- ✅ Clarify if "portfolio" reference is ambiguous
- ❌ Not automatically read Flutter source code
- ❌ Not suggest Flutter patterns for React
- ❌ Not assume Flutter implementation should influence React

**Default assumption: Clean slate React project using modern best practices.**

---

**Last Updated**: 2026-01-10
**Version**: 1.0.0
**Status**: ✅ Active

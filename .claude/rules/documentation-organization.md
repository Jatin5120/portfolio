# Documentation Organization Rules

**Purpose**: Maintain consistent, scalable documentation structure for the React portfolio project.

---

## Documentation Location

All project documentation lives in the `/docs` folder, organized by category:

```
docs/
├── brand/          # Brand strategy, positioning, personality
├── design/         # Design specifications, component systems
├── content/        # Copy, messaging, content strategy
└── technical/      # Technical architecture, implementation
```

---

## Naming Conventions

### Files
- **Format**: Always use kebab-case
- **Extension**: Always `.md` (Markdown)
- **Descriptive**: Name should clearly indicate content

**Examples:**
- ✅ `brand-strategy.md`
- ✅ `color-system-spec.md`
- ✅ `portfolio-copy.md`
- ✅ `implementation-checklist.md`
- ❌ `BrandStrategy.md` (wrong case)
- ❌ `colors.txt` (wrong extension)
- ❌ `doc1.md` (not descriptive)

### Folders
- **Format**: Lowercase, single word or hyphenated
- **Purpose-based**: Organize by content type, not by author

**Examples:**
- ✅ `brand/`
- ✅ `design/`
- ✅ `content/`
- ❌ `Brand/` (wrong case)
- ❌ `my-docs/` (too generic)

---

## Document Structure

### Required Elements

Every document should include:

1. **Title** (H1) - Clear, descriptive
2. **Metadata** (optional but recommended):
   ```markdown
   **Project**: React Portfolio
   **Last Updated**: YYYY-MM-DD
   **Version**: X.Y.Z
   **Status**: Draft | Active | Archived
   ```
3. **Content** - Well-organized with headings
4. **Cross-references** - Link to related docs when relevant

### Optional Elements

- Table of contents (for long docs)
- Changelog section
- Contributors section
- Related resources

---

## Document Types & Locations

### `/docs/brand/`

**Purpose**: Brand identity, positioning, and strategy

**Documents:**
- `brand-strategy.md` - Core brand positioning, personality, voice, target audience
- `brand-guidelines.md` - Usage guidelines for brand elements (optional)
- `target-audience.md` - Detailed audience personas (if needed)

**Created by:**
- brand-strategist agent
- Manual updates

### `/docs/design/`

**Purpose**: Visual design specifications and systems

**Documents:**
- `design-system.md` - Complete design system specification (master doc)
- `visual-direction.md` - Visual aesthetic, mood board, references
- `component-specs.md` - Detailed component specifications
- `motion-design.md` - Animation and interaction design
- `typography-spec.md` - Type system specification
- `layout-system.md` - Grid, spacing, responsive design

**Created by:**
- visual-director agent
- design-integrator agent
- Individual design skills (typography-system, layout-system, etc.)

### `/docs/content/`

**Purpose**: Written content and messaging

**Documents:**
- `portfolio-copy.md` - All portfolio text (hero, about, projects, contact)
- `messaging-framework.md` - Key messages and positioning statements
- `tone-examples.md` - Voice and tone examples with do's/don'ts

**Created by:**
- ux-copywriter agent
- Manual content updates

### `/docs/technical/`

**Purpose**: Technical architecture and implementation

**Documents:**
- `architecture.md` - System architecture decisions and rationale
- `implementation-plan.md` - Development roadmap and phases
- `tech-stack.md` - Technologies, libraries, and tools used
- `api-design.md` - API structure and endpoints (if applicable)

**Created by:**
- Manual creation
- Technical planning agents (if created)

---

## Relationship Between Rules & Docs

### Rules (`.claude/rules/`) vs. Docs (`docs/`)

**Rules** = Enforced constraints and guidelines
- Claude actively enforces these during coding
- Path-specific (can target certain file types)
- Updated when changing standards

**Docs** = Specifications and reference material
- Information source for implementation
- Referenced by rules but not enforced automatically
- Updated when design/content changes

### Example Flow:

1. **brand-strategist** creates `docs/brand/brand-strategy.md` (specification)
2. **project-context.md** rule references it: "Follow brand voice from docs/brand/brand-strategy.md"
3. **ux-copywriter** reads brand strategy and creates `docs/content/portfolio-copy.md`
4. Developer implements copy following both docs

---

## Creating New Documents

### Process:

1. **Determine category**: Which folder does this belong in?
2. **Choose descriptive name**: Use kebab-case, be specific
3. **Use template** (optional but recommended):

```markdown
# Document Title

**Project**: React Portfolio
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD
**Version**: 1.0.0
**Status**: Active

---

## Overview

Brief description of what this document covers.

## [Your Sections]

...content...

---

## Related Documents

- [Related Doc 1](./related-doc.md)
- [Related Doc 2](../another-folder/doc.md)

---

**Last Updated**: YYYY-MM-DD
**Maintained By**: [Agent name or "Manual"]
```

4. **Cross-reference**: Link from/to related documents
5. **Update README**: Add to `docs/README.md` if introducing new pattern

---

## Updating Existing Documents

### Version Control

When making significant updates:

1. Update the "Last Updated" date
2. Increment version number:
   - **Major** (1.0.0 → 2.0.0): Complete rewrite, breaking changes
   - **Minor** (1.0.0 → 1.1.0): New sections, significant additions
   - **Patch** (1.0.0 → 1.0.1): Small fixes, clarifications

3. Optional: Add changelog section:
   ```markdown
   ## Changelog

   ### Version 2.0.0 (2026-01-10)
   - Complete rewrite using Impact First philosophy
   - Added context-based usage guidelines
   - Removed secondary color system
   ```

### Status Labels

Use status to indicate document lifecycle:
- **Draft**: Work in progress, not yet approved
- **Active**: Current, approved, in use
- **Review**: Under review for updates
- **Archived**: Historical, no longer in use

---

## Best Practices

### Do:
- ✅ Use descriptive, searchable filenames
- ✅ Keep documents focused (single purpose)
- ✅ Include examples and code snippets
- ✅ Cross-reference related documents
- ✅ Update "Last Updated" dates
- ✅ Use consistent formatting (headings, lists, code blocks)

### Don't:
- ❌ Create generic filenames (doc1.md, notes.md)
- ❌ Mix multiple topics in one document
- ❌ Duplicate content across documents
- ❌ Use proprietary formats (use Markdown)
- ❌ Include temporary or scratch notes
- ❌ Forget to update version/date metadata

---

## Document Discovery

### How to Find Documents:

1. **Check `docs/README.md`** for overview
2. **Browse by category** (brand, design, content, technical)
3. **Search by filename** (descriptive kebab-case makes this easy)
4. **Follow cross-references** in related documents
5. **Check rules** (`.claude/rules/`) for references

### How Claude Finds Documents:

- Agents reference `docs/` when creating new docs
- Rules reference specific docs for enforcement
- Search/grep through docs when needed
- Read related docs to maintain consistency

---

## Enforcement

**Claude will:**
- ✅ Create documents in the correct folder
- ✅ Use kebab-case for all filenames
- ✅ Include proper metadata (title, dates, version)
- ✅ Cross-reference related documents
- ✅ Maintain consistent formatting
- ✅ Update existing docs with version increments

**Claude will flag:**
- ⚠️ Documents in wrong folders
- ⚠️ Filenames not in kebab-case
- ⚠️ Missing metadata or unclear titles
- ⚠️ Duplicate or conflicting content

---

## Examples

### Good Documentation Structure:

```
docs/
├── brand/
│   └── brand-strategy.md              ✅ Clear, specific
├── design/
│   ├── design-system.md               ✅ Master spec
│   ├── visual-direction.md            ✅ Supporting doc
│   └── component-specs.md             ✅ Detailed specs
└── content/
    └── portfolio-copy.md              ✅ All copy in one place
```

### Bad Documentation Structure:

```
docs/
├── Doc1.md                            ❌ Not descriptive, wrong case
├── notes/                             ❌ Too generic
│   ├── temp.md                        ❌ Temporary files shouldn't be here
│   └── scratch.txt                    ❌ Wrong format
└── BrandStuff/                        ❌ Wrong case, vague
    └── brand_strategy_final_v2.md     ❌ Wrong case, version in filename
```

---

## Integration with Workflow

### Agent Workflow:

1. **Agent receives task** (e.g., "create brand strategy")
2. **Agent checks** `docs/` for existing related docs
3. **Agent reads** relevant rules from `.claude/rules/`
4. **Agent creates** new document in appropriate `docs/` folder
5. **Agent cross-references** related docs
6. **User reviews** and approves

### Implementation Workflow:

1. **Read design docs** for specifications
2. **Follow rules** for code enforcement
3. **Reference brand docs** for voice/messaging
4. **Check technical docs** for architecture decisions

---

## Maintenance

### Regular Reviews:

- **Monthly**: Check for outdated dates, update as needed
- **Per milestone**: Review all docs for consistency
- **Major changes**: Update all affected cross-references
- **New features**: Create supporting documentation

### Archiving:

When a document is no longer current:
1. Update status to "Archived"
2. Add archive date to metadata
3. Link to replacement document if applicable
4. Consider moving to `docs/archive/` folder

---

**Last Updated**: 2026-01-10
**Version**: 1.0.0
**Status**: ✅ Active

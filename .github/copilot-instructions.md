# Copilot Instructions: Learning Platform Template

## Architecture Overview

This is a **Git-based course content repository** designed for a hybrid learning platform. Content lives in Git; questions/assignments are managed in a backend and injected at runtime via IDs embedded as HTML comments in MDX files.

**Key principle**: Keep content lean and Git-friendly. No question text stored here—only IDs like `<!-- question:db:Q_INTRO_001 -->`.

## Project Structure

```
src/
├── course.json              # Course metadata and lesson ordering
├── validate.ts              # Zod-based validation for entire course
└── lessons/
    └── {lesson-slug}/
        ├── lesson.json      # Lesson metadata (title, objectives, slides, duration)
        ├── pre.mdx
        ├── live.mdx
        ├── post.mdx
        ├── instructor.mdx
        ├── slides/          # Optional ordered slide deck
        │   └── *.mdx
        └── assets/          # Images, diagrams, etc.
```

## Critical Conventions

### 1. Lesson Structure (Non-Negotiable)

Every lesson MUST have exactly these four MDX files in these exact paths:

- `pre.mdx`
- `live.mdx`
- `post.mdx`
- `instructor.mdx`

### 2. MDX Frontmatter

All MDX files require frontmatter with `visibility`:

```yaml
---
visibility: "public" # or "instructor" for instructor-notes only
title: "Optional Title"
---
```

**Rule**: `instructor.mdx` MUST use `visibility: "instructor"`. All others default to `"public"`.

### 3. Question Embedding

Questions are **never** written inline. Use HTML comments with database IDs:

```markdown
<!-- question:db:Q_INTRO_001 -->
<!-- question:db:Q_CORE_042 -->
```

The platform backend renders actual question content at runtime based on these IDs.

### 4. Lesson Registration

To add a lesson:

1. Create folder in `src/lessons/{slug}`
2. Add `{slug}` to `lessonOrder` array in `src/course.json`
3. Ensure no duplicates in `lessonOrder`

### 5. Slides (Optional)

If `lesson.json` lists slides, they MUST:

- Exist in `slides/` subdirectory with exact filenames
- Have no duplicates in the array
- Maintain the order specified (used for navigation)

## Validation Workflow

**Always run before committing**:

```bash
npm run validate
```

Validation checks (via `src/validate.ts` using Zod schemas):

- ✅ Required files exist (`course.json`, `lesson.json`, four MDX files per lesson)
- ✅ JSON schemas match (`courseSchema`, `lessonSchema`)
- ✅ MDX frontmatter is valid
- ✅ Instructor notes have `visibility: "instructor"`
- ✅ All slides in `lesson.json` exist on disk
- ✅ No duplicate slides or lessons in `lessonOrder`

## Developer Workflow

### Adding a New Lesson

```bash
# 1. Copy template
cp -r src/lessons/introduction src/lessons/your-new-lesson

# 2. Edit lesson.json with new title, objectives, duration, tags, slides
# 3. Update src/course.json: add "your-new-lesson" to lessonOrder
# 4. Edit the four MDX files (pre/live/post/instructor)
# 5. Validate
npm run validate
```

### Updating Course Metadata

Edit `src/course.json`:

- `level`: Must be `"beginner"`, `"intermediate"`, or `"advanced"`
- `lessonOrder`: Array of lesson slugs (folder names)
- Ensure every folder in `src/lessons/` appears in `lessonOrder`

## Common Patterns

**Pre-Class**: Setup checklists, installation commands, optional reading  
**Live-Class**: Session agenda, embedded poll/quiz IDs, interactive prompts  
**Post-Class**: Practice task, reflection questions  
**Instructor Notes**: Teaching tips, timing notes, watch-outs (Git-versioned, runtime role-restricted)

## TypeScript/Validation Details

- Uses **Zod** for schema validation (`courseSchema`, `lessonSchema`, `mdxContentFrontmatterSchema`)
- Uses **gray-matter** to parse MDX frontmatter
- Validation runs synchronously and exits with error code 1 on failure
- Errors are collected and displayed as a batch list

## What NOT to Do

❌ Store question text in MDX files (use IDs only)  
❌ Skip validation before committing  
❌ Create lessons without updating `lessonOrder` in `course.json`  
❌ Use `visibility: "public"` for instructor notes  
❌ Reference slides in `lesson.json` that don't exist in `slides/` folder

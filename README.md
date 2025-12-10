# Learning Content Template

Lean, template for Git-based course content with runtime-injected questions and assignments. Questions are not stored here—they're managed in your backend and injected at runtime via IDs.

## Why this template?

- **Git-friendly**: No merge conflicts over questions. Content stays small and focused.
- **Runtime-driven**: Questions/assignments managed centrally by your platform backend.
- **Easy to fork**: Instructors copy, rename, and customize for their own courses.
- **Validated**: Built-in schema validation ensures consistency.
- **Role-aware**: Instructor notes are Git-versioned but role-protected at runtime.

## Quick start
- Update `src/course.json` with your course meta.
- Set lesson order in `src/_meta.json`.
- Copy `src/lessons/introduction` as a starter and rename the folder.
- Edit the four MDX files (pre, live, post, instructor notes).
- Reference question IDs where needed; the platform supplies the questions at runtime.
- Run `npm run validate` any time.

## Folder layout
```
src/
├── course.json
├── _meta.json
└── lessons/
    └── your-lesson/
        ├── lesson.json
        ├── pre-class/README.mdx
        ├── live-class/README.mdx
        ├── post-class/README.mdx
        ├── instructor-notes/README.mdx
        ├── slides/
        │   ├── slide-1.mdx
        │   └── slide-2.mdx
        └── assets/
```

## Metadata (JSON)
`course.json`
```json
{
  "title": "Sample Course - Getting Started",
  "summary": "A lean starter that shows how to mix Git-based content with runtime questions.",
  "level": "beginner",
  "category": "development",
  "status": "draft",
  "tags": ["template", "hybrid"],
  "instructors": [
    { "name": "John Doe", "email": "instructor@example.com", "role": "lead" }
  ]
}
```

`_meta.json` (order only)
```json
{ "lessonOrder": ["introduction", "core-concepts"] }
```

`lesson.json` (one per lesson)
```json
{
  "title": "Introduction & Course Overview",
  "summary": "What to expect, how to navigate this course, and how questions flow across phases.",
  "objectives": [
    "Understand the pre/live/post rhythm",
    "Confirm local setup before live class",
    "Know where to find instructor-only guidance"
  ],
  "durationMinutes": 45,
  "tags": ["orientation", "setup"],
  "slides": ["welcome.mdx", "core-concept.mdx", "expectations.mdx"]
}
```

Defaults: content files are always `pre-class/README.mdx`, `live-class/README.mdx`, `post-class/README.mdx`, `instructor-notes/README.mdx`. Slides are optional; list filenames to enforce order. **All questions and assignments live inside MDX via comments** like `<!-- question:db:Q_SOMETHING_001 -->` or `<!-- assignment:db:A_SOMETHING_001 -->` and are injected at runtime from the backend.

## MDX pages
- Use frontmatter `visibility: "public"` for learner-facing pages.
- Instructor notes must set `visibility: "instructor"`.
- Reference questions with `<!-- question:db:Q_SOMETHING_001 -->` and assignments with `<!-- assignment:db:A_SOMETHING_001 -->`.
- The platform renders them at runtime from your backend.

Phases per lesson:
- Pre-Class: installations, checklist, light pre-read
- Live Class: agenda and placeholders for polls/MCQs/code
- Post-Class: one practice task + reflection
- Instructor Notes: short prompts and checklists; git-versioned, role-restricted in the app

Questions & Assignments: embed them directly as HTML comments in MDX; the platform injects them at runtime based on the ID.

## Validation
```bash
npm install
npm run validate
```
Checks: required files exist, JSON matches schema, frontmatter is valid in MDX, instructor notes marked instructor-only, no duplicate slides or lessons.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding lessons and maintaining quality.

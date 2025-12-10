# Contributing

## Code of Conduct

Be respectful, inclusive, and collaborative.

## How to contribute

1. **Fork & clone** the repository
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make changes** to lesson content or validation logic
4. **Validate locally**: `npm install && npm run validate`
5. **Commit & push** with clear, descriptive messages
6. **Open a PR** with a summary of changes

## Adding a new lesson

1. **Copy the template**: `cp -r src/lessons/introduction src/lessons/your-lesson`
2. **Update `_meta.json`**: Add your lesson slug to `lessonOrder`
3. **Edit `lesson.json`**: Update title, summary, objectives, duration, tags, slides
4. **Create MDX files**: Edit pre-class, live-class, post-class, instructor-notes
5. **Embed questions/assignments**: Use `<!-- question:db:Q_YOUR_001 -->` and `<!-- assignment:db:A_YOUR_001 -->`
6. **Validate**: `npm run validate`
7. **Submit PR** for review

## Lesson checklist

- [ ] All four phase files (pre, live, post, instructor) exist with valid frontmatter
- [ ] Slides listed in `lesson.json` exist in `slides/` directory
- [ ] No duplicate slide filenames
- [ ] Instructor notes set `visibility: "instructor"`
- [ ] Question/assignment IDs follow patterns: `Q_[COURSECODE]_###`, `A_[COURSECODE]_###`
- [ ] `npm run validate` passes without errors

## Validation

Before submitting, ensure:
```bash
npm run validate
```

Checks performed:
- Required files (course.json, _meta.json, lesson.json) exist
- JSON schemas are valid
- All referenced content files exist
- Frontmatter in MDX is valid
- Instructor notes marked as instructor-only
- No duplicate slides or lessons in order

## Style guide

**MDX Files:**
- Use `visibility: "public"` for learner content, `visibility: "instructor"` for instructor notes
- Keep sections concise and scannable
- Use clear headings and bullet points
- Link to external resources, don't duplicate content
- Embed questions/assignments as HTML comments

**JSON Files:**
- Use lowercase strings for simple fields (category, status)
- Keep objectives focused (3–5 per lesson)
- List only the slides you'll actively use
- Use descriptive, short titles and summaries

**Question/Assignment IDs:**
- Format: `Q_[LESSONCODE]_###` or `A_[LESSONCODE]_###`
- Example: `Q_INTRO_001`, `A_CC_002`

## Questions?

Check the README.md for setup and structure details, or open an issue.

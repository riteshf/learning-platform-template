# Instructor Guide: Create and Publish Your Course

Welcome! This guide walks you through creating a course using our Learning Platform. It’s designed for non-technical instructors: clear steps, screenshots to replace later, and simple checklists to get you from zero to published.

If you prefer a brief overview, see QUICKSTART.md. Otherwise, follow this guide end-to-end.

---

## What You’ll Do
- Prepare a copy of this course template
- Link your repository in the platform
- Add course details (title, description, levels, tags)
- Create lessons with the required three phases (Pre, Live, Post)
- Add slides and questions
- Sync and publish your course

---

## Before You Start
- A GitHub account with access to create a repository
- Course outline (lesson titles, rough durations, objectives)
- A few images/screenshots if available (optional)

---

## 1) Get the Template

Choose one option:

- Use this template on GitHub (recommended):
  - Template URL: https://github.com/your-org/learning-platform-template
  - Click “Use this template” → Create a new repository under your GitHub account.

- Using this monorepo locally (advanced):
  - The template lives at: learning-platform-template
  - Create your own GitHub repo and copy the contents of this folder into it.

Note: You’ll paste your repo URL in the platform’s “Link Repository” modal later.

![Placeholder – Template Repository Screenshot](docs/images/template-repo.png)

---

## 2) Link Your Repository in the Platform
1. Open the Learning Platform dashboard and sign in.
2. Go to Courses → “Add Course”.
3. In the “Link Repository” modal, paste your GitHub repository URL (the one you created from this template).
   - Example: https://github.com/your-account/my-awesome-course
   - Private repos are supported. Ensure your token/permissions allow read access.
4. Click “Link” to connect the repo.

![Placeholder – Link Repository Modal](docs/images/link-repository-modal.png)

Tip: If you don’t have a course yet, it’s fine—link first, then fill in content.

---

## 3) Understand the Course Structure
Your course content lives in the src/ folder of your repository:

- src/course.json — course-level information (title, slug, lesson order)
- src/lessons/<lesson-slug>/ — a folder per lesson containing:
  - lesson.json — lesson-level metadata (title, duration, objectives)
  - pre.mdx — Pre-Class content
  - live.mdx — Live-Class content
  - post.mdx — Post-Class content
  - instructor.mdx — Instructor Notes (visible only to instructors)
  - slides/ — slide .mdx files (01-..., 02-..., etc.)
  - questions.json — optional interactive questions

![Placeholder – Folder Structure](docs/images/folder-structure.png)

The platform never stores your raw content. It reads what’s in your repo when you trigger Sync.

---

## 4) Set Course Details (src/course.json)
Open src/course.json and fill in:

- title: Your course name
- description: One or two sentences
- slug: Short identifier (lowercase, dashes)
- level: Beginner, Intermediate, Advanced
- tags: A few searchable keywords
- lessonOrder: The list of lesson folder names (slugs) in the order you want them to appear

Example (simplified):

```
{
  "title": "Modern Web Fundamentals",
  "description": "A fast, practical intro to modern web development.",
  "slug": "modern-web-fundamentals",
  "level": "BEGINNER",
  "tags": ["web", "frontend"],
  "lessonOrder": ["introduction", "core-concepts", "sample-onboarding"]
}
```

![Placeholder – Course Settings](docs/images/course-settings.png)

---

## 5) Create Lessons
Each lesson lives under src/lessons/<lesson-slug> with four content files and optional slides/questions:

- pre.mdx — Prep guidance, checklists, installs
- live.mdx — The main teaching content for class
- post.mdx — Practice and follow-ups
- instructor.mdx — Tips, answers, and notes (instructor-only)
- slides/ — Markdown slides shown during live class
- questions.json — Interactive questions that appear inline

1. Duplicate an existing lesson folder (e.g., src/lessons/introduction) and rename it to your new slug (e.g., src/lessons/getting-started).
2. Update lesson.json:
   - title, description, durationMinutes
   - objectives: list of key takeaways
   - tags: optional keywords
   - slides: optional array to enforce slide order (otherwise files are auto-sorted)

Example lesson.json (simplified):

```
{
  "title": "Getting Started",
  "description": "Kick off your journey and set expectations.",
  "durationMinutes": 45,
  "objectives": [
    "Understand course structure",
    "Complete required setup"
  ],
  "tags": ["intro", "setup"],
  "slides": ["01-welcome.mdx", "02-expectations.mdx"]
}
```

![Placeholder – Lesson Overview](docs/images/lesson-overview.png)

---

## 6) Write Your Three Phases
Keep it simple and student-friendly.

- Pre-Class (pre.mdx):
  - What to install or prepare
  - Estimated time and checklist
  - Optional reading/videos

- Live-Class (live.mdx):
  - Talking points and interactive moments
  - References to slides and inline questions
  - Small demos or discussion prompts

- Post-Class (post.mdx):
  - Practice exercises
  - Assignments with clear expectations
  - Short recaps or reflection prompts

- Instructor Notes (instructor.mdx):
  - Teaching tips, common mistakes, answers
  - Timing notes and backups if time runs short
  - Anything you don’t want students to see

![Placeholder – Editing Phase Content](docs/images/editing-phase-content.png)

---

## 7) Add Slides (Optional but Recommended)
Place .mdx files under slides/ using a numbered prefix to control order:

- slides/01-welcome.mdx
- slides/02-principles.mdx
- slides/03-demo.mdx

If you list "slides" in lesson.json, that order is used; otherwise the platform sorts by filename.

![Placeholder – Slides Folder](docs/images/slides-folder.png)

---

## 8) Add Questions (Optional but Powerful)
Questions appear inline within live and post phases. Keep them clear and short. Supported types include checklists, polls, MCQs, fill-in-the-blank, and code scripts.

- File: src/lessons/<lesson-slug>/questions.json
- Tips for great questions:
  - One concept per question
  - Provide an explanation to reinforce learning
  - For MCQs, avoid trick wording

![Placeholder – Questions Authoring](docs/images/questions-authoring.png)

---

## 9) Sync Your Course
1. In the platform, open your course.
2. Click “Sync from Repository”.
3. The platform reads your repo and updates lessons, phases, slides, and questions.
4. Fix any validation warnings, then sync again.

![Placeholder – Sync Complete](docs/images/sync-complete.png)

---

## 10) Publish and Share
- Toggle “Publish” when you’re ready for students.
- Invite learners or share the enrollment link.
- You can update content anytime—just push to GitHub and click “Sync” again.

![Placeholder – Publish Course](docs/images/publish-course.png)

---

## Best Practices
- Keep lessons short: 30–60 minutes is ideal
- Start each phase with a clear goal
- Use visuals generously (diagrams, screenshots)
- Add quick checks for understanding (polls/MCQs)
- Put sensitive info in instructor.mdx only
- Use clear, descriptive lesson slugs (e.g., "core-concepts", not "lesson2")

---

## Troubleshooting
- I don’t see my updates after syncing
  - Ensure your changes are committed and pushed
  - Click “Sync from Repository” again

- A lesson is missing
  - Confirm the folder name (slug) appears in src/course.json "lessonOrder"
  - Check lesson.json exists in that folder

- Instructor notes visible to students
  - Ensure sensitive notes are only in instructor.mdx

- Private repos won’t link
  - Verify your GitHub token has repo access and hasn’t expired

If you still need help, contact your platform admin.

---

## At-a-Glance Checklist
- Create or fork the template repository
- Link the repository in the platform
- Fill in src/course.json
- For each lesson: lesson.json, pre.mdx, live.mdx, post.mdx, instructor.mdx
- Add slides/ and questions.json (optional)
- Sync, review, and publish

You’re all set—happy teaching!

- **Git-friendly**: No merge conflicts over questions. Content stays small and focused.
- **Runtime-driven**: Questions managed centrally by your platform backend.
- **Easy to fork**: Instructors copy, rename, and customize for their own courses.
- **Validated**: Built-in schema validation ensures consistency.
- **Role-aware**: Instructor notes are Git-versioned but role-protected at runtime.

## Quick start
- Update `src/course.json` with your course meta and lesson order.
- Copy `src/lessons/introduction` as a starter and rename the folder.
- Edit the four MDX files (pre, live, post, instructor notes).
- Reference question IDs where needed; the platform supplies the questions at runtime.
- Run `npm run validate` any time.

## Folder layout
```
src/
├── course.json
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
  "description": "A lean starter that shows how to mix Git-based content with runtime questions.",
  "level": "beginner",
  "category": "development",
  "tags": ["template", "hybrid"],
  "instructors": [
    { "name": "John Doe", "email": "instructor@example.com" }
  ],
  "lessonOrder": ["introduction", "core-concepts"]
}
```

`lesson.json` (one per lesson)
```json
{
  "title": "Introduction & Course Overview",
  "description": "What to expect, how to navigate this course, and how questions flow across phases.",
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

Defaults: content files are always `pre-class/README.mdx`, `live-class/README.mdx`, `post-class/README.mdx`, `instructor-notes/README.mdx`. Slides are optional; list filenames to enforce order. **All questions live inside MDX via comments** like `<!-- question:db:Q_SOMETHING_001 -->` and are injected at runtime from the backend.

## MDX pages
- Use frontmatter `visibility: "public"` for learner-facing pages.
- Instructor notes must set `visibility: "instructor"`.
- Reference questions with `<!-- question:db:Q_SOMETHING_001 -->`.
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

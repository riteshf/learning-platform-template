# Authoring Quickstart

This one-page guide shows how to author lessons the platform can ingest from Git.

## 1) Create a Lesson Folder

```
src/lessons/<slug>/
  lesson.json
  pre.mdx
  live.mdx
  post.mdx
  instructor.mdx   # visibility: "instructor"
  slides/
    01-intro.mdx
    02-deep-dive.mdx
  assets/
    .keep
```

## 2) Add `lesson.json`

```json
{
  "title": "Your Lesson Title",
  "description": "Short description",
  "objectives": ["One", "Two"],
  "durationMinutes": 60,
  "tags": ["topic"],
  "slides": ["01-intro.mdx", "02-deep-dive.mdx"]
}
```

## 3) Write Phase Pages

- Public pages: `pre-class/`, `live-class/`, `post-class/`
- Instructor only: `instructor.mdx` with frontmatter:

```mdx
---
visibility: "instructor"
title: "Instructor Notes"
---
```

## 4) Create Slides

- Put `.mdx` files under `slides/`
- Add frontmatter `title`, `type`, `visibility`
- Reference slide filenames in `lesson.json` `slides` array

## 5) Embed Questions in MDX

Place a marker where the question should render:

```mdx
<!-- question:db:Q_YOUR_ID -->
```

## 6) Define Questions in `questions.json`

Examples for each type:

```json
[
  { "questionId": "Q_CHECK", "type": "CHECKLIST", "title": "Pre-check", "questionText": "Mark items:", "options": [{"id":"a","label":"Done"}] },
  { "questionId": "Q_POLL", "type": "POLL", "title": "Poll", "questionText": "Choose one", "options": ["A","B"] },
  { "questionId": "Q_MCQ", "type": "MCQ", "title": "MCQ", "questionText": "Pick the correct folder", "options": ["slides/","assets/"], "correctAnswer": "slides/" },
  { "questionId": "Q_FILL", "type": "FILL_IN_BLANK", "title": "Fill", "questionText": "Name the meta file", "correctAnswer": ["lesson.json"] },
  { "questionId": "Q_CODE", "type": "CODE_SCRIPT", "title": "Code", "questionText": "Complete function", "codeTemplate": "export function f(){return 0;}" }
]
```

## 7) Validate Locally

```bash
cd learning-platform-template
yarn install
yarn validate
```

Fix any reported issues (missing markers, frontmatter, slide references).

## 8) Link Your Repo and Sync

- Link your GitHub repo in the platform UI
- Trigger sync from the dashboard
- The backend parses your repo and serves content live

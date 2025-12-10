# Course Content Template

A clean, production-ready template for creating course content following a **hybrid model**: content in Git (Markdown/JSON), questions in database.

## 🎯 Model Overview

This template uses a **hybrid approach** for LMS course delivery:

- **Content** (Markdown/JSON): Versioned in Git
  - Pre-class materials (installations, checklists, recap)
  - Live class outlines & slides (with interactive questions)
  - Post-class practice guides (assignments, MCQs)
  - Instructor notes (role-protected, Git-versioned)
  - Assets and resources

- **Questions** (Database): Managed independently
  - Questions are referenced by ID: `<!-- question:db:Q_COURSE_001 -->`
  - Loaded dynamically at runtime
  - Centralized management and analytics
  - Support for multiple question types: POLL, QUIZ (MCQ), CHECKLIST, TEXT, CODE_SCRIPT
  - No local questions folder needed

## 📚 Course Structure

### Every Lesson Follows This Pattern:

1. **Pre-Class** (Before live session)
   - Installation instructions and environment setup
   - Checklists for prerequisites
   - Recap of previous lessons
   - Preparatory readings
   - CHECKLIST questions for validation

2. **Live Class** (Interactive session)
   - Instructor-led content delivery
   - Slides and presentations
   - Interactive questions:
     - POLL: Gauge understanding in real-time
     - QUIZ: Quick knowledge checks (MCQ)
     - CODE_SCRIPT: Live coding exercises
   - Q&A sessions

3. **Post-Class** (After live session)
   - Practice assignments
   - QUIZ questions (MCQs) for assessment
   - TEXT questions (fill in the blanks)
   - Self-paced exercises
   - Additional resources

4. **Instructor Notes** (Role-protected)
   - Teaching strategies and tips
   - Common student misconceptions
   - Question answers and explanations
   - Timing guides
   - Stored in Git but only visible to instructors

5. **Assignments** (Optional, after certain lessons)
   - Referenced by ID (stored in database)
   - Can be linked to specific lessons
   - Surprise assignments supported

## 📁 Directory Structure

```
sample-course/
├── course.json           # Course metadata
├── _meta.json           # Lesson ordering & availability
└── lessons/
    ├── introduction/
    │   ├── lesson.json           # Lesson config with question references
    │   ├── pre-class.mdx         # Pre-class content
    │   ├── live-class.mdx        # Live session outline
    │   ├── post-class.mdx        # Post-class practice
    │   ├── instructor-notes.mdx  # Instructor-only content
    │   ├── slides/
    │   │   ├── welcome.mdx
    │   │   ├── core-concept.mdx
    │   │   └── ...
    │   └── assets/               # Images, documents, etc.
    └── core-concepts/
        └── (same structure)
```

## 📝 File Descriptions

### lesson.json

Defines lesson structure and links to database questions:

```json
{
  "schemaVersion": "1.0.0",
  "slug": "introduction",
  "title": "Introduction",
  "contentFiles": {
    "preClass": "pre-class.mdx",
    "liveClass": "live-class.mdx",
    "postClass": "post-class.mdx",
    "instructorNotes": "instructor-notes.mdx"
  },
  "slides": [
    { "slug": "welcome", "file": "welcome.mdx", "order": 1 },
    { "slug": "core-concept", "file": "core-concept.mdx", "order": 2 }
  ],
  "questionReferences": [
    { "id": "Q_INTRO_001", "type": "CHECKLIST", "phase": "pre", "context": "Setup verification" },
    { "id": "Q_INTRO_002", "type": "POLL", "phase": "live", "context": "Experience level poll" },
    { "id": "Q_INTRO_003", "type": "QUIZ", "phase": "post", "context": "Assessment MCQ" },
    { "id": "Q_INTRO_004", "type": "TEXT", "phase": "post", "context": "Fill in the blanks" },
    { "id": "Q_INTRO_005", "type": "CODE_SCRIPT", "phase": "live", "context": "Live coding" }
  ],
  "assignmentReference": {
    "id": "A_INTRO_001",
    "title": "Build Your First Project",
    "description": "Apply concepts from lessons 1-3",
    "dueAfterDays": 7,
    "estimatedMinutes": 120
  },
  "estimatedStudyTime": {
    "preClass": 20,
    "liveClass": 60,
    "postClass": 30
  }
}
```

**Key points:**
- `file` paths in slides are relative to the `slides/` directory (don't include `slides/` prefix)
- Question IDs reference database entries, not local files
- Question types: `POLL`, `QUIZ` (MCQ), `CHECKLIST`, `MULTI_SELECT`, `TEXT` (fill-in-blanks), `CODE_SCRIPT`
- Assignment references use format: `A_COURSE_###` (optional, can appear after any lesson)
- No `questions/` folder needed

### MDX Content Files

Use HTML comments to reference questions:

```markdown
---
title: "Live Class"
estimatedTime: 30
visibility: "public"
---

# Live Class Content

Your content here.

<!-- question:db:Q_INTRO_001 -->
```

## 🔗 Question References

Questions are referenced by ID inside content and are categorized by phase:

### Pre-Class Questions
```markdown
<!-- question:db:Q_INTRO_001 -->
```
**Typical types:**
- `CHECKLIST`: Installation verification, environment setup
- `TEXT`: Recap questions from previous lessons

### Live-Class Questions
```markdown
<!-- question:db:Q_INTRO_002 -->
```
**Typical types:**
- `POLL`: Gauge understanding, experience levels
- `QUIZ`: Quick knowledge checks (MCQ)
- `CODE_SCRIPT`: Live coding exercises and demonstrations

### Post-Class Questions
```markdown
<!-- question:db:Q_INTRO_003 -->
```
**Typical types:**
- `QUIZ`: Multiple choice assessments (MCQ)
- `TEXT`: Fill in the blanks, short answers
- `MULTI_SELECT`: Multiple correct answers

### Instructor-Only Questions
Questions with `phase: "instructor"` are visible only in instructor notes with answers and explanations.

## 📝 Question Types

| Type | Description | Common Phase | Example Use |
|------|-------------|--------------|-------------|
| `CHECKLIST` | Multiple items to verify/complete | `pre` | Installation checklist, prerequisites |
| `POLL` | Single choice, no wrong answer | `live` | Experience level, preferences |
| `QUIZ` | Multiple choice (MCQ), single correct | `post`, `live` | Knowledge assessment |
| `MULTI_SELECT` | Multiple correct answers | `post` | Complex assessments |
| `TEXT` | Short answer, fill in the blanks | `post`, `pre` | Recap, reflection |
| `CODE_SCRIPT` | Code execution/validation | `live`, `post` | Coding exercises |

## 🎯 Assignment References

Assignments are optional and can be linked to lessons after key milestones:

```json
{
  "assignmentReference": {
    "id": "A_MODULE1_FINAL",
    "title": "Module 1 Capstone Project",
    "description": "Build a complete application using concepts from lessons 1-5",
    "dueAfterDays": 7,
    "estimatedMinutes": 180
  }
}
```

**Assignment ID Format:** `A_COURSE_###` or `A_MODULE#_###`

**When to add assignments:**
- After completing key concepts (every 3-5 lessons)
- At module boundaries
- Before major transitions
- As capstone projects

The backend loads questions at runtime. This allows:
- ✅ Centralized question management
- ✅ Easy analytics and tracking
- ✅ Question reuse across courses
- ✅ No merge conflicts in content
- ✅ Dynamic updates without redeploying

### Question ID Format

Use this convention:
```
Q_<COURSE_CODE>_<NUMBER>

Examples:
- Q_INTRO_001
- Q_CC_002
```

## ✅ Validation

Validate all course content:

```bash
npm run validate
```

This checks:
- ✓ JSON schemas
- ✓ MDX frontmatter
- ✓ Question ID format
- ✓ File structure
- ✓ No duplicate slugs/orders

## 📚 Example Lessons

Two complete example lessons included:

1. **introduction** (1 hour)
   - Welcome & course overview
   - 3 slides + 2 database question references

2. **core-concepts** (2 hours)
   - Foundational principles
   - 5 slides + 5 database question references

Use as templates for creating your own lessons!

## 🔄 Workflow

```bash
# Edit content locally
# Validate
npm run validate

# Commit to Git
git add .
git commit -m "feat: lesson updates"
git push origin main

# Backend automatically syncs
```

## 📖 Learning Phases

### Pre-Class
- Setup & preparation
- Prerequisite materials
- Duration: ~20-30 min

### Live Class
- Interactive teaching
- Polling & feedback
- Duration: ~30-60 min

### Post-Class
- Hands-on practice
- Self-assessment
- Duration: ~20-30 min

## 📝 License

MIT License

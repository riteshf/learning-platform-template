# Course Content Template Repository

This is a template repository for creating multi-language course content. Fork this repository to create your own course content.

## Repository Structure

```
course-content-template/
├── courses/
│   └── {course-slug}/
│       ├── en/
│       │   ├── course.json
│       │   ├── lessons/
│       │   │   ├── lesson-1.json
│       │   │   └── lesson-2.json
│       │   ├── slides/
│       │   │   ├── lesson-1/
│       │   │   │   ├── slide-1.json
│       │   │   │   └── slide-2.json
│       │   │   └── lesson-2/
│       │   │       └── slide-1.json
│       │   └── questions/
│       │       ├── lesson-1.json
│       │       └── lesson-2.json
│       ├── es/
│       │   └── ... (Spanish translations)
│       └── fr/
│           └── ... (French translations)
├── validation/
│   ├── validate-course.ts
│   ├── validate-lesson.ts
│   ├── validate-slide.ts
│   └── validate-question.ts
└── README.md
```

## Language Codes

Use ISO 639-1 language codes:
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `zh` - Chinese
- `ja` - Japanese
- `pt` - Portuguese
- `ru` - Russian
- `ar` - Arabic
- `hi` - Hindi
- `ko` - Korean
- -`mr` - Marathi

## Getting Started

1. Fork this repository
2. Update `courses/{your-course-slug}/en/course.json` with your course information
3. Add lessons, slides, and questions following the schema
4. Add translations in other language folders
5. Push to your repository
6. Connect your repository to the learning platform

## Validation

Run validation before pushing:

```bash
npm install
npm run validate
```

This will check:
- Required fields are present
- Schema compliance
- Referential integrity (lessons reference course, slides reference lessons, etc.)
- Language completeness

## Schema Reference

See `validation/` folder for TypeScript types and validation functions.


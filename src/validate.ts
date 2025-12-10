import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

// ============================================================================
// SCHEMAS FOR HYBRID MODEL
// ============================================================================
// This template follows a hybrid approach:
// - Content (Markdown/JSON) is versioned in Git
// - Questions are managed in DB and referenced by ID
// - Instructor notes are stored in Git with role-based access
// ============================================================================

const courseSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    instructor: z
      .object({
        name: z.string().min(1),
        email: z.string().email(),
        bio: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    estimatedMinutes: z.number().int().positive(),
    estimatedLessons: z.number().int().positive(),
    category: z.string().min(1),
    publishStatus: z.enum(["draft", "published"]),
    contentStructure: z.literal("hybrid"),
    contentNotes: z.string().optional(),
  })
  .passthrough();

const metaSchema = z
  .object({
    lessonOrder: z.array(z.string().min(1)),
    availability: z
      .object({
        pre: z.object({
          open: z.boolean(),
          daysBeforeLiveClass: z.number().int().nonnegative().optional(),
        }),
        live: z.object({
          open: z.boolean(),
          scheduledDate: z.string().datetime().optional(),
        }),
        post: z.object({
          open: z.boolean(),
          daysAfterLiveClass: z.number().int().nonnegative().optional(),
        }),
      })
      .partial()
      .default({}),
    contentNotes: z.string().optional(),
  })
  .passthrough();

const lessonSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    contentFiles: z.object({
      preClass: z.string().regex(/\.mdx?$/),
      liveClass: z.string().regex(/\.mdx?$/),
      postClass: z.string().regex(/\.mdx?$/),
      instructorNotes: z.string().regex(/\.mdx?$/),
    }),
    slides: z.array(
      z.object({
        slug: z.string().min(1),
        file: z.string().regex(/\.mdx?$/),
      })
    ),
    assets: z.string(),
    questionReferences: z.array(
      z.object({
        id: z.string().min(1),
        type: z.enum([
          "POLL", // Poll questions for live engagement
          "QUIZ", // Multiple choice questions (MCQ)
          "CHECKLIST", // Checklist items (installations, prerequisites)
          "MULTI_SELECT", // Multiple correct answers
          "TEXT", // Fill in the blanks / short answer
          "CODE_SCRIPT", // Code execution / script questions
        ]),
        phase: z.enum(["pre", "live", "post", "instructor"]),
        context: z.string().optional(),
      })
    ),
    assignmentReference: z
      .object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        dueAfterDays: z.number().int().nonnegative().optional(),
        estimatedMinutes: z.number().int().positive().optional(),
      })
      .optional(),
    surpriseAssignment: z.boolean().default(false),
    learningObjectives: z.array(z.string()).optional(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  })
  .passthrough();

const slideFrontmatterSchema = z
  .object({
    title: z.string().min(1).optional(),
    type: z.enum(["intro", "content", "interactive", "closing"]).optional(),
    visibility: z.enum(["public", "instructor"]).optional(),
  })
  .passthrough();

const instructorNotesFrontmatterSchema = z
  .object({
    visibility: z.literal("instructor"),
    title: z.string().min(1),
  })
  .passthrough();

const mdxContentFrontmatterSchema = z
  .object({
    title: z.string().min(1).optional(),
    visibility: z.enum(["public", "instructor"]).default("public"),
  })
  .passthrough();

// ============================================================================
// VALIDATION LOGIC
// ============================================================================

type ErrorCollector = { errors: string[] };

function readJson(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function addError(ctx: ErrorCollector, message: string) {
  ctx.errors.push(message);
}

function validateCourse(courseDir: string, ctx: ErrorCollector) {
  const courseFile = path.join(courseDir, "course.json");
  const metaFile = path.join(courseDir, "_meta.json");
  const lessonsDir = path.join(courseDir, "lessons");

  if (!fs.existsSync(courseFile)) addError(ctx, `${courseFile}: missing`);
  if (!fs.existsSync(metaFile)) addError(ctx, `${metaFile}: missing`);
  if (!fs.existsSync(lessonsDir))
    addError(ctx, `${lessonsDir}: missing lessons directory`);
  if (ctx.errors.length) return;

  const course = courseSchema.safeParse(readJson(courseFile));
  if (!course.success) addError(ctx, `${courseFile}: ${course.error.message}`);

  const meta = metaSchema.safeParse(readJson(metaFile));
  if (!meta.success) addError(ctx, `${metaFile}: ${meta.error.message}`);

  const lessonDirs = fs
    .readdirSync(lessonsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const lessonOrder = meta.success ? meta.data.lessonOrder : [];
  const duplicateLessons = findDuplicates(lessonOrder);
  duplicateLessons.forEach((dup) =>
    addError(ctx, `${metaFile}: duplicate lesson slug '${dup}' in lessonOrder`)
  );

  // Ensure order covers all lessons
  lessonDirs.forEach((dir) => {
    if (!lessonOrder.includes(dir)) {
      addError(ctx, `${metaFile}: lessonOrder missing folder '${dir}'`);
    }
  });

  lessonOrder.forEach((slug) => {
    const lessonPath = path.join(lessonsDir, slug);
    if (!fs.existsSync(lessonPath)) {
      addError(ctx, `${metaFile}: lesson '${slug}' listed but folder missing`);
      return;
    }
    validateLesson(lessonPath, slug, ctx);
  });
}

function validateLesson(
  lessonDir: string,
  folderSlug: string,
  ctx: ErrorCollector
) {
  const lessonFile = path.join(lessonDir, "lesson.json");
  if (!fs.existsSync(lessonFile)) {
    addError(ctx, `${lessonFile}: missing`);
    return;
  }

  const lesson = lessonSchema.safeParse(readJson(lessonFile));
  if (!lesson.success) {
    addError(ctx, `${lessonFile}: ${lesson.error.message}`);
    return;
  }

  // Validate content files exist
  const contentFiles = lesson.data.contentFiles;
  Object.entries(contentFiles).forEach(([key, file]) => {
    const filePath = path.join(lessonDir, file);
    if (!fs.existsSync(filePath)) {
      addError(
        ctx,
        `${filePath}: missing (referenced in lesson.json.contentFiles.${key})`
      );
    } else {
      validateMdxFrontmatter(filePath, ctx);
    }
  });

  // Validate slides exist and have correct frontmatter
  validateSlides(lesson.data.slides, path.join(lessonDir, "slides"), ctx);

  // Validate instructor notes
  const instructorNotesPath = path.join(
    lessonDir,
    lesson.data.contentFiles.instructorNotes
  );
  if (fs.existsSync(instructorNotesPath)) {
    validateInstructorNotes(instructorNotesPath, ctx);
  }

  // Validate question references point to valid IDs (format check only)
  lesson.data.questionReferences.forEach((q) => {
    if (!/^Q_[A-Z0-9_]+$/.test(q.id)) {
      addError(
        ctx,
        `${lessonFile}: questionReferences[${q.id}]: Invalid format. Use Q_COURSE_###`
      );
    }
  });

  // Validate assignment reference format if present
  if (lesson.data.assignmentReference) {
    const assignmentId = lesson.data.assignmentReference.id;
    if (!/^A_[A-Z0-9_]+$/.test(assignmentId)) {
      addError(
        ctx,
        `${lessonFile}: assignmentReference.id '${assignmentId}': Invalid format. Use A_COURSE_###`
      );
    }
  }

  // Warn if no questions referenced (not an error, just unusual)
  if (lesson.data.questionReferences.length === 0) {
    console.warn(
      `⚠️  ${lessonFile}: No questions referenced. Is this intentional?`
    );
  }
}

function validateSlides(
  slides: Array<{ slug: string; file: string }>,
  slidesDir: string,
  ctx: ErrorCollector
) {
  if (!fs.existsSync(slidesDir)) {
    addError(ctx, `${slidesDir}: missing slides directory`);
    return;
  }

  const seenSlugs = new Set<string>();

  slides.forEach((slide) => {
    const filePath = path.join(slidesDir, slide.file);

    if (!fs.existsSync(filePath)) {
      addError(ctx, `${filePath}: missing (referenced in lesson.json.slides)`);
      return;
    }

    if (seenSlugs.has(slide.slug)) {
      addError(ctx, `${slidesDir}: duplicate slide slug '${slide.slug}'`);
    }
    seenSlugs.add(slide.slug);

    validateMdxFrontmatter(filePath, ctx);
  });
}

function validateMdxFrontmatter(filePath: string, ctx: ErrorCollector) {
  try {
    const parsed = matter.read(filePath);
    const fm = mdxContentFrontmatterSchema.safeParse(parsed.data);
    if (!fm.success) {
      addError(ctx, `${filePath}: ${fm.error.message}`);
    }
  } catch (e) {
    addError(ctx, `${filePath}: Error parsing frontmatter - ${String(e)}`);
  }
}

function validateInstructorNotes(notesFile: string, ctx: ErrorCollector) {
  try {
    const parsed = matter.read(notesFile);
    const fm = instructorNotesFrontmatterSchema.safeParse(parsed.data);
    if (!fm.success) {
      addError(ctx, `${notesFile}: ${fm.error.message}`);
    }
  } catch (e) {
    addError(ctx, `${notesFile}: Error parsing frontmatter - ${String(e)}`);
  }
}

function findDuplicates(items: string[]) {
  const seen = new Set<string>();
  const dups: string[] = [];
  items.forEach((item) => {
    if (seen.has(item)) dups.push(item);
    else seen.add(item);
  });
  return dups;
}

function main() {
  const root = path.join(__dirname);
  const ctx: ErrorCollector = { errors: [] };

  if (!fs.existsSync(root)) {
    console.error(`Content directory missing: ${root}`);
    process.exit(1);
  }

  // Validate the single course in the root directory
  validateCourse(root, ctx);

  if (ctx.errors.length) {
    console.error("❌ Validation failed:");
    ctx.errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  console.log("✅ Validation passed - All course content is valid!");
}

main();

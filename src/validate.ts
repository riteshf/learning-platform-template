import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const COURSE_FILE = "course.json";
const LESSONS_DIR = "lessons";

const CONTENT_FILES = {
  pre: "pre-class/README.mdx",
  live: "live-class/README.mdx",
  post: "post-class/README.mdx",
  instructor: "instructor-notes/README.mdx",
};

const courseSchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    category: z.string().min(1),
    status: z.enum(["draft", "published"]).default("draft"),
    tags: z.array(z.string().min(1)).default([]),
    instructors: z
      .array(
        z.object({
          name: z.string().min(1),
          email: z.string().email().optional(),
        })
      )
      .min(1),
    lessonOrder: z.array(z.string().min(1)),
  })
  .passthrough();



const lessonSchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    objectives: z.array(z.string().min(1)).default([]),
    durationMinutes: z.number().int().positive().optional(),
    tags: z.array(z.string().min(1)).default([]),
    slides: z.array(z.string().min(1)).default([]),
  })
  .passthrough();

const mdxContentFrontmatterSchema = z.object({
  title: z.string().optional(),
  visibility: z.enum(["public", "instructor"]).default("public"),
});

type ErrorCollector = { errors: string[] };

function readJson(filePath: string) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    throw new Error(`Failed to parse ${filePath}: ${String(e)}`);
  }
}

function validateCourse(courseDir: string, ctx: ErrorCollector) {
  const courseFile = path.join(courseDir, COURSE_FILE);
  const lessonsDir = path.join(courseDir, LESSONS_DIR);

  if (!fs.existsSync(courseFile)) {
    ctx.errors.push(`${courseFile}: missing`);
    return;
  }
  if (!fs.existsSync(lessonsDir)) {
    ctx.errors.push(`${lessonsDir}: missing`);
    return;
  }

  let course;
  try {
    const courseData = courseSchema.safeParse(readJson(courseFile));
    if (!courseData.success) {
      ctx.errors.push(`${courseFile}: ${courseData.error.message}`);
      return;
    }
    course = courseData.data;
  } catch (e) {
    ctx.errors.push(`${courseFile}: ${String(e)}`);
    return;
  }

  try {
    const lessonOrder = course.lessonOrder;
    const lessonDirs = fs
      .readdirSync(lessonsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const duplicates = new Set<string>();
    const seen = new Set<string>();
    lessonOrder.forEach((slug) => {
      if (seen.has(slug)) duplicates.add(slug);
      seen.add(slug);
    });
    duplicates.forEach((dup) =>
      ctx.errors.push(`${courseFile}: duplicate lesson '${dup}'`)
    );

    lessonDirs.forEach((dir) => {
      if (!lessonOrder.includes(dir)) {
        ctx.errors.push(`${courseFile}: lessonOrder missing '${dir}'`);
      }
    });

    lessonOrder.forEach((slug) => {
      const lessonPath = path.join(lessonsDir, slug);
      if (!fs.existsSync(lessonPath)) {
        ctx.errors.push(`${courseFile}: lesson '${slug}' folder missing`);
        return;
      }
      validateLesson(lessonPath, ctx);
    });
  } catch (e) {
    ctx.errors.push(`${courseFile}: ${String(e)}`);
  }
}

function validateLesson(lessonDir: string, ctx: ErrorCollector) {
  const lessonFile = path.join(lessonDir, "lesson.json");
  if (!fs.existsSync(lessonFile)) {
    ctx.errors.push(`${lessonFile}: missing`);
    return;
  }

  try {
    const lesson = lessonSchema.safeParse(readJson(lessonFile));
    if (!lesson.success) {
      ctx.errors.push(`${lessonFile}: ${lesson.error.message}`);
      return;
    }

    validateContentFiles(lessonDir, ctx);
    validateSlides(lessonDir, lesson.data.slides, ctx);
  } catch (e) {
    ctx.errors.push(`${lessonFile}: ${String(e)}`);
  }
}

function validateContentFiles(lessonDir: string, ctx: ErrorCollector) {
  Object.entries(CONTENT_FILES).forEach(([key, relativePath]) => {
    const filePath = path.join(lessonDir, relativePath);
    if (!fs.existsSync(filePath)) {
      ctx.errors.push(`${filePath}: missing (${key} content)`);
      return;
    }
    const fm = validateMdxFrontmatter(filePath, ctx);
    const isInstructorNotes = key === "instructor";
    if (isInstructorNotes && fm?.visibility !== "instructor") {
      ctx.errors.push(`${filePath}: instructor notes must set visibility: "instructor"`);
    }
  });
}

function validateSlides(
  lessonDir: string,
  slideFiles: string[],
  ctx: ErrorCollector
) {
  if (!slideFiles.length) return;
  const slidesDir = path.join(lessonDir, "slides");
  if (!fs.existsSync(slidesDir)) {
    ctx.errors.push(`${slidesDir}: missing (slides listed but folder absent)`);
    return;
  }

  const seen = new Set<string>();
  slideFiles.forEach((file) => {
    const filePath = path.join(slidesDir, file);
    if (seen.has(file)) ctx.errors.push(`${slidesDir}: duplicate slide '${file}'`);
    seen.add(file);
    if (!fs.existsSync(filePath)) {
      ctx.errors.push(`${filePath}: missing`);
      return;
    }
    validateMdxFrontmatter(filePath, ctx);
  });
}

function validateMdxFrontmatter(filePath: string, ctx: ErrorCollector) {
  try {
    const parsed = matter.read(filePath);
    const fm = mdxContentFrontmatterSchema.safeParse(parsed.data);
    if (!fm.success) {
      ctx.errors.push(`${filePath}: ${fm.error.message}`);
      return undefined;
    }
    return fm.data;
  } catch (e) {
    ctx.errors.push(`${filePath}: Error parsing frontmatter - ${String(e)}`);
    return undefined;
  }
}

function main() {
  const root = path.join(__dirname);
  const ctx: ErrorCollector = { errors: [] };

  if (!fs.existsSync(root)) {
    console.error(`Content directory missing: ${root}`);
    process.exit(1);
  }

  validateCourse(root, ctx);

  if (ctx.errors.length) {
    console.error("❌ Validation failed:");
    ctx.errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  console.log("✅ Validation passed!");
}

main();

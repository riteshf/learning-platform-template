/**
 * Validate entire course structure
 */

import * as fs from "fs";
import * as path from "path";
import { validateCourseFile } from "./validate-course";
import { validateLessonFile } from "./validate-lesson";
import { validateSlideFile } from "./validate-slide";
import { validateQuestionFile } from "./validate-question";
import type { ValidationResult } from "./types";

interface ValidationSummary {
  course: ValidationResult;
  lessons: Record<string, ValidationResult>;
  slides: Record<string, ValidationResult>;
  questions: Record<string, ValidationResult>;
  overall: boolean;
  totalErrors: number;
}

export function validateCourseStructure(
  courseDir: string,
  language: string = "en"
): ValidationSummary {
  const langDir = path.join(courseDir, language);
  const summary: ValidationSummary = {
    course: { valid: false, errors: [] },
    lessons: {},
    slides: {},
    questions: {},
    overall: false,
    totalErrors: 0,
  };

  // Validate courses.json
  const courseFile = path.join(langDir, "courses.json");
  summary.course = validateCourseFile(courseFile);

  // Validate lessons.json
  const lessonsFile = path.join(langDir, "lessons.json");
  if (fs.existsSync(lessonsFile)) {
    summary.lessons["lessons"] = validateLessonFile(lessonsFile);
  }

  // Validate slides.json
  const slidesFile = path.join(langDir, "slides.json");
  if (fs.existsSync(slidesFile)) {
    summary.slides["slides"] = validateSlideFile(slidesFile);
  }

  // Validate questions.json
  const questionsFile = path.join(langDir, "questions.json");
  if (fs.existsSync(questionsFile)) {
    summary.questions["questions"] = validateQuestionFile(questionsFile);
  }

  // Calculate overall status
  summary.totalErrors = [
    ...summary.course.errors,
    ...Object.values(summary.lessons).flatMap((r) => r.errors),
    ...Object.values(summary.slides).flatMap((r) => r.errors),
    ...Object.values(summary.questions).flatMap((r) => r.errors),
  ].length;

  summary.overall = summary.totalErrors === 0;

  return summary;
}

export function printValidationSummary(summary: ValidationSummary): void {
  console.log("\n📋 Validation Summary\n");

  // Course
  if (summary.course.valid) {
    console.log("✅ Course: Valid");
  } else {
    console.log("❌ Course: Invalid");
    summary.course.errors.forEach((error) => {
      console.log(`   - ${error.field}: ${error.message}`);
    });
  }

  // Lessons
  const lessonCount = Object.keys(summary.lessons).length;
  const validLessons = Object.values(summary.lessons).filter(
    (r) => r.valid
  ).length;
  console.log(`\n📖 Lessons: ${validLessons}/${lessonCount} valid`);
  Object.entries(summary.lessons).forEach(([lessonId, result]) => {
    if (!result.valid) {
      console.log(`   ❌ ${lessonId}:`);
      result.errors.forEach((error) => {
        console.log(`      - ${error.field}: ${error.message}`);
      });
    }
  });

  // Slides
  const slideCount = Object.keys(summary.slides).length;
  const validSlides = Object.values(summary.slides).filter(
    (r) => r.valid
  ).length;
  console.log(`\n📄 Slides: ${validSlides}/${slideCount} valid`);
  Object.entries(summary.slides).forEach(([slideKey, result]) => {
    if (!result.valid) {
      console.log(`   ❌ ${slideKey}:`);
      result.errors.forEach((error) => {
        console.log(`      - ${error.field}: ${error.message}`);
      });
    }
  });

  // Questions
  const questionCount = Object.keys(summary.questions).length;
  const validQuestions = Object.values(summary.questions).filter(
    (r) => r.valid
  ).length;
  console.log(`\n❓ Questions: ${validQuestions}/${questionCount} valid`);
  Object.entries(summary.questions).forEach(([lessonId, result]) => {
    if (!result.valid) {
      console.log(`   ❌ ${lessonId}:`);
      result.errors.forEach((error) => {
        console.log(`      - ${error.field}: ${error.message}`);
      });
    }
  });

  // Overall
  console.log(
    `\n${summary.overall ? "✅" : "❌"} Overall: ${summary.totalErrors} error(s) found\n`
  );
}

// CLI usage
if (require.main === module) {
  const courseArg = process.argv[2];
  const languageArg = process.argv[3];

  // If no course specified, validate all courses in the courses directory
  if (!courseArg) {
    const coursesBaseDir = path.join(__dirname, "../courses");
    const courseDirs = fs
      .readdirSync(coursesBaseDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    console.log(`Found ${courseDirs.length} course(s) to validate\n`);

    let allValid = true;
    courseDirs.forEach((courseDir) => {
      const fullCoursePath = path.join(coursesBaseDir, courseDir);
      
      // Find all language directories
      const langDirs = fs
        .readdirSync(fullCoursePath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // Validate each language or specified language
      const languagesToValidate = languageArg ? [languageArg] : langDirs;
      
      languagesToValidate.forEach((language) => {
        const langPath = path.join(fullCoursePath, language);
        if (!fs.existsSync(langPath)) {
          console.log(`⚠️  Language folder not found: ${courseDir}/${language}\n`);
          return;
        }

        console.log(
          `Validating course: ${courseDir} (language: ${language})\n`
        );

        const summary = validateCourseStructure(fullCoursePath, language);
        printValidationSummary(summary);

        if (!summary.overall) {
          allValid = false;
        }
      });
    });

    process.exit(allValid ? 0 : 1);
  } else {
    // Validate specific course
    const courseDir = path.resolve(courseArg);
    const language = languageArg || "en";
    
    console.log(
      `Validating course structure: ${courseDir} (language: ${language})\n`
    );

    const summary = validateCourseStructure(courseDir, language);
    printValidationSummary(summary);

    process.exit(summary.overall ? 0 : 1);
  }
}

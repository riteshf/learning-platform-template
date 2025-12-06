/**
 * Validation functions for lesson.json files
 */

import * as fs from "fs";
import * as path from "path";
import type { LessonContent, ValidationResult, ValidationError } from "./types";

export function validateLesson(lesson: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields (Backend will generate id and courseSlug)
  if (!lesson.title || typeof lesson.title !== "string") {
    errors.push({
      field: "title",
      message: "Lesson title is required and must be a string",
    });
  }

  if (lesson.order === undefined || typeof lesson.order !== "number") {
    errors.push({
      field: "order",
      message: "Lesson order is required and must be a number",
    });
  }

  // Optional id and courseSlug validation - only if provided
  if (lesson.id !== undefined && typeof lesson.id !== "string") {
    errors.push({
      field: "id",
      message: "Lesson ID must be a string if provided",
    });
  }

  if (lesson.courseSlug !== undefined && typeof lesson.courseSlug !== "string") {
    errors.push({
      field: "courseSlug",
      message: "Course slug must be a string if provided",
    });
  }

  // Optional fields validation
  if (
    lesson.description !== undefined &&
    typeof lesson.description !== "string"
  ) {
    errors.push({
      field: "description",
      message: "Description must be a string if provided",
    });
  }

  if (lesson.duration !== undefined) {
    if (typeof lesson.duration !== "number" || lesson.duration < 0) {
      errors.push({
        field: "duration",
        message: "Duration must be a non-negative number if provided",
      });
    }
  }

  // Order validation
  if (
    lesson.order !== undefined &&
    (!Number.isInteger(lesson.order) || lesson.order < 0)
  ) {
    errors.push({
      field: "order",
      message: "Order must be a non-negative integer",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateLessonFile(filePath: string): ValidationResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        valid: false,
        errors: [
          {
            field: "file",
            message: `Lesson file not found: ${filePath}`,
            path: filePath,
          },
        ],
      };
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    let lessons: any;

    try {
      lessons = JSON.parse(fileContent);
    } catch (parseError) {
      return {
        valid: false,
        errors: [
          {
            field: "json",
            message: `Invalid JSON: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
            path: filePath,
          },
        ],
      };
    }

    // Expect array of lessons
    if (!Array.isArray(lessons)) {
      return {
        valid: false,
        errors: [
          {
            field: "format",
            message: "Lesson file must contain an array",
            path: filePath,
          },
        ],
      };
    }

    const allErrors: ValidationError[] = [];

    lessons.forEach((lesson, index) => {
      const result = validateLesson(lesson);
      if (!result.valid) {
        result.errors.forEach((error) => {
          allErrors.push({
            ...error,
            field: `[${index}].${error.field}`,
            path: filePath,
          });
        });
      }
    });

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          field: "file",
          message: `Error reading file: ${error instanceof Error ? error.message : "Unknown error"}`,
          path: filePath,
        },
      ],
    };
  }
}

// CLI usage
if (require.main === module) {
  const filePath =
    process.argv[2] ||
    path.join(__dirname, "../courses/en/lessons/lesson-1.json");
  const result = validateLessonFile(filePath);

  if (result.valid) {
    console.log("✅ Lesson validation passed");
    process.exit(0);
  } else {
    console.error("❌ Lesson validation failed:");
    result.errors.forEach((error) => {
      console.error(`  - ${error.field}: ${error.message}`);
      if (error.path) {
        console.error(`    Path: ${error.path}`);
      }
    });
    process.exit(1);
  }
}

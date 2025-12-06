/**
 * Validation functions for course.json
 */

import * as fs from "fs";
import * as path from "path";
import type { CourseContent, ValidationResult, ValidationError } from "./types";

export function validateCourse(course: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields (Backend will generate slug, instructor from auth context)
  if (!course.title || typeof course.title !== "string") {
    errors.push({
      field: "title",
      message: "Course title is required and must be a string",
    });
  }

  // Optional fields validation
  if (
    course.description !== undefined &&
    typeof course.description !== "string"
  ) {
    errors.push({
      field: "description",
      message: "Description must be a string if provided",
    });
  }

  if (
    course.isPublished !== undefined &&
    typeof course.isPublished !== "boolean"
  ) {
    errors.push({
      field: "isPublished",
      message: "isPublished must be a boolean if provided",
    });
  }

  // Slug format validation (alphanumeric, hyphens, underscores) - only if provided
  if (course.slug !== undefined) {
    if (typeof course.slug !== "string") {
      errors.push({
        field: "slug",
        message: "Slug must be a string if provided",
      });
    } else if (!/^[a-z0-9-_]+$/.test(course.slug)) {
      errors.push({
        field: "slug",
        message:
          "Slug must contain only lowercase letters, numbers, hyphens, and underscores",
      });
    }
  }

  // Email format validation - only if provided
  if (course.instructorEmail !== undefined) {
    if (typeof course.instructorEmail !== "string") {
      errors.push({
        field: "instructorEmail",
        message: "Instructor email must be a string if provided",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(course.instructorEmail)) {
      errors.push({
        field: "instructorEmail",
        message: "Instructor email must be a valid email address",
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateCourseFile(filePath: string): ValidationResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        valid: false,
        errors: [
          {
            field: "file",
            message: `Course file not found: ${filePath}`,
            path: filePath,
          },
        ],
      };
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    let courses: any;

    try {
      courses = JSON.parse(fileContent);
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

    // Expect array with single course
    if (!Array.isArray(courses)) {
      return {
        valid: false,
        errors: [
          {
            field: "format",
            message: "Course file must contain an array",
            path: filePath,
          },
        ],
      };
    }

    if (courses.length === 0) {
      return {
        valid: false,
        errors: [
          {
            field: "format",
            message: "Course array must contain exactly one course",
            path: filePath,
          },
        ],
      };
    }

    if (courses.length > 1) {
      return {
        valid: false,
        errors: [
          {
            field: "format",
            message: `Course array must contain exactly one course, found ${courses.length}`,
            path: filePath,
          },
        ],
      };
    }

    const result = validateCourse(courses[0]);
    if (!result.valid) {
      result.errors.forEach((error) => {
        error.path = filePath;
      });
    }

    return result;
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
    process.argv[2] || path.join(__dirname, "../courses/en/course.json");
  const result = validateCourseFile(filePath);

  if (result.valid) {
    console.log("✅ Course validation passed");
    process.exit(0);
  } else {
    console.error("❌ Course validation failed:");
    result.errors.forEach((error) => {
      console.error(`  - ${error.field}: ${error.message}`);
      if (error.path) {
        console.error(`    Path: ${error.path}`);
      }
    });
    process.exit(1);
  }
}

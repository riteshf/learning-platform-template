/**
 * Validation functions for slide.json files
 */

import * as fs from "fs";
import * as path from "path";
import type { SlideContent, ValidationResult, ValidationError } from "./types";

const VALID_SLIDE_TYPES = ["intro", "content", "interactive", "closing"];

export function validateSlide(slide: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields (Backend will generate id and lessonId)
  if (!slide.title || typeof slide.title !== "string") {
    errors.push({
      field: "title",
      message: "Slide title is required and must be a string",
    });
  }

  if (!slide.type || typeof slide.type !== "string") {
    errors.push({
      field: "type",
      message: "Slide type is required and must be a string",
    });
  } else if (!VALID_SLIDE_TYPES.includes(slide.type)) {
    errors.push({
      field: "type",
      message: `Slide type must be one of: ${VALID_SLIDE_TYPES.join(", ")}`,
    });
  }

  if (slide.order === undefined || typeof slide.order !== "number") {
    errors.push({
      field: "order",
      message: "Slide order is required and must be a number",
    });
  }

  if (!slide.content || typeof slide.content !== "object") {
    errors.push({
      field: "content",
      message: "Slide content is required and must be an object",
    });
  }

  // Optional id and lessonId validation - only if provided
  if (slide.id !== undefined && typeof slide.id !== "string") {
    errors.push({
      field: "id",
      message: "Slide ID must be a string if provided",
    });
  }

  if (slide.lessonId !== undefined && typeof slide.lessonId !== "string") {
    errors.push({
      field: "lessonId",
      message: "Lesson ID must be a string if provided",
    });
  }

  // Optional fields validation
  if (slide.duration !== undefined) {
    if (typeof slide.duration !== "number" || slide.duration < 0) {
      errors.push({
        field: "duration",
        message: "Duration must be a non-negative number if provided",
      });
    }
  }

  // Order validation
  if (
    slide.order !== undefined &&
    (!Number.isInteger(slide.order) || slide.order < 0)
  ) {
    errors.push({
      field: "order",
      message: "Order must be a non-negative integer",
    });
  }

  // Content validation (basic check)
  if (slide.content && typeof slide.content === "object") {
    try {
      JSON.stringify(slide.content); // Ensure it's serializable
    } catch (error) {
      errors.push({
        field: "content",
        message: "Content must be valid JSON-serializable object",
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSlideFile(filePath: string): ValidationResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        valid: false,
        errors: [
          {
            field: "file",
            message: `Slide file not found: ${filePath}`,
            path: filePath,
          },
        ],
      };
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    let slides: any;

    try {
      slides = JSON.parse(fileContent);
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

    // Expect array of slides
    if (!Array.isArray(slides)) {
      return {
        valid: false,
        errors: [
          {
            field: "format",
            message: "Slide file must contain an array",
            path: filePath,
          },
        ],
      };
    }

    const allErrors: ValidationError[] = [];

    slides.forEach((slide, index) => {
      const result = validateSlide(slide);
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
    path.join(__dirname, "../courses/en/slides/lesson-1/slide-1.json");
  const result = validateSlideFile(filePath);

  if (result.valid) {
    console.log("✅ Slide validation passed");
    process.exit(0);
  } else {
    console.error("❌ Slide validation failed:");
    result.errors.forEach((error) => {
      console.error(`  - ${error.field}: ${error.message}`);
      if (error.path) {
        console.error(`    Path: ${error.path}`);
      }
    });
    process.exit(1);
  }
}

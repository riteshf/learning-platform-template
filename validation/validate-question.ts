/**
 * Validation functions for question.json files
 */

import * as fs from "fs";
import * as path from "path";
import type {
  QuestionContent,
  ValidationResult,
  ValidationError,
} from "./types";

const VALID_QUESTION_TYPES = [
  "POLL",
  "QUIZ",
  "SELECT",
  "MULTI_SELECT",
  "CHECKLIST",
  "TEXT",
];

export function validateQuestion(question: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields (Backend will generate id and lessonId)
  if (!question.type || typeof question.type !== "string") {
    errors.push({
      field: "type",
      message: "Question type is required and must be a string",
    });
  } else if (!VALID_QUESTION_TYPES.includes(question.type)) {
    errors.push({
      field: "type",
      message: `Question type must be one of: ${VALID_QUESTION_TYPES.join(", ")}`,
    });
  }

  if (!question.question || typeof question.question !== "string") {
    errors.push({
      field: "question",
      message: "Question text is required and must be a string",
    });
  }

  // Optional id and lessonId validation - only if provided
  if (question.id !== undefined && typeof question.id !== "string") {
    errors.push({
      field: "id",
      message: "Question ID must be a string if provided",
    });
  }

  if (question.lessonId !== undefined && typeof question.lessonId !== "string") {
    errors.push({
      field: "lessonId",
      message: "Lesson ID must be a string if provided",
    });
  }

  // Type-specific validation
  if (
    ["POLL", "QUIZ", "SELECT", "MULTI_SELECT", "CHECKLIST"].includes(
      question.type
    )
  ) {
    if (!question.options || !Array.isArray(question.options)) {
      errors.push({
        field: "options",
        message: `Options array is required for question type: ${question.type}`,
      });
    } else if (question.options.length < 2) {
      errors.push({
        field: "options",
        message: "Options array must contain at least 2 options",
      });
    } else {
      // Validate each option is a string
      question.options.forEach((opt: any, index: number) => {
        if (typeof opt !== "string") {
          errors.push({
            field: `options[${index}]`,
            message: "Each option must be a string",
          });
        }
      });
    }
  }

  // Correct answer validation based on type
  if (question.type === "QUIZ" || question.type === "SELECT") {
    if (question.correctAnswer !== undefined) {
      if (
        typeof question.correctAnswer !== "number" ||
        !Number.isInteger(question.correctAnswer)
      ) {
        errors.push({
          field: "correctAnswer",
          message: "correctAnswer must be an integer for QUIZ/SELECT questions",
        });
      } else if (
        question.options &&
        (question.correctAnswer < 0 ||
          question.correctAnswer >= question.options.length)
      ) {
        errors.push({
          field: "correctAnswer",
          message: "correctAnswer must be a valid index in the options array",
        });
      }
    }
  }

  if (question.type === "MULTI_SELECT") {
    if (question.correctAnswers !== undefined) {
      if (!Array.isArray(question.correctAnswers)) {
        errors.push({
          field: "correctAnswers",
          message: "correctAnswers must be an array for MULTI_SELECT questions",
        });
      } else {
        question.correctAnswers.forEach((ans: any, index: number) => {
          if (typeof ans !== "number" || !Number.isInteger(ans)) {
            errors.push({
              field: `correctAnswers[${index}]`,
              message: "Each correct answer must be an integer",
            });
          } else if (
            question.options &&
            (ans < 0 || ans >= question.options.length)
          ) {
            errors.push({
              field: `correctAnswers[${index}]`,
              message:
                "Each correct answer must be a valid index in the options array",
            });
          }
        });
      }
    }
  }

  if (question.type === "TEXT") {
    if (
      question.correctTextAnswer !== undefined &&
      typeof question.correctTextAnswer !== "string"
    ) {
      errors.push({
        field: "correctTextAnswer",
        message: "correctTextAnswer must be a string for TEXT questions",
      });
    }
  }

  // Optional fields
  if (
    question.explanation !== undefined &&
    typeof question.explanation !== "string"
  ) {
    errors.push({
      field: "explanation",
      message: "Explanation must be a string if provided",
    });
  }

  if (
    question.mandatory !== undefined &&
    typeof question.mandatory !== "boolean"
  ) {
    errors.push({
      field: "mandatory",
      message: "Mandatory must be a boolean if provided",
    });
  }

  if (question.slideId !== undefined && typeof question.slideId !== "string") {
    errors.push({
      field: "slideId",
      message: "slideId must be a string if provided",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateQuestionFile(filePath: string): ValidationResult {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        valid: false,
        errors: [
          {
            field: "file",
            message: `Question file not found: ${filePath}`,
            path: filePath,
          },
        ],
      };
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    let questions: any;

    try {
      questions = JSON.parse(fileContent);
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

    // Handle both single question and array of questions
    const questionArray = Array.isArray(questions) ? questions : [questions];
    const allErrors: ValidationError[] = [];

    questionArray.forEach((question, index) => {
      const result = validateQuestion(question);
      if (!result.valid) {
        result.errors.forEach((error) => {
          allErrors.push({
            ...error,
            field:
              questionArray.length > 1
                ? `[${index}].${error.field}`
                : error.field,
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
    path.join(__dirname, "../courses/en/questions/lesson-1.json");
  const result = validateQuestionFile(filePath);

  if (result.valid) {
    console.log("✅ Question validation passed");
    process.exit(0);
  } else {
    console.error("❌ Question validation failed:");
    result.errors.forEach((error) => {
      console.error(`  - ${error.field}: ${error.message}`);
      if (error.path) {
        console.error(`    Path: ${error.path}`);
      }
    });
    process.exit(1);
  }
}

/**
 * Type definitions for course content structure
 */

export interface CourseContent {
  slug?: string; // Optional: Backend will generate from title
  title: string;
  description?: string;
  instructorEmail?: string; // Optional: Backend will get from auth context
  isPublished?: boolean;
}

export interface LessonContent {
  id?: string; // Optional: Backend will generate unique ID
  courseSlug?: string; // Optional: Backend will associate with course
  title: string;
  description?: string;
  duration?: number;
  order: number;
}

export interface SlideContent {
  id?: string; // Optional: Backend will generate unique ID
  lessonId?: string; // Optional: Backend will associate with lesson
  title: string;
  type: "intro" | "content" | "interactive" | "closing";
  duration?: number;
  order: number;
  content: Record<string, any>; // JSON content
}

export interface QuestionContent {
  id?: string; // Optional: Backend will generate unique ID
  lessonId?: string; // Optional: Backend will associate with lesson
  type: "POLL" | "QUIZ" | "SELECT" | "MULTI_SELECT" | "CHECKLIST" | "TEXT";
  question: string;
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  correctTextAnswer?: string;
  explanation?: string;
  mandatory?: boolean;
  slideId?: string; // Optional: For slide-level questions
}

export interface CourseStructure {
  course: CourseContent;
  lessons: Record<string, LessonContent>; // keyed by lesson id
  slides: Record<string, Record<string, SlideContent>>; // lessonId -> slideId -> slide
  questions: Record<string, QuestionContent[]>; // lessonId -> questions[]
}

export interface LanguageContent {
  language: string;
  course: CourseContent;
  lessons: Record<string, LessonContent>;
  slides: Record<string, Record<string, SlideContent>>;
  questions: Record<string, QuestionContent[]>;
}

export interface ValidationError {
  field: string;
  message: string;
  path?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

import type { GenerationMode } from "./generation-mode";

export type NextLessonPlan = {
  id: string;
  studentId: string;
  mode: GenerationMode;
  content: string;
  sourcePrompt: string;
  createdAt: string;
  updatedAt: string;
};
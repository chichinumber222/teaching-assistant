import type { GenerationMode } from "./generation-mode";
import type { NextLessonPlan } from "./next-lesson-plan";

export type CreateNextLessonPlanData = {
  studentId: string;
  mode: GenerationMode;
  content: string;
  sourcePrompt: string;
};

export interface NextLessonPlanRepository {
  create(data: CreateNextLessonPlanData): NextLessonPlan;
  findById(id: string): NextLessonPlan | null;
  findLatestByStudentId(studentId: string): NextLessonPlan | null;
}
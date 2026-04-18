import z from "zod";
import { NextLessonPlanMode } from "@/modules/ai/application/generate-next-lesson-plan/constants";
import { PracticeMode } from "@/modules/ai/application/generate-practice/constants";

export const generateNextLessonPlanRequestSchema = z.object({
  mode: z.enum(NextLessonPlanMode),
});

export const generatePracticeRequestSchema = z.object({
  mode: z.enum(PracticeMode),
});

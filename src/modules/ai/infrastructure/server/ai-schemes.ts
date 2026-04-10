import z from "zod";
import { NextLessonPlanMode } from "@/modules/ai/application/generate-next-lesson-plan/constants";

export const generateNextLessonPlanRequestSchema = z.object({
  mode: z.enum(NextLessonPlanMode),
});
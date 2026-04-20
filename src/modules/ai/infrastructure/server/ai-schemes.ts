import z from "zod";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export const generateNextLessonPlanRequestSchema = z.object({
  mode: z.enum(GenerationMode),
});

export const generatePracticeRequestSchema = z.object({
  mode: z.enum(GenerationMode),
});

export const generateTaskExamplesRequestSchema = z.object({
  mode: z.enum(GenerationMode),
});

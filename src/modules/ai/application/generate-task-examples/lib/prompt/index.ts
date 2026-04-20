import { buildStandardPrompt } from "./build-standard-prompt";
import { buildAlternativesPrompt } from "./build-alternatives-prompt";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export function buildPrompt(
  studentDataTextSnapshot: string,
  generatedNextLessonPlan: string,
  mode: GenerationMode,
): string {
  return mode === GenerationMode.Alternatives
    ? buildAlternativesPrompt(studentDataTextSnapshot, generatedNextLessonPlan)
    : buildStandardPrompt(studentDataTextSnapshot, generatedNextLessonPlan);
}

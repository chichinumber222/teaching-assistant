import { buildStandardPrompt } from "./build-standard-prompt";
import { buildAlternativesPrompt } from "./build-alternatives-prompt";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export function buildPrompt(
  textSnapshot: string,
  mode: GenerationMode,
): string {
  return mode === GenerationMode.Alternatives
    ? buildAlternativesPrompt(textSnapshot)
    : buildStandardPrompt(textSnapshot);
}

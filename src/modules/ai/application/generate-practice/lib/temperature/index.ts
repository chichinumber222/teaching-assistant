import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export function getTemperature(mode: GenerationMode) {
  return mode === GenerationMode.Alternatives ? 0.6 : 0.35;
}

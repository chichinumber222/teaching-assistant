import { GenerateText } from "@/modules/ai/application/generate-text";
import type { LanguageModel } from "@/modules/ai/domain/language-model";

export type AiServiceDependencies = {
  languageModel: LanguageModel;
};

export function createAiServices(deps: AiServiceDependencies) {
  const { languageModel } = deps;

  return {
    generateText: new GenerateText(languageModel),
  };
}
import { GenerateText } from "@/modules/ai/application/generate-text";
import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { GenerateNextLessonPlan } from "@/modules/ai/application/generate-next-lesson-plan";
import { GeneratePractice } from "@/modules/ai/application/generate-practice";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";

export type AiServiceDependencies = {
  languageModel: LanguageModel;
  getStudentDossier: GetStudentDossier;
};

export function createAiServices(deps: AiServiceDependencies) {
  const { languageModel, getStudentDossier } = deps;

  return {
    generateText: new GenerateText(languageModel),
    generateNextLessonPlan: new GenerateNextLessonPlan(
      getStudentDossier,
      languageModel,
    ),
    generatePractice: new GeneratePractice(getStudentDossier, languageModel),
  };
}

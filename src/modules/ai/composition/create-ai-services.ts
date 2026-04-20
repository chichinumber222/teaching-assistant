import { GenerateText } from "@/modules/ai/application/generate-text";
import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { GenerateNextLessonPlan } from "@/modules/ai/application/generate-next-lesson-plan";
import { GeneratePractice } from "@/modules/ai/application/generate-practice";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import type { NextLessonPlanRepository } from "@/modules/ai/domain/next-lesson-plan-repository";
import { GeneratePracticeFromNextLessonPlan } from "@/modules/ai/application/generate-practice-from-next-lesson-plan";

export type AiServiceDependencies = {
  languageModel: LanguageModel;
  getStudentDossier: GetStudentDossier;
  nextLessonPlanRepository: NextLessonPlanRepository;
};

export function createAiServices(deps: AiServiceDependencies) {
  const { languageModel, getStudentDossier, nextLessonPlanRepository } = deps;

  return {
    generateText: new GenerateText(languageModel),
    generateNextLessonPlan: new GenerateNextLessonPlan(
      getStudentDossier,
      languageModel,
      nextLessonPlanRepository,
    ),
    generatePractice: new GeneratePractice(getStudentDossier, languageModel),
    generatePracticeFromNextLessonPLan: new GeneratePracticeFromNextLessonPlan(
      getStudentDossier,
      languageModel,
      nextLessonPlanRepository,
    ),
  };
}

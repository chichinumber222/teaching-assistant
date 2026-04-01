import { GenerateText } from "@/modules/ai/application/generate-text";
import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { GenerateNextLessonPlan } from "@/modules/ai/application/generate-next-lesson-plan";
import type { GetStudentContext } from "@/modules/students/application/get-student-context";

export type AiServiceDependencies = {
  languageModel: LanguageModel;
  getStudentContext: GetStudentContext;
};

export function createAiServices(deps: AiServiceDependencies) {
  const { languageModel, getStudentContext } = deps;

  return {
    generateText: new GenerateText(languageModel),
    generateNextLessonPlan: new GenerateNextLessonPlan(
      getStudentContext,
      languageModel,
    ),
  };
}

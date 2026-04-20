import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import type {
  GenerateNextLessonPlanInput,
  GenerateNextLessonPlanResult,
} from "./types";
import { GenerateNextLessonPlanResultKind } from "./constants";
import { getTemperature } from "./lib/temperature"
import { buildPrompt } from "./lib/prompt";
import { buildTextSnapshot } from "@/modules/students/application/get-student-dossier/lib/build-text-snapshot";
import type { NextLessonPlanRepository } from "@/modules/ai/domain/next-lesson-plan-repository";

const LESSON_REPORTS_LIMIT = 5;
const MAX_TOKENS_TO_GENERATE = 800;

export class GenerateNextLessonPlan {
  constructor(
    private readonly getStudentDossier: GetStudentDossier,
    private readonly languageModel: LanguageModel,
    private readonly nextLessonPlanRepository: NextLessonPlanRepository,
  ) {}

  async execute(
    input: GenerateNextLessonPlanInput,
  ): Promise<GenerateNextLessonPlanResult> {
    const dossierResult = this.getStudentDossier.execute({
      teacherUserId: input.teacherUserId,
      studentId: input.studentId,
      lessonReportsLimit: LESSON_REPORTS_LIMIT,
    });

    if (dossierResult.kind === GetStudentDossierResultKind.TEACHER_NOT_FOUND) {
      return {
        kind: GenerateNextLessonPlanResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (
      dossierResult.kind === GetStudentDossierResultKind.USER_IS_NOT_TEACHER
    ) {
      return {
        kind: GenerateNextLessonPlanResultKind.USER_IS_NOT_TEACHER,
      };
    }

    if (dossierResult.kind === GetStudentDossierResultKind.STUDENT_NOT_FOUND) {
      return {
        kind: GenerateNextLessonPlanResultKind.STUDENT_NOT_FOUND,
      };
    }

    const dossierTextSnapshot = buildTextSnapshot(dossierResult.dossier);
    const prompt = buildPrompt(dossierTextSnapshot, input.mode);
    const temperature = getTemperature(input.mode)

    const generated = await this.languageModel.generateText({
      messages: [
        {
          role: LanguageModelMessageRole.User,
          text: prompt,
        },
      ],
      temperature,
      maxTokens: MAX_TOKENS_TO_GENERATE,
    });

    const savedPlan = this.nextLessonPlanRepository.create({
      studentId: input.studentId,
      mode: input.mode,
      content: generated.text,
      sourcePrompt: prompt,
    });

    return {
      kind: GenerateNextLessonPlanResultKind.GENERATED,
      text: generated.text,
      planId: savedPlan.id,
    };
  }
}

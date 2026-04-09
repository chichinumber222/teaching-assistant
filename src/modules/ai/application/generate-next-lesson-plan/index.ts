import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import type {
  GenerateNextLessonPlanInput,
  GenerateNextLessonPlanResult,
} from "./types";
import { GenerateNextLessonPlanResultKind } from "./constants";
import { buildPrompt } from "./lib/build-prompt";
import { buildTextSnapshot } from "@/modules/students/application/get-student-dossier/lib/build-text-snapshot";

const LESSON_REPORTS_LIMIT = 3;

export class GenerateNextLessonPlan {
  constructor(
    private readonly getStudentDossier: GetStudentDossier,
    private readonly languageModel: LanguageModel,
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

    const prompt = buildPrompt(buildTextSnapshot(dossierResult.dossier));

    const result = await this.languageModel.generateText({
      messages: [
        {
          role: LanguageModelMessageRole.User,
          text: prompt,
        },
      ],
      temperature: 0.4,
      maxTokens: 900,
    });

    return {
      kind: GenerateNextLessonPlanResultKind.GENERATED,
      text: result.text,
    };
  }
}

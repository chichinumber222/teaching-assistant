import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import type { NextLessonPlanRepository } from "@/modules/ai/domain/next-lesson-plan-repository";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import { buildTextSnapshot } from "@/modules/students/application/get-student-dossier/lib/build-text-snapshot";
import type {
  GeneratePracticeFromNextLessonPlanInput,
  GeneratePracticeFromNextLessonPlanResult,
} from "./types";
import { GeneratePracticeFromNextLessonPlanResultKind } from "./constants";
import { buildPrompt } from "./lib/prompt";
import { getTemperature } from "./lib/temperature";
import { buildPrompt as buildPlanPrompt } from "../generate-next-lesson-plan/lib/prompt";

const LESSON_REPORTS_LIMIT = 5;
const MAX_TOKENS_TO_GENERATE = 800;

export class GeneratePracticeFromNextLessonPlan {
  constructor(
    private readonly getStudentDossier: GetStudentDossier,
    private readonly languageModel: LanguageModel,
    private readonly nextLessonPlanRepository: NextLessonPlanRepository,
  ) {}

  async execute(
    input: GeneratePracticeFromNextLessonPlanInput,
  ): Promise<GeneratePracticeFromNextLessonPlanResult> {
    const dossierResult = this.getStudentDossier.execute({
      teacherUserId: input.teacherUserId,
      studentId: input.studentId,
      lessonReportsLimit: LESSON_REPORTS_LIMIT,
    });

    if (dossierResult.kind === GetStudentDossierResultKind.TEACHER_NOT_FOUND) {
      return {
        kind: GeneratePracticeFromNextLessonPlanResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (
      dossierResult.kind === GetStudentDossierResultKind.USER_IS_NOT_TEACHER
    ) {
      return {
        kind: GeneratePracticeFromNextLessonPlanResultKind.USER_IS_NOT_TEACHER,
      };
    }

    if (dossierResult.kind === GetStudentDossierResultKind.STUDENT_NOT_FOUND) {
      return {
        kind: GeneratePracticeFromNextLessonPlanResultKind.STUDENT_NOT_FOUND,
      };
    }

    const latestPlan = this.nextLessonPlanRepository.findLatestByStudentId(
      input.studentId,
    );

    if (!latestPlan) {
      return {
        kind: GeneratePracticeFromNextLessonPlanResultKind.NEXT_LESSON_PLAN_NOT_FOUND,
      };
    }

    const dossierTextSnapshot = buildTextSnapshot(dossierResult.dossier);
    const rebuiltPlanPrompt = buildPlanPrompt(
      dossierTextSnapshot,
      latestPlan.mode,
    );

    if (
      !latestPlan.sourcePrompt ||
      latestPlan.sourcePrompt !== rebuiltPlanPrompt
    ) {
      return {
        kind: GeneratePracticeFromNextLessonPlanResultKind.NEXT_LESSON_PLAN_OUTDATED,
      };
    }

    const prompt = buildPrompt(
      dossierTextSnapshot,
      latestPlan.content,
      input.mode,
    );
    const temperature = getTemperature(input.mode);

    const result = await this.languageModel.generateText({
      messages: [
        {
          role: LanguageModelMessageRole.User,
          text: prompt,
        },
      ],
      temperature,
      maxTokens: MAX_TOKENS_TO_GENERATE,
    });

    return {
      kind: GeneratePracticeFromNextLessonPlanResultKind.GENERATED,
      text: result.text,
    };
  }
}

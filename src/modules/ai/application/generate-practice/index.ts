import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import type { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import type { GeneratePracticeInput, GeneratePracticeResult } from "./types";
import { GeneratePracticeResultKind } from "./constants";
import { buildPrompt } from "./lib/prompt";
import { getTemperature } from "./lib/temperature";
import { buildTextSnapshot } from "@/modules/students/application/get-student-dossier/lib/build-text-snapshot";

const LESSON_REPORTS_LIMIT = 5;
const MAX_TOKENS_TO_GENERATE = 800;

export class GeneratePractice {
  constructor(
    private readonly getStudentDossier: GetStudentDossier,
    private readonly languageModel: LanguageModel,
  ) {}

  async execute(input: GeneratePracticeInput): Promise<GeneratePracticeResult> {
    const dossierResult = this.getStudentDossier.execute({
      teacherUserId: input.teacherUserId,
      studentId: input.studentId,
      lessonReportsLimit: LESSON_REPORTS_LIMIT,
    });

    if (dossierResult.kind === GetStudentDossierResultKind.TEACHER_NOT_FOUND) {
      return {
        kind: GeneratePracticeResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (
      dossierResult.kind === GetStudentDossierResultKind.USER_IS_NOT_TEACHER
    ) {
      return {
        kind: GeneratePracticeResultKind.USER_IS_NOT_TEACHER,
      };
    }

    if (dossierResult.kind === GetStudentDossierResultKind.STUDENT_NOT_FOUND) {
      return {
        kind: GeneratePracticeResultKind.STUDENT_NOT_FOUND,
      };
    }

    const dossierTextSnapshot = buildTextSnapshot(dossierResult.dossier);
    const prompt = buildPrompt(dossierTextSnapshot, input.mode);
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
      kind: GeneratePracticeResultKind.GENERATED,
      text: result.text,
    };
  }
}

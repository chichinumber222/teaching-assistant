import type { LanguageModel } from "@/modules/ai/domain/language-model";
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import type { GetStudentContext } from "@/modules/students/application/get-student-context";
import { GetStudentContextResultKind } from "@/modules/students/application/get-student-context/constants";
import type {
  GenerateNextLessonPlanInput,
  GenerateNextLessonPlanResult,
} from "./types";
import { GenerateNextLessonPlanResultKind } from "./constants";
import { buildPrompt } from "./lib/build-prompt";
import { buildTextSnapshot } from "@/modules/students/application/get-student-context/lib/build-text-snapshot"

export class GenerateNextLessonPlan {
  constructor(
    private readonly getStudentContext: GetStudentContext,
    private readonly languageModel: LanguageModel,
  ) {}

  async execute(
    input: GenerateNextLessonPlanInput,
  ): Promise<GenerateNextLessonPlanResult> {
    const contextResult = this.getStudentContext.execute({
      teacherUserId: input.teacherUserId,
      studentId: input.studentId,
      lessonReportsLimit: 3,
    });

    if (contextResult.kind === GetStudentContextResultKind.TEACHER_NOT_FOUND) {
      return {
        kind: GenerateNextLessonPlanResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (
      contextResult.kind === GetStudentContextResultKind.USER_IS_NOT_TEACHER
    ) {
      return {
        kind: GenerateNextLessonPlanResultKind.USER_IS_NOT_TEACHER,
      };
    }

    if (contextResult.kind === GetStudentContextResultKind.STUDENT_NOT_FOUND) {
      return {
        kind: GenerateNextLessonPlanResultKind.STUDENT_NOT_FOUND,
      };
    }

    const prompt = buildPrompt(buildTextSnapshot(contextResult.context));

    const result = await this.languageModel.generateText({
      messages: [
        {
          role: LanguageModelMessageRole.User,
          text: prompt,
        },
      ],
      temperature: 0.3,
      maxTokens: 700,
    });

    return {
      kind: GenerateNextLessonPlanResultKind.GENERATED,
      text: result.text,
    };
  }
}

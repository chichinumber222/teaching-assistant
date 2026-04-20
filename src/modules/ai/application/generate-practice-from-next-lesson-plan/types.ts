import { GenerationMode } from "@/modules/ai/domain/generation-mode";
import { GeneratePracticeFromNextLessonPlanResultKind } from "./constants";

export type GeneratePracticeFromNextLessonPlanInput = {
  teacherUserId: string;
  studentId: string;
  sourcePlanId: string;
  mode: GenerationMode;
};

export type GeneratePracticeFromNextLessonPlanResult =
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.GENERATED;
      text: string;
    }
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.STUDENT_NOT_FOUND;
    }
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.NEXT_LESSON_PLAN_NOT_FOUND;
    }
  | {
      kind: GeneratePracticeFromNextLessonPlanResultKind.NEXT_LESSON_PLAN_OUTDATED;
    };

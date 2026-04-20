import { GenerateNextLessonPlanResultKind } from "./constants";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export type GenerateNextLessonPlanInput = {
  teacherUserId: string;
  studentId: string;
  mode: GenerationMode;
};

export type GenerateNextLessonPlanResult =
  | {
      kind: GenerateNextLessonPlanResultKind.GENERATED;
      text: string;
      planId: string;
    }
  | {
      kind: GenerateNextLessonPlanResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GenerateNextLessonPlanResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GenerateNextLessonPlanResultKind.STUDENT_NOT_FOUND;
    };

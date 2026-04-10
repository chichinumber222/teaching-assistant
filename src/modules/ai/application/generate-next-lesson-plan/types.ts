import { GenerateNextLessonPlanResultKind, type NextLessonPlanMode } from "./constants";

export type GenerateNextLessonPlanInput = {
  teacherUserId: string;
  studentId: string;
  mode: NextLessonPlanMode;
};

export type GenerateNextLessonPlanResult =
  | {
      kind: GenerateNextLessonPlanResultKind.GENERATED;
      text: string;
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

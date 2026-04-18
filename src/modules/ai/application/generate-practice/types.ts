import { GeneratePracticeResultKind, type PracticeMode } from "./constants";

export type GeneratePracticeInput = {
  teacherUserId: string;
  studentId: string;
  mode: PracticeMode;
};

export type GeneratePracticeResult =
  | {
      kind: GeneratePracticeResultKind.GENERATED;
      text: string;
    }
  | {
      kind: GeneratePracticeResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GeneratePracticeResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GeneratePracticeResultKind.STUDENT_NOT_FOUND;
    };

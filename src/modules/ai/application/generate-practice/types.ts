import { GenerationMode } from "@/modules/ai/domain/generation-mode";
import { GeneratePracticeResultKind } from "./constants";

export type GeneratePracticeInput = {
  teacherUserId: string;
  studentId: string;
  mode: GenerationMode;
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

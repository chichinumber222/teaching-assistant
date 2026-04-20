import { GenerationMode } from "@/modules/ai/domain/generation-mode";
import { GenerateTaskExamplesResultKind } from "./constants";

export type GenerateTaskExamplesInput = {
  teacherUserId: string;
  studentId: string;
  mode: GenerationMode;
};

export type GenerateTaskExamplesResult =
  | {
      kind: GenerateTaskExamplesResultKind.GENERATED;
      text: string;
    }
  | {
      kind: GenerateTaskExamplesResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GenerateTaskExamplesResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GenerateTaskExamplesResultKind.STUDENT_NOT_FOUND;
    }
  | {
      kind: GenerateTaskExamplesResultKind.NEXT_LESSON_PLAN_NOT_FOUND;
    }
  | {
      kind: GenerateTaskExamplesResultKind.NEXT_LESSON_PLAN_OUTDATED;
    };

import type { Student } from "@/modules/students/domain/student";
import { ListStudentsResultKind } from "./constants";

export type ListStudentsInput = {
  teacherUserId: string;
};

export type ListStudentsResult =
  | {
      kind: ListStudentsResultKind.LISTED;
      students: Student[];
    }
  | {
      kind: ListStudentsResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: ListStudentsResultKind.USER_IS_NOT_TEACHER;
    };
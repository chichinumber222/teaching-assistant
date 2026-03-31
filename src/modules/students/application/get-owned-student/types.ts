import type { Student } from "@/modules/students/domain/student";
import { GetOwnedStudentResultKind } from "./constants";

export type GetOwnedStudentInput = {
  teacherUserId: string;
  studentId: string;
};

export type GetOwnedStudentResult =
  | {
      kind: GetOwnedStudentResultKind.FOUND;
      student: Student;
    }
  | {
      kind: GetOwnedStudentResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GetOwnedStudentResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GetOwnedStudentResultKind.STUDENT_NOT_FOUND;
    };

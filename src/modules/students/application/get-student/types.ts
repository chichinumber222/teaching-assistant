import type { Student } from "@/modules/students/domain/student";
import { GetStudentResultKind } from "./constants";

export type GetStudentInput = {
  teacherUserId: string;
  studentId: string;
};

export type GetStudentResult =
  | {
      kind: GetStudentResultKind.FOUND;
      student: Student;
    }
  | {
      kind: GetStudentResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GetStudentResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GetStudentResultKind.STUDENT_NOT_FOUND;
    };

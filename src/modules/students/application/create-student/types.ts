import type { Student } from "@/modules/students/domain/student";
import { CreateStudentResultKind } from "./constants";

export type CreateStudentInput = {
  teacherUserId: string;
  fullName: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
};

export type CreateStudentResult =
  | {
      kind: CreateStudentResultKind.CREATED;
      student: Student;
    }
  | {
      kind: CreateStudentResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: CreateStudentResultKind.USER_IS_NOT_TEACHER;
    };
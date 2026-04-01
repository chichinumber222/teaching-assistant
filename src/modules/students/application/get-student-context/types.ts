import type { Student } from "@/modules/students/domain/student";
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { GetStudentContextResultKind } from "./constants";

export type StudentContext = {
  student: Student;
  lessonReports: LessonReport[];
};

export type GetStudentContextInput = {
  teacherUserId: string;
  studentId: string;
  lessonReportsLimit: number;
};

export type GetStudentContextResult =
  | {
      kind: GetStudentContextResultKind.FOUND;
      context: StudentContext;
    }
  | {
      kind: GetStudentContextResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GetStudentContextResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GetStudentContextResultKind.STUDENT_NOT_FOUND;
    };

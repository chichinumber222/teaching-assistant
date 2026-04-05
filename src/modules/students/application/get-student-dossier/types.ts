import type { Student } from "@/modules/students/domain/student";
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { GetStudentDossierResultKind } from "./constants";

export type StudentDossier = {
  student: Student;
  lessonReports: LessonReport[];
};

export type GetStudentDossierInput = {
  teacherUserId: string;
  studentId: string;
  lessonReportsLimit: number;
};

export type GetStudentDossierResult =
  | {
      kind: GetStudentDossierResultKind.FOUND;
      dossier: StudentDossier;
    }
  | {
      kind: GetStudentDossierResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GetStudentDossierResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GetStudentDossierResultKind.STUDENT_NOT_FOUND;
    };
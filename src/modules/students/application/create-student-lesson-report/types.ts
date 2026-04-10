import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { CreateStudentLessonReportResultKind } from "./constants";

export type CreateStudentLessonReportInput = {
  teacherUserId: string;
  studentId: string;
  lessonAt: string;
  lessonFocus: string;
  difficulties: string;
  teacherComment: string | null;
};

export type CreateStudentLessonReportResult =
  | {
      kind: CreateStudentLessonReportResultKind.CREATED;
      lessonReport: LessonReport;
    }
  | {
      kind: CreateStudentLessonReportResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: CreateStudentLessonReportResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: CreateStudentLessonReportResultKind.STUDENT_NOT_FOUND;
    };
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { GetLessonReportResultKind } from "./constants";

export type GetLessonReportInput = {
  teacherUserId: string;
  studentId: string;
  lessonReportId: string;
};

export type GetLessonReportResult =
  | {
      kind: GetLessonReportResultKind.FOUND;
      lessonReport: LessonReport;
    }
  | {
      kind: GetLessonReportResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: GetLessonReportResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: GetLessonReportResultKind.STUDENT_NOT_FOUND;
    }
  | {
      kind: GetLessonReportResultKind.LESSON_REPORT_NOT_FOUND;
    };

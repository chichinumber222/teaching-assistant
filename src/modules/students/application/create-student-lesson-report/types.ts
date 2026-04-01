import type { LessonReport } from "@/modules/students/domain/lesson-report";
import type { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import type { HomeworkStatus } from "@/modules/students/domain/homework-status";
import { CreateStudentLessonReportResultKind } from "./constants";

export type CreateStudentLessonReportInput = {
  teacherUserId: string;
  studentId: string;
  lessonAt: string;
  lessonPlan: string;
  uncompletedPlannedWork: string | null;
  understandingLevel: UnderstandingLevel;
  whatWentWell: string | null;
  difficulties: string | null;
  homeworkStatus: HomeworkStatus;
  homeworkComment: string | null;
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
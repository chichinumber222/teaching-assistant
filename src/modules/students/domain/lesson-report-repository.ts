import type { LessonReport } from "./lesson-report";
import type { UnderstandingLevel } from "./understanding-level";
import type { HomeworkStatus } from "./homework-status";

export type CreateLessonReportData = {
  studentId: string;
  lessonAt: string;
  lessonPlan: string;
  uncompletedPlannedWork: string | null;
  understandingLevel: UnderstandingLevel;
  whatWentWell: string | null;
  difficulties: string | null;
  homeworkStatus: HomeworkStatus;
  teacherComment: string | null;
};

export interface LessonReportRepository {
  findManyByStudentId(studentId: string): LessonReport[];
  findManyRecentByStudentId(studentId: string, limit: number): LessonReport[];
  create(data: CreateLessonReportData): LessonReport;
}

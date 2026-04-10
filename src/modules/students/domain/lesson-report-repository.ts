import type { LessonReport } from "./lesson-report";

export type CreateLessonReportData = {
  studentId: string;
  lessonAt: string;
  lessonFocus: string;
  difficulties: string;
  teacherComment: string | null;
};

export interface LessonReportRepository {
  findManyByStudentId(studentId: string): LessonReport[];
  findManyRecentByStudentId(studentId: string, limit: number): LessonReport[];
  create(data: CreateLessonReportData): LessonReport;
  findById(id: string): LessonReport | null;
}

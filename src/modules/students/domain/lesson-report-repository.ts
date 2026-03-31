import type { LessonReport } from "./lesson-report";
import type { UnderstandingLevel } from "./understanding-level";
import type { ParticipationLevel } from "./participation-level";
import type { HomeworkStatus } from "./homework-status";

export type CreateLessonReportData = {
  studentId: string;
  lessonAt: string;
  topic: string;
  understandingLevel: UnderstandingLevel;
  participationLevel: ParticipationLevel;
  whatWentWell: string | null;
  difficulties: string | null;
  homeworkAssigned: string | null;
  homeworkStatus: HomeworkStatus;
  nextLessonFocus: string | null;
  teacherComment: string | null;
};

export interface LessonReportRepository {
  findManyByStudentId(studentId: string): LessonReport[];
  create(data: CreateLessonReportData): LessonReport;
}
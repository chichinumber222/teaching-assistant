import type { UnderstandingLevel } from "./understanding-level";
import type { HomeworkStatus } from "./homework-status";

export type LessonReport = {
  id: string;
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
  createdAt: string;
  updatedAt: string;
};

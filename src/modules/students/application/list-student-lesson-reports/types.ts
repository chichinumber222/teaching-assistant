import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { ListStudentLessonReportsResultKind } from "./constants";

export type ListStudentLessonReportsInput = {
  teacherUserId: string;
  studentId: string;
};

export type ListStudentLessonReportsResult =
  | {
      kind: ListStudentLessonReportsResultKind.LISTED;
      lessonReports: LessonReport[];
    }
  | {
      kind: ListStudentLessonReportsResultKind.TEACHER_NOT_FOUND;
    }
  | {
      kind: ListStudentLessonReportsResultKind.USER_IS_NOT_TEACHER;
    }
  | {
      kind: ListStudentLessonReportsResultKind.STUDENT_NOT_FOUND;
    };
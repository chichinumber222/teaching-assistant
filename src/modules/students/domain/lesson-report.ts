export type LessonReport = {
  id: string;
  studentId: string;
  lessonAt: string;
  lessonFocus: string;
  difficulties: string;
  teacherComment: string | null;
  createdAt: string;
  updatedAt: string;
};
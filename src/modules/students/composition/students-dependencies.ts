import { SqliteLessonReportRepository } from "@/modules/students/infrastructure/server/sqlite-lesson-report-repository"
import { SqliteStudentRepository } from "@/modules/students/infrastructure/server/sqlite-student-repository";

export function getStudentsDependencies() {
  const studentRepository = new SqliteStudentRepository();
  const lessonReportRepository = new SqliteLessonReportRepository();

  return { studentRepository, lessonReportRepository };
}

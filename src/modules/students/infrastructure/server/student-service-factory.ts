import { SqliteUserRepository } from "@/modules/auth/infrastructure/server/sqlite-user-repository";
import { SqliteLessonReportRepository } from "./sqlite-lesson-report-repository";
import { SqliteStudentRepository } from "./sqlite-student-repository";
import { CreateStudent } from "@/modules/students/application/create-student";
import { GetOwnedStudent } from "@/modules/students/application/get-owned-student";
import { CreateStudentLessonReport } from "@/modules/students/application/create-student-lesson-report";
import { ListStudents } from "@/modules/students/application/list-students";
import { ListStudentLessonReports } from "@/modules/students/application/list-student-lesson-reports";
import { GetStudentContext } from "@/modules/students/application/get-student-context";

export function createStudentsServices() {
  const studentRepository = new SqliteStudentRepository();
  const lessonReportRepository = new SqliteLessonReportRepository();
  const userRepository = new SqliteUserRepository();

  const createStudent = new CreateStudent(userRepository, studentRepository);
  const getOwnedStudent = new GetOwnedStudent(
    userRepository,
    studentRepository,
  );
  const listStudents = new ListStudents(userRepository, studentRepository);
  const createStudentLessonReport = new CreateStudentLessonReport(
    userRepository,
    studentRepository,
    lessonReportRepository,
  );
  const listStudentLessonReports = new ListStudentLessonReports(
    userRepository,
    studentRepository,
    lessonReportRepository,
  );
  const getStudentContext = new GetStudentContext(
    userRepository,
    studentRepository,
    lessonReportRepository,
  );

  return {
    createStudent,
    createStudentLessonReport,
    getOwnedStudent,
    listStudents,
    listStudentLessonReports,
    getStudentContext,
  };
}

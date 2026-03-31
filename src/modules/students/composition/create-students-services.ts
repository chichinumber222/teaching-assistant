import { CreateStudent } from "@/modules/students/application/create-student";
import { GetOwnedStudent } from "@/modules/students/application/get-owned-student";
import { CreateStudentLessonReport } from "@/modules/students/application/create-student-lesson-report";
import { ListStudents } from "@/modules/students/application/list-students";
import { ListStudentLessonReports } from "@/modules/students/application/list-student-lesson-reports";
import { GetStudentContext } from "@/modules/students/application/get-student-context";
import { StudentRepository } from "@/modules/students/domain/student-repository";
import { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import { UserRepository } from "@/modules/auth/domain/user-repository";

export type StudentsDependencies = {
  studentRepository: StudentRepository;
  lessonReportRepository: LessonReportRepository;
  userRepository: UserRepository;
};

export function createStudentsServices(deps: StudentsDependencies) {
  const { studentRepository, lessonReportRepository, userRepository } = deps;

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

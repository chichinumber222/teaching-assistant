import { CreateStudent } from "@/modules/students/application/create-student";
import { CreateStudentLessonReport } from "@/modules/students/application/create-student-lesson-report";
import { ListStudents } from "@/modules/students/application/list-students";
import { ListStudentLessonReports } from "@/modules/students/application/list-student-lesson-reports";
import { GetStudentDossier } from "@/modules/students/application/get-student-dossier";
import { StudentRepository } from "@/modules/students/domain/student-repository";
import { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import { UserRepository } from "@/modules/auth/domain/user-repository";
import { GetStudent } from "@/modules/students/application/get-student"
import { GetLessonReport } from "@/modules/students/application/get-lesson-report"

export type StudentsDependencies = {
  studentRepository: StudentRepository;
  lessonReportRepository: LessonReportRepository;
  userRepository: UserRepository;
};

export function createStudentsServices(deps: StudentsDependencies) {
  const { studentRepository, lessonReportRepository, userRepository } = deps;

  const createStudent = new CreateStudent(userRepository, studentRepository);
  const getStudentDossier = new GetStudentDossier(
    userRepository,
    studentRepository,
    lessonReportRepository,
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
  const getStudent = new GetStudent(userRepository, studentRepository);
  const getLessonReport = new GetLessonReport(
    userRepository,
    studentRepository,
    lessonReportRepository,
  );

  return {
    createStudent,
    createStudentLessonReport,
    listStudents,
    listStudentLessonReports,
    getStudentDossier,
    getStudent,
    getLessonReport,
  };
}

import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import type { GetStudentDossierInput, GetStudentDossierResult } from "./types";
import { GetStudentDossierResultKind } from "./constants";

export class GetStudentDossier {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly lessonReportRepository: LessonReportRepository,
  ) {}

  execute(input: GetStudentDossierInput): GetStudentDossierResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: GetStudentDossierResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: GetStudentDossierResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: GetStudentDossierResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: GetStudentDossierResultKind.STUDENT_NOT_FOUND,
      };
    }

    const lessonReports = this.lessonReportRepository.findManyRecentByStudentId(
      input.studentId,
      input.lessonReportsLimit,
    );

    return {
      kind: GetStudentDossierResultKind.FOUND,
      dossier: {
        student,
        lessonReports,
      },
    };
  }
}

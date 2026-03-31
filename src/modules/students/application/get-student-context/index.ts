import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import type {
  GetStudentContextInput,
  GetStudentContextResult,
} from "./types";
import { GetStudentContextResultKind } from "./constants";

export class GetStudentContext {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly lessonReportRepository: LessonReportRepository,
  ) {}

  execute(input: GetStudentContextInput): GetStudentContextResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: GetStudentContextResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: GetStudentContextResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: GetStudentContextResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: GetStudentContextResultKind.STUDENT_NOT_FOUND,
      };
    }

    const lessonReports = this.lessonReportRepository.findManyByStudentId(
      input.studentId,
    );

    return {
      kind: GetStudentContextResultKind.FOUND,
      context: {
        student,
        lessonReports,
      },
    };
  }
}
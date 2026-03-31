import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import type {
  ListStudentLessonReportsInput,
  ListStudentLessonReportsResult,
} from "./types";
import { ListStudentLessonReportsResultKind } from "./constants";

export class ListStudentLessonReports {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly lessonReportRepository: LessonReportRepository,
  ) {}

  execute(
    input: ListStudentLessonReportsInput,
  ): ListStudentLessonReportsResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: ListStudentLessonReportsResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: ListStudentLessonReportsResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: ListStudentLessonReportsResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: ListStudentLessonReportsResultKind.STUDENT_NOT_FOUND,
      };
    }

    const lessonReports = this.lessonReportRepository.findManyByStudentId(
      input.studentId,
    );

    return {
      kind: ListStudentLessonReportsResultKind.LISTED,
      lessonReports,
    };
  }
}

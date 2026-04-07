import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import type { GetLessonReportInput, GetLessonReportResult } from "./types";
import { GetLessonReportResultKind } from "./constants";
import { UserRole } from "@/modules/auth/domain/user-role";

export class GetLessonReport {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly lessonReportRepository: LessonReportRepository,
  ) {}

  execute(input: GetLessonReportInput): GetLessonReportResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: GetLessonReportResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: GetLessonReportResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: GetLessonReportResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: GetLessonReportResultKind.STUDENT_NOT_FOUND,
      };
    }

    const lessonReport = this.lessonReportRepository.findById(
      input.lessonReportId,
    );

    if (!lessonReport) {
      return {
        kind: GetLessonReportResultKind.LESSON_REPORT_NOT_FOUND,
      };
    }

    if (lessonReport.studentId !== input.studentId) {
      return {
        kind: GetLessonReportResultKind.LESSON_REPORT_NOT_FOUND,
      };
    }

    return {
      kind: GetLessonReportResultKind.FOUND,
      lessonReport,
    };
  }
}

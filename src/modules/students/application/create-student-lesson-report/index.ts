import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { LessonReportRepository } from "@/modules/students/domain/lesson-report-repository";
import type {
  CreateStudentLessonReportInput,
  CreateStudentLessonReportResult,
} from "./types";
import { CreateStudentLessonReportResultKind } from "./constants";

export class CreateStudentLessonReport {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly lessonReportRepository: LessonReportRepository,
  ) {}

  execute(input: CreateStudentLessonReportInput): CreateStudentLessonReportResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: CreateStudentLessonReportResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: CreateStudentLessonReportResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: CreateStudentLessonReportResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: CreateStudentLessonReportResultKind.STUDENT_NOT_FOUND,
      };
    }

    const lessonReport = this.lessonReportRepository.create({
      studentId: input.studentId,
      lessonAt: input.lessonAt,
      lessonPlan: input.lessonPlan,
      uncompletedPlannedWork: input.uncompletedPlannedWork,
      understandingLevel: input.understandingLevel,
      whatWentWell: input.whatWentWell,
      difficulties: input.difficulties,
      homeworkStatus: input.homeworkStatus,
      teacherComment: input.teacherComment,
    });

    return {
      kind: CreateStudentLessonReportResultKind.CREATED,
      lessonReport,
    };
  }
}
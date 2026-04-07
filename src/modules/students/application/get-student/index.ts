import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { GetStudentInput, GetStudentResult } from "./types";
import { GetStudentResultKind } from "./constants";

export class GetStudent {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  execute(input: GetStudentInput): GetStudentResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: GetStudentResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: GetStudentResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: GetStudentResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: GetStudentResultKind.STUDENT_NOT_FOUND,
      };
    }

    return {
      kind: GetStudentResultKind.FOUND,
      student,
    };
  }
}

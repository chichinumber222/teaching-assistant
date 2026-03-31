import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { GetOwnedStudentInput, GetOwnedStudentResult } from "./types";
import { GetOwnedStudentResultKind } from "./constants";

export class GetOwnedStudent {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  execute(input: GetOwnedStudentInput): GetOwnedStudentResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: GetOwnedStudentResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: GetOwnedStudentResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.findById(input.studentId);

    if (!student) {
      return {
        kind: GetOwnedStudentResultKind.STUDENT_NOT_FOUND,
      };
    }

    if (student.teacherUserId !== input.teacherUserId) {
      return {
        kind: GetOwnedStudentResultKind.STUDENT_NOT_FOUND,
      };
    }

    return {
      kind: GetOwnedStudentResultKind.FOUND,
      student,
    };
  }
}
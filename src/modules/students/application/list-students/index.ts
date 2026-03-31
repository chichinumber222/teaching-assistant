import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { ListStudentsInput, ListStudentsResult } from "./types";
import { ListStudentsResultKind } from "./constants";

export class ListStudents {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  execute(input: ListStudentsInput): ListStudentsResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: ListStudentsResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: ListStudentsResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const students = this.studentRepository.findManyByTeacherUserId(
      input.teacherUserId,
    );

    return {
      kind: ListStudentsResultKind.LISTED,
      students,
    };
  }
}
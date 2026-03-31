import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { UserRole } from "@/modules/auth/domain/user-role";
import type { StudentRepository } from "@/modules/students/domain/student-repository";
import type { CreateStudentInput, CreateStudentResult } from "./types";
import { CreateStudentResultKind } from "./constants";

export class CreateStudent {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  execute(input: CreateStudentInput): CreateStudentResult {
    const teacher = this.userRepository.findById(input.teacherUserId);

    if (!teacher) {
      return {
        kind: CreateStudentResultKind.TEACHER_NOT_FOUND,
      };
    }

    if (teacher.role !== UserRole.Teacher) {
      return {
        kind: CreateStudentResultKind.USER_IS_NOT_TEACHER,
      };
    }

    const student = this.studentRepository.create({
      teacherUserId: input.teacherUserId,
      fullName: input.fullName,
      subject: input.subject,
      level: input.level,
      goals: input.goals,
      notes: input.notes,
    });

    return {
      kind: CreateStudentResultKind.CREATED,
      student,
    };
  }
}
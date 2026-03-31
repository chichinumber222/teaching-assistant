import type { Student } from "./student";

export type CreateStudentData = {
  teacherUserId: string;
  fullName: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
};

export type UpdateStudentData = {
  fullName: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
};

export interface StudentRepository {
  findById(id: string): Student | null;
  findManyByTeacherUserId(teacherUserId: string): Student[];
  create(data: CreateStudentData): Student;
  update(id: string, data: UpdateStudentData): boolean;
}
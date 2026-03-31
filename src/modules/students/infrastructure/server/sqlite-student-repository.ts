import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

import type { Student } from "@/modules/students/domain/student";
import type {
  CreateStudentData,
  StudentRepository,
  UpdateStudentData,
} from "@/modules/students/domain/student-repository";

type StudentRow = {
  id: string;
  teacher_user_id: string;
  full_name: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function mapRowToStudent(row: StudentRow): Student {
  return {
    id: row.id,
    teacherUserId: row.teacher_user_id,
    fullName: row.full_name,
    subject: row.subject,
    level: row.level,
    goals: row.goals,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SqliteStudentRepository implements StudentRepository {
  findById(id: string): Student | null {
    const statement = db.prepare<[string], StudentRow>(
      `
        SELECT
          id,
          teacher_user_id,
          full_name,
          subject,
          level,
          goals,
          notes,
          created_at,
          updated_at
        FROM students
        WHERE id = ?
      `,
    );

    const row = statement.get(id);

    if (!row) {
      return null;
    }

    return mapRowToStudent(row);
  }

  findManyByTeacherUserId(teacherUserId: string): Student[] {
    const statement = db.prepare<[string], StudentRow>(
      `
        SELECT
          id,
          teacher_user_id,
          full_name,
          subject,
          level,
          goals,
          notes,
          created_at,
          updated_at
        FROM students
        WHERE teacher_user_id = ?
      `,
    );

    const rows = statement.all(teacherUserId);

    return rows.map(mapRowToStudent);
  }

  create(data: CreateStudentData): Student {
    const id = randomUUID();
    const now = new Date().toISOString();

    const statement = db.prepare(
      `
        INSERT INTO students (
          id,
          teacher_user_id,
          full_name,
          subject,
          level,
          goals,
          notes,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    );

    statement.run(
      id,
      data.teacherUserId,
      data.fullName,
      data.subject,
      data.level,
      data.goals,
      data.notes,
      now,
      now,
    );

    return {
      id,
      teacherUserId: data.teacherUserId,
      fullName: data.fullName,
      subject: data.subject,
      level: data.level,
      goals: data.goals,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };
  }

  update(id: string, data: UpdateStudentData): boolean {
    const updatedAt = new Date().toISOString();

    const statement = db.prepare<
      [
        string,
        string,
        string | null,
        string | null,
        string | null,
        string,
        string,
      ]
    >(
      `
        UPDATE students
        SET
          full_name = ?,
          subject = ?,
          level = ?,
          goals = ?,
          notes = ?,
          updated_at = ?
        WHERE id = ?
      `,
    );

    const result = statement.run(
      data.fullName,
      data.subject,
      data.level,
      data.goals,
      data.notes,
      updatedAt,
      id,
    );

    return result.changes > 0;
  }
}

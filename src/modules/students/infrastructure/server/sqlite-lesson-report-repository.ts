import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

import type { LessonReport } from "@/modules/students/domain/lesson-report";
import type {
  CreateLessonReportData,
  LessonReportRepository,
} from "@/modules/students/domain/lesson-report-repository";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { HomeworkStatus } from "@/modules/students/domain/homework-status";

type LessonReportRow = {
  id: string;
  student_id: string;
  lesson_at: string;
  lesson_plan: string;
  uncompleted_planned_work: string | null;
  understanding_level: UnderstandingLevel;
  what_went_well: string | null;
  difficulties: string | null;
  homework_status: HomeworkStatus;
  teacher_comment: string | null;
  created_at: string;
  updated_at: string;
};

function mapRowToLessonReport(row: LessonReportRow): LessonReport {
  return {
    id: row.id,
    studentId: row.student_id,
    lessonAt: row.lesson_at,
    lessonFocus: row.lesson_plan,
    difficulties: row.difficulties ?? "",
    teacherComment: row.teacher_comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SqliteLessonReportRepository implements LessonReportRepository {
  findById(id: string): LessonReport | null {
    const statement = db.prepare<[string], LessonReportRow>(
      `
        SELECT
          id,
          student_id,
          lesson_at,
          lesson_plan,
          uncompleted_planned_work,
          understanding_level,
          what_went_well,
          difficulties,
          homework_status,
          teacher_comment,
          created_at,
          updated_at
        FROM lesson_reports
        WHERE id = ?
      `,
    );

    const row = statement.get(id);

    if (!row) {
      return null;
    }

    return mapRowToLessonReport(row);
  }

  findManyByStudentId(studentId: string): LessonReport[] {
    const statement = db.prepare<[string], LessonReportRow>(
      `
        SELECT
          id,
          student_id,
          lesson_at,
          lesson_plan,
          uncompleted_planned_work,
          understanding_level,
          what_went_well,
          difficulties,
          homework_status,
          teacher_comment,
          created_at,
          updated_at
        FROM lesson_reports
        WHERE student_id = ?
        ORDER BY lesson_at DESC, created_at DESC
      `,
    );

    const rows = statement.all(studentId);

    return rows.map(mapRowToLessonReport);
  }

  findManyRecentByStudentId(studentId: string, limit: number): LessonReport[] {
    const statement = db.prepare<[string, number], LessonReportRow>(
      `
        SELECT
          id,
          student_id,
          lesson_at,
          lesson_plan,
          uncompleted_planned_work,
          understanding_level,
          what_went_well,
          difficulties,
          homework_status,
          teacher_comment,
          created_at,
          updated_at
        FROM lesson_reports
        WHERE student_id = ?
        ORDER BY lesson_at DESC, created_at DESC
        LIMIT ?
    `,
    );

    const rows = statement.all(studentId, limit);

    return rows.map(mapRowToLessonReport);
  }

  create(data: CreateLessonReportData): LessonReport {
    const id = randomUUID();
    const now = new Date().toISOString();

    const legacyUnderstandingLevel: UnderstandingLevel = UnderstandingLevel.Medium;
    const legacyHomeworkStatus: HomeworkStatus = HomeworkStatus.NotAssigned;

    const statement = db.prepare<
      [
        string,
        string,
        string,
        string,
        string | null,
        UnderstandingLevel,
        string | null,
        string,
        HomeworkStatus,
        string | null,
        string,
        string,
      ]
    >(
      `
      INSERT INTO lesson_reports (
        id,
        student_id,
        lesson_at,
        lesson_plan,
        uncompleted_planned_work,
        understanding_level,
        what_went_well,
        difficulties,
        homework_status,
        teacher_comment,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    );

    statement.run(
      id,
      data.studentId,
      data.lessonAt,
      data.lessonFocus,
      null,
      legacyUnderstandingLevel,
      null,
      data.difficulties,
      legacyHomeworkStatus,
      data.teacherComment,
      now,
      now,
    );

    return {
      id,
      studentId: data.studentId,
      lessonAt: data.lessonAt,
      lessonFocus: data.lessonFocus,
      difficulties: data.difficulties,
      teacherComment: data.teacherComment,
      createdAt: now,
      updatedAt: now,
    };
  }
}

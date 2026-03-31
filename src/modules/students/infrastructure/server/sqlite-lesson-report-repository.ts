import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

import type { LessonReport } from "@/modules/students/domain/lesson-report";
import type {
  CreateLessonReportData,
  LessonReportRepository,
} from "@/modules/students/domain/lesson-report-repository";
import type { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import type { ParticipationLevel } from "@/modules/students/domain/participation-level";
import type { HomeworkStatus } from "@/modules/students/domain/homework-status";

type LessonReportRow = {
  id: string;
  student_id: string;
  lesson_at: string;
  topic: string;
  understanding_level: UnderstandingLevel;
  participation_level: ParticipationLevel;
  what_went_well: string | null;
  difficulties: string | null;
  homework_assigned: string | null;
  homework_status: HomeworkStatus;
  next_lesson_focus: string | null;
  teacher_comment: string | null;
  created_at: string;
  updated_at: string;
};

function mapRowToLessonReport(row: LessonReportRow): LessonReport {
  return {
    id: row.id,
    studentId: row.student_id,
    lessonAt: row.lesson_at,
    topic: row.topic,
    understandingLevel: row.understanding_level,
    participationLevel: row.participation_level,
    whatWentWell: row.what_went_well,
    difficulties: row.difficulties,
    homeworkAssigned: row.homework_assigned,
    homeworkStatus: row.homework_status,
    nextLessonFocus: row.next_lesson_focus,
    teacherComment: row.teacher_comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SqliteLessonReportRepository implements LessonReportRepository {
  findManyByStudentId(studentId: string): LessonReport[] {
    const statement = db.prepare<[string], LessonReportRow>(
      `
        SELECT
          id,
          student_id,
          lesson_at,
          topic,
          understanding_level,
          participation_level,
          what_went_well,
          difficulties,
          homework_assigned,
          homework_status,
          next_lesson_focus,
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

  create(data: CreateLessonReportData): LessonReport {
    const id = randomUUID();
    const now = new Date().toISOString();

    const statement = db.prepare<
      [
        string,
        string,
        string,
        string,
        UnderstandingLevel,
        ParticipationLevel,
        string | null,
        string | null,
        string | null,
        HomeworkStatus,
        string | null,
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
          topic,
          understanding_level,
          participation_level,
          what_went_well,
          difficulties,
          homework_assigned,
          homework_status,
          next_lesson_focus,
          teacher_comment,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    );

    statement.run(
      id,
      data.studentId,
      data.lessonAt,
      data.topic,
      data.understandingLevel,
      data.participationLevel,
      data.whatWentWell,
      data.difficulties,
      data.homeworkAssigned,
      data.homeworkStatus,
      data.nextLessonFocus,
      data.teacherComment,
      now,
      now,
    );

    return {
      id,
      studentId: data.studentId,
      lessonAt: data.lessonAt,
      topic: data.topic,
      understandingLevel: data.understandingLevel,
      participationLevel: data.participationLevel,
      whatWentWell: data.whatWentWell,
      difficulties: data.difficulties,
      homeworkAssigned: data.homeworkAssigned,
      homeworkStatus: data.homeworkStatus,
      nextLessonFocus: data.nextLessonFocus,
      teacherComment: data.teacherComment,
      createdAt: now,
      updatedAt: now,
    };
  }
}

import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

import { GenerationMode } from "@/modules/ai/domain/generation-mode";
import type { NextLessonPlan } from "@/modules/ai/domain/next-lesson-plan";
import type {
  CreateNextLessonPlanData,
  NextLessonPlanRepository,
} from "@/modules/ai/domain/next-lesson-plan-repository";

type NextLessonPlanRow = {
  id: string;
  student_id: string;
  mode: GenerationMode;
  content: string;
  source_prompt: string;
  created_at: string;
  updated_at: string;
};

function mapRowToNextLessonPlan(row: NextLessonPlanRow): NextLessonPlan {
  return {
    id: row.id,
    studentId: row.student_id,
    mode: row.mode,
    content: row.content,
    sourcePrompt: row.source_prompt,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SqliteNextLessonPlanRepository implements NextLessonPlanRepository {
  findById(id: string): NextLessonPlan | null {
    const statement = db.prepare<[string], NextLessonPlanRow>(
      `
        SELECT
          id,
          student_id,
          mode,
          content,
          source_prompt,
          created_at,
          updated_at
        FROM next_lesson_plans
        WHERE id = ?
      `,
    );

    const row = statement.get(id);

    if (!row) {
      return null;
    }

    return mapRowToNextLessonPlan(row);
  }

  findLatestByStudentId(studentId: string): NextLessonPlan | null {
    const statement = db.prepare<[string], NextLessonPlanRow>(
      `
        SELECT
          id,
          student_id,
          mode,
          content,
          source_prompt,
          created_at,
          updated_at
        FROM next_lesson_plans
        WHERE student_id = ?
        ORDER BY created_at DESC
        LIMIT 1
      `,
    );

    const row = statement.get(studentId);

    if (!row) {
      return null;
    }

    return mapRowToNextLessonPlan(row);
  }

  create(data: CreateNextLessonPlanData): NextLessonPlan {
    const id = randomUUID();
    const now = new Date().toISOString();

    const statement = db.prepare<
      [string, string, GenerationMode, string, string, string, string]
    >(
      `
        INSERT INTO next_lesson_plans (
          id,
          student_id,
          mode,
          content,
          source_prompt,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
    );

    statement.run(
      id,
      data.studentId,
      data.mode,
      data.content,
      data.sourcePrompt,
      now,
      now,
    );

    return {
      id,
      studentId: data.studentId,
      mode: data.mode,
      content: data.content,
      sourcePrompt: data.sourcePrompt,
      createdAt: now,
      updatedAt: now,
    };
  }
}

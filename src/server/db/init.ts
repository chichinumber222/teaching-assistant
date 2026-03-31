import { db } from "./client";

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('teacher', 'admin')),
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    last_seen_at TEXT NOT NULL,
    revoked_at TEXT,
    ip_address TEXT,
    user_agent TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    teacher_user_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    level TEXT,
    goals TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS lesson_reports (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    lesson_at TEXT NOT NULL,
    topic TEXT NOT NULL,
    understanding_level TEXT NOT NULL
      CHECK (understanding_level IN ('low', 'medium', 'high')),
    participation_level TEXT NOT NULL
      CHECK (participation_level IN ('low', 'medium', 'high')),
    what_went_well TEXT,
    difficulties TEXT,
    homework_assigned TEXT,
    homework_status TEXT NOT NULL
      CHECK (homework_status IN ('not_assigned', 'not_checked', 'done', 'partly_done', 'not_done')),
    next_lesson_focus TEXT,
    teacher_comment TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_students_teacher_user_id
    ON students(teacher_user_id);

  CREATE INDEX IF NOT EXISTS idx_lesson_reports_student_id_lesson_at_created_at
    ON lesson_reports(student_id, lesson_at DESC, created_at DESC);
`);

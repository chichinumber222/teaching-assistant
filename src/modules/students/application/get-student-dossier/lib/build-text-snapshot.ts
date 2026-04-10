import type { StudentDossier } from "../types";
import { formatOptionalText } from "@/modules/students/shared/format";

function buildReportsTextSnapshot(
  reports: StudentDossier["lessonReports"],
): string {
  if (reports.length === 0) {
    return "Отчетов по занятиям пока нет.";
  }

  return reports
    .map((report) => {
      return [
        `Дата занятия: ${report.lessonAt}`,
        `Что проходили или отрабатывали на занятии: ${report.lessonFocus}`,
        `Основные трудности ученика на занятии: ${formatOptionalText(report.difficulties)}`,
        `Комментарий преподавателя о занятии: ${formatOptionalText(report.teacherComment)}`,
      ].join("\n");
    })
    .join("\n\n");
}

function buildStudentProfileTextSnapshot(
  student: StudentDossier["student"],
): string {
  return [
    "Профиль ученика:",
    `Имя: ${student.fullName}`,
    `Предмет: ${student.subject}`,
    `Уровень: ${formatOptionalText(student.level)}`,
    `Цели обучения: ${formatOptionalText(student.goals)}`,
    `Заметки: ${formatOptionalText(student.notes)}`,
  ].join("\n");
}

export function buildTextSnapshot({
  student,
  lessonReports,
}: StudentDossier): string {
  return [
    buildStudentProfileTextSnapshot(student),
    "",
    "Последние отчеты (карточки) по занятиям ученика:",
    buildReportsTextSnapshot(lessonReports),
  ].join("\n");
}

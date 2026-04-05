import type { StudentContext } from "../types";
import {
  formatHomeworkStatus,
  formatOptionalText,
  formatUnderstandingLevel,
} from "@/modules/students/shared/format";

function buildReportsTextSnapshot(
  reports: StudentContext["lessonReports"],
): string {
  if (reports.length === 0) {
    return "Отчетов по занятиям пока нет.";
  }

  return reports
    .map((report) => {
      return [
        `Дата занятия: ${report.lessonAt}`,
        `План занятия: ${report.lessonPlan}`,
        `Что не успели пройти из запланированного: ${formatOptionalText(report.uncompletedPlannedWork)}`,
        `Уровень понимания материала на занятии: ${formatUnderstandingLevel(report.understandingLevel)}`,
        `Что у ученика получалось уверенно на занятии: ${formatOptionalText(report.whatWentWell)}`,
        `Основные трудности на занятии: ${formatOptionalText(report.difficulties)}`,
        `Статус домашней работы: ${formatHomeworkStatus(report.homeworkStatus)}`,
        `Комментарий по домашней работе: ${formatOptionalText(report.homeworkComment)}`,
        `Комментарий преподавателя о занятии: ${formatOptionalText(report.teacherComment)}`,
      ].join("\n");
    })
    .join("\n\n");
}

function buildStudentProfileTextSnapshot(
  student: StudentContext["student"],
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
}: StudentContext): string {
  return [
    buildStudentProfileTextSnapshot(student),
    "",
    "Последние отчеты по занятиям:",
    buildReportsTextSnapshot(lessonReports),
  ].join("\n");
}

import type { StudentContext } from "../types";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { HomeworkStatus } from "@/modules/students/domain/homework-status";

function formatOptionalText(value: string | null): string {
  return value ?? "—";
}

function formatUnderstandingLevel(value: UnderstandingLevel): string {
  switch (value) {
    case UnderstandingLevel.Low:
      return "низкий";
    case UnderstandingLevel.Medium:
      return "средний";
    case UnderstandingLevel.High:
      return "высокий";
  }
}

function formatHomeworkStatus(value: HomeworkStatus): string {
  switch (value) {
    case HomeworkStatus.NotAssigned:
      return "домашняя работа не задавалась";
    case HomeworkStatus.NotChecked:
      return "домашняя работа не проверялась";
    case HomeworkStatus.Done:
      return "домашняя работа выполнена";
    case HomeworkStatus.PartlyDone:
      return "домашняя работа выполнена частично";
    case HomeworkStatus.NotDone:
      return "домашняя работа не выполнена";
  }
}

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

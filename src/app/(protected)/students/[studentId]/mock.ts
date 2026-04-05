import { HomeworkStatus } from "@/modules/students/domain/homework-status";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import type { LessonReport } from "@/modules/students/domain/lesson-report";

export const lessonReportMocks: LessonReport[] = [
  {
    id: "lr_001",
    studentId: "student_001",
    lessonAt: "2026-04-01T16:00:00.000Z",
    lessonPlan:
      "Повторить Present Simple, разобрать вопросы и отрицания, сделать 2 упражнения на закрепление.",
    uncompletedPlannedWork:
      "Не успели сделать второе упражнение на вопросы из-за долгого разбора ошибок.",
    understandingLevel: UnderstandingLevel.Medium,
    whatWentWell:
      "Ученик стал увереннее строить простые утвердительные предложения.",
    difficulties:
      "Путает do/does в вопросах и иногда пропускает вспомогательный глагол.",
    homeworkStatus: HomeworkStatus.Done,
    homeworkComment:
      "Домашнее задание выполнено полностью, но были 2 ошибки в вопросительных предложениях.",
    teacherComment:
      "На следующем занятии стоит дать больше коротких устных вопросов на автоматизацию.",
    createdAt: "2026-04-01T17:10:00.000Z",
    updatedAt: "2026-04-01T17:10:00.000Z",
  },
  {
    id: "lr_002",
    studentId: "student_001",
    lessonAt: "2026-03-27T16:00:00.000Z",
    lessonPlan:
      "Разобрать проценты, решение задач на нахождение процента от числа и числа по проценту.",
    uncompletedPlannedWork: null,
    understandingLevel: UnderstandingLevel.High,
    whatWentWell:
      "Хорошо решал базовые задачи и самостоятельно объяснял ход решения.",
    difficulties:
      "В более длинных задачах теряется в условии и не сразу выделяет нужные данные.",
    homeworkStatus: HomeworkStatus.PartlyDone,
    homeworkComment:
      "Сделал только базовые задания, задачи повышенной сложности пропустил.",
    teacherComment:
      "Полезно потренировать именно чтение условия и выделение ключевых данных.",
    createdAt: "2026-03-27T17:20:00.000Z",
    updatedAt: "2026-03-27T17:20:00.000Z",
  },
  {
    id: "lr_003",
    studentId: "student_001",
    lessonAt: "2026-03-20T16:00:00.000Z",
    lessonPlan:
      "Подготовка к сочинению: структура текста, тезис, аргументы, заключение.",
    uncompletedPlannedWork:
      "Не успели полноценно проработать второй аргумент и заключение.",
    understandingLevel: UnderstandingLevel.Low,
    whatWentWell:
      "Удалось сформулировать неплохой тезис после наводящих вопросов.",
    difficulties:
      "Сложно самостоятельно формулирует аргументы, мысли выражает слишком кратко.",
    homeworkStatus: HomeworkStatus.NotDone,
    homeworkComment:
      "Домашнее задание не выполнено, ученик сказал, что не успел из-за большой нагрузки в школе.",
    teacherComment:
      "Следует упростить следующий объем домашней работы и дать шаблон для аргументов.",
    createdAt: "2026-03-20T17:05:00.000Z",
    updatedAt: "2026-03-20T17:05:00.000Z",
  },
  {
    id: "lr_004",
    studentId: "student_001",
    lessonAt: "2026-03-13T16:00:00.000Z",
    lessonPlan:
      "Повторить дроби: сравнение, сокращение, приведение к общему знаменателю.",
    uncompletedPlannedWork: null,
    understandingLevel: UnderstandingLevel.Medium,
    whatWentWell:
      "После повторения правил стал заметно быстрее сокращать дроби.",
    difficulties:
      "Ошибается при приведении к общему знаменателю, если числа неочевидные.",
    homeworkStatus: HomeworkStatus.NotChecked,
    homeworkComment:
      "Домашнюю работу принес, но на занятии не успели проверить.",
    teacherComment:
      "Следующее занятие начать с быстрой проверки домашнего задания и 3 устных примеров.",
    createdAt: "2026-03-13T17:00:00.000Z",
    updatedAt: "2026-03-13T17:00:00.000Z",
  },
  {
    id: "lr_005",
    studentId: "student_001",
    lessonAt: "2026-03-06T16:00:00.000Z",
    lessonPlan:
      "Ввести тему Past Simple, разобрать правильные и неправильные глаголы, сделать мини-диалог.",
    uncompletedPlannedWork:
      "Мини-диалог выполнили только частично, не хватило времени на полноценную устную практику.",
    understandingLevel: UnderstandingLevel.Medium,
    whatWentWell:
      "Хорошо понял общую идею времени и смог привести несколько своих примеров.",
    difficulties:
      "Плохо запоминает формы неправильных глаголов и смешивает Past Simple с Present Simple.",
    homeworkStatus: HomeworkStatus.NotAssigned,
    homeworkComment: null,
    teacherComment:
      "На следующем уроке нужен короткий warm-up на формы глаголов и больше устной практики.",
    createdAt: "2026-03-06T17:15:00.000Z",
    updatedAt: "2026-03-06T17:15:00.000Z",
  },
];

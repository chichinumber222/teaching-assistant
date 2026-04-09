export enum AssistantOperationKind {
  NextLessonPlan = "next-lesson-plan",
  Examples = "Examples",
  Homework = "Homework"
}

export type AssistantOperation = {
  kind: AssistantOperationKind;
  title: string;
  description: string;
};

export const ASSISTANT_OPERATIONS: AssistantOperation[] = [
  {
    kind: AssistantOperationKind.NextLessonPlan,
    title: "План следующего урока",
    description: "Краткий и структурированный план следующего урока с этим учеником (на основе его данных и истории занятий)",
  },
  {
    kind: AssistantOperationKind.Examples,
    title: "Сгенерировать задания",
    description: "Примеры некоторых заданий для ученика на основе его данных и истории занятий",
  }
];
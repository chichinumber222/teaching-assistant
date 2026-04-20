export enum AssistantOperationKind {
  NextLessonPlan = "next-lesson-plan",
  NextLessonPlanAlternatives = "next-lesson-plan-alternatives",
  Practice = "practice",
  PracticeAlternatives = "practice-alternatives",
  TaskExamples = "task-examples",
  TaskExamplesAlternatives = "task-examples-alternatives",
}

export type AssistantOperation = {
  kind: AssistantOperationKind;
  title: string;
  description: string;
};

export const PRIMARY_ASSISTANT_OPERATIONS: AssistantOperation[] = [
  {
    kind: AssistantOperationKind.NextLessonPlan,
    title: "План следующего урока",
    description:
      "Краткий и структурированный план следующего урока с этим учеником (на основе его данных и истории занятий)",
  },
  {
    kind: AssistantOperationKind.NextLessonPlanAlternatives,
    title: "План следующего урока (свободный)",
    description:
      "Более свободный режим по генерации плана следующего урока для поиска нестандартных идей и подходов (на основе данных ученика и истории занятий)",
  },
  {
    kind: AssistantOperationKind.Practice,
    title: "Практика",
    description:
      "Независимая функция для генерации нескольких упражнений/задач/примеров на следующий урок для того, чтобы задать нужное направление работы (на основе данных ученика и истории занятий)",
  },
  {
    kind: AssistantOperationKind.PracticeAlternatives,
    title: "Практика (свободный)",
    description:
      "Более свободный и смелый режим для генерации заданий (на основе данных ученика и истории занятий)",
  },
];

export const FOLLOW_UP_ASSISTANT_OPERATIONS: AssistantOperation[] = [
  {
    kind: AssistantOperationKind.TaskExamples,
    title: "Примеры заданий",
    description:
      "Стандартный режим генерации нескольких упражнений/задач/примеров на основе последнего актуального плана следующего урока, а также данных ученика",
  },
  {
    kind: AssistantOperationKind.TaskExamplesAlternatives,
    title: "Примеры заданий (свободный)",
    description:
      "Более свободный и смелый режим генерации заданий на основе последнего актуального плана следующего урока, а также данных ученика",
  },
];

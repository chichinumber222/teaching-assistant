export enum AssistantOperationKind {
  NextLessonPlan = "next-lesson-plan",
  NextLessonPlanAlternatives = "next-lesson-plan-alternatives",
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
    description:
      "Краткий и структурированный план следующего урока с этим учеником (на основе его данных и истории занятий)",
  },
  {
    kind: AssistantOperationKind.NextLessonPlanAlternatives,
    title: "Альтернативный план",
    description:
      "Более свободный режим по генерации плана следующего урока для поиска не стандартных идей и подходов (на основе данных ученика и истории занятий)",
  },
];

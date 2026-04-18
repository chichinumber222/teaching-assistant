export enum AssistantOperationKind {
  NextLessonPlan = "next-lesson-plan",
  NextLessonPlanAlternatives = "next-lesson-plan-alternatives",
  Practice = "practice",
  PracticeAlternatives = "practice-alternatives",
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
    title: "План следующего урока (alt)",
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
    title: "Практика (alt)",
    description:
      "Более свободный и смелый режим для генерации заданий (на основе данных ученика и истории занятий)",
  },
];

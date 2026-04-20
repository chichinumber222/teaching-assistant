"use client";

import { useState } from "react";
import axios from "axios";
import { aiClient } from "@/modules/ai/infrastructure/browser/ai-client";
import { GenerateResponseDto } from "@/modules/ai/infrastructure/browser/ai-api-client";
import { AssistantOperationKind } from "./assistant-operations";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

type UseAssistantResult = {
  generateAssistantResult: (
    operationKind: AssistantOperationKind,
    studentId: string,
  ) => Promise<boolean>;
  result: string | null;
  clearResult: () => void;
  globalError: string | null;
  clearGlobalError: () => void;
  isGlobalLoading: boolean;
  selectedOperationKind: AssistantOperationKind | null;
};

export function useAssistant(): UseAssistantResult {
  const [result, setResult] = useState<string | null>(null);
  const [selectedOperationKind, setSelectedOperationKind] =
    useState<AssistantOperationKind | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const clearResult = () => {
    setResult(null);
    setSelectedOperationKind(null);
  };

  const generateAssistantResult = async (
    operationKind: AssistantOperationKind,
    studentId: string,
  ): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);
    setSelectedOperationKind(operationKind);
    setResult(null);

    try {
      let generatedResult: GenerateResponseDto;

      switch (operationKind) {
        case AssistantOperationKind.NextLessonPlan:
          generatedResult = await aiClient.generateNextLessonPlan(studentId, {
            mode: GenerationMode.Standard,
          });
          break;
        case AssistantOperationKind.NextLessonPlanAlternatives:
          generatedResult = await aiClient.generateNextLessonPlan(studentId, {
            mode: GenerationMode.Alternatives,
          });
          break;
        case AssistantOperationKind.Practice:
          generatedResult = await aiClient.generatePractice(studentId, {
            mode: GenerationMode.Standard,
          });
          break;
        case AssistantOperationKind.PracticeAlternatives:
          generatedResult = await aiClient.generatePractice(studentId, {
            mode: GenerationMode.Alternatives,
          });
          break;
        case AssistantOperationKind.TaskExamples:
          generatedResult = await aiClient.generateTaskExamples(studentId, {
            mode: GenerationMode.Standard,
          });
          break;
        case AssistantOperationKind.TaskExamplesAlternatives:
          generatedResult = await aiClient.generateTaskExamples(studentId, {
            mode: GenerationMode.Alternatives,
          });
          break;
        default:
          throw new Error("Unsupported operation");
      }

      setResult(generatedResult.text);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 403) {
          setGlobalError("У вас нет прав для выполнения этого действия");
        } else if (status === 401) {
          setGlobalError(
            "Вы не авторизованы. Пожалуйста, войдите в систему и попробуйте снова",
          );
        } else if (status === 429) {
          setGlobalError(
            "Превышен лимит запросов. Пожалуйста, подождите и попробуйте снова",
          );
        } else if (status === 404) {
          if (
            operationKind === AssistantOperationKind.TaskExamples ||
            operationKind === AssistantOperationKind.TaskExamplesAlternatives
          ) {
            setGlobalError("Сначала сгенерируйте план следующего урока");
          } else {
            setGlobalError("Ученик не найден");
          }
        } else {
          setGlobalError(
            "Не удалось получить ответ ИИ-ассистента. Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError(
          "Не удалось получить ответ ИИ-ассистента. Попробуйте еще раз позже",
        );
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    generateAssistantResult,
    result,
    selectedOperationKind,
    globalError,
    isGlobalLoading,
    clearGlobalError,
    clearResult,
  };
}

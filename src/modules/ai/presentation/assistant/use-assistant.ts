"use client";

import { useState } from "react";
import axios from "axios";
import { aiClient } from "@/modules/ai/infrastructure/browser/ai-client";
import { GenerateResponseDto } from "@/modules/ai/infrastructure/browser/ai-api-client";
import { AssistantOperationKind } from "./assistant-operations";

type UseAssistantResult = {
  generateAssistantResult: (
    operation: AssistantOperationKind,
    studentId: string,
  ) => Promise<boolean>;
  result: string | null;
  selectedOperation: AssistantOperationKind | null;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
  clearResult: () => void;
};

export function useAssistant(): UseAssistantResult {
  const [result, setResult] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] =
    useState<AssistantOperationKind | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const clearResult = () => {
    setResult(null);
    setSelectedOperation(null);
  };

  const generateAssistantResult = async (
    operation: AssistantOperationKind,
    studentId: string,
  ): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);
    setSelectedOperation(operation);
    setResult(null);

    try {
      let generatedResult: GenerateResponseDto;

      switch (operation) {
        case AssistantOperationKind.NextLessonPlan:
          generatedResult = await aiClient.generateNextLessonPlan(studentId);
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
          setGlobalError("Ученик не найден");
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
    selectedOperation,
    globalError,
    isGlobalLoading,
    clearGlobalError,
    clearResult,
  };
}

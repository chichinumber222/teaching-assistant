"use client";

import axios from "axios";
import { useState } from "react";
import { aiClient } from "@/modules/ai/infrastructure/browser/ai-client";
import { GenerateResponseDto } from "../../infrastructure/browser/ai-api-client"

export function useAiChat() {
  const [result, setResult] = useState<GenerateResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setIsGlobalError] = useState<string | null>(null);

  const ask = async () => {
    setIsLoading(true);
    setIsGlobalError(null);
    try {
      const result = await aiClient.generate();
      setResult(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        setIsGlobalError(
          `Произошла непредвиденная ошибка. Попробуйте еще раз позже ${status ? `(код ошибки: ${status})` : ""}${data ? `данные ${data}` : ""}`,
        );
      }
      if (error instanceof Error) {
        setIsGlobalError(
          `Произошла непредвиденная ошибка. Попробуйте еще раз позже ${error.message ? `(сообщение ошибки: ${error.message})` : ""}`,
        );
      }

      setIsGlobalError(
        "Произошла непредвиденная ошибка. Попробуйте еще раз позже",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    globalError,
    ask,
  };
}

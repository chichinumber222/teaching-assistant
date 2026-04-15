"use client";

import { useState } from "react";
import axios from "axios";
import { authClient } from "@/modules/auth/infrastructure/browser/auth-client";
import type { UpdatePasswordRequestDto } from "@/modules/auth/infrastructure/browser/auth-api-client";
import { mapPasswordReasonErrorCodeToMessage } from "../shared/map-password-reason-code-to-message";

type UseUpdatePasswordResult = {
  updatePassword: (payload: UpdatePasswordRequestDto) => Promise<boolean>;
  globalError: string | null;
  successMessage: string | null;
  isGlobalLoading: boolean;
  clearMessages: () => void;
};

export function useUpdatePassword(): UseUpdatePasswordResult {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearMessages = () => {
    setGlobalError(null);
    setSuccessMessage(null);
  };

  const updatePassword = async (
    payload: UpdatePasswordRequestDto,
  ): Promise<boolean> => {
    clearMessages();
    setIsGlobalLoading(true);

    try {
      await authClient.updatePassword(payload);
      setSuccessMessage("Пароль обновлен");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const reason = error.response?.data?.reason;

        if (status === 400) {
          if (reason?.code && reason.code === "auth.invalid_password") {
            const details = error.response?.data?.reason?.details;
            if (details) {
              setGlobalError(mapPasswordReasonErrorCodeToMessage(details));
            } else setGlobalError("Проверьте введенные данные");
          } else if (
            reason?.code &&
            reason.code === "auth.invalid_current_password"
          ) {
            setGlobalError("Текущий пароль указан неверно");
          } else {
            setGlobalError("Проверьте введенные данные");
          }
        } else if (status === 403) {
          setGlobalError("Смена пароля временно недоступна, попробуйте позже");
        } else if (status === 401) {
          setGlobalError("Сессия истекла. Войдите снова");
        } else if (status === 404) {
          setGlobalError("Пользователь не найден");
        } else {
          setGlobalError(
            "Не удалось обновить пароль. Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError("Не удалось обновить пароль. Попробуйте еще раз позже");
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    updatePassword,
    globalError,
    successMessage,
    isGlobalLoading,
    clearMessages,
  };
}

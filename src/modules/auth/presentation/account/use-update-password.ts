"use client";

import { useState } from "react";
import axios from "axios";
import { authClient } from "@/modules/auth/infrastructure/browser/auth-client";
import type { UpdatePasswordRequestDto } from "@/modules/auth/infrastructure/browser/auth-api-client";
import { mapPasswordPolicyError } from "@/modules/auth/shared/map-password-policy-errors";

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

        if (status === 403) {
          setGlobalError("Обновление пароля временно недоступно");
        } else if (status === 400) {
          const message = error.response?.data?.message;

          if (message && message === "invalid_password") {
            const reason = error.response?.data?.reason;
            setGlobalError(
              reason
                ? mapPasswordPolicyError(reason)
                : "Проверьте введенные данные",
            );
          } else if (message && message === "invalid_current_password") {
            setGlobalError("Текущий пароль указан неверно");
          } else {
            setGlobalError("Проверьте введенные данные");
          }
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

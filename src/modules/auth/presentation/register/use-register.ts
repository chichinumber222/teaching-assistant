"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RegisterRequestDto } from "@/modules/auth/infrastructure/browser/auth-api-client";
import { authClient } from "@/modules/auth/infrastructure/browser/auth-client";
import { getEntryPath } from "@/modules/auth/shared/redirects";
import { mapPasswordReasonErrorCodeToMessage } from "../shared/map-password-reason-code-to-message";

type UseRegisterResult = {
  register: (payload: RegisterRequestDto) => Promise<boolean>;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
};

export function useRegister(): UseRegisterResult {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const register = async (payload: RegisterRequestDto): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);

    try {
      await authClient.register(payload);

      router.refresh();
      router.push(getEntryPath());

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
          } else {
            setGlobalError("Проверьте введенные данные");
          }
        } else if (status === 409) {
          setGlobalError("Пользователь с таким email уже существует");
        } else if (status === 403) {
          setGlobalError("Регистрация временно недоступна");
        } else {
          setGlobalError(
            "Не удалось создать аккаунт. Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError("Не удалось создать аккаунт. Попробуйте еще раз позже");
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    register,
    globalError,
    isGlobalLoading,
    clearGlobalError,
  };
}

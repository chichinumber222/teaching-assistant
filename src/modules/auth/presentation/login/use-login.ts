"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginRequestDto } from "@/modules/auth/infrastructure/http/auth-api-client";
import { authClient } from "@/modules/auth/infrastructure/http/auth-client";
import { getStartPath } from "@/modules/auth/shared/redirects";

type UseLoginResult = {
  login: (payload: LoginRequestDto) => Promise<boolean>;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
};

export function useLogin(): UseLoginResult {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const login = async (payload: LoginRequestDto): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);

    try {
      const { user } = await authClient.login(payload);

      router.refresh();
      router.push(getStartPath(user.role));

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          setGlobalError("Проверьте введенные данные");
        } else if (status === 401) {
          setGlobalError("Неверный email или пароль");
        } else if (status === 403) {
          setGlobalError(
            "Ваш аккаунт временно недоступен. Свяжитесь с поддержкой.",
          );
        } else {
          setGlobalError(
            "Произошла непредвиденная ошибка. Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError(
          "Произошла непредвиденная ошибка. Попробуйте еще раз позже",
        );
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    login,
    globalError,
    isGlobalLoading,
    clearGlobalError,
  };
}

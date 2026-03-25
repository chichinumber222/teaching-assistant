"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginRequestDto } from "@/modules/auth/infrastructure/http/auth-api-client";
import { authClient } from "@/modules/auth/infrastructure/http/auth-client";
import { LOGIN_MESSAGES } from "./login-messages";
import { getLoginRedirectPath } from "./get-redirect-path"

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
      router.push(getLoginRedirectPath(user.role));

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setGlobalError(message || LOGIN_MESSAGES.invalidCredentials);
      } else {
        setGlobalError(LOGIN_MESSAGES.unexpectedError);
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
    clearGlobalError
  };
}

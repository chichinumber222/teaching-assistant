import { authClient } from "@/modules/auth/infrastructure/browser/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutResult = {
  logout: () => Promise<boolean>;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
};

export function useLogout(): LogoutResult {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const logout = async () => {
    setGlobalError(null);
    setIsGlobalLoading(true);

    try {
      await authClient.logout();
      router.refresh();

      return true;
    } catch {
      setGlobalError("Не удалось выйти из аккаунта. Попробуйте еще раз позже");

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return { logout, clearGlobalError, globalError, isGlobalLoading };
}

"use client";

import { useLogout } from "./use-logout";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { LogoutIcon } from "@/shared/ui/assets/icons/logout";

export function LogoutView() {
  const { logout, globalError, isGlobalLoading, clearGlobalError } =
    useLogout();

  const onClick = async () => {
    clearGlobalError();
    await logout();
  };

  const onBlur = () => {
    clearGlobalError();
  };

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      onBlur={onBlur}
      disabled={isGlobalLoading}
      className={cn(
        globalError &&
          "border-destructive/50 text-destructive ring-2 ring-destructive/15",
      )}
      aria-label="Выйти из аккаунта"
    >
      <LogoutIcon className="size-6" />
    </Button>
  );
}

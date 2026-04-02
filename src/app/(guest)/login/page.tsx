import { requireGuest } from "@/modules/auth/infrastructure/server/auth-access";
import { LoginView } from "@/modules/auth/presentation/login/login-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { cn } from "@/shared/ui/lib/utils";

export default async function LoginPage() {
  await requireGuest();

  return (
    <BasePage
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <LoginView />
    </BasePage>
  );
}

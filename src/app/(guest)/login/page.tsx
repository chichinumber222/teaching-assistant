import { LoginView } from "@/modules/auth/presentation/login/login-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { cn } from "@/shared/ui/lib/utils";

export default async function LoginPage() {
  return (
    <BasePage
      access="guest"
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <LoginView />
    </BasePage>
  );
}

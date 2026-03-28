import { guestAuthGuard } from "@/modules/auth/infrastructure/server/auth-guard";
import { LoginView } from "@/modules/auth/presentation/login/login-view";
import { cn } from "@/shared/ui/lib/utils";

export default async function LoginPage() {
  await guestAuthGuard();

  return (
    <main
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <LoginView />
    </main>
  );
}

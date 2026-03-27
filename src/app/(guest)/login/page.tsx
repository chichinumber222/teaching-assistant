import { LoginView } from "@/modules/auth/presentation/login/login-view";
import { cn } from "@/shared/ui/lib/utils";

export default function LoginPage() {
  return (
    <main
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <LoginView />
    </main>
  );
}

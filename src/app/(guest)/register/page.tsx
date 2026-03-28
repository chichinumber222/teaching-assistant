import { guestAuthGuard } from "@/modules/auth/infrastructure/server/auth-guard";
import { RegisterView } from "@/modules/auth/presentation/register/register-view";
import { cn } from "@/shared/ui/lib/utils";

export default async function RegisterPage() {
  await guestAuthGuard();

  return (
    <main
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <RegisterView />
    </main>
  );
}

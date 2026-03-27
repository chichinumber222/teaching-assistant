import { RegisterView } from "@/modules/auth/presentation/register/register-view";
import { cn } from "@/shared/ui/lib/utils";

export default function RegisterPage() {
  return (
    <main
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <RegisterView />
    </main>
  );
}

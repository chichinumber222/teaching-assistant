import { requireGuest } from "@/modules/auth/infrastructure/server/auth-access"
import { RegisterView } from "@/modules/auth/presentation/register/register-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { cn } from "@/shared/ui/lib/utils";

export default async function RegisterPage() {
  await requireGuest();

  return (
    <BasePage
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <RegisterView />
    </BasePage>
  );
}

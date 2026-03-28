import { RegisterView } from "@/modules/auth/presentation/register/register-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { cn } from "@/shared/ui/lib/utils";

export default async function RegisterPage() {
  return (
    <BasePage
      access="guest"
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      <RegisterView />
    </BasePage>
  );
}

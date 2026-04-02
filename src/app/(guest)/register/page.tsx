import { requireGuest } from "@/modules/auth/infrastructure/server/auth-access";
import { RegisterView } from "@/modules/auth/presentation/register/register-view";

export default async function RegisterPage() {
  await requireGuest();

  return <RegisterView />;
}

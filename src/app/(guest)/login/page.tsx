import { requireGuest } from "@/modules/auth/infrastructure/server/auth-access";
import { LoginView } from "@/modules/auth/presentation/login/login-view";

export default async function LoginPage() {
  await requireGuest();

  return <LoginView />;
}

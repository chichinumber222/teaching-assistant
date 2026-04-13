import { cn } from "@/shared/ui/lib/utils";
import LoginForm from "./login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { APP_ROUTES } from "@/shared/config/routes";
import { AuthLink } from "@/modules/auth/presentation/components/auth-link";

export function LoginView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader className={cn("text-center")}>
        <CardTitle>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <AuthLink
          href={APP_ROUTES.register}
          message="Нет аккаунта?"
          containerClassName="mt-6"
        >
          Зарегистрироваться
        </AuthLink>
      </CardContent>
    </Card>
  );
}

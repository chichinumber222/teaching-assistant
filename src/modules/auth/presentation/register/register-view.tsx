import { cn } from "@/shared/ui/lib/utils";
import RegisterForm from "./register-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { APP_ROUTES } from "@/shared/config/routes";
import { AuthLink } from "@/modules/auth/presentation/components/auth-link";

export function RegisterView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <AuthLink
          href={APP_ROUTES.login}
          message="Уже есть аккаунт?"
          containerClassName="mt-6"
        >
          Войти
        </AuthLink>
      </CardContent>
    </Card>
  );
}

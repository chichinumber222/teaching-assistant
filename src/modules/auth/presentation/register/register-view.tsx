import { cn } from "@/shared/ui/lib/utils";
import RegisterForm from "./register-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { APP_ROUTES } from "@/shared/config/routes";
import { AuthLink } from "@/shared/ui/components/auth-link";

export function RegisterView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <AuthLink href={APP_ROUTES.login} message="Уже есть аккаунт?">
          Войти
        </AuthLink>
      </CardContent>
    </Card>
  );
}

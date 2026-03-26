import { cn } from "@/shared/ui/lib/utils";
import LoginForm from "./login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import Link from "next/link";

function RegisterLink() {
  return (
    <div className="mt-6 text-center text-sm">
      <span className="text-muted-foreground">Нет аккаунта? </span>
      <Link
        href="/register"
        className="font-medium text-primary hover:underline"
      >
        Зарегистрироваться
      </Link>
    </div>
  );
}

export function LoginView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader className={cn("text-center")}>
        <CardTitle>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <RegisterLink />
      </CardContent>
    </Card>
  );
}

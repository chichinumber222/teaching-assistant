import { cn } from "@/shared/ui/lib/utils";
import LoginForm from "./login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";

export function LoginView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

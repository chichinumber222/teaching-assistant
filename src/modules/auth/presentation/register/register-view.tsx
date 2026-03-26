import { cn } from "@/shared/ui/lib/utils";
import RegisterForm from "./register-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";

export function RegisterView() {
  return (
    <Card size="sm" className={cn("w-full", "max-w-xs", "shadow-sm")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { UpdatePasswordForm } from "./update-password-form";

type AccountViewProps = {
  user: {
    name: string;
    email: string;
  };
};

export function AccountView({ user }: AccountViewProps) {
  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Данные аккаунта</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-col gap-4">
            <div className="space-y-1">
              <dt className="text-muted-foreground">Имя</dt>
              <dd className="[overflow-wrap:anywhere]">{user.name}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="[overflow-wrap:anywhere]">{user.email}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Смена пароля</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

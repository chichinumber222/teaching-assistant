import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { AccountView } from "@/modules/auth/presentation/account/account-view";
import { BasePage } from "@/shared/ui/containers/base-page";

export default async function AccountPage() {
  const teacher = await requireRole(UserRole.Teacher);

  return (
    <BasePage>
      <AccountView user={teacher} />
    </BasePage>
  );
}

import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { BasePage } from "@/shared/ui/containers/base-page";

export default async function StudentsIdPage() {
  await requireRole(UserRole.Teacher);

  return <BasePage className="flex gap-4">Student ID page</BasePage>;
}

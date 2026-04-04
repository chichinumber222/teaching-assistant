import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { CreateStudentsView } from "@/modules/students/presentation/create-students/create-students-view";

export default async function CreateStudentPage() {
  await requireRole(UserRole.Teacher);

  return <CreateStudentsView />;
}

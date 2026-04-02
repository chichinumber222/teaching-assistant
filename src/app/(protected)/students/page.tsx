import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentsPageData } from "@/modules/students/infrastructure/server/get-students-page-data";
import { StudentsList } from "@/modules/students/presentation/students-list";
import { BasePage } from "@/shared/ui/containers/base-page";
import { mockStudents } from "./mock";

export default async function StudentsPage() {
  const teacher = await requireRole(UserRole.Teacher);
  const pageData = getStudentsPageData({ teacherId: teacher.id });

  return (
    <BasePage>
      {pageData.ok ? (
        <StudentsList students={mockStudents} />
      ) : (
        <div>Ошибка загрузки данных</div>
      )}
    </BasePage>
  );
}

import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { listStudentsViewData } from "@/modules/students/infrastructure/server/list-students-view-data";
import { StudentsList } from "@/modules/students/presentation/list-students/students-list";
import { BasePage } from "@/shared/ui/containers/base-page";
import { PageFallback } from "@/shared/ui/components/page-fallback";

export default async function StudentsPage() {
  const teacher = await requireRole(UserRole.Teacher);
  const viewData = listStudentsViewData({ teacherId: teacher.id });

  return (
    <BasePage>
      {viewData.ok ? (
        <StudentsList students={viewData.students} />
      ) : (
        <PageFallback
          title="Ученики"
          description="Список всех ваших учеников."
        />
      )}
    </BasePage>
  );
}

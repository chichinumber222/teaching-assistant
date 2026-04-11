import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentViewData } from "@/modules/students/infrastructure/server/get-student-view-data";
import { CreateReportView } from "@/modules/students/presentation/create-lesson-report/create-report-view";
import { NotFound } from "@/shared/ui/components/not-found";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import { BasePage } from "@/shared/ui/containers/base-page";

type Props = {
  params: Promise<{ studentId: string }>;
};

export default async function CreateReportPage({ params }: Props) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId } = await params;
  const viewData = getStudentViewData({
    teacherId: teacher.id,
    studentId,
  });

  return (
    <BasePage>
      {viewData.ok ? (
        <CreateReportView studentId={viewData.student.id} />
      ) : viewData.reason === "not_found" ? (
        <NotFound />
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

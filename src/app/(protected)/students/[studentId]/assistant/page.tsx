import { AssistantView } from "@/modules/ai/presentation/assistant/assistant-view";
import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentDossierViewData } from "@/modules/students/infrastructure/server/get-student-dossier-view-data";
import { NotFound } from "@/shared/ui/components/not-found";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import { BasePage } from "@/shared/ui/containers/base-page";

type AssistantPageProps = {
  params: Promise<{ studentId: string }>;
};

export default async function AssistantPage({ params }: AssistantPageProps) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId } = await params;
  const viewData = getStudentDossierViewData({
    teacherId: teacher.id,
    studentId,
  });

  return (
    <BasePage>
      {viewData.ok ? (
        <AssistantView
          student={viewData.data.student}
          reports={viewData.data.lessonReports}
        />
      ) : viewData.reason === "not_found" ? (
        <NotFound />
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

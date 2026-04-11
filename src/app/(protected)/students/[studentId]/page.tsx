import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentDossierViewData } from "@/modules/students/infrastructure/server/get-student-dossier-view-data";
import { StudentView } from "@/modules/students/presentation/student/student-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import { NotFound } from "@/shared/ui/components/not-found";
import { CreateReportLink } from "@/modules/students/presentation/create-lesson-report/create-report-link";
import { APP_ROUTES } from "@/shared/config/routes";
import { AssistantLink } from "@/modules/ai/presentation/assistant/assistant-link";

type StudentsIdPageProps = {
  params: Promise<{ studentId: string }>;
};

export default async function StudentsIdPage({ params }: StudentsIdPageProps) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId } = await params;
  const viewData = getStudentDossierViewData({
    teacherId: teacher.id,
    studentId,
  });

  return (
    <BasePage>
      {viewData.ok ? (
        <StudentView
          student={viewData.data.student}
          lessonReports={viewData.data.lessonReports}
          reportsAction={
            <CreateReportLink
              href={APP_ROUTES.studentLessonReportsNew(
                viewData.data.student.id,
              )}
            />
          }
          studentPageAction={
            <AssistantLink
              href={APP_ROUTES.studentAssistant(viewData.data.student.id)}
            />
          }
        />
      ) : viewData.reason === "not_found" ? (
        <NotFound />
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

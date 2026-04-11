import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getLessonReportViewData } from "@/modules/students/infrastructure/server/get-lesson-report-view-data";
import { LessonReportView } from "@/modules/students/presentation/lesson-report/lesson-report-view";
import { NotFound } from "@/shared/ui/components/not-found";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import { BasePage } from "@/shared/ui/containers/base-page";

type Props = {
  params: Promise<{
    studentId: string;
    lessonReportId: string;
  }>;
};

export default async function LessonReportPage({ params }: Props) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId, lessonReportId } = await params;
  const viewData = getLessonReportViewData({
    teacherId: teacher.id,
    studentId,
    lessonReportId,
  });

  return (
    <BasePage>
      {viewData.ok ? (
        <LessonReportView lessonReport={viewData.lessonReport} />
      ) : viewData.reason === "not_found" ? (
        <NotFound />
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

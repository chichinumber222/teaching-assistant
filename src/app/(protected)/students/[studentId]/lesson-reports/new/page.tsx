import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getCreateReportPageData } from "@/modules/students/infrastructure/server/get-create-report-page-data";
import { CreateReportView } from "@/modules/students/presentation/create-lesson-report/create-report-view";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import { BasePage } from "@/shared/ui/containers/base-page";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ studentId: string }>;
};

export default async function CreateReportPage({ params }: Props) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId } = await params;

  const pageData = getCreateReportPageData({
    teacherId: teacher.id,
    studentId,
  });

  return (
    <BasePage>
      {pageData.ok ? (
        <CreateReportView studentId={pageData.student.id} />
      ) : pageData.reason === "not_found" ? (
        notFound()
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

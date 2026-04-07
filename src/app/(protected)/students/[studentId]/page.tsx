import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentPageData } from "@/modules/students/infrastructure/server/get-student-page-data";
import { StudentView } from "@/modules/students/presentation/student/student-view";
import { BasePage } from "@/shared/ui/containers/base-page";
import { PageFallback } from "@/shared/ui/components/page-fallback";
import NotFound from "@/shared/ui/components/not-found";

type StudentsIdPageProps = {
  params: Promise<{ studentId: string }>;
};

export default async function StudentsIdPage({ params }: StudentsIdPageProps) {
  const teacher = await requireRole(UserRole.Teacher);
  const { studentId } = await params;
  const pageData = await getStudentPageData({
    teacherId: teacher.id,
    studentId,
  });

  return (
    <BasePage>
      {pageData.ok ? (
        <StudentView
          student={pageData.data.student}
          lessonReports={pageData.data.lessonReports}
        />
      ) : pageData.reason === "not_found" ? (
        <NotFound />
      ) : (
        <PageFallback />
      )}
    </BasePage>
  );
}

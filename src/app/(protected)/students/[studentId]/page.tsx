import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { getStudentPageData } from "@/modules/students/infrastructure/server/get-student-page-data";
import { StudentView } from "@/modules/students/presentation/student/student-view";
import { notFound } from "next/navigation";
import { lessonReportMocks } from "./mock";
import { Fallback } from "@/modules/students/presentation/student/fallback";
import { BasePage } from "@/shared/ui/containers/base-page";

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
          student={pageData.context.student}
          lessonReports={
            pageData.context.lessonReports?.length
              ? pageData.context.lessonReports
              : lessonReportMocks
          }
        />
      ) : pageData.reason === "not_found" ? (
        notFound()
      ) : (
        <Fallback />
      )}
    </BasePage>
  );
}

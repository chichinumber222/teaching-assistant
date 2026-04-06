import { UserRole } from "@/modules/auth/domain/user-role";
import { requireRole } from "@/modules/auth/infrastructure/server/auth-access";
import { CreateReportView } from "@/modules/students/presentation/create-lesson-report/create-report-view";

type Props = {
  params: Promise<{ studentId: string }>;
};

export default async function CreateReportPage({ params }: Props) {
  await requireRole(UserRole.Teacher);
  const { studentId } = await params;

  return <CreateReportView studentId={studentId} />;
}

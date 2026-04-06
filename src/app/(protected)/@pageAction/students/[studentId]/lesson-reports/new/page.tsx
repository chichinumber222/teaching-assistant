import { APP_ROUTES } from "@/shared/config/routes";
import { NavigationLink } from "@/shared/ui/components/navigation-link";

type Props = {
  params: Promise<{ studentId: string }>;
};

export default async function StudentLessonReportNewPage({ params }: Props) {
  const { studentId } = await params;

  return <NavigationLink toHref={APP_ROUTES.student(studentId)} />;
}

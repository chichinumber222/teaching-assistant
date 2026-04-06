import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { cn } from "@/shared/ui/lib/utils";
import CreateReportForm from "./create-report-form"

type CreateReportViewProps = {
  studentId: string;
};

export function CreateReportView({ studentId }: CreateReportViewProps) {
  return (
    <Card className={cn("w-full", "max-w-lg", "mx-auto")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Создать карточку занятия</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateReportForm studentId={studentId} />
      </CardContent>
    </Card>
  );
}

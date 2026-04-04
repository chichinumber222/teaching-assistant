import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { cn } from "@/shared/ui/lib/utils";
import CreateStudentForm from "./create-student-form";

export function CreateStudentsView() {
  return (
    <Card className={cn("w-full", "max-w-lg", "mx-auto")}>
      <CardHeader>
        <CardTitle className={cn("text-center")}>Создать ученика</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateStudentForm />
      </CardContent>
    </Card>
  );
}

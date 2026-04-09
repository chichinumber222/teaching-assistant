import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { formatOptionalText } from "@/modules/students/shared/format";
import { Student } from "@/modules/students/domain/student";
import { cn } from "@/shared/ui/lib/utils";

type StudentProfileProps = {
  student: Student;
  className?: string;
};

export function StudentProfile({ student, className }: StudentProfileProps) {
  return (
    <Card className={cn("w-full bg-card shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{student.fullName}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <dt className="text-muted-foreground">Предмет</dt>
            <dd className="[overflow-wrap:anywhere]">{student.subject}</dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Уровень</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(student.level)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Цели</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(student.goals)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Заметки</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(student.notes)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

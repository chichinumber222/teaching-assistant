import { LessonReport } from "@/modules/students/domain/lesson-report";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import {
  formatHomeworkStatus,
  formatOptionalText,
  formatUnderstandingLevel,
} from "@/modules/students/shared/format";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
  lessonReport: LessonReport;
};

export function LessonReportView({ lessonReport }: Props) {
  return (
    <Card className="w-full bg-card shadow-sm max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Занятие от{" "}
          {format(parseISO(lessonReport.lessonAt), "dd.MM.yyyy", {
            locale: ru,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-4">
          <div className="space-y-1">
            <dt className="text-muted-foreground">План занятия:</dt>
            <dd className="[overflow-wrap:anywhere]">
              {lessonReport.lessonPlan}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">
              Из запланированного не успели пройти:
            </dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(lessonReport.uncompletedPlannedWork)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Делает уверенно:</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(lessonReport.whatWentWell)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Трудности:</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(lessonReport.difficulties)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">
              Уровень понимания на данном занятии:
            </dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatUnderstandingLevel(lessonReport.understandingLevel)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Статус домашней работы:</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatHomeworkStatus(lessonReport.homeworkStatus)}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Комментарий учителя:</dt>
            <dd className="[overflow-wrap:anywhere]">
              {formatOptionalText(lessonReport.teacherComment)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

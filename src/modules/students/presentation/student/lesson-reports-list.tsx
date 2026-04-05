import Link from "next/link";

import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/shared/ui/components/item";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/components/table";
import {
  formatHomeworkStatus,
  formatUnderstandingLevel,
} from "@/modules/students/shared/format";
import { formatUncompletedPlannedWork } from "@/modules/students/shared/format";
import { createDateFormatter } from "@/shared/lib/date/formatter";

const dateFormatter = createDateFormatter();

type LessonReportsListProps = {
  lessonReports: LessonReport[];
};

export function LessonReportsList({ lessonReports }: LessonReportsListProps) {
  return (
    <Card size="sm" className="w-full bg-card shadow-sm">
      <CardHeader>
        <CardTitle>Карточки занятий</CardTitle>
        <CardDescription>Последние записи по ученику.</CardDescription>
      </CardHeader>
      <CardContent>
        {lessonReports.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-table px-4 py-8 text-center text-sm text-muted-foreground">
            По этому ученику пока нет карточек занятий
          </div>
        ) : (
          <>
            <ItemGroup className="overflow-hidden rounded-lg border border-border bg-table md:hidden">
              {lessonReports.map((report) => (
                <Item
                  key={report.id}
                  size="sm"
                  className="rounded-none border-b border-border bg-transparent pr-2 last:border-b-0 first:border-t-0"
                >
                  <Link
                    href={APP_ROUTES.studentLessonReport(
                      report.studentId,
                      report.id,
                    )}
                    className="min-w-0 flex-1 px-4 py-3 transition-colors hover:bg-muted/20"
                  >
                    <ItemContent className="min-w-0 text-sm">
                      <ItemTitle>{dateFormatter(report.lessonAt)}</ItemTitle>
                      <ItemDescription className="mt-0.5 [overflow-wrap:anywhere] line-clamp-2">
                        План занятия: {report.lessonPlan}
                      </ItemDescription>
                      <ItemDescription className="mt-1 [overflow-wrap:anywhere] line-clamp-2">
                        Уровень понимания:{" "}
                        {formatUnderstandingLevel(report.understandingLevel)}
                      </ItemDescription>
                    </ItemContent>
                  </Link>
                  <ItemActions className="shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Меню для занятия от ${dateFormatter(report.lessonAt)}`}
                    >
                      <span aria-hidden="true">⋮</span>
                    </Button>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>

            <Table
              className="table-fixed"
              containerClassName="hidden rounded-lg border border-border bg-table md:block"
            >
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-25">Дата</TableHead>
                  <TableHead>План занятия</TableHead>
                  <TableHead>Что не успели?</TableHead>
                  <TableHead className="w-45  text-center">
                    Уровень понимания
                  </TableHead>
                  <TableHead className="w-40">Статус д/з</TableHead>
                  <TableHead className="w-12 text-right">
                    <span className="sr-only">Открыть</span>
                  </TableHead>
                  <TableHead className="w-12 text-right">
                    <span className="sr-only">Меню</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessonReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="truncate">
                        {dateFormatter(report.lessonAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate">{report.lessonPlan}</div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate">
                        {formatUncompletedPlannedWork(
                          report.uncompletedPlannedWork,
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="truncate">
                        {formatUnderstandingLevel(report.understandingLevel)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate">
                        {formatHomeworkStatus(report.homeworkStatus)}
                      </div>
                    </TableCell>
                    <TableCell className="pr-2 text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label={`Открыть карточку занятия от ${dateFormatter(report.lessonAt)}`}
                      >
                        <Link
                          href={APP_ROUTES.studentLessonReport(
                            report.studentId,
                            report.id,
                          )}
                        >
                          <span aria-hidden="true">→</span>
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="pr-2 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label={`Меню для занятия от ${dateFormatter(report.lessonAt)}`}
                      >
                        <span aria-hidden="true">⋮</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}

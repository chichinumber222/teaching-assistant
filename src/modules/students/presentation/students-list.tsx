import Link from "next/link";

import type { Student } from "@/modules/students/domain/student";
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

type StudentsListProps = {
  students: Student[];
};

export function StudentsList({ students }: StudentsListProps) {
  return (
    <Card size="sm" className="w-full shadow-sm bg-card">
      <CardHeader>
        <CardTitle>Ученики</CardTitle>
        <CardDescription>Список всех ваших учеников.</CardDescription>
      </CardHeader>

      <CardContent>
        {students.length === 0 ? (
          <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground bg-table">
            У вас пока нет учеников.
          </div>
        ) : (
          <>
            <ItemGroup className="overflow-hidden rounded-lg border border-border bg-table md:hidden">
              {students.map((student) => (
                <Item
                  key={student.id}
                  size="sm"
                  className="rounded-none border-b border-border bg-transparent pr-2 last:border-b-0 first:border-t-0"
                >
                  <Link
                    href={`${APP_ROUTES.students}/${encodeURIComponent(student.id)}`}
                    className="min-w-0 flex-1 px-4 py-3 transition-colors hover:bg-muted/20"
                  >
                    <ItemContent className="min-w-0 text-sm">
                      <ItemTitle className="[overflow-wrap:anywhere] line-clamp-2">
                        {student.fullName}
                      </ItemTitle>
                      <ItemDescription className="mt-0.5 text-muted-foreground [overflow-wrap:anywhere] line-clamp-2">
                        {student.subject}
                        {student.level ? ` · ${student.level}` : ""}
                      </ItemDescription>
                    </ItemContent>
                  </Link>
                  <ItemActions className="shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Действия для ${student.fullName}`}
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
                  <TableHead>Ученик</TableHead>
                  <TableHead>Предмет</TableHead>
                  <TableHead>Уровень</TableHead>
                  <TableHead className="w-40">
                    <span className="sr-only">Переход</span>
                  </TableHead>
                  <TableHead className="w-12 pr-2 text-right">
                    <span className="sr-only">Меню</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium truncate">
                      <div className="truncate">{student.fullName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate">{student.subject}</div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate">{student.level ?? "—"}</div>
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="link" size="sm">
                        <Link
                          href={`${APP_ROUTES.students}/${encodeURIComponent(student.id)}`}
                        >
                          Перейти
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="pr-2 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label={`Действия для ${student.fullName}`}
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

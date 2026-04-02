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
    <Card size="sm" className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Ученики</CardTitle>
        <CardDescription>Список всех ваших учеников.</CardDescription>
      </CardHeader>

      <CardContent>
        {students.length === 0 ? (
          <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            У вас пока нет учеников.
          </div>
        ) : (
          <>
            <ItemGroup className="md:hidden">
              {students.map((student) => (
                <Item key={student.id} size="sm">
                  <ItemContent className="min-w-0">
                    <ItemTitle className="truncate">
                      {student.fullName}
                    </ItemTitle>
                    <ItemDescription className="truncate">
                      {student.subject}
                      {student.level ? ` · ${student.level}` : ""}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="shrink-0">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`${APP_ROUTES.students}/${student.id}`}>
                        Открыть
                      </Link>
                    </Button>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>

            <Table className="hidden md:table">
              <TableHeader className="bg-primary/8">
                <TableRow>
                  <TableHead>Ученик</TableHead>
                  <TableHead>Предмет</TableHead>
                  <TableHead>Уровень</TableHead>
                  <TableHead className="text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.fullName}
                    </TableCell>
                    <TableCell>{student.subject}</TableCell>
                    <TableCell>{student.level ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`${APP_ROUTES.students}/${student.id}`}>
                          Открыть
                        </Link>
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

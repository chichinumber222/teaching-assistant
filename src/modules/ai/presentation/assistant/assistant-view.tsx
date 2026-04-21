"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { useAssistant } from "./use-assistant";
import { Student } from "@/modules/students/domain/student";
import { LessonReport } from "@/modules/students/domain/lesson-report";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/shared/ui/components/item";
import { Button } from "@/shared/ui/components/button";
import {
  PRIMARY_ASSISTANT_OPERATIONS,
  FOLLOW_UP_ASSISTANT_OPERATIONS,
  AssistantOperationKind,
} from "./assistant-operations";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/components/tooltip";

type AssistantViewProps = {
  student: Student;
  reports: LessonReport[];
};

const LESSON_REPORTS_LIMIT = 5;

export function AssistantView({ student, reports }: AssistantViewProps) {
  const {
    result,
    generateAssistantResult,
    isGlobalLoading,
    globalError,
    clearResult,
    clearGlobalError,
    selectedOperationKind,
  } = useAssistant();

  const usedReports = useMemo(
    () => reports.slice(0, LESSON_REPORTS_LIMIT),
    [reports],
  );

  const hanfleGenerate = async (operationKind: AssistantOperationKind) => {
    clearResult();
    clearGlobalError();
    await generateAssistantResult(operationKind, student.id);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Card size="sm" className="w-full bg-card">
        <CardContent>
          <Item className="flex flex-col items-center md:flex-row md:justify-between text-sm">
            <ItemContent className="items-center md:items-start">
              <ItemTitle className="[overflow-wrap:anywhere] line-clamp-2">
                {student.fullName}
              </ItemTitle>
              <ItemDescription className="mt-0.5 text-muted-foreground [overflow-wrap:anywhere] line-clamp-2">
                {student.subject}
                {student.level ? ` · ${student.level}` : ""}
              </ItemDescription>
            </ItemContent>
            {usedReports.length > 0 ? (
              <ItemContent>
                <ItemDescription className="mt-0.5 text-muted-foreground">
                  Период занятий для контекста:{" "}
                  {format(
                    parseISO(usedReports[usedReports.length - 1]?.lessonAt),
                    "dd.MM.yyyy",
                    {
                      locale: ru,
                    },
                  )}{" "}
                  -{" "}
                  {format(parseISO(usedReports[0]?.lessonAt), "dd.MM.yyyy", {
                    locale: ru,
                  })}
                </ItemDescription>
              </ItemContent>
            ) : null}
          </Item>
        </CardContent>
      </Card>

      <Card className="w-full bg-card">
        <CardHeader>
          <CardTitle>Результат</CardTitle>
          <CardDescription>Здесь появится ответ ИИ-ассистента.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-table rounded-md border p-4 text-sm min-h-20">
            {isGlobalLoading && (
              <p>Генерируем ответ на основе данных ученика...</p>
            )}
            {globalError && <p className="text-red-500">{globalError}</p>}
            <div className="prose">
              <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {result}
              </Markdown>
            </div>
            {!!result &&
              (selectedOperationKind ===
                AssistantOperationKind.NextLessonPlan ||
                selectedOperationKind ===
                  AssistantOperationKind.NextLessonPlanAlternatives) && (
                <div className="mt-10">
                  {FOLLOW_UP_ASSISTANT_OPERATIONS.map((operation) => (
                    <Tooltip key={operation.kind}>
                      <TooltipTrigger asChild>
                        <Button
                          key={operation.kind}
                          variant="secondary"
                          onClick={() => hanfleGenerate(operation.kind)}
                          disabled={isGlobalLoading}
                        >
                          {operation.title}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>{operation.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex-wrap gap-1.5">
          {PRIMARY_ASSISTANT_OPERATIONS.map((operation) => (
            <Tooltip key={operation.kind}>
              <TooltipTrigger asChild>
                <Button
                  key={operation.kind}
                  variant="outline"
                  onClick={() => hanfleGenerate(operation.kind)}
                  disabled={isGlobalLoading}
                >
                  {operation.title}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{operation.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/components/button";
import { Textarea } from "@/shared/ui/components/textarea";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/components/select";
import { DatePicker } from "@/shared/ui/components/date-picker";
import { cn } from "@/shared/ui/lib/utils";
import type { CreateReportData } from "./create-report-shceme";
import { createReportSchema } from "./create-report-shceme";
import { useCreateReport } from "./use-create-report";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { HomeworkStatus } from "@/modules/students/domain/homework-status";
import {
  formatHomeworkStatus,
  formatUnderstandingLevel,
} from "@/modules/students/shared/format";

type Props = {
  studentId: string;
};

export default function CreateReportForm({ studentId }: Props) {
  const { globalError, clearGlobalError, createReport } = useCreateReport();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createReportSchema),
  });

  const onSubmit: SubmitHandler<CreateReportData> = async (data) => {
    clearGlobalError();
    const requestData = {
      ...data,
      lessonAt: format(data.lessonAt, "yyyy-MM-dd"),
    };
    await createReport(requestData, studentId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
      <Controller
        name="lessonAt"
        control={control}
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel>
              Дата занятия
              <span className=" text-destructive/90">*</span>
            </FieldLabel>
            <DatePicker
              {...props}
              aria-invalid={!!error}
              aria-describedby={error ? "lessonAt-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
              calendarProps={{
                disabled: { after: new Date() },
              }}
            />
            {error && <FieldError errors={[error]} id="lessonAt-error" />}
          </Field>
        )}
      />

      <Controller
        name="lessonPlan"
        control={control}
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="lessonPlan">
              Какой был план занятия?
              <span className="text-destructive/90">*</span>
            </FieldLabel>
            <Textarea
              id="lessonPlan"
              {...props}
              className="min-h-24"
              placeholder="Пример: Решение квадратных уравнений, Подготовка к экзамену и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "lessonPlan-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="lessonPlan-error" />}
          </Field>
        )}
      />

      <Controller
        name="uncompletedPlannedWork"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="uncompletedPlannedWork">
              Что из запланированного не успели пройти?
            </FieldLabel>
            <Textarea
              id="uncompletedPlannedWork"
              {...props}
              value={value ?? ""}
              className="min-h-24"
              placeholder="Пример: Не успели пройти формулы сокращенного умножения, не успели решить 2 задачи и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={
                error ? "uncompletedPlannedWork-error" : undefined
              }
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && (
              <FieldError errors={[error]} id="uncompletedPlannedWork-error" />
            )}
          </Field>
        )}
      />

      <Controller
        name="whatWentWell"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="whatWentWell">
              Что ученик уже делает уверенно?
            </FieldLabel>
            <Textarea
              id="whatWentWell"
              {...props}
              value={value ?? ""}
              className="min-h-24"
              placeholder="Пример: Уверенно решает задачи на проценты, хорошо умеет объяснять решения задач и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "whatWentWell-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="whatWentWell-error" />}
          </Field>
        )}
      />

      <Controller
        name="difficulties"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="difficulties">
              Что пока не получается / не закрепилось?
            </FieldLabel>
            <Textarea
              id="difficulties"
              {...props}
              value={value ?? ""}
              className="min-h-24"
              placeholder="Пример: не до конца понимает как строятся уравнения по текстовым задачам и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "difficulties-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="difficulties-error" />}
          </Field>
        )}
      />

      <Controller
        name="understandingLevel"
        control={control}
        defaultValue={UnderstandingLevel.Medium}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="understandingLevel">
              Выберите общий уровень понимания на данном занятии
            </FieldLabel>
            <Select
              value={value}
              onValueChange={(nextValue) => {
                onChange(nextValue);
                clearGlobalError();
              }}
            >
              <SelectTrigger
                id="understandingLevel"
                aria-invalid={!!error}
                aria-describedby={
                  error ? "understandingLevel-error" : undefined
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UnderstandingLevel.Low}>
                  {formatUnderstandingLevel(UnderstandingLevel.Low)}
                </SelectItem>
                <SelectItem value={UnderstandingLevel.Medium}>
                  {formatUnderstandingLevel(UnderstandingLevel.Medium)}
                </SelectItem>
                <SelectItem value={UnderstandingLevel.High}>
                  {formatUnderstandingLevel(UnderstandingLevel.High)}
                </SelectItem>
              </SelectContent>
            </Select>
            {error && (
              <FieldError errors={[error]} id="understandingLevel-error" />
            )}
          </Field>
        )}
      />

      <Controller
        name="homeworkStatus"
        control={control}
        defaultValue={HomeworkStatus.NotAssigned}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="homeworkStatus">
              Как справился с домашкой? (если домашка была)
            </FieldLabel>
            <Select
              value={value}
              onValueChange={(nextValue) => {
                onChange(nextValue);
                clearGlobalError();
              }}
            >
              <SelectTrigger
                id="homeworkStatus"
                aria-invalid={!!error}
                aria-describedby={error ? "homeworkStatus-error" : undefined}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={HomeworkStatus.NotAssigned}>
                  {formatHomeworkStatus(HomeworkStatus.NotAssigned)}
                </SelectItem>
                <SelectItem value={HomeworkStatus.NotChecked}>
                  {formatHomeworkStatus(HomeworkStatus.NotChecked)}
                </SelectItem>
                <SelectItem value={HomeworkStatus.NotDone}>
                  {formatHomeworkStatus(HomeworkStatus.NotDone)}
                </SelectItem>
                <SelectItem value={HomeworkStatus.PartlyDone}>
                  {formatHomeworkStatus(HomeworkStatus.PartlyDone)}
                </SelectItem>
                <SelectItem value={HomeworkStatus.Done}>
                  {formatHomeworkStatus(HomeworkStatus.Done)}
                </SelectItem>
              </SelectContent>
            </Select>
            {error && <FieldError errors={[error]} id="homeworkStatus-error" />}
          </Field>
        )}
      />

      <Controller
        name="teacherComment"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="teacherComment">Комментарий</FieldLabel>
            <Textarea
              id="teacherComment"
              {...props}
              className="min-h-24"
              value={value ?? ""}
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "teacherComment-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="teacherComment-error" />}
          </Field>
        )}
      />

      {globalError && (
        <div role="alert" className="text-red-500 text-center text-sm">
          {globalError}
        </div>
      )}

      <Button className="self-center" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Создание..." : "Создать"}
      </Button>
    </form>
  );
}

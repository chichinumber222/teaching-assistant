"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/components/button";
import { Textarea } from "@/shared/ui/components/textarea";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";
import { DatePicker } from "@/shared/ui/components/date-picker";
import { cn } from "@/shared/ui/lib/utils";
import type { CreateReportData } from "./create-report-shceme";
import { createReportSchema } from "./create-report-shceme";
import { useCreateReport } from "./use-create-report";

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
        defaultValue={new Date()}
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
        name="lessonFocus"
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="lessonFocus">
              Что проходили или отрабатывали на занятии?
              <span className="text-destructive/90">*</span>
            </FieldLabel>
            <Textarea
              id="lessonFocus"
              {...props}
              placeholder="Решали задачи на движение, отрабатывали навык построения графиков функции и т.д."
              autoComplete="off"
              className="min-h-20"
              aria-invalid={!!error}
              aria-describedby={error ? "lessonFocus-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="lessonFocus-error" />}
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
              Что вызвало трудности у ученика?
              <span className=" text-destructive/90">*</span>
            </FieldLabel>
            <Textarea
              id="difficulties"
              {...props}
              value={value ?? ""}
              className="min-h-20"
              placeholder="Не до конца понимает как строятся уравнения по текстовым задачам и т.д."
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
              value={value ?? ""}
              placeholder="Ваши общие впечатления от занятия, рекомендации по дальнейшей работе"
              className="min-h-20"
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

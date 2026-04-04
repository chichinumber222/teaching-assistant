"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { createStudentScheme } from "./create-student-scheme";
import type { CreateStudentData } from "./create-student-scheme";
import { useCreateStudent } from "./use-create-student";
import { Textarea } from "@/shared/ui/components/textarea";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";

export default function CreateStudentForm() {
  const { globalError, clearGlobalError, createStudent } = useCreateStudent();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createStudentScheme),
  });

  const onSubmit: SubmitHandler<CreateStudentData> = async (data) => {
    clearGlobalError();
    await createStudent(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="fullName">Полное имя</FieldLabel>
            <Input
              id="fullName"
              {...props}
              value={value ?? ""}
              type="text"
              placeholder="Иван Иванов"
              autoComplete="name"
              aria-invalid={!!error}
              aria-describedby={error ? "fullName-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="fullName-error" />}
          </Field>
        )}
      />

      <Controller
        name="subject"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="subject">Предмет</FieldLabel>
            <Input
              id="subject"
              {...props}
              value={value ?? ""}
              type="text"
              placeholder="Пример: математика, физика и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "subject-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="subject-error" />}
          </Field>
        )}
      />

      <Controller
        name="level"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="level">Уровень</FieldLabel>
            <Input
              id="level"
              {...props}
              value={value ?? ""}
              type="text"
              placeholder="Пример: 7 класс, 1 курс и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "level-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="level-error" />}
          </Field>
        )}
      />

      <Controller
        name="goals"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="goals">Цели обучения</FieldLabel>
            <Textarea
              id="goals"
              {...props}
              className="min-h-24"
              value={value ?? ""}
              placeholder="Освоить алгоритм решения квадратных уравнений, подготовиться к экзамену и т.д."
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "goals-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="goals-error" />}
          </Field>
        )}
      />

      <Controller
        name="notes"
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Field>
            <FieldLabel htmlFor="notes">Примечания</FieldLabel>
            <Textarea
              id="notes"
              {...props}
              value={value ?? ""}
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={error ? "notes-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {error && <FieldError errors={[error]} id="notes-error" />}
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

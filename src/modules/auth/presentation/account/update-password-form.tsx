"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/components/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";
import { PasswordInput } from "@/shared/ui/components/password-input";
import {
  updatePasswordFormSchema,
  type UpdatePasswordFormData,
} from "./scheme";
import { useUpdatePassword } from "./use-update-password";

export function UpdatePasswordForm() {
  const { updatePassword, globalError, successMessage, clearMessages } =
    useUpdatePassword();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    const isChanged = await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (isChanged) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <Controller
        name="currentPassword"
        control={control}
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="current-password">Текущий пароль</FieldLabel>
            <PasswordInput
              id="current-password"
              {...props}
              autoComplete="current-password"
              aria-invalid={!!error}
              aria-describedby={error ? "current-password-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearMessages();
              }}
            />
            {error && (
              <FieldError errors={[error]} id="current-password-error" />
            )}
          </Field>
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="new-password">Новый пароль</FieldLabel>
            <PasswordInput
              id="new-password"
              {...props}
              autoComplete="new-password"
              aria-invalid={!!error}
              aria-describedby={error ? "new-password-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearMessages();
              }}
            />
            {error && <FieldError errors={[error]} id="new-password-error" />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, ...props }, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="confirm-password">
              Подтвердите новый пароль
            </FieldLabel>
            <PasswordInput
              id="confirm-password"
              {...props}
              autoComplete="new-password"
              aria-invalid={!!error}
              aria-describedby={error ? "confirm-password-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearMessages();
              }}
            />
            {error && (
              <FieldError errors={[error]} id="confirm-password-error" />
            )}
          </Field>
        )}
      />

      {globalError && (
        <div className="text-red-500 text-center text-sm">{globalError}</div>
      )}

      {successMessage && (
        <div className="text-green-500 text-center text-sm">
          {successMessage}
        </div>
      )}

      <Button type="submit" className="self-start" disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Сменить пароль"}
      </Button>
    </form>
  );
}

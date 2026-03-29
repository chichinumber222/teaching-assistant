"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { registerSchema, RegisterData } from "./scheme";
import { useRegister } from "./use-register";
import { PasswordInput } from "@/shared/ui/components/password-input";

export default function RegisterForm() {
  const { register, globalError, clearGlobalError } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    clearGlobalError();
    await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...props } }) => (
          <div>
            <Input
              {...props}
              type="text"
              placeholder="Имя"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {errors.name && (
              <span
                id={"name-error"}
                className="text-red-500 text-sm mt-1 block"
              >
                {errors.name.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...props } }) => (
          <div>
            <Input
              {...props}
              type="email"
              placeholder="Email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span
                id={"email-error"}
                className="text-red-500 text-sm mt-1 block"
              >
                {errors.email.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...props } }) => (
          <div>
            <PasswordInput
              {...props}
              placeholder="Пароль"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {errors.password && (
              <span
                id={"password-error"}
                className="text-red-500 text-sm mt-1 block"
              >
                {errors.password.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...props } }) => (
          <div>
            <PasswordInput
              {...props}
              placeholder="Подтвердите пароль"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "confirm-password-error" : undefined
              }
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
            />
            {errors.confirmPassword && (
              <span
                id={"confirm-password-error"}
                className="text-red-500 text-sm mt-1 block"
              >
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        )}
      />

      {globalError && (
        <div className="text-red-500 text-center text-sm">{globalError}</div>
      )}

      <Button className="self-center" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
}

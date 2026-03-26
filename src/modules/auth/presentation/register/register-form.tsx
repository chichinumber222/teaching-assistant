"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { registerSchema } from "./scheme";
import { useRegister } from "./use-register";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { register, globalError, clearGlobalError } = useRegister();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearGlobalError();
    await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const nameErrorId = "name-error";
  const emailErrorId = "email-error";
  const passwordErrorId = "password-error";
  const confirmPasswordErrorId = "confirm-password-error";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
      <div>
        <Input
          {...formRegister("name")}
          type="text"
          placeholder="Имя"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? nameErrorId : undefined}
        />
        {errors.name && (
          <span id={nameErrorId} className="text-red-500 text-sm mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <Input
          {...formRegister("email")}
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailErrorId : undefined}
        />
        {errors.email && (
          <span id={emailErrorId} className="text-red-500 text-sm mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <Input
          {...formRegister("password")}
          type="password"
          placeholder="Пароль"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? passwordErrorId : undefined}
        />
        {errors.password && (
          <span
            id={passwordErrorId}
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <Input
          {...formRegister("confirmPassword")}
          type="password"
          placeholder="Подтвердите пароль"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? confirmPasswordErrorId : undefined
          }
        />
        {errors.confirmPassword && (
          <span
            id={confirmPasswordErrorId}
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {globalError && (
        <div className="text-red-500 text-center text-sm">{globalError}</div>
      )}

      <Button className="self-center" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
}

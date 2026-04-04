"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { loginSchema } from "./scheme";
import type { LoginData } from "./scheme";
import { useLogin } from "./use-login";
import { PasswordInput } from "@/shared/ui/components/password-input";

export default function LoginForm() {
  const { login, globalError, clearGlobalError } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    clearGlobalError();
    await login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
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
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={(event) => {
                onChange(event);
                clearGlobalError();
              }}
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

      {globalError && (
        <div className="text-red-500 text-center text-sm">{globalError}</div>
      )}

      <Button className="self-center" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}

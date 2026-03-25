"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { cn } from "@/shared/ui/lib/utils";
import { loginSchema } from "./scheme";
import { useLogin } from "./use-login";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, globalError, clearGlobalError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearGlobalError();
    await login(data);
  };

  const emailErrorId = "email-error";
  const passwordErrorId = "password-error";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex", "flex-col", "gap-4")}
      noValidate
    >
      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
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
          {...register("password")}
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

      {globalError && (
        <div className="text-red-500 text-center text-sm">{globalError}</div>
      )}

      <Button className="self-center" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}

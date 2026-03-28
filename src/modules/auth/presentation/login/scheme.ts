import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z
        .email({ message: "Некорректный формат email" })
        .min(1, { message: "Email обязателен" })
        .max(255, { message: "Email не может превышать 255 символов" }),
    ),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" })
    .max(100, { message: "Пароль не может превышать 100 символов" }),
});

export type LoginData = z.infer<typeof loginSchema>;

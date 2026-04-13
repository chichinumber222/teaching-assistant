import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Имя обязательно" })
      .max(100, { message: "Имя не может превышать 100 символов" }),
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
      .min(8, { message: "Пароль должен содержать минимум 8 символов" })
      .max(128, { message: "Пароль не может превышать 128 символов" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

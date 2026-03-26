import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Имя обязательно" })
      .max(100, { message: "Имя не может превышать 100 символов" }),
    email: z
      .email({ message: "Некорректный формат email" })
      .trim()
      .min(1, { message: "Email обязателен" })
      .max(255, { message: "Email не может превышать 255 символов" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Пароль должен содержать минимум 6 символов" })
      .max(100, { message: "Пароль не может превышать 100 символов" }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
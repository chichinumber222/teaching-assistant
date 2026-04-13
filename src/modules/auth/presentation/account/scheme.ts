import * as z from "zod";

export const updatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Текущий пароль обязателен" })
      .max(128, {
        message: "Текущий пароль не может превышать 128 символов",
      }),
    newPassword: z
      .string()
      .min(8, { message: "Новый пароль должен содержать минимум 8 символов" })
      .max(128, { message: "Новый пароль не может превышать 128 символов" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordFormSchema>;

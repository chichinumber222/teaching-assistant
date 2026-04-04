import { optionalNullableTextField } from "@/shared/lib/validation/optional-nullable-text-field";
import z from "zod";

export const createStudentScheme = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Полное имя обязательно" })
    .max(100, { message: "Полное имя должно быть не длиннее 100 символов" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Предмет обязателен" })
    .max(100, { message: "Предмет должен быть не длиннее 100 символов" }),
  level: optionalNullableTextField(100),
  goals: optionalNullableTextField(1000),
  notes: optionalNullableTextField(2000),
});

export type CreateStudentData = z.infer<typeof createStudentScheme>;

import z from "zod";
import { optionalNullableTextField } from "@/shared/lib/validation/optional-nullable-text-field";

export const createReportSchema = z.object({
  lessonAt: z.date(),
  lessonFocus: z
    .string()
    .trim()
    .min(1, "Опишите, что проходили на уроке")
    .max(2000),
  difficulties: z
    .string()
    .trim()
    .min(1, "Укажите, что вызвало трудности")
    .max(2000),
  teacherComment: optionalNullableTextField(2000),
});

export type CreateReportData = z.infer<typeof createReportSchema>;

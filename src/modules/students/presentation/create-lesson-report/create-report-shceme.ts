import z from "zod";

import { HomeworkStatus } from "@/modules/students/domain/homework-status";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { optionalNullableTextField } from "@/shared/lib/validation/optional-nullable-text-field";

export const createReportSchema = z.object({
  lessonAt: z.date({ error: "Укажите корректную дату" }),
  lessonPlan: z
    .string("План занятия должен быть строкой")
    .trim()
    .min(1, "Укажите план занятия")
    .max(2000, "Максимальная длина — 2000 символов"),
  uncompletedPlannedWork: optionalNullableTextField(2000),
  understandingLevel: z.enum(UnderstandingLevel, {
    error: () => ({ message: "Укажите уровень понимания" }),
  }),
  whatWentWell: optionalNullableTextField(2000),
  difficulties: optionalNullableTextField(2000),
  homeworkStatus: z.enum(HomeworkStatus, {
    error: () => ({ message: "Укажите статус домашней работы" }),
  }),
  homeworkComment: optionalNullableTextField(2000),
  teacherComment: optionalNullableTextField(2000),
});

export type CreateReportData = z.infer<typeof createReportSchema>;

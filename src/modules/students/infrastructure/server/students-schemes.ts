import z from "zod";
import { optionalNullableTextField } from "@/shared/lib/validation/optional-nullable-text-field";

export const createStudentRequestSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(100),
  level: optionalNullableTextField(100),
  goals: optionalNullableTextField(1000),
  notes: optionalNullableTextField(2000),
});

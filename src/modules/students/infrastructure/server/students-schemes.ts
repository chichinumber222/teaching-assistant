import z from "zod";
import { optionalNullableTextField } from "@/shared/lib/validation/optional-nullable-text-field";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { HomeworkStatus } from "@/modules/students/domain/homework-status";

export const createStudentRequestSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(100),
  level: optionalNullableTextField(100),
  goals: optionalNullableTextField(1000),
  notes: optionalNullableTextField(2000),
});

export const createStudentLessonReportRequestSchema = z.object({
  lessonAt: z.iso.datetime(),
  lessonPlan: z.string().trim().min(1).max(2000),
  uncompletedPlannedWork: optionalNullableTextField(2000),
  understandingLevel: z.enum(UnderstandingLevel),
  whatWentWell: optionalNullableTextField(2000),
  difficulties: optionalNullableTextField(2000),
  homeworkStatus: z.enum(HomeworkStatus),
  homeworkComment: optionalNullableTextField(2000),
  teacherComment: optionalNullableTextField(2000),
});

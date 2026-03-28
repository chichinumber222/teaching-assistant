import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().min(1).max(255)),
  password: z.string().trim().min(6).max(128),
});
export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

export const registerRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email().min(1).max(255)),
  password: z.string().trim().min(6).max(128),
});
export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;

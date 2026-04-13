import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().min(1).max(255)),
  password: z.string().min(1).max(128),
});

export const registerRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email().min(1).max(255)),
  password: z.string().min(8).max(128),
});

export const updateRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email().min(1).max(255)),
});

export const updatePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(8).max(128),
});

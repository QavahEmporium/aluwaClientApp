// src/validations/userValidation.ts
import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).trim().optional(),
  avatarUrl: z.string().url().optional(),
});

export type RegisterUserForm = z.infer<typeof registerUserSchema>;
export type LoginUserForm = z.infer<typeof loginUserSchema>;

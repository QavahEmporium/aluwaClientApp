// src/validations/userValidation.ts
import { z } from "zod";

export const registerUserformSchema = z
  .object({
    name: z.string().trim().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    contactNumber: z
      .string()
      .min(6, {
        message: "Contact Number is required",
      })
      .regex(/[0-9]/, { message: "Contain only number between 0 - 9." })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[a-z]/, { message: "Contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .trim(),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
  })
  .superRefine(({ password, confirmPassword, contactNumber }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
        path: ["confirmPassword"],
      });
    }

    if (contactNumber !== "" && !contactNumber.startsWith("0")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact Number must start with 0. E.g 067 123 4545.",
        path: ["contactNumber"],
      });
    }
  });

export type RegisterUserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type LoginUserState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const loginUserFormSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).trim().optional(),
  avatarUrl: z.string().url().optional(),
});

export type RegisterUserForm = z.infer<typeof registerUserformSchema>;
export type LoginUserForm = z.infer<typeof loginUserFormSchema>;

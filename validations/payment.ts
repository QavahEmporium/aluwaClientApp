// src/validations/paymentValidation.ts
import { z } from "zod";

export const paymentSchema = z.object({
  orderId: z.string().min(1),
  paymentMethod: z.enum(["card", "cod", "bank_transfer", "wallet"]),
  paymentStatus: z
    .enum(["pending", "authorized", "paid", "failed", "refunded"])
    .default("pending"),
  transactionId: z.string().optional(),
  amount: z.number().nonnegative(),
  provider: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

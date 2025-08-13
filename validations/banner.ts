// src/validations/bannerValidation.ts
import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().url(),
  link: z.string().url().optional(),
  startDate: z.union([z.string(), z.date()]).optional(),
  endDate: z.union([z.string(), z.date()]).optional(),
  isActive: z.boolean().optional(),
});

export type BannerInput = z.infer<typeof bannerSchema>;

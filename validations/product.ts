// src/validations/productValidation.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).trim(),
  slug: z.string().min(2).toLowerCase(),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  images: z.array(z.string().url()).min(1),
  sku: z.string().optional(),
  stock: z.number().int().nonnegative(),
  status: z.enum(["active", "draft"]).default("active"),
  categoryId: z.string().min(1),
  tags: z.array(z.string()).optional(),
  attributes: z
    .record(z.string(), z.union([z.string(), z.number()]))
    .optional(),
});

export const productVariantSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  value: z.string().min(1),
  priceAdjustment: z.number().optional(),
  stock: z.number().int().nonnegative().optional(),
  sku: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductVariantInput = z.infer<typeof productVariantSchema>;

export const categorySchema = z.object({
  name: z.string().min(2).trim(),
  slug: z.string().min(2).toLowerCase(),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const reviewSchema = z.object({
  userId: z.string().min(1),
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

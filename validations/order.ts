// src/validations/orderValidation.ts
import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1),
  orderNumber: z.string().min(4),
  status: z
    .enum(["pending", "paid", "shipped", "delivered", "cancelled", "refunded"])
    .default("pending"),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
  shippingAddressId: z.string().min(1),
  billingAddressId: z.string().optional(),
  notes: z.string().optional(),
});

export const orderItemSchema = z.object({
  orderId: z.string().min(1),
  productId: z.string().min(1),
  variantId: z.string().nullable().optional(),
  name: z.string().min(1),
  sku: z.string().optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1),
  image: z.string().url().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;

export const shippingSchema = z.object({
  orderId: z.string().min(1),
  carrier: z.string().optional(),
  trackingNumber: z.string().optional(),
  status: z
    .enum([
      "label_created",
      "in_transit",
      "out_for_delivery",
      "delivered",
      "exception",
    ])
    .default("label_created"),
  estimatedDelivery: z.union([z.string(), z.date()]).optional(),
});

export type ShippingInput = z.infer<typeof shippingSchema>;

export const wishlistSchema = z.object({
  userId: z.string().min(1),
  name: z.string().optional(),
});

export const wishlistItemSchema = z.object({
  wishlistId: z.string().min(1),
  productId: z.string().min(1),
  addedAt: z.union([z.string(), z.date()]).optional(),
});

export type WishlistInput = z.infer<typeof wishlistSchema>;
export type WishlistItemInput = z.infer<typeof wishlistItemSchema>;

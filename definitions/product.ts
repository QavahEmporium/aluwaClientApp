// src/definitions/product.ts
import { Types } from "mongoose";
/* 
export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  sku?: string;
  stock: number;
  status?: "active" | "draft";
  categoryId: Types.ObjectId | string;
  tags?: string[];
  attributes?: Record<string, any>;
} */

export interface ICategory {
  name: string;
  description?: string;
  isPublished?: boolean;
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: Types.ObjectId | string;
  imageUrl: string;
  isPublished?: boolean;
}

export type ProductFormState = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    categoryId?: string[];
    imageUrl?: string[];
    global?: string[]; // 👈 added global here
  };
  message: string;
};

// src/definitions/IProductVariant.ts
export type IProductVariant = {
  productId: string;
  name: string; // e.g., "Size"
  value: string; // e.g., "100ml"
  priceAdjustment?: number; // +/- price
  stock?: number; // optional per variant stock
  sku?: string;
};

// src/definitions/IReview.ts
export type IReview = {
  userId: string;
  productId: string;
  rating: number; // 1..5
  comment?: string;
};

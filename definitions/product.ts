// src/definitions/ICategory.ts
export type ICategory = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null; // nested categories
  isActive?: boolean;
};

// src/definitions/IProduct.ts
export type IProduct = {
  name: string;
  slug: string;
  description: string;
  price: number; // base price
  images: string[]; // URLs
  sku?: string;
  stock: number;
  status: "active" | "draft";
  categoryId: string;
  tags?: string[];
  attributes?: Record<string, string | number>; // e.g., scent: "Cedarwood"
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


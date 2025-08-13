// src/definitions/IOrder.ts
export type IOrder = {
  userId: string;
  orderNumber: string;
  status:
    | "pending"
    | "paid"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingAddressId: string;
  billingAddressId?: string;
  notes?: string;
};

export type IOrderItem = {
  orderId: string;
  productId: string;
  variantId?: string | null;
  name: string; // snapshot
  sku?: string;
  price: number; // snapshot
  quantity: number;
  image?: string; // snapshot
};

// src/definitions/IShipping.ts
export type IShipping = {
  orderId: string;
  carrier?: string; // DHL, UPS, etc.
  trackingNumber?: string;
  status:
    | "label_created"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "exception";
  estimatedDelivery?: Date | string;
};

// src/definitions/IWishlist.ts
export type IWishlist = {
  userId: string;
  name?: string; // e.g., "My Grooming Picks"
};

export type IWishlistItem = {
  wishlistId: string;
  productId: string;
  addedAt?: Date | string;
};

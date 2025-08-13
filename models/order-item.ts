// src/models/OrderItem.ts
import { IOrderItem } from "@/definitions/order";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface OrderItemDocument
  extends Document,
    Omit<IOrderItem, "orderId" | "productId" | "variantId"> {
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderItemSchema = new Schema<OrderItemDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      default: null,
    },
    name: { type: String, required: true },
    sku: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { timestamps: true }
);

OrderItemSchema.index({ orderId: 1 });

const OrderItem: Model<OrderItemDocument> =
  mongoose.models.OrderItem ||
  mongoose.model<OrderItemDocument>("OrderItem", OrderItemSchema);

export default OrderItem;

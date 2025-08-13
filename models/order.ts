// src/models/Order.ts
import { IOrder } from "@/definitions/order";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface OrderDocument
  extends Document,
    Omit<IOrder, "userId" | "shippingAddressId" | "billingAddressId"> {
  userId: Types.ObjectId;
  shippingAddressId: Types.ObjectId;
  billingAddressId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
      index: true,
    },
    subtotal: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    shippingAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    billingAddressId: { type: Schema.Types.ObjectId, ref: "Address" },
    notes: { type: String },
  },
  { timestamps: true }
);

OrderSchema.index({ orderNumber: 1 }, { unique: true });

const Order: Model<OrderDocument> =
  mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;

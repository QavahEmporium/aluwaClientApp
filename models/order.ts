// src/models/Order.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderDocument extends Document {
  userId: mongoose.Types.ObjectId;
  shippingAddressId: mongoose.Types.ObjectId;
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shippingAddressId: {
      type: Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true,
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order: Model<OrderDocument> =
  mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;

// src/models/Shipping.ts
import { IShipping } from "@/definitions/order";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface ShippingDocument
  extends Document,
    Omit<IShipping, "orderId" | "estimatedDelivery"> {
  orderId: Types.ObjectId;
  estimatedDelivery?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ShippingSchema = new Schema<ShippingDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },
    carrier: { type: String },
    trackingNumber: { type: String, index: true },
    status: {
      type: String,
      enum: [
        "label_created",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "exception",
      ],
      default: "label_created",
      index: true,
    },
    estimatedDelivery: { type: Date },
  },
  { timestamps: true }
);

const Shipping: Model<ShippingDocument> =
  mongoose.models.Shipping ||
  mongoose.model<ShippingDocument>("Shipping", ShippingSchema);

export default Shipping;

// src/models/Payment.ts
import { IPayment } from "@/definitions/payment";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface PaymentDocument extends Document, Omit<IPayment, "orderId"> {
  orderId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema = new Schema<PaymentDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cod", "bank_transfer", "wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "authorized", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    transactionId: { type: String, index: true },
    amount: { type: Number, required: true, min: 0 },
    provider: { type: String },
  },
  { timestamps: true }
);

const Payment: Model<PaymentDocument> =
  mongoose.models.Payment ||
  mongoose.model<PaymentDocument>("Payment", PaymentSchema);

export default Payment;

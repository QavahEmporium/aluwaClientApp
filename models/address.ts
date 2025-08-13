// src/models/Address.ts
import { IAddress } from "@/definitions/address";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface AddressDocument extends Document, Omit<IAddress, "userId"> {
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddressSchema = new Schema<AddressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
    type: { type: String, enum: ["shipping", "billing"], default: "shipping" },
  },
  { timestamps: true }
);

const Address: Model<AddressDocument> =
  mongoose.models.Address ||
  mongoose.model<AddressDocument>("Address", AddressSchema);

export default Address;

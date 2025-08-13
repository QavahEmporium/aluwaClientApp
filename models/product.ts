// src/models/Product.ts
import { IProduct } from "@/definitions/product";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface ProductDocument extends Document, Omit<IProduct, "categoryId"> {
  categoryId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String, required: true }],
    sku: { type: String, index: true },
    stock: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    tags: [{ type: String }],
    attributes: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: 1 });

const Product: Model<ProductDocument> =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;

// src/models/ProductVariant.ts
import { IProductVariant } from "@/definitions/product";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface ProductVariantDocument
  extends Document,
    Omit<IProductVariant, "productId"> {
  productId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductVariantSchema = new Schema<ProductVariantDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true }, // e.g., "Size"
    value: { type: String, required: true, trim: true }, // e.g., "100ml"
    priceAdjustment: { type: Number, default: 0 },
    stock: { type: Number, min: 0 },
    sku: { type: String },
  },
  { timestamps: true }
);

ProductVariantSchema.index(
  { productId: 1, name: 1, value: 1 },
  { unique: true }
);

const ProductVariant: Model<ProductVariantDocument> =
  mongoose.models.ProductVariant ||
  mongoose.model<ProductVariantDocument>(
    "ProductVariant",
    ProductVariantSchema
  );

export default ProductVariant;

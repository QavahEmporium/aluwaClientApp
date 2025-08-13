// src/models/WishlistItem.ts
import { IWishlistItem } from "@/definitions/order";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface WishlistItemDocument
  extends Document,
    Omit<IWishlistItem, "wishlistId" | "productId" | "addedAt"> {
  wishlistId: Types.ObjectId;
  productId: Types.ObjectId;
  addedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const WishlistItemSchema = new Schema<WishlistItemDocument>(
  {
    wishlistId: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
      required: true,
      index: true,
    },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

WishlistItemSchema.index({ wishlistId: 1, productId: 1 }, { unique: true });

const WishlistItem: Model<WishlistItemDocument> =
  mongoose.models.WishlistItem ||
  mongoose.model<WishlistItemDocument>("WishlistItem", WishlistItemSchema);

export default WishlistItem;

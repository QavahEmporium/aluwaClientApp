// src/models/Wishlist.ts
import { IWishlist } from "@/definitions/order";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface WishlistDocument extends Document, Omit<IWishlist, "userId"> {
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, default: "My Wishlist" },
  },
  { timestamps: true }
);

WishlistSchema.index({ userId: 1 });

const Wishlist: Model<WishlistDocument> =
  mongoose.models.Wishlist ||
  mongoose.model<WishlistDocument>("Wishlist", WishlistSchema);

export default Wishlist;

// src/models/Review.ts
import { IReview } from "@/definitions/product";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface ReviewDocument
  extends Document,
    Omit<IReview, "userId" | "productId"> {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

const Review: Model<ReviewDocument> =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", ReviewSchema);

export default Review;

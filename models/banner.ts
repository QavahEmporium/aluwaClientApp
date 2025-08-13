// src/models/Banner.ts
import { IBanner } from "@/definitions/banner";
import mongoose, { Schema, Document, Model } from "mongoose";

interface BannerDocument extends Document, IBanner {
  createdAt?: Date;
  updatedAt?: Date;
}

const BannerSchema = new Schema<BannerDocument>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

BannerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

const Banner: Model<BannerDocument> =
  mongoose.models.Banner ||
  mongoose.model<BannerDocument>("Banner", BannerSchema);

export default Banner;

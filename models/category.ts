// src/models/Category.ts
import { ICategory } from "@/definitions/product";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface CategoryDocument extends Document, Omit<ICategory, "parentId"> {
  parentId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CategorySchema.index({ slug: 1 }, { unique: true });

const Category: Model<CategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;

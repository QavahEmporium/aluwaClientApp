"use server";

import dbConnect from "@/lib/db";
import Category from "@/models/category";
import Product from "@/models/product";
import mongoose from "mongoose";

export async function listProducts(query?: {
  categoryId?: string;
  q?: string;
}) {
  await dbConnect();
  const filter: any = {};
  if (query?.categoryId)
    filter.categoryId = new mongoose.Types.ObjectId(query.categoryId);
  if (query?.q) filter.$text = { $search: query.q };
  filter.isPublished = true;

  const products = (await Product.find(filter)
    .populate("categoryId", "name") // populate only `name` field from Category
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return products.map((p) => ({
    id: p._id.toString(),
    category: p.categoryId?.name || "", // populated field
    categoryId: p.categoryId?._id?.toString() || "",
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    stock: p.stock,
    isPublished: p.isPublished,
  }));
}

export async function getProductById(id: string) {
  await dbConnect();
  const product = (await Product.findById(id).lean()) as any;

  return {
    id: product._id.toString(),
    category: product.categoryId?.name || "", // populated field
    categoryId: product.categoryId?._id?.toString() || "",
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    stock: product.stock,
    isPublished: product.isPublished,
  };
}

export async function getProductByCategory(categoryId: string) {
  await dbConnect();
  const products = (await Product.find({ categoryId, isPublished: true })
    .populate("categoryId", "name")
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return products.map((p) => ({
    id: p._id.toString(),
    category: p.categoryId?.name || "",
    categoryId: p.categoryId?._id?.toString() || "",
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    stock: p.stock,
    isPublished: p.isPublished,
  }));
}

export const landingPageProducts = async () => {
  await dbConnect();

  const cats = await Category.find({ isPublished: true }).lean();

  const categories = await Promise.all(
    cats.map(async (cat) => {
      const products = await Product.find({
        categoryId: cat._id,
        isPublished: true,
      })
        .limit(10)
        .lean();

      return {
        id: cat._id.toString(),
        name: cat.name,
        description: cat.description,
        isPublished: cat.isPublished,
        products: products.map((p) => ({
          id: p._id.toString(),
          name: p.name,
          category: cat.name,
          categoryId: cat._id.toString(),
          description: p.description,
          price: p.price,
          imageUrl: p.imageUrl,
          stock: p.stock,
          isPublished: p.isPublished,
        })),
      };
    })
  );

  return categories;
};

export async function listRelatedProducts(
  productId: string,
  categoryId: string
) {
  await dbConnect();

  const filter: any = {
    categoryId: new mongoose.Types.ObjectId(categoryId),
    _id: { $ne: new mongoose.Types.ObjectId(productId) }, // exclude current product
    isPublished: true,
  };

  const products = (await Product.find(filter)
    .populate("categoryId", "name")
    .sort({ createdAt: -1 })
    .limit(8) // limit related products
    .lean()) as any[];

  return products.map((p) => ({
    id: p._id.toString(),
    category: p.categoryId?.name || "",
    categoryId: p.categoryId?._id?.toString() || "",
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    stock: p.stock,
    isPublished: p.isPublished,
  }));
}

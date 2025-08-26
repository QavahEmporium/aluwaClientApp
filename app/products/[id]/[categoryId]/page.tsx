import ProductDetails from "@/components/product/[id]/product-details";
import {
  getProductByCategory,
  getProductById,
  listProducts,
  listRelatedProducts,
} from "@/data/products";
import { Suspense } from "react";

interface ProductPageProps {
  params: Promise<{ id: string; categoryId: string }>;
}

export async function generateStaticParams() {
  const products = await listProducts();

  return products.map((product: any) => ({
    id: product.id,
    categoryId: product.categoryId,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, categoryId } = await params;
  const product = await getProductById(id);
  const relatedProducts = await listRelatedProducts(id, categoryId);

  return (
    <Suspense>
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </Suspense>
  );
}

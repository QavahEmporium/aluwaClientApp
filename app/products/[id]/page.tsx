import ProductDetails from "@/components/product/[id]/product-details";
import { getProductById, listProducts } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await listProducts();

  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  return <ProductDetails product={product} />;
}

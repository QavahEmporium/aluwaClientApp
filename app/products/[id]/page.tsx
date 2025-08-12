import ProductDetails from "@/components/product/[id]/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}

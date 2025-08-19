import { listProducts } from "@/data/products";
import { listCategories } from "@/data/category";
import ProductListing from "@/components/product/product-list";

export default async function ProductListingPage() {
  const products = await listProducts();
  const categories = await listCategories();
  const categoriesMap = categories.map((c: any) => c.name);

  return (
    <ProductListing
      categories={["All", ...categoriesMap]}
      products={products}
    />
  );
}

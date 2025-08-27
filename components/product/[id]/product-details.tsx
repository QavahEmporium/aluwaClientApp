"use client";
import { CartDrawer } from "@/components/cart/cart-drawer";
import RelatedProducts from "./related-products";
import ProductInfo from "./product-info";
import { ChevronLeft } from "lucide-react";
import ProductImageCarousel from "./product-image-carousel";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetails({ product, relatedProducts = [] }: any) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="p-8 text-center">Product not found.</p>;

  const images = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl];

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex font-bold text-emperor-900 items-center mb-6 text-sm text-gray-600 hover:underline"
      >
        <ChevronLeft /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <ProductImageCarousel images={images} />
        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          addToCart={addToCart}
        />
      </div>

      <RelatedProducts products={relatedProducts} />

      <CartDrawer />
    </main>
  );
}

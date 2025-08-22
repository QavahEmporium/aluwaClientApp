"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "../products-list-card";

export default function ProductDetails({
  product,
  relatedProducts = [],
}: {
  product: any;
  relatedProducts?: any[];
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <p className="p-8 text-center">Product not found.</p>;
  }

  // Support multiple images, fallback to single image if not array
  const images = Array.isArray(product.image) ? product.image : [product.image];

  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center mb-6 text-sm text-gray-600 hover:underline"
      >
        <ChevronLeft /> Back
      </button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Carousel */}
        <div className="relative w-full md:w-1/2 aspect-square rounded-lg overflow-hidden border border-black">
          <Image
            src={`/api/files/${product.imageUrl}`}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous Image"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                aria-label="Next Image"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <p className="text-2xl font-semibold mb-4 sm:mb-0">
              R{product.price.toFixed(2)}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center rounded-xl p-1 border border-gray-300 w-28">
              <Button
                size="sm"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              >
                -
              </Button>
              <span className="flex-1 text-center">{quantity}</span>
              <Button size="sm" onClick={() => setQuantity((q) => q + 1)}>
                +
              </Button>
            </div>

            {/* Add to Cart button */}
            <Button
              onClick={() =>
                addToCart({ ...product, imageUrl: product.imageUrl }, quantity)
              }
              className="mt-4 sm:mt-0 w-full sm:w-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="my-16">
        <h2 className="text-xl font-semibold mb-6">Related Products</h2>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="flex flex-col">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </section>

      <CartDrawer />
    </main>
  );
}

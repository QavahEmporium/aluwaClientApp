"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export default function ProductDetails({ id }: { id: string }) {
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    return <p className="p-8 text-center">Product not found.</p>;
  }

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-96 rounded-lg overflow-hidden border border-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          <div>
            <p className="text-2xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <Button
              onClick={() => addToCart(product)}
              className="w-full md:w-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

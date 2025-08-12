// app/page.tsx (LandingPage)
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { CartIcon } from "@/components/cart/cart-icon";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/page-header";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function LandingPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const route = useRouter();

  return (
    <main className="bg-white text-black min-h-screen flex flex-col pb-12">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/hero3.jpg"
          alt="Grooming products background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Premium Hair & Beard Care
          </h1>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Natural, effective, and designed for the modern gentleman.
          </p>
          <Button
            onClick={() => route.push("/products")}
            className="bg-white text-black hover:bg-gray-200"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Scrollable Categories */}
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category
        );

        return (
          <section
            key={category}
            className="px-4 py-8 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {category}
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center w-full">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Call to Action */}
      <section className="bg-black text-white text-center px-6 py-12 mt-8">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Upgrade Your Grooming Game?
        </h3>
        <p className="mb-6 text-white/80 max-w-md mx-auto">
          Join thousands of satisfied customers and take the first step today.
        </p>
        <Button
          variant="secondary"
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => route.push("/products")}
        >
          Browse All Products
        </Button>
      </section>
      <CartDrawer />
    </main>
  );
}

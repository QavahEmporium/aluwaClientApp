"use client";

import { useState } from "react";
import { ProductCard } from "./products-list-card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function ProductListing({
  products,
  categories,
}: {
  products: any[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);

  return (
    <main className="md:flex md:flex-col md:items-center bg-[#fcf7f0] text-black min-h-screen pt-16 md:pt-20 pb-20 md:pb-10 px-3">
      <PageHeader />
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide my-6 md:mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap text-sm px-4 py-2 rounded-full shadow-md shadow-rose-bud-300 ${
              selectedCategory === cat
                ? "bg-rose-bud-500 text-white hover:bg-rose-bud-700"
                : "bg-white text-emperor-950 hover:bg-rose-bud-100 border"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-y-8 gap-x-4">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
      <CartDrawer />
    </main>
  );
}

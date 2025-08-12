"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card3";
import { Button } from "@/components/ui/button";

const categories = ["All", "Beard", "Hair", "Tools", "Bundles"];

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="md:flex md:flex-col md:items-center md:justify-center bg-white text-black min-h-screen pt-16 md:pt-20 pb-20 md:pb-0 px-4">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap text-sm px-4 py-2 rounded-full ${
              selectedCategory === cat
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white text-black hover:bg-gray-100 border"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </main>
  );
}

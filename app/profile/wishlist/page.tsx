// app/profile/wishlist/page.tsx

"use client";

import { useState } from "react";
import { WishlistProductCard } from "@/components/ui/wishlist-product-card";
import Link from "next/link";

const initialWishlist = [
  {
    id: 1,
    name: "Premium Beard Oil",
    price: 19.99,
    image: "/images/beard1.jpg",
    category: "Beard",
    tag: "Best Seller",
    description:
      "Keeps your beard soft, shiny, and healthy with all-natural ingredients.",
  },
  {
    id: 2,
    name: "Beard Grooming Kit",
    price: 39.99,
    image: "/images/beard2.jpg",
    category: "Beard",
    tag: "Bundle",
    description: "Everything you need for daily beard maintenance in one kit.",
  },
  {
    id: 3,
    name: "Wooden Beard Comb",
    price: 9.99,
    image: "/images/beard3.jpg",
    category: "Beard",
    tag: "Essential",
    description:
      "Keeps your beard soft, shiny, and healthy with all-natural ingredients.",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600 space-y-4">
          <p className="text-lg">Your wishlist is empty.</p>
          <Link
            href="/products"
            className="text-sm font-semibold text-white bg-black px-5 py-2 rounded hover:bg-gray-900 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {wishlist.map((product) => (
            <WishlistProductCard
              key={product.id}
              product={product}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const url = `/products/${product.id}/${product.categoryId}`;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex flex-col border shadow-lg md:shadow-rose-bud-300 shadow-rose-bud-200 rounded-2xl overflow-hidden w-full md:w-[260px] h-full md:pb-0 pb-2"
    >
      {/* Image */}
      <Link href={url} className="relative aspect-square w-full block">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={`/api/files/${product.imageUrl}`}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </Link>

      {/* Content */}
      <div className="p-2 md:p-4 flex flex-col flex-1 bg-white">
        <Link href={url} className="hover:underline">
          <h3 className="text-emperor-900 text-base sm:text-lg font-semibold mb-1">
            {product.name}
          </h3>
        </Link>

        <Badge className="bg-rose-bud-500 text-white mb-2 w-fit">
          {product.category}
        </Badge>

        <p className="text-emperor-900 font-bold text-sm sm:text-lg mb-4">
          R{product.price.toFixed(2)}
        </p>

        <Button
          onClick={() => addToCart(product)}
          className="bg-rose-bud-500 hover:bg-rose-bud-700 rounded-full text-white mt-auto w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

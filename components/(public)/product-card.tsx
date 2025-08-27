"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "../ui/buttons";

interface ProductCardProps {
  product: any;
  layout?: "carousel" | "grid";
}

export function ProductCard({
  product,
  layout = "carousel",
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const baseClasses =
    layout === "carousel"
      ? "min-w-[220px] sm:min-w-[250px] md:min-w-[280px] flex-shrink-0"
      : "w-full";

  const url = `/products/${product.id}/${product.categoryId}`;

  return (
    <Card
      className={`${baseClasses} flex flex-col rounded-2xl md:rounded-3xl overflow-hidden py-2 shadow-lg shadow-rose-bud-300 h-full`}
    >
      <CardContent className="p-2 flex flex-col gap-2 flex-grow">
        {/* Image */}
        <Link href={url} className="relative w-full aspect-square mb-2 block">
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          )}

          <Image
            src={`/api/files/${product.imageUrl}`}
            alt={product.name}
            fill
            className={`object-cover rounded transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes={
              layout === "carousel"
                ? "(max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Content */}
        <div className="p-2 flex flex-col flex-1">
          <Link href={url} className="hover:underline">
            <h3 className="text-emperor-900 text-base sm:text-lg font-semibold mb-1">
              {product.name}
            </h3>
          </Link>

          <Badge className="mb-2 w-fit bg-rose-bud-500 text-white">
            {product.category}
          </Badge>

          <p className="text-emperor-900 font-bold text-sm sm:text-lg mb-4">
            R{product.price.toFixed(2)}
          </p>

          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}

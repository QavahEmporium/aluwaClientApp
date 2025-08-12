// components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "./card";

export function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col h-full w-full">
      <CardContent className="p-4 flex flex-col gap-2 flex-grow">
        {/* Image */}
        <div className="relative w-full aspect-square mb-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Text */}
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-xs">{product.category}</p>

        {/* Price & Add Button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold text-sm">${product.price}</span>
          <Button size="sm" variant="outline">
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

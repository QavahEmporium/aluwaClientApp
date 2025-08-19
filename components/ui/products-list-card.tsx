// components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col border border-black rounded-lg overflow-hidden w-full h-full">
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-base sm:text-lg font-semibold mb-1">
            {product.name}
          </h3>
        </Link>

        <Badge className="mb-2 w-fit">{product.category}</Badge>

        <p className="font-bold text-sm sm:text-lg mb-4">
          ${product.price.toFixed(2)}
        </p>

        <Button
          onClick={() => addToCart(product)}
          className="mt-auto w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

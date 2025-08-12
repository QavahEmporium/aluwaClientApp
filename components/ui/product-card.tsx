// components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: any;
  layout?: "carousel" | "grid";
}

export function ProductCard({ product, layout = "carousel" }: ProductCardProps) {
  const { addToCart } = useCart();

  const baseClasses =
    layout === "carousel"
      ? "min-w-[220px] sm:min-w-[250px] md:min-w-[280px] flex-shrink-0"
      : "w-full";

  return (
    <div
      className={`${baseClasses} flex flex-col border border-black rounded-lg overflow-hidden`}
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes={
            layout === "carousel"
              ? "(max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          priority
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-base sm:text-lg font-semibold mb-1">{product.name}</h3>
        </Link>

        <Badge className="mb-2 w-fit">{product.category}</Badge>

        <p className="font-bold text-sm sm:text-lg mb-4">${product.price.toFixed(2)}</p>

        <Button onClick={() => addToCart(product)} className="mt-auto w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

// components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "./card";

interface ProductCardProps {
  product: any;
  layout?: "carousel" | "grid";
}

export function ProductCard({
  product,
  layout = "carousel",
}: ProductCardProps) {
  const { addToCart } = useCart();

  const baseClasses =
    layout === "carousel"
      ? "min-w-[220px] sm:min-w-[250px] md:min-w-[280px] flex-shrink-0"
      : "w-full";

  return (
    <Card
      className={`${baseClasses} flex flex-col rounded-lg overflow-hidden py-2`}
    >
      <CardContent className="p-2 flex flex-col gap-2 flex-grow">
        {/* Image */}
        <Link
          href={`/products/${product.id}`}
          className="relative w-full aspect-square mb-2"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded"
            sizes={
              layout === "carousel"
                ? "(max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            priority
          />
        </Link>

        {/* Content */}
        <div className="p-2 flex flex-col flex-1">
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
      </CardContent>
    </Card>
  );
}

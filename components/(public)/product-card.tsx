import Image from "next/image";
import Link from "next/link";
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
            src={`/api/files/${product.imageUrl}`}
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

          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}

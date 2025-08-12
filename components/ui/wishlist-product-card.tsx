// components/ui/wishlist-product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface WishlistProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
  };
  onRemove: (id: number) => void;
}

export function WishlistProductCard({
  product,
  onRemove,
}: WishlistProductCardProps) {
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

        {product.category && (
          <Badge className="mb-2 w-fit">{product.category}</Badge>
        )}

        <p className="font-bold text-sm sm:text-lg mb-4">
          ${product.price.toFixed(2)}
        </p>

        <Button
          onClick={() => addToCart(product)}
          className="w-full mb-2"
          size="sm"
        >
          Add to Cart
        </Button>
        <Button
          onClick={() => onRemove(product.id)}
          variant="outline"
          className="w-full"
          size="sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

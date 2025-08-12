// components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <div className="w-64 flex-shrink-0 border border-black rounded-lg overflow-hidden flex flex-col">
      <Link
        href={`/products/${product.id}`}
        className="relative h-40 w-full block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 16rem"
          priority
        />
      </Link>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        </Link>
        <Badge className="mb-2">{product.category}</Badge>
        <p className="font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)} className="mt-auto">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

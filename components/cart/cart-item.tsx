"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: any;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, decreaseQty, addToCart } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 border border-gray-300 rounded-md p-3 shadow-md shadow-rose-bud-200"
    >
      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={`/api/files/${item.imageUrl}`}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80px, 96px"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600">R {item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            className="bg-emperor-900 hover:bg-emperor-700 text-white hover:text-white"
            size="sm"
            onClick={() => decreaseQty(item.id)}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            className="bg-emperor-900 hover:bg-emperor-700 text-white hover:text-white"
            size="sm"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item.id)}
            className="ml-auto"
          >
            Remove
          </Button>
        </div>
      </div>
    </motion.li>
  );
}

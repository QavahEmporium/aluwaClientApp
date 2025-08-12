"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartIcon() {
  const { cart, openCart } = useCart();
  const badge = cart?.length || 0;

  return (
    <button
      onClick={openCart}
      className="relative p-2 rounded hover:bg-gray-100"
    >
      <ShoppingCart className="w-6 h-6" />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

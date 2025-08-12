"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, addToCart, decreaseQty } =
    useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={closeCart}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => decreaseQty(item.id)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <p className="font-semibold mb-3">Total: ${total.toFixed(2)}</p>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const route = useRouter();
  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main
      className="min-h-screen bg-white text-black 
                     pt-[64px]  /* push content below desktop navbar */
                     pb-[72px]  /* push content above mobile bottom navbar */
                     max-w-4xl mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4 overflow-auto max-h-[70vh]">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 border border-gray-300 rounded-md p-3"
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                  priority
                />
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" onClick={() => decreaseQty(item.id)}>
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button size="sm" onClick={() => addToCart(item)}>
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
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <p className="text-xl font-semibold">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          <Button
            className="w-full mt-4"
            onClick={() => route.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </main>
  );
}

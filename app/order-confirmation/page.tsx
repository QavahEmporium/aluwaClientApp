"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function OrderConfirmationPage() {
  const { cart, closeCart, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Clear cart when arriving at confirmation page
    closeCart();
    clearCart();
  }, []);

  if (!cart.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-[64px] pb-[72px] bg-white text-black">
        <h1 className="text-3xl font-bold mb-4">No recent order found</h1>
        <Button onClick={() => router.push("/")}>Back to Shop</Button>
      </main>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-white text-black p-6 pt-[64px] pb-[72px] max-w-lg mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Thank you for your order!
      </h1>
      <p className="mb-6 text-center text-gray-700">
        Your order has been received and is being processed. You will receive an
        email confirmation shortly.
      </p>

      <section className="w-full border border-gray-300 rounded-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </section>

      <Button
        onClick={() => router.push("/")}
        className="w-full py-3 text-lg font-semibold"
      >
        Back to Shop
      </Button>
    </main>
  );
}

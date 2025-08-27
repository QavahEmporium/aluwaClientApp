"use client";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";

export default function CartPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-white text-black pt-[64px] pb-[72px] max-w-4xl mx-auto p-4">
      <h1 className="text-emperor-900 text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4 overflow-auto max-h-[70vh]">
          <AnimatePresence>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {cart.length > 0 && <CartSummary subtotal={subtotal} />}
    </main>
  );
}

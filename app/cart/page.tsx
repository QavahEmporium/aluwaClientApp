"use client";
import { useCart } from "@/context/CartContext";
import { useDelivery } from "@/context/DeliveryContext";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import { useEffect } from "react";

export default function CartPage() {
  const { cart } = useCart();
  const { selectedDelivery, setSelectedDelivery } = useDelivery();
  const pudo = { id: "pudo", name: "Pudo Locker", price: 89 };
  
  useEffect(() => {
    setSelectedDelivery(pudo);
  }, []);

  // Example delivery options
  const deliveryOptions = [pudo];

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + (selectedDelivery?.price || 0);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="min-h-screen bg-white text-black pt-[64px] pb-[72px] max-w-4xl mx-auto p-4">
      <h1 className="text-emperor-900 text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <motion.ul
          className="space-y-4 overflow-auto max-h-[70vh]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {cart.length > 0 && (
        <>
          {/* Delivery Options */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-3">Delivery Options</h2>
            <div className="space-y-2">
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery?.id === option.id}
                      onChange={() => setSelectedDelivery(option)}
                      className="w-4 h-4"
                    />
                    <span>{option.name}</span>
                  </div>
                  <span className="font-medium">
                    {option.price === 0 ? "Free" : `R${option.price}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <CartSummary subtotal={subtotal} total={total} />
        </>
      )}
    </main>
  );
}

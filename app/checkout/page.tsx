"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit: could add validation here
    alert("Order placed! Thank you.");
    router.push("/order-confirmation");
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-[64px] pb-[72px]">
        <p className="text-center text-lg">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black p-6 pt-[64px] pb-[72px] max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="address"
            type="text"
            placeholder="Street Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex md:flex-row flex-col gap-3">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <input
            name="cardNumber"
            type="text"
            placeholder="Card Number"
            maxLength={19}
            value={form.cardNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex gap-3">
            <input
              name="expiry"
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={form.expiry}
              onChange={handleChange}
              required
              className="flex-initial w-2/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              name="cvc"
              type="text"
              placeholder="CVC"
              maxLength={4}
              value={form.cvc}
              onChange={handleChange}
              required
              className="flex-initial w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </section>

        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          Place Order
        </Button>
      </form>
    </main>
  );
}

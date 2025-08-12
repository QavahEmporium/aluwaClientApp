"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { useCart } from "@/context/CartContext";

// Mock data
const mockOrders = [
  {
    id: 1,
    date: "2025-08-10",
    status: "Delivered",
    total: 59.97,
    items: [
      { id: 101, name: "Beard Oil", quantity: 1, price: 19.99 },
      { id: 102, name: "Hair Wax", quantity: 2, price: 19.99 },
    ],
  },
  {
    id: 2,
    date: "2025-07-21",
    status: "Shipped",
    total: 39.98,
    items: [{ id: 103, name: "Shaving Kit", quantity: 1, price: 39.98 }],
  },
];

// Mock wishlist products - could be real product objects or minimal fields
const mockWishlist = [
  {
    id: 201,
    name: "Beard Balm",
    price: 14.99,
    category: "Beard",
    image: "/images/beard-balm.jpg",
  },
  {
    id: 202,
    name: "Comb Set",
    price: 9.99,
    category: "Tools",
    image: "/images/comb-set.jpg",
  },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "account">(
    "orders"
  );
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-white text-black pt-[64px] pb-[72px] max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      {/* Tabs */}
      <nav className="flex justify-center gap-4 mb-8 border-b border-gray-300">
        {[
          { id: "orders", label: "Orders" },
          { id: "wishlist", label: "Wishlist" },
          { id: "account", label: "Account Settings" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`pb-2 font-semibold border-b-2 ${
              activeTab === id
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      {activeTab === "orders" && (
        <section>
          {mockOrders.length === 0 ? (
            <p className="text-center text-gray-600">No orders yet.</p>
          ) : (
            mockOrders.map((order) => (
              <div
                key={order.id}
                className="mb-6 border border-gray-300 rounded-md p-4"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <p className="mb-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <ul className="mb-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-right font-bold">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </section>
      )}

      {activeTab === "wishlist" && (
        <section>
          {mockWishlist.length === 0 ? (
            <p className="text-center text-gray-600">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockWishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col border border-black rounded-lg overflow-hidden"
                >
                  <ProductCard product={product} layout="grid" />
                  <div className="p-2 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        /* TODO: implement remove from wishlist */
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "account" && (
        <section className="max-w-md mx-auto space-y-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <form>
            <label className="block mb-2 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="John Doe"
              disabled
            />

            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="john@example.com"
              disabled
            />

            <p className="mt-4 text-gray-500 italic text-sm">
              Account settings editing is not implemented in this MVP.
            </p>
          </form>
        </section>
      )}
    </main>
  );
}

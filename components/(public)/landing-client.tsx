"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function LandingClient({
  type,
}: {
  type: "hero" | "cta" | "cart";
}) {
  const router = useRouter();

  if (type === "hero") {
    return (
      <Button
        onClick={() => router.push("/products")}
        className="bg-rose-bud-500 text-white hover:bg-gray-200"
      >
        Shop Now
      </Button>
    );
  }

  if (type === "cta") {
    return (
      <Button
        variant="secondary"
        className="bg-white text-black hover:bg-gray-200"
        onClick={() => router.push("/products")}
      >
        Browse All Products
      </Button>
    );
  }

  if (type === "cart") {
    return <CartDrawer />;
  }

  return null;
}

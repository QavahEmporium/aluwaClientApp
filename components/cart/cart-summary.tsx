"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  subtotal: number;
}

export default function CartSummary({ subtotal }: CartSummaryProps) {
  const router = useRouter();

  return (
    <div className="mt-8 border-t pt-4">
      <p className="text-emperor-950 text-xl font-semibold">
        Subtotal: R {subtotal.toFixed(2)}
      </p>
      <Button
        className="bg-rose-bud-500 hover:bg-rose-bud-700 text-white w-full mt-4"
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

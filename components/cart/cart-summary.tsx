"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDelivery } from "@/context/DeliveryContext";

interface CartSummaryProps {
  subtotal: number;
  total: number;
}

export default function CartSummary({ subtotal, total }: CartSummaryProps) {
  const router = useRouter();
  const { selectedDelivery } = useDelivery();

  return (
    <div className="mt-8 border-t pt-4 space-y-3">
      {/* Subtotal */}
      <div className="flex justify-between text-lg">
        <span>Subtotal</span>
        <span>R {subtotal.toFixed(2)}</span>
      </div>

      {/* Delivery */}
      {selectedDelivery && (
        <div className="flex justify-between text-lg">
          <span>Delivery ({selectedDelivery.name})</span>
          <span>
            {selectedDelivery.price === 0
              ? "Free"
              : `R ${selectedDelivery.price.toFixed(2)}`}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between font-bold text-xl border-t pt-2">
        <span>Total</span>
        <span>R {total.toFixed(2)}</span>
      </div>

      {/* Checkout button */}
      <Button
        className="bg-rose-bud-500 hover:bg-rose-bud-700 text-white w-full mt-4"
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

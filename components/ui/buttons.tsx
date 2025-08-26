"use client";
import { useCart } from "@/context/CartContext";
import { LoaderCircle } from "lucide-react";
import { Button } from "./button";

export const SubmitButton = ({
  name,
  isPending,
}: {
  name: string;
  isPending?: boolean;
}) => {
  return (
    <div className="w-full">
      {isPending ? (
        <button
          type="button"
          className="flex gap-2 justify-center items-center bg-rose-bud-500 hover:bg-rose-bud-700 text-white rounded-xl w-full h-[33px]"
        >
          <LoaderCircle className="animate-spin" />
        </button>
      ) : (
        <button
          type="submit"
          className="bg-rose-bud-500 hover:bg-rose-bud-700 text-white rounded-xl w-full h-[33px]"
        >
          {name}
        </button>
      )}
    </div>
  );
};

export const AddToCartButton = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  return (
    <Button
      onClick={() => addToCart(product)}
      className="mt-auto w-full rounded-full bg-rose-bud-500 hover:bg-rose-bud-700 text-white"
      size="sm"
    >
      Add to Cart
    </Button>
  );
};

"use client";
import { useCart } from "@/context/CartContext";
import { LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export const LogOutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    router.push("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-white hover:bg-rose-bud-200 border rounded-xl w-full h-[33px] mt-2"
      >
        Log Out
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

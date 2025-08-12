"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export default function ProfileAccount() {
  const { logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <User className="w-10 h-10 text-gray-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{user?.name || "My Account"}</h1>
      <p className="mb-6 text-gray-600">
        Manage your account details and preferences.
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Logout
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountSettings() {
  // Dummy initial user data — replace with real user state/store
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    // TODO: Save user info to backend/auth store
  };

  const router = useRouter();

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-lg mx-auto flex flex-col gap-6 bg-white"
    >
      <label className="flex flex-col gap-1">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:border-black px-4 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:border-black px-4 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        Phone (optional)
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:border-black px-4 py-2"
        />
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-900 transition rounded-lg"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-white text-red-400 border py-2 rounded hover:bg-gray-300 transition rounded-lg"
        >
          Log Out
        </button>
      </div>

      {/* Confirmation Modal */}
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
    </form>
  );
}

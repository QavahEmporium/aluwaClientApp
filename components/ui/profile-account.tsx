"use client";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export default function ProfileAccount() {
  const { user } = useAuth();

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <User className="w-10 h-10 text-gray-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{user?.name || "My Account"}</h1>
      <p className="mb-6 text-gray-600">
        Manage your account details and preferences.
      </p>
    </div>
  );
}

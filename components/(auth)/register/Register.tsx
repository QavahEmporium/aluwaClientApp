"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Replace with actual registration logic
    localStorage.setItem("user", JSON.stringify({ email }));
    router.push(redirectPath);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-2 md:px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:px-4 md:py-2 focus:outline-none focus:border-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:px-4 md:py-2 focus:outline-none focus:border-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:px-4 md:py-2 focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${redirectPath}`}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

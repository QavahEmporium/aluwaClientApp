"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real auth check
    login({ email });
    router.push(redirectPath);
  };

  return (
    <Suspense>
      <main className="flex items-center justify-center min-h-screen bg-gray-50 px-2 md:px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { href: "/profile/orders", label: "Orders" },
    { href: "/profile/wishlist", label: "Wishlist" },
    { href: "/profile/account", label: "Account Settings" },
  ];

  return (
    <main className="min-h-screen bg-white text-black pt-[64px] pb-[72px] max-w-5xl mx-auto px-4">
      <header className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold mb-3">My Profile</h1>
        <User
          className="w-24 h-24 p-3 text-black border-4 border-gray-300 rounded-full"
          aria-label="User avatar"
        />
      </header>

      <nav className="flex justify-center gap-6 mb-8 border-b border-gray-300">
        {tabs.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`pb-2 font-semibold border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <section>{children}</section>
    </main>
  );
}

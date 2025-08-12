"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import ProfileAccount from "@/components/ui/profile-account";

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
      <ProfileAccount />

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

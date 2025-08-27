"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AccountNav = () => {
  const pathname = usePathname();

  const tabs = [
    { href: "/profile/orders", label: "Orders" },
    // { href: "/profile/wishlist", label: "Wishlist" },
    { href: "/profile/account", label: "Account Settings" },
  ];

  return (
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
  );
};

export default AccountNav;

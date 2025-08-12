"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Home, Search, ShoppingCart, User } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();
  const badge = cart?.length || 0;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Top Navbar for Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 justify-between items-center px-6 py-3">
        <Link href="/" className="text-xl font-bold">
          MyShop
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 hover:text-black ${
                pathname === href ? "text-black font-semibold" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
              {href === "/cart" && badge > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around items-center py-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${
              pathname === href ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <Icon className="w-6 h-6" />
              {href === "/cart" && badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-1">
                  {badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

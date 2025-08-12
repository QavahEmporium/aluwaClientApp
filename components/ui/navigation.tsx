"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Package,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user } = useAuth();
  const badge = cart?.length || 0;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ];

  if (user) {
    navItems.push({ href: "/profile/account", label: "Profile", icon: User });
  }

  return (
    <>
      {/* Desktop Navbar */}
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

          {!user && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-500 hover:text-black font-medium"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 text-gray-500 hover:text-black font-medium"
              >
                <UserPlus className="w-5 h-5" />
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
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

        {!user && (
          <>
            <Link
              href="/login"
              className="flex flex-col items-center text-xs text-gray-500"
            >
              <LogIn className="w-5 h-5 mb-0.5" />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex flex-col items-center text-xs text-black font-semibold"
            >
              <UserPlus className="w-5 h-5 mb-0.5" />
              <span>Register</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

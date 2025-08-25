// app/page.tsx
import Image from "next/image";
import PageHeader from "@/components/ui/page-header";
import { ProductCard } from "@/components/(public)/product-card";
import LandingClient from "@/components/(public)/landing-client";
import { landingPageProducts } from "@/data/products";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"; // MessageCircle → WhatsApp-style

export default async function LandingPage() {
  const categories = await landingPageProducts();

  return (
    <main className="bg-white text-black min-h-screen flex flex-col pb-12">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/hero3.jpg"
          alt="Grooming products background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Premium Hair & Beard Care
          </h1>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Natural, effective, and designed for the modern gentleman.
          </p>
          <LandingClient type="hero" />
        </div>
      </section>

      {/* Dynamic Categories & Products */}
      {categories.map((category: any) => (
        <section
          key={category.id}
          className="px-4 py-8 flex flex-col items-center"
        >
          <h2 className="text-emperor-900 text-xl font-semibold mb-4 text-center">
            {category.name}
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide justify-start sm:justify-center w-full">
            {category.products.length > 0 ? (
              category.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No products available</p>
            )}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="bg-black text-white text-center px-6 py-12 mt-8">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Upgrade Your Grooming Game?
        </h3>
        <p className="mb-6 text-white/80 max-w-md mx-auto">
          Join thousands of satisfied customers and take the first step today.
        </p>

        {/* CTA */}
        <LandingClient type="cta" />

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://wa.me/c/27682912776"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <MessageCircle className="w-6 h-6 text-green-400" />
          </a>
          <a
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Instagram className="w-6 h-6 text-pink-400" />
          </a>
          <a
            href="https://facebook.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Facebook className="w-6 h-6 text-blue-400" />
          </a>
          <a
            href="https://twitter.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Twitter className="w-6 h-6 text-sky-400" />
          </a>
        </div>
      </section>
      {/* Cart Drawer */}
      <LandingClient type="cart" />
    </main>
  );
}

// app/page.tsx
import PageHeader from "@/components/ui/page-header";
import { landingPageProducts } from "@/data/products";
import LandingHeroSection from "@/components/(public)/landing-hero-section";
import ProductList from "@/components/(public)/product-list";
import CallToAction from "@/components/(public)/landing-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
export const revalidate = 0;

export default async function LandingPage() {
  const categories = await landingPageProducts();

  return (
    <main className="bg-[#fcf7f0] text-black min-h-screen flex flex-col pb-12">
      <PageHeader />

      {/* Hero Section */}
      <LandingHeroSection />

      {/* Dynamic Categories & Products */}
      <ProductList categories={categories} />

      {/* Call to Action */}
      <CallToAction />

      {/* Cart Drawer */}
      <CartDrawer />
    </main>
  );
}

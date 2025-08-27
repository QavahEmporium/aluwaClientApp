"use client";

import { useState } from "react";
import { ProductCard } from "./products-list-card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductListing({
  products,
  categories,
}: {
  products: any[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <main className="md:flex md:flex-col md:items-center bg-[#fcf7f0] text-black min-h-screen pt-16 md:pt-20 pb-20 md:pb-10 px-3">
      <PageHeader />

      {/* Category Filter */}
      <motion.div
        className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide my-6 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap text-sm px-4 py-2 rounded-full shadow-md shadow-rose-bud-300 ${
              selectedCategory === cat
                ? "bg-rose-bud-500 text-white hover:bg-rose-bud-700"
                : "bg-white text-emperor-950 hover:bg-rose-bud-100 border"
            }`}
          >
            {cat}
          </Button>
        ))}
      </motion.div>

      {/* Product Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div
            key={selectedCategory} // Important: key triggers exit + enter animation
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-y-8 gap-x-4"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariants}
          >
            {filteredProducts.map((product: any) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="flex flex-col"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key={selectedCategory}
            className="text-gray-500 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            No products found.
          </motion.p>
        )}
      </AnimatePresence>

      <CartDrawer />
    </main>
  );
}

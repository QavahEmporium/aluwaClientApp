"use client";
import { motion } from "framer-motion";
import { ProductCard } from "../products-list-card";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function RelatedProducts({ products }: { products: any[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="my-16"
    >
      <h2 className="text-emperor-900 text-xl font-semibold mb-6">
        Related Products
      </h2>

      {products.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-y-6 gap-x-4"
          variants={containerVariants}
        >
          {products.map((product) => (
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
        <p className="text-gray-500">No related products found.</p>
      )}
    </motion.section>
  );
}

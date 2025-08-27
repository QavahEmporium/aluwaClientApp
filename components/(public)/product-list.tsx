"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductCard } from "./product-card"; // adjust path as needed
import { useRef } from "react";

interface Category {
  id: string;
  name: string;
  products: any[];
}

interface ProductListProps {
  categories: Category[];
}

const ProductList = ({ categories }: ProductListProps) => {
  return (
    <>
      {categories.map((category: Category) => (
        <motion.section
          key={category.id}
          className="px-4 pt-8 md:py-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Category Title */}
          <motion.h2
            className="text-emperor-900 text-xl font-semibold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {category.name}
          </motion.h2>

          {/* Product Row */}
          <ParallaxRow>
            {category.products.length > 0 ? (
              category.products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No products available</p>
            )}
          </ParallaxRow>
        </motion.section>
      ))}
    </>
  );
};

export default ProductList;

const ParallaxRow = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });

  // Subtle horizontal parallax (cards drift slightly)
  const x = useTransform(scrollXProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      ref={ref}
      className="bg-[#fcf7f0] flex gap-6 overflow-x-auto pb-5 scrollbar-hide justify-start sm:justify-center w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      style={{ x }}
    >
      {children}
    </motion.div>
  );
};

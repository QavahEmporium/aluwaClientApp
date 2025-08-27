"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProductInfo({
  product,
  quantity,
  setQuantity,
  addToCart,
}: any) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-between md:w-1/2"
    >
      <div className="flex flex-col">
        <motion.div variants={item}>
          <h1 className="text-emperor-900 text-3xl font-bold mb-4">
            {product.name}
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <p className="text-rose-bud-500 text-gray-700 mb-6">
            {product.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row sm:items-center sm:gap-6"
      >
        <div className="flex flex-row md:gap-6 items-center justify-between">
          <p className="text-emperor-900 text-2xl font-semibold sm:mb-0">
            R{product.price.toFixed(2)}
          </p>

          <div className="flex items-center rounded-xl p-1 border border-gray-300 w-34">
            <Button
              size="sm"
              className="bg-emperor-900 hover:bg-emperor-700 text-white hover:text-white"
              onClick={() => setQuantity((q: number) => (q > 1 ? q - 1 : 1))}
            >
              -
            </Button>
            <span className="flex-1 text-center">{quantity}</span>
            <Button
              size="sm"
              className="bg-emperor-900 hover:bg-emperor-700 text-white hover:text-white"
              onClick={() => setQuantity((q: number) => q + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <Button
          onClick={() =>
            addToCart({ ...product, imageUrl: product.imageUrl }, quantity)
          }
          className="mt-4 rounded-full sm:mt-0 w-full sm:w-auto bg-rose-bud-500 hover:bg-rose-bud-700 text-white"
        >
          Add to Cart
        </Button>
      </motion.div>
    </motion.div>
  );
}

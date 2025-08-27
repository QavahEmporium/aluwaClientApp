"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ProductImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full md:w-1/2 aspect-square rounded-lg overflow-hidden shadow-lg shadow-rose-bud-200"
    >
      <Image
        src={`/api/files/${images[currentIndex]}`}
        alt="Product Image"
        fill
        className="object-cover"
        priority
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous Image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next Image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
          >
            ›
          </button>
        </>
      )}
    </motion.div>
  );
}

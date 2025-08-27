"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

const LandingHeroSection = () => {
  const router = useRouter();

  // Track scroll progress (0 → 1 across page height)
  const { scrollY } = useScroll();

  // Create a parallax effect for the background image
  const y = useTransform(scrollY, [0, 300], [0, 80]); // moves image slightly down
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]); // zooms slightly on scroll

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/banner.jpg"
          alt="Grooming products background"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-black z-10"
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6">
        {/* Logo with animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-[380px] h-[380px] mx-auto mb-4"
        >
          <Image
            src="/images/logo-2.png"
            alt="Grooming products logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: -60, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight"
        >
          Premium Hair & Beard Care
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: -60, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="text-white/90 mb-6 max-w-md mx-auto"
        >
          Natural, effective, and designed for the modern gentleman.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: -60, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <Button
            onClick={() => router.push("/products")}
            className="bg-rose-bud-500 hover:bg-rose-bud-400 text-white"
          >
            Shop Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHeroSection;

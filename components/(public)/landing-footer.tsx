"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Facebook } from "lucide-react";

const CallToAction = () => {
  const router = useRouter();

  // Variants for staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-black text-white text-center px-6 py-12 mt-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h3 variants={item} className="text-2xl font-bold mb-4">
          Ready to Upgrade Your Grooming Game?
        </motion.h3>

        {/* Paragraph */}
        <motion.p
          variants={item}
          className="mb-6 text-white/80 max-w-md mx-auto"
        >
          Join thousands of satisfied customers and take the first step today.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={item}>
          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-gray-200"
            onClick={() => router.push("/products")}
          >
            Browse All Products
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className="flex justify-center gap-6 mt-8">
          {[
            {
              href: "https://wa.me/c/27682912776",
              icon: <MessageCircle className="w-6 h-6 text-green-400" />,
            },
            {
              href: "https://www.instagram.com/aluwahaircare2024/",
              icon: <Instagram className="w-6 h-6 text-pink-400" />,
            },
            {
              href: "https://www.facebook.com/p/Aluwa-Hair-Care-61555125434916/",
              icon: <Facebook className="w-6 h-6 text-blue-400" />,
            },
          ].map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 transition"
              whileHover={{
                scale: 1.15,
                boxShadow: "0px 0px 12px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div variants={item} className="mt-6 text-sm text-white">
          <a href="https://elkoretech.com" target="_blank">
            © {new Date().getFullYear()}{" "}
            <p className="underline inline">Elkore Tech.</p> All rights
            reserved.
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;

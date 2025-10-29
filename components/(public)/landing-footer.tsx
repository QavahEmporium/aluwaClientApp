"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const CallToAction = () => {
  const router = useRouter();

  // Animation variants
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
              href: "https://wa.me/27682912776",
              icon: <MessageCircle className="w-8 h-8 text-white" />,
            },
            {
              href: "https://www.instagram.com/aluwahaircare2024/",
              icon: <Instagram className="w-8 h-8 text-white" />,
            },
            {
              href: "https://www.facebook.com/p/Aluwa-Hair-Care-61555125434916/",
              icon: <Facebook className="w-8 h-8 text-white" />,
            },
          ].map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 transition"
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

        {/* Contact Us Section */}
        <motion.div
          variants={item}
          className="flex flex-col justify-center gap-2 mt-4"
        >
          <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
          <div className="flex flex-row justify-center items-center space-x-2">
            <a
              href="mailto:aluwahaircare@gmail.com"
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="w-5 h-5" /> aluwahaircare@gmail.com
            </a>

            <a
              href="https://wa.me/27682912776"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp: 068 291 2776
            </a>

            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> 071 55 777 63
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Midrand, Gauteng
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={item} className="mt-8 text-sm text-white">
          <a href="https://elkoretech.com" target="_blank">
            © {new Date().getFullYear()}{" "}
            <span className="underline">Elkore Tech</span>. All rights reserved.
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;

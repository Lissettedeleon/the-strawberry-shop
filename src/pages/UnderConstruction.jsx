import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 180, height: 180, background: "radial-gradient(circle, #F4B3D0 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Logo size="xl" className="relative" />
        </motion.div>
      </div>
      <h1 className="font-bubble text-[#E61F3F] text-2xl mb-2">Under construction</h1>
      <p className="font-body text-[#6b7280] text-base mb-8 max-w-sm">
        Our app is on its way. Check back soon
      </p>
      <Link
        to="/"
        className="inline-block bg-[#E61F3F] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#C4112F] transition-colors"
      >
        Back to Website
      </Link>
    </div>
  );
}

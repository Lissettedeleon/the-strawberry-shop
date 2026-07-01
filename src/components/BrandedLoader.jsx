import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function BrandedLoader({ text = "loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 180, height: 180, background: "radial-gradient(circle, #E0A4B0 0%, transparent 70%)" }}
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
      <p className="font-body text-muted-foreground text-base">{text}</p>
    </div>
  );
}

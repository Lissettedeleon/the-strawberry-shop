import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}
    >
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl bg-[#E0A4B0] pointer-events-none"
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-bubble text-white text-3xl sm:text-4xl mb-3 drop-shadow-lg"
        >
          Ready for Something Sweet?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 font-body text-base md:text-lg mb-8"
        >
          Order fresh strawberry favorites online and pick them up when they’re ready.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white text-[#7C0116] font-body font-bold text-base px-10 py-4 rounded-full min-h-[52px] hover:bg-[#F6E3E7] transition-all active:scale-95 shadow-xl"
          >
            <ShoppingBag size={18} /> Start Your Order
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

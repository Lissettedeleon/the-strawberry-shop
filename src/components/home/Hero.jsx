import React from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FBF1F3 0%, #F6E3E7 55%, #FBF1F3 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/3] sm:aspect-[16/9] rounded-[28px] overflow-hidden shadow-xl border-4 border-white bg-[#F6E3E7] flex items-center justify-center mb-8"
        >
          <ImageOff size={40} className="text-[#7C0116]/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-bubble text-[#7C0116] text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4"
        >
          life is sweeter with strawberries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[#5C0110]/80 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Fresh strawberries, house made creams, premium chocolates, and delicious toppings made fresh daily
        </motion.p>
      </div>

      <WaveDivider from="#FBF1F3" to="white" />
    </section>
  );
}

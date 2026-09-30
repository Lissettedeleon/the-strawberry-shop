import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder until the rewards program details are ready.
export default function Rewards() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bubble text-white text-4xl sm:text-5xl drop-shadow-lg"
          >
            Rewards
          </motion.h1>
        </div>
      </section>

      <section style={{ background: "#FDEEF5" }} className="py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white border border-[#F4B3D0] flex items-center justify-center mx-auto mb-5">
            <Gift size={28} className="text-[#E61F3F]" />
          </div>
          <h2 className="font-bubble text-[#E61F3F] text-2xl sm:text-3xl mb-3">Coming soon</h2>
          <p className="font-body text-[#6b4a52] text-base leading-relaxed">
            We're putting together a sweet way to thank you for every visit. Check back soon for our rewards program.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

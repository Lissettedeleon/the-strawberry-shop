import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import FAQAccordion from "@/components/FAQAccordion";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import FloatingDecor from "@/components/FloatingDecor";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <FloatingDecor />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            frequently asked questions
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Everything you need to know before you visit 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }} className="relative overflow-hidden">
        <FloatingDecor />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <FAQAccordion />
        </div>
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>
  );
}
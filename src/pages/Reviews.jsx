import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewCarousel from "@/components/ReviewCarousel";
import { SocialIconsRow, GoogleReviewButton } from "@/components/SocialButtons";
import { ImageOff } from "lucide-react";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl drop-shadow-lg"
          >
            reviews
          </motion.h1>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[36px] bg-[#F7E3E8] px-4 sm:px-8 py-10 md:py-12 mb-10"
          >
            <div className="text-center mb-6">
              <h3 className="font-bubble text-[#7C0116] text-2xl md:text-3xl">What people are saying</h3>
            </div>
            <ReviewCarousel />
            <div className="flex justify-center mt-8">
              <GoogleReviewButton />
            </div>
          </motion.div>

          {/* Picture or video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="aspect-video rounded-2xl border border-[#E0A4B0] bg-white flex items-center justify-center mb-10"
          >
            <ImageOff size={32} className="text-[#7C0116]/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <p className="font-body font-semibold text-[#5C0110] text-lg mb-4">Follow us</p>
            <SocialIconsRow />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ReviewCarousel from "@/components/ReviewCarousel";

export default function LocalPreview() {
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#F7E3E8" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div
          className="bg-white rounded-[20px_20px_26px_26px] p-5 sm:p-8"
          style={{
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
          }}
        >
          <div className="text-center mb-6">
            <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl">
              fresh treats in liberty township
            </h2>
            <p className="text-[#7a6469] font-body font-medium text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
              The Strawberry Shop creates fresh, handcrafted strawberry desserts made for everyday
              cravings, thoughtful gifts, celebrations, and special moments.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl bg-[#F7E3E8] p-4 sm:p-6">
              <ReviewCarousel />
            </div>
          </motion.div>

          <div className="text-center mt-6">
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 bg-[#7C0116] text-white font-body font-extrabold text-sm px-6 py-2.5 rounded-full min-h-[44px] hover:bg-[#5C0110] transition-colors active:scale-95"
            >
              Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#F7E3E8" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[20px_20px_26px_26px] px-6 py-12 md:py-16 text-center"
          style={{
            background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)",
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.4), 0 2px 6px rgba(44,35,37,0.1)",
          }}
        >
          <h2 className="font-bubble text-white text-2xl sm:text-3xl mb-2.5">
            ready for something sweet?
          </h2>
          <p className="text-white/80 font-body font-medium text-sm sm:text-base mb-7 max-w-md mx-auto">
            Order fresh strawberry favorites online and pick them up when they’re ready.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 bg-white text-[#7C0116] font-body font-extrabold text-sm px-7 py-3 rounded-full min-h-[48px] hover:bg-[#F7E3E8] transition-colors active:scale-95 shadow-sm"
          >
            Menu <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
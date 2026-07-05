import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// Compact hero matching the Menu page palette: blush gradient, lowercase
// font-bubble headline, pill buttons. Front video lives in its own section below.
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #E0A4B0 0%, #F7E3E8 70%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14 pt-14 pb-20 md:pt-20 md:pb-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/80 border border-white rounded-full px-4 py-1.5 mb-5">
            <MapPin size={13} className="text-[#7C0116]" />
            <span className="font-body font-bold text-[#7C0116] text-xs tracking-wide">
              Liberty Township, OH
            </span>
          </span>

          <h1 className="font-bubble text-[#7C0116] text-3xl sm:text-4xl md:text-5xl leading-[1.08] mb-4 max-w-3xl mx-auto">
            fresh strawberry desserts made to brighten your day
          </h1>

          <p className="text-[#5C0110]/80 font-body font-medium text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Handcrafted strawberry cups, chocolate-covered treats, dessert trays, and sweet
            favorites made for pickup in Liberty Township.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-extrabold text-sm px-8 py-3 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors active:scale-95 shadow-sm"
            >
              Menu
            </Link>
            <Link
              to="/location"
              className="flex items-center justify-center gap-2 bg-white text-[#7C0116] font-body font-extrabold text-sm px-8 py-3 rounded-full min-h-[48px] hover:bg-[#F7E3E8] transition-colors active:scale-95 border border-[#E0A4B0]"
            >
              Location
            </Link>
          </div>
        </motion.div>
      </div>

      {/* soft curved transition into the page */}
      <div className="wave-divider rotate-180" style={{ backgroundColor: "#F7E3E8" }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
            fill="#F7E3E8"
          />
        </svg>
      </div>
    </section>
  );
}
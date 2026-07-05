import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

const HERO_VIDEO =
  "https://media.base44.com/videos/public/6a34ab1480a9a94dcd8377fa/8307ed9eb_Hero_Product_Video.mp4";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FBF1F3 0%, #F6E3E7 55%, #FBF1F3 100%)" }}
    >
      {/* soft accent glow — minimal, no floral clutter */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 bg-[#E0A4B0] pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20 bg-[#7C0116] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/80 border border-[#E0A4B0] rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#7C0116] animate-pulse" />
              <span className="font-body font-semibold text-[#7C0116] text-xs tracking-wide">
                Fresh daily · Liberty Township, OH
              </span>
            </span>

            <h1 className="font-bubble text-[#7C0116] text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.05] mb-5">
              Fresh Strawberry Desserts Made to Brighten Your Day
            </h1>

            <p className="text-[#5C0110]/80 font-body text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Handcrafted strawberry cups, chocolate-covered treats, dessert trays, and sweet
              favorites made for pickup in Liberty Township.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-all active:scale-95 shadow-lg"
              >
                <ShoppingBag size={18} /> Order Now
              </Link>
              <a
                href="#fresh-favorites"
                className="flex items-center justify-center gap-2 bg-white text-[#7C0116] border-2 border-[#E0A4B0] font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#FBF1F3] transition-all active:scale-95"
              >
                See What We Make <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Product video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] md:aspect-[5/4] bg-[#F6E3E7]">
              <video
                src={HERO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 hidden sm:block">
              <p className="font-bubble text-[#7C0116] text-sm leading-tight">Made fresh to order</p>
              <p className="font-body text-[#6b7280] text-xs">Pickup at 7100 Foundry Row</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
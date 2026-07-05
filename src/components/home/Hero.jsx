import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";

const HERO_VIDEO =
  "https://media.base44.com/videos/public/6a34ab1480a9a94dcd8377fa/8307ed9eb_Hero_Product_Video.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Mobile browsers (especially iOS Safari) often ignore the declarative
    // autoPlay attribute — kick playback explicitly once mounted.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FBF1F3 0%, #F6E3E7 55%, #FBF1F3 100%)" }}
    >
      {/* soft accent glow — minimal, no floral clutter */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 bg-[#E0A4B0] pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20 bg-[#7C0116] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Text + CTAs */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-bubble text-[#7C0116] text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.05] mb-5"
            >
              Fresh Strawberry Desserts Made to Brighten Your Day
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-[#5C0110]/80 font-body text-base md:text-lg mb-8 max-w-xl leading-relaxed"
            >
              Handcrafted strawberry cups, chocolate-covered treats, dessert trays, and sweet
              favorites made for pickup in Liberty Township.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-all shadow-lg"
                >
                  <ShoppingBag size={18} /> Order Now
                </Link>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#fresh-favorites"
                className="flex items-center justify-center gap-2 bg-white text-[#7C0116] border-2 border-[#E0A4B0] font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#FBF1F3] transition-all"
              >
                See What We Make <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* Product video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/11] sm:aspect-[4/3] md:aspect-[5/4] bg-[#F6E3E7]"
            >
              <video
                ref={videoRef}
                src={HERO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 hidden sm:block"
            >
              <p className="font-bubble text-[#7C0116] text-sm leading-tight">Made fresh to order</p>
              <p className="font-body text-[#6b7280] text-xs">Pickup at 7100 Foundry Row</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <WaveDivider from="#FBF1F3" to="white" />
    </section>
  );
}

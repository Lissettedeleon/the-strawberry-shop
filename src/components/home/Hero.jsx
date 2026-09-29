import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaveDivider from "@/components/WaveDivider";

const HERO_VIDEO = "/videos/hero.mp4";

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
      style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[320px] sm:h-[600px] flex items-center justify-center pt-6 sm:pt-8"
      >
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-auto max-w-full object-contain rounded-3xl shadow-[0_16px_44px_rgba(60,0,10,0.35)]"
        />
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-bubble text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4 drop-shadow-lg"
        >
          life is sweeter with strawberries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/80 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Fresh strawberries, house made creams, premium chocolates, and delicious toppings made fresh daily
        </motion.p>
      </div>

      <WaveDivider from="transparent" to="white" />
    </section>
  );
}
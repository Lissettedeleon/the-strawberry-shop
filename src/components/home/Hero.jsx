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
    // Full-screen pour: the video runs edge to edge (most of the screen on
    // phones) with nothing laid over it; the headline sits just below it.
    <section className="relative overflow-hidden" style={{ background: "#FDEEF5" }}>
      <motion.video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="block w-full h-[72svh] min-h-[420px] max-h-[760px] object-cover object-[center_35%]"
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-8 pb-12 md:pt-12 md:pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-bubble text-[#E61F3F] text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-3"
        >
          life is sweeter with strawberries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-[#C4112F]/80 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Fresh strawberries, house made creams, premium chocolates, and delicious toppings made fresh daily
        </motion.p>
      </div>

      <WaveDivider from="#FDEEF5" to="white" />
    </section>
  );
}

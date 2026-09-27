import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HERO_VIDEO = "/videos/hero.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Mobile browsers (especially iOS Safari) often ignore the declarative
    // autoPlay attribute — kick playback explicitly once mounted.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    // Full-screen pour: the video fills the width edge to edge (most of the
    // screen on phones), with the headline laid over a dark-red fade at the
    // bottom so the white text stays readable on any frame.
    <section className="relative overflow-hidden bg-[#C4112F]">
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
        className="block w-full h-[78svh] min-h-[460px] max-h-[820px] object-cover object-[center_35%]"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(92,1,16,0.88) 0%, rgba(124,1,22,0.55) 30%, rgba(124,1,22,0) 60%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 pb-10 md:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-bubble text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-3 drop-shadow-lg"
          >
            life is sweeter with strawberries
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/90 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Fresh strawberries, house made creams, premium chocolates, and delicious toppings made fresh daily
          </motion.p>
        </div>
      </div>
    </section>
  );
}

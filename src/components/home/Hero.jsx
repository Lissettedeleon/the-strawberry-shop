import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaveDivider from "@/components/WaveDivider";

const HERO_VIDEO = "https://media.base44.com/videos/public/6a34ab1480a9a94dcd8377fa/83ee622ce_10f4979c8724439e815444ebe04e327b.mov";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Mobile browsers (especially iOS Safari) often ignore the declarative
    // autoPlay attribute — kick playback explicitly once mounted.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: "#FBF1F3" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[420px] sm:h-[540px] flex items-center justify-center pt-6 sm:pt-8"
      >
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-auto max-w-full object-contain"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 94% at 50% 50%, black 35%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.35) 80%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 94% at 50% 50%, black 35%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.35) 80%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-bubble text-[#7C0116] text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4"
        >
          life is sweeter with strawberries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[#5C0110]/80 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Fresh strawberries, house made creams, premium chocolates, and delicious toppings made fresh daily
        </motion.p>
      </div>

      <WaveDivider from="#FBF1F3" to="white" />
    </section>
  );
}
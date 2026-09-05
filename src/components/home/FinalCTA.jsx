import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const CTA_IMAGE = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/b11b80d0c_HEIFImage.jpeg";
import { useCart } from "@/lib/CartContext";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA() {
  const { setOrderChoiceOpen } = useCart();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}
    >
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl bg-[#E0A4B0] pointer-events-none"
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[280px] sm:max-w-sm mx-auto mb-8"
        >
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <filter id="cta-dewhite" x="-5%" y="-5%" width="110%" height="110%">
              {/* Keep RGB untouched; derive alpha from how close to pure white
                  each pixel is (all three channels near 1), so off-white
                  content like whipped cream stays opaque and only the flat
                  white backdrop keys out. */}
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3"
                result="alphaRaw"
              />
              <feComponentTransfer in="alphaRaw" result="alphaKey">
                <feFuncA type="gamma" amplitude="1" exponent="0.5" offset="0" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="alphaKey" operator="in" />
            </filter>
          </svg>
          <img
            src={CTA_IMAGE}
            alt="The Strawberry Shop cup with strawberries, cream, and Biscoff"
            className="w-full h-auto"
            style={{ filter: "url(#cta-dewhite)" }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-bubble text-white text-3xl sm:text-4xl mb-3 drop-shadow-lg"
        >
          Craving Something Sweet
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 font-body text-base md:text-lg mb-8"
        >
          Order fresh strawberry favorites online and pick them up when they're ready
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block"
        >
          <MagneticButton
            strength={0.35}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOrderChoiceOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-[#7C0116] font-body font-bold text-base px-10 py-4 rounded-full min-h-[52px] hover:bg-[#F6E3E7] transition-colors shadow-xl"
          >
            <ShoppingBag size={18} /> Order Now
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
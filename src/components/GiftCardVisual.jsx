import React from "react";
import { motion } from "framer-motion";

const CARD_IMAGE = "/photos/ea78651e4_42414B76-286D-4573-A6F0-C3431FA0BA1D.png";

/**
 * Gift card visual: the card design image on its own, with the shine effect.
 */
export default function GiftCardVisual({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`gift-shine relative w-full max-w-md mx-auto rounded-2xl overflow-hidden ${className}`}
      style={{ aspectRatio: "1303 / 845" }}
    >
      {/* The card image has a white frame around the red card (red spans
          x 114-1417, y 83-928 of the 1535x1024 image). Size the frame to the
          red card only and position the full image so the white frame falls
          outside and gets clipped. */}
      <div className="absolute left-[-8.749%] top-[-9.822%] w-[117.805%] h-[121.183%]">
        {/* Exact reference image */}
        <img
          src={CARD_IMAGE}
          alt="The Strawberry Shop gift card"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

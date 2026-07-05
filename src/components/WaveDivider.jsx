import React from "react";
import { motion } from "framer-motion";

const colorMap = {
  blush: "#E0A4B0",
  white: "#FFFFFF",
  red: "#7C0116",
  dark: "#5C0110",
};

export default function WaveDivider({ from = "white", to = "blush", flip = false }) {
  const fillColor = colorMap[to] || to;
  return (
    <div className={`wave-divider ${flip ? "rotate-180" : ""}`} style={{ backgroundColor: colorMap[from] || from }}>
      <motion.svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        initial={{ scaleY: 0.3, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "bottom" }}
      >
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill={fillColor}
        />
      </motion.svg>
    </div>
  );
}

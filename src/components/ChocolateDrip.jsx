import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// A milk-chocolate edge that hangs from the top of a section. The drips
// "pour" down (grow from the top) the first time the section scrolls in.

const DRIPS = [
  { x: 60, w: 34, h: 38 },
  { x: 170, w: 26, h: 62 },
  { x: 265, w: 40, h: 30 },
  { x: 380, w: 30, h: 74 },
  { x: 480, w: 24, h: 44 },
  { x: 575, w: 36, h: 58 },
  { x: 690, w: 28, h: 34 },
  { x: 790, w: 40, h: 70 },
  { x: 905, w: 26, h: 46 },
  { x: 1000, w: 34, h: 60 },
  { x: 1110, w: 30, h: 36 },
];

export default function ChocolateDrip({ color = "#6B3A22", highlight = "#8A5234" }) {
  const reduce = useReducedMotion();
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-[1]" aria-hidden="true">
      <svg viewBox="0 0 1200 110" preserveAspectRatio="none" className="block w-full h-[70px] md:h-[100px]">
        <rect x="0" y="0" width="1200" height="18" fill={color} />
        {DRIPS.map((d, i) => (
          <motion.g
            key={d.x}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1 + (i % 3) * 0.35, delay: 0.1 + (i % 4) * 0.12, ease: [0.3, 0.7, 0.4, 1] }}
            style={{ transformOrigin: `${d.x + d.w / 2}px 0px`, transformBox: "view-box" }}
          >
            <rect x={d.x} y="10" width={d.w} height={d.h} fill={color} />
            <circle cx={d.x + d.w / 2} cy={10 + d.h} r={d.w / 2} fill={color} />
            <rect x={d.x + d.w * 0.22} y="14" width={d.w * 0.14} height={d.h * 0.7} rx={d.w * 0.07} fill={highlight} opacity="0.55" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

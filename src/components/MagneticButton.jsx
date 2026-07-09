import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Cursor-relative "magnetic" pull, restrained enough to read as intentional
// polish rather than a gimmick — the element leans toward the pointer within
// its own bounds and springs back on leave. No-ops on touch (no mousemove).
export default function MagneticButton({ children, className = "", strength = 0.3, as = "button", ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const Component = motion[as] || motion.button;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.15 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

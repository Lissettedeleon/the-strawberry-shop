import React from "react";

// Soft, blurred "color powder" blobs used as a subtle decorative accent
// on hero sections, in place of bouncing emoji.
const BLOBS = [
  { color: "#F6E3E7", top: "-10%", left: "-6%", size: "18rem", opacity: 0.35 },
  { color: "#E0A4B0", top: "55%", right: "-8%", size: "22rem", opacity: 0.3 },
  { color: "#5C0110", bottom: "-15%", left: "20%", size: "16rem", opacity: 0.2 },
];

export default function PowderAccent({ className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
            background: b.color,
            opacity: b.opacity,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}

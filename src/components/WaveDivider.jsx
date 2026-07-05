import React from "react";

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
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

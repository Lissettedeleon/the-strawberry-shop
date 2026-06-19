import React from "react";

const colorMap = {
  blush: "#FFB3C6",
  white: "#FFFFFF",
  red: "#E8193C",
  dark: "#7A0A2A",
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
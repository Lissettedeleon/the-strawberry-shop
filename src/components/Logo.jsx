import React from "react";

export default function Logo({ size = "md" }) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-primary flex items-center justify-center flex-shrink-0`}>
      <div className="text-white text-center leading-none">
        <span className="font-display text-xs block" style={{ fontSize: size === "sm" ? "6px" : size === "lg" ? "9px" : "7px", lineHeight: "1.1" }}>
          the<br />straw<br />berry
        </span>
        <span className="font-body font-bold block" style={{ fontSize: size === "sm" ? "5px" : size === "lg" ? "7px" : "6px", letterSpacing: "1px" }}>
          SHOP
        </span>
      </div>
    </div>
  );
}
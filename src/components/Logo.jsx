import React from "react";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    xs: "w-7 h-7",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-28 h-28",
  };

  return (
    <img
      src="/photos/f90f12d64_thestrawberryshoplogos_Mesadetrabajo12.png"
      alt="The Strawberry Shop"
      className={`${sizes[size]} rounded-full object-contain flex-shrink-0 ${className}`}
    />
  );
}
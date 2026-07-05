import React from "react";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-28 h-28",
  };

  return (
    <img
      src="https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/f90f12d64_thestrawberryshoplogos_Mesadetrabajo12.png"
      alt="The Strawberry Shop"
      className={`${sizes[size]} rounded-full object-contain flex-shrink-0 ${className}`}
    />
  );
}

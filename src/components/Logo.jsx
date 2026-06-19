import React from "react";

export default function Logo({ size = "md" }) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <img
      src="https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/097a8a3d7_strawberry_shop_logo_white_outline_medium.png"
      alt="The Strawberry Shop"
      className={`${sizes[size]} rounded-full object-contain bg-primary flex-shrink-0`}
    />
  );
}
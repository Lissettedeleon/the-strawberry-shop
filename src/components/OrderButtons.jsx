import React from "react";

const platforms = [
  {
    name: "Order Direct (Toast)",
    url: "https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row",
    color: "bg-primary hover:bg-primary/90",
    textColor: "text-white",
  },
  {
    name: "Uber Eats",
    url: "https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg",
    color: "bg-foreground hover:bg-foreground/90",
    textColor: "text-white",
  },
  {
    name: "DoorDash",
    url: "https://www.doordash.com/store/41748513",
    color: "bg-white hover:bg-secondary border-2 border-primary",
    textColor: "text-primary",
  },
];

export default function OrderButtons({ size = "md", direction = "row" }) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <div className={`flex gap-3 flex-wrap ${direction === "col" ? "flex-col" : ""}`}>
      {platforms.map(p => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${p.color} ${p.textColor} ${sizeClasses[size]} rounded-full font-body font-bold transition-all text-center inline-block`}
        >
          {p.name}
        </a>
      ))}
    </div>
  );
}
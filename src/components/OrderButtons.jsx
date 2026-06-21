import React from "react";
import { Link } from "react-router-dom";

const platforms = [
  {
    name: "\uD83C\uDF53 Order Pickup",
    subtitle: "Customize & order",
    to: "/order",
    color: "bg-white hover:bg-white/90",
    textColor: "text-primary",
    external: false,
  },
  {
    name: "\uD83D\uDE97 Uber Eats",
    subtitle: "Delivery",
    url: "https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg",
    color: "bg-foreground hover:bg-foreground/90",
    textColor: "text-white",
    external: true,
  },
  {
    name: "\uD83C\uDFC3 DoorDash",
    subtitle: "Delivery",
    url: "https://www.doordash.com/store/41748513",
    color: "bg-white hover:bg-secondary border-2 border-primary",
    textColor: "text-primary",
    external: true,
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
      {platforms.map(p =>
        p.external ? (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${p.color} ${p.textColor} ${sizeClasses[size]} rounded-full font-body font-bold transition-all text-center inline-block shadow-sm hover:shadow-md hover:-translate-y-0.5`}
          >
            <span className="block leading-tight">{p.name}</span>
            <span className={`block text-xs font-medium ${p.textColor}/60`}>{p.subtitle}</span>
          </a>
        ) : (
          <Link
            key={p.name}
            to={p.to}
            className={`${p.color} ${p.textColor} ${sizeClasses[size]} rounded-full font-body font-bold transition-all text-center inline-block shadow-sm hover:shadow-md hover:-translate-y-0.5`}
          >
            <span className="block leading-tight">{p.name}</span>
            <span className={`block text-xs font-medium ${p.textColor}/60`}>{p.subtitle}</span>
          </Link>
        )
      )}
    </div>
  );
}
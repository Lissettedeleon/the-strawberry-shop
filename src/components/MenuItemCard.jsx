import React from "react";
import { motion } from "framer-motion";
import AllergenTags from "./AllergenTags";

export default function MenuItemCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="bg-card rounded-[28px_10px_28px_10px] overflow-hidden shadow-sm border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all group relative"
    >
      {/* Sparkle on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <span className="text-lg">✨</span>
      </div>

      {item.image_url ? (
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={item.image_url}
            alt={item.name + " — " + (item.description || "fresh strawberry dessert")}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative overflow-hidden">
          <span className="text-6xl group-hover:scale-125 transition-transform duration-300">🍓</span>
          {/* Decorative circles */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary/10" />
          <div className="absolute bottom-6 right-6 w-5 h-5 rounded-full bg-primary/10" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-body font-bold text-base text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
          <span className="font-body font-extrabold text-primary text-base shrink-0 bg-secondary px-2.5 py-0.5 rounded-full">${item.price.toFixed(2)}</span>
        </div>
        {item.description && (
          <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
        )}
        {item.is_sold_out && (
          <span className="inline-block mt-3 bg-foreground/10 text-foreground/50 text-xs font-body font-bold px-3 py-1 rounded-full">
            Sold Out 😢
          </span>
        )}
        {item.is_seasonal && !item.is_sold_out && (
          <span className="inline-block mt-3 bg-primary/10 text-primary text-xs font-body font-bold px-3 py-1 rounded-full animate-pulse">
            Seasonal ✨
          </span>
        )}
        <AllergenTags allergens={item.allergens} />
      </div>
    </motion.div>
  );
}
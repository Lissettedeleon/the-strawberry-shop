import React from "react";
import { motion } from "framer-motion";

export default function MenuItemCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow group"
    >
      {item.image_url ? (
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={item.image_url}
            alt={item.name + " — " + (item.description || "fresh strawberry dessert")}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-square bg-secondary flex items-center justify-center">
          <span className="text-4xl">🍓</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-body font-bold text-base text-foreground">{item.name}</h3>
          <span className="font-body font-bold text-primary text-base shrink-0">${item.price.toFixed(2)}</span>
        </div>
        {item.description && (
          <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
        )}
        {item.is_sold_out && (
          <span className="inline-block mt-3 bg-foreground/10 text-foreground/50 text-xs font-body font-bold px-3 py-1 rounded-full">
            Sold Out
          </span>
        )}
        {item.is_seasonal && !item.is_sold_out && (
          <span className="inline-block mt-3 bg-primary/10 text-primary text-xs font-body font-bold px-3 py-1 rounded-full">
            Seasonal ✨
          </span>
        )}
      </div>
    </motion.div>
  );
}
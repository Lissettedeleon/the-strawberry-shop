import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import AllergenTags from "./AllergenTags";

export default function MenuItemModal({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-card rounded-[30px_10px_30px_10px] overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-border"
      >
        {item.image_url ? (
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
            <span className="text-8xl">🍓</span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display text-foreground text-2xl">{item.name}</h2>
              {item.is_seasonal && (
                <span className="inline-block mt-1 bg-primary/10 text-primary text-xs font-body font-bold px-3 py-1 rounded-full">
                  Seasonal ✨
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body font-extrabold text-primary text-2xl bg-secondary px-4 py-1.5 rounded-full">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {item.description && (
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">{item.description}</p>
          )}

          {item.is_sold_out && (
            <p className="text-foreground/50 font-body font-bold text-sm">Sold Out 😢</p>
          )}

          <AllergenTags allergens={item.allergens} />
        </div>
      </motion.div>
    </motion.div>
  );
}
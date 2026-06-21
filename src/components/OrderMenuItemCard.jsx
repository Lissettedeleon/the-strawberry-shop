import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import CustomizePanel from "./CustomizePanel";
import { useCart } from "@/lib/CartContext";
import AllergenTags from "./AllergenTags";

export default function OrderMenuItemCard({ item }) {
  const [showCustomize, setShowCustomize] = useState(false);
  const { addItem } = useCart();

  const handleAddSimple = (menuItem, qty = 1) => {
    addItem({
      name: menuItem.name,
      base_price: menuItem.price,
      quantity: qty,
      removed_ingredients: [],
      extras: [],
      extra_count: 0,
      chocolate_selections: [],
      selected_toppings: [],
      selected_sauces: [],
      special_instructions: "",
      item_total: menuItem.price * qty,
    });
  };

  const handleAddCustomized = (data) => {
    addItem(data);
    setShowCustomize(false);
  };

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="bg-card rounded-[28px_10px_28px_10px] overflow-hidden shadow-sm border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all group hidden sm:block"
      >
        {item.image_url ? (
          <div className="aspect-square overflow-hidden bg-secondary">
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative overflow-hidden">
            <span className="text-6xl group-hover:scale-125 transition-transform duration-300">🍓</span>
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-body font-bold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
            <span className="font-body font-extrabold text-primary text-sm shrink-0 bg-secondary px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
          </div>
          {item.description && (
            <p className="text-muted-foreground font-body text-xs leading-relaxed mb-2 line-clamp-2">{item.description}</p>
          )}
          {item.is_sold_out && (
            <span className="inline-block mb-2 bg-foreground/10 text-foreground/50 text-[10px] font-body font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          )}
          <AllergenTags allergens={item.allergens} />
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="flex-1 bg-secondary text-foreground font-body font-semibold text-xs py-2.5 rounded-full hover:bg-secondary/80 transition-colors"
            >
              Customize
            </button>
            <button
              onClick={() => handleAddSimple(item)}
              disabled={item.is_sold_out}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
              aria-label="Add to cart"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile: horizontal layout */}
      <div className="flex sm:hidden bg-card rounded-[18px_6px_18px_6px] overflow-hidden shadow-sm border-2 border-border">
        <div className="w-20 h-20 shrink-0 overflow-hidden bg-secondary rounded-tl-[18px]" onClick={() => setShowCustomize(!showCustomize)}>
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
              <span className="text-3xl">🍓</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 p-3 flex flex-col justify-center" onClick={() => setShowCustomize(!showCustomize)}>
          <h3 className="font-body font-bold text-sm text-foreground truncate">{item.name}</h3>
          <span className="font-body font-extrabold text-primary text-sm mt-0.5">${item.price?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col pr-3 py-3 gap-1">
          <button
            onClick={() => handleAddSimple(item)}
            disabled={item.is_sold_out}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowCustomize(!showCustomize); }}
            className="font-body font-semibold text-[10px] text-primary/70 hover:text-primary transition-colors"
          >
            Customize
          </button>
        </div>
      </div>

      {/* Customize Panel */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-b-[20px_8px_20px_8px] border-2 border-t-0 border-border p-4 mt-[-4px]">
              <CustomizePanel
                item={item}
                onAddToCart={handleAddCustomized}
                onAddSimple={(it, qty) => { handleAddSimple(it, qty); setShowCustomize(false); }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
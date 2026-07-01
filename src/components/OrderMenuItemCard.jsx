import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { ITEM_CONFIGS } from "@/lib/itemConfigs";
import AllergenTags from "./AllergenTags";
import OrderItemModal from "./OrderItemModal";

export default function OrderMenuItemCard({ item }) {
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useCart();

  const handleAddSimple = (menuItem, qty = 1) => {
    addItem({
      name: menuItem.name,
      base_price: menuItem.price,
      quantity: qty,
      ingredients: ITEM_CONFIGS[menuItem.name]?.ingredients || [],
      removed_ingredients: [],
      extras: [],
      extra_count: 0,
      chocolate_selections: [],
      selected_toppings: [],
      selected_sauces: [],
      special_instructions: "",
      item_total: menuItem.price * qty
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        onClick={() => setShowModal(true)}
        className="bg-card rounded-[28px_10px_28px_10px] overflow-hidden shadow-sm border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all group hidden sm:block cursor-pointer">

        {item.image_url ?
        <div className="aspect-square overflow-hidden bg-secondary">
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          </div> :

        <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative overflow-hidden">
            <ImageOff size={48} className="text-primary/40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        }
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-body font-bold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
            <span className="font-body font-extrabold text-primary text-sm shrink-0 bg-secondary px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
          </div>
          {item.description &&
          <p className="text-muted-foreground font-body text-xs leading-relaxed mb-2 line-clamp-2">{item.description}</p>
          }
          {item.is_sold_out &&
          <span className="inline-block mb-2 bg-foreground/10 text-foreground/50 text-[10px] font-body font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          }
          <AllergenTags allergens={item.allergens} />
        </div>
      </motion.div>

      {/* Mobile: horizontal layout */}
      <div
        onClick={() => setShowModal(true)}
        className="flex sm:hidden bg-card rounded-[18px_6px_18px_6px] overflow-hidden shadow-sm border-2 border-border cursor-pointer">
        <div className="w-20 h-20 shrink-0 overflow-hidden bg-secondary rounded-tl-[18px]">
          {item.image_url ?
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" loading="lazy" /> :

          <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
              <ImageOff size={24} className="text-primary/40" />
            </div>
          }
        </div>
        <div className="flex-1 min-w-0 p-3 flex flex-col justify-center">
          <h3 className="font-body font-bold text-sm text-foreground truncate">{item.name}</h3>
          <span className="font-body font-extrabold text-primary text-sm mt-0.5">${item.price?.toFixed(2)}</span>
          {item.description &&
          <p className="text-muted-foreground font-body text-xs leading-relaxed mt-0.5 line-clamp-1">{item.description}</p>
          }
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <OrderItemModal
            item={item}
            onAddToCart={addItem}
            onAddSimple={handleAddSimple}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

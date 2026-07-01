import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { ITEM_CONFIGS } from "@/lib/itemConfigs";
import OrderItemModal from "./OrderItemModal";

export default function MenuFolderRow({ item }) {
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
      item_total: menuItem.price * qty,
    });
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-[#F7E3E8] transition-colors cursor-pointer"
      >
        <div className="w-14 h-14 rounded-2xl shrink-0 overflow-hidden bg-[#F7E3E8] flex items-center justify-center">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <ImageOff size={20} className="text-[#7C0116]/40" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-body font-extrabold text-[14.5px] text-[#2c2325] truncate">{item.name}</h4>
          {item.description && (
            <p className="text-[11.5px] text-[#7a6469] font-bold leading-snug line-clamp-2">{item.description}</p>
          )}
          {item.is_sold_out && (
            <span className="inline-block mt-1 bg-foreground/10 text-foreground/50 text-[10px] font-body font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          )}
        </div>
        <span className="text-[#7C0116] font-extrabold text-[13.5px] whitespace-nowrap bg-[#F7E3E8] px-2.5 py-1 rounded-full shrink-0">
          ${item.price?.toFixed(2)}
        </span>
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

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { ITEM_CONFIGS } from "@/lib/itemConfigs";
import OrderItemModal from "./OrderItemModal";

// Cart line for an item added without customization.
function simpleCartItem(menuItem, qty = 1) {
  return {
    name: menuItem.name,
    base_price: menuItem.price,
    quantity: qty,
    ingredients: ITEM_CONFIGS[menuItem.name]?.ingredients || [],
    removed_ingredients: [],
    extras: [],
    extras_total: 0,
    chocolate_selections: [],
    selected_toppings: [],
    selected_sauces: [],
    special_instructions: "",
    item_total: menuItem.price * qty,
  };
}

// Opens the existing item modal (customization + add to cart) for a menu item.
export function useItemModal(item) {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();
  const modal = (
    <AnimatePresence>
      {open && (
        <OrderItemModal
          item={item}
          onAddToCart={addItem}
          onAddSimple={(menuItem, qty) => addItem(simpleCartItem(menuItem, qty))}
          onClose={() => setOpen(false)}
        />
      )}
    </AnimatePresence>
  );
  return { openModal: () => setOpen(true), modal };
}

export function ItemPhoto({ item, className = "" }) {
  // object-contain keeps the whole dessert in view without stretching.
  return (
    <div className={`rounded-2xl shrink-0 overflow-hidden bg-[#FDEEF5] flex items-center justify-center ${className}`}>
      {item.image_url ? (
        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" loading="lazy" />
      ) : (
        <ImageOff size={24} className="text-[#E61F3F]/40" />
      )}
    </div>
  );
}

export function Price({ value }) {
  return (
    <span className="text-[#E61F3F] font-body font-extrabold text-sm whitespace-nowrap bg-[#F8CCE1] px-2.5 py-1 rounded-full shrink-0">
      ${value?.toFixed(2)}
    </span>
  );
}

export default function MenuFolderRow({ item }) {
  const { openModal, modal } = useItemModal(item);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="w-full text-left flex items-start gap-3.5 sm:gap-4 p-2.5 rounded-2xl hover:bg-[#FDEEF5] transition-colors"
      >
        <ItemPhoto item={item} className="w-24 h-24 sm:w-28 sm:h-28" />
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-body font-extrabold text-[15px] leading-snug text-[#2c2325] break-words min-w-0">{item.name}</h4>
            <Price value={item.price} />
          </div>
          {item.description && (
            <p className="mt-1 text-[13.5px] text-[#4a3a3e] font-medium leading-relaxed">{item.description}</p>
          )}
          {item.is_sold_out && (
            <span className="inline-block mt-1.5 bg-foreground/10 text-foreground/60 text-[11px] font-body font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          )}
        </div>
      </button>
      {modal}
    </>
  );
}

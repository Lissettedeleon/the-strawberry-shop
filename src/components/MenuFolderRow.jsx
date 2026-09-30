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
  // The menu photos are white-background shots with the dessert in the
  // middle. object-cover fills the square with the photo, and wide photos
  // are zoomed a little more so the cup isn't lost in white space. Only the
  // white edges are trimmed, never the dessert.
  const [wide, setWide] = useState(false);
  return (
    <div className={`rounded-2xl shrink-0 overflow-hidden flex items-center justify-center bg-[#F8CCE1] ${className}`}>
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
          style={wide ? { transform: "scale(1.3)" } : undefined}
          onLoad={(e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight > 1.3)}
          loading="lazy"
        />
      ) : (
        <ImageOff size={24} className="text-[#E61F3F]/40" />
      )}
    </div>
  );
}

export function Price({ value }) {
  return (
    <span className="text-[#E61F3F] font-body font-extrabold text-[13px] sm:text-base whitespace-nowrap bg-[#F8CCE1] px-2.5 sm:px-3 py-1 rounded-full shrink-0">
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
        className="w-full h-full text-left flex items-center gap-3 sm:gap-5 p-3 sm:p-4 bg-white border border-[#F8CCE1] rounded-2xl hover:bg-[#F8CCE1]/40 transition-colors"
      >
        <ItemPhoto item={item} className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-36 sm:h-36" />
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex max-[379px]:flex-wrap items-start justify-between gap-x-2 gap-y-1 sm:gap-3">
            <h4 className="font-bubble text-base min-[380px]:text-[17px] sm:text-xl leading-snug text-[#2c2325] break-words min-w-0">{item.name}</h4>
            <Price value={item.price} />
          </div>
          {item.description && (
            <p className="mt-1.5 text-[14px] sm:text-[15px] text-[#4a3a3e] font-medium leading-relaxed">{item.description}</p>
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

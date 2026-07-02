import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, subtotal, updateItem, removeItem, cartOpen, setCartOpen } = useCart();
  const onClose = () => setCartOpen(false);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Bottom sheet on mobile, right panel on desktop */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[24px] max-h-[85vh] flex flex-col shadow-2xl md:hidden"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1 shrink-0" />
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F6E3E7] shrink-0">
              <h2 className="font-body font-bold text-[#1a1a1a] text-base">Your Cart</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F6E3E7] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center">
                <X size={18} className="text-[#6b7280]" />
              </button>
            </div>
            <CartItems items={items} updateItem={updateItem} removeItem={removeItem} />
            <CartFooter subtotal={subtotal} items={items} onClose={onClose} />
          </motion.div>

          {/* Desktop side panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex-col hidden md:flex"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#F6E3E7] shrink-0">
              <h2 className="font-body font-bold text-[#1a1a1a] text-lg">Your Cart</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F6E3E7] transition-colors">
                <X size={18} className="text-[#6b7280]" />
              </button>
            </div>
            <CartItems items={items} updateItem={updateItem} removeItem={removeItem} />
            <CartFooter subtotal={subtotal} items={items} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItems({ items, updateItem, removeItem }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {items.map(item => {
        const extrasTotal = item.extras_total || 0;
        const lineTotal = ((item.base_price || 0) + extrasTotal) * (item.quantity || 1);
        return (
          <div key={item.cartId} className="bg-[#FBF1F3] border border-[#E0A4B0] rounded-2xl p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-bold text-[#1a1a1a] text-sm">{item.name}</h4>
                {item.ingredients?.length > 0 && (
                  <p className="text-xs text-[#6b7280] mt-0.5">
                    Comes with: {item.ingredients.filter(i => !item.removed_ingredients?.includes(i)).join(", ")}
                  </p>
                )}
                {item.removed_ingredients?.length > 0 && <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>}
                {item.base_selection && <p className="text-xs text-[#6b7280] mt-0.5">Base: {item.base_selection}</p>}
                {item.chocolate_selections?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Chocolates: {item.chocolate_selections.join(", ")}</p>}
                {item.selected_toppings?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>}
                {item.selected_choc_toppings?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_choc_toppings.join(", ")}</p>}
                {item.selected_sauces?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>}
                {item.extras?.length > 0 && <p className="text-xs text-[#7C0116] mt-0.5">+ {item.extras.join(", ")}</p>}
                {item.special_instructions && <p className="text-xs text-[#6b7280] mt-0.5 italic">"{item.special_instructions}"</p>}
              </div>
              <button onClick={() => removeItem(item.cartId)} className="p-1 text-[#6b7280] hover:text-red-500 transition-colors shrink-0 ml-2 min-w-[32px] min-h-[32px] flex items-center justify-center">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => {
                  if ((item.quantity || 1) <= 1) removeItem(item.cartId);
                  else updateItem(item.cartId, { quantity: (item.quantity || 1) - 1, item_total: ((item.base_price || 0) + extrasTotal) * ((item.quantity || 1) - 1) });
                }} className="w-8 h-8 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F6E3E7] transition-colors">
                  <Minus size={12} />
                </button>
                <span className="font-body font-bold text-sm w-5 text-center">{item.quantity || 1}</span>
                <button onClick={() => {
                  const newQty = (item.quantity || 1) + 1;
                  updateItem(item.cartId, { quantity: newQty, item_total: ((item.base_price || 0) + extrasTotal) * newQty });
                }} className="w-8 h-8 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F6E3E7] transition-colors">
                  <Plus size={12} />
                </button>
              </div>
              <span className="font-body font-extrabold text-[#7C0116] text-sm">${lineTotal.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
      {items.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart size={32} className="mx-auto mb-3 text-[#7C0116]/40" />
          <p className="text-[#6b7280] font-body text-sm">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

function CartFooter({ subtotal, items, onClose }) {
  if (items.length === 0) return null;
  return (
    <div className="border-t border-[#F6E3E7] p-4 space-y-3 shrink-0">
      <div className="flex items-center justify-between">
        <span className="font-body font-bold text-[#1a1a1a]">Subtotal</span>
        <span className="font-body font-extrabold text-[#7C0116] text-lg">${subtotal.toFixed(2)}</span>
      </div>
      <Link
        to="/checkout"
        onClick={onClose}
        className="block w-full bg-[#7C0116] text-white font-body font-bold text-sm py-4 rounded-full text-center hover:bg-[#5C0110] transition-colors min-h-[52px] flex items-center justify-center active:scale-95"
      >
        Checkout
      </Link>
    </div>
  );
}

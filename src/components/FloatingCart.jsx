import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { EXTRA_PRICE } from "@/lib/itemConfigs";
import { Link } from "react-router-dom";

export default function FloatingCart() {
  const { items, itemCount, subtotal, updateItem, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  if (itemCount === 0) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Cart"
      >
        <ShoppingBag size={22} />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white shadow-xl rounded-full px-5 py-3.5 flex items-center gap-3 hover:bg-primary/90 transition-colors"
        aria-label="Cart"
      >
        <ShoppingBag size={20} />
        <span className="font-body font-bold text-sm">{itemCount} · ${subtotal.toFixed(2)}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-foreground/40 z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-display text-foreground text-xl">Your Cart</h2>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.map(item => {
                  const extrasTotal = (item.extra_count || 0) * EXTRA_PRICE;
                  const lineTotal = ((item.base_price || 0) + extrasTotal) * (item.quantity || 1);
                  return (
                    <div key={item.cartId} className="bg-secondary/50 rounded-2xl p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body font-bold text-sm text-foreground">{item.name}</h4>
                          {item.removed_ingredients?.length > 0 && (
                            <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>
                          )}
                          {item.extras?.length > 0 && (
                            <p className="text-xs text-primary mt-0.5">+ {item.extras.join(", ")}</p>
                          )}
                          {item.chocolate_selections?.length > 0 && (
                            <p className="text-xs text-foreground/70 mt-0.5">Choc: {item.chocolate_selections.join(", ")}</p>
                          )}
                          {item.selected_toppings?.length > 0 && (
                            <p className="text-xs text-foreground/70 mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>
                          )}
                          {item.selected_sauces?.length > 0 && (
                            <p className="text-xs text-foreground/70 mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>
                          )}
                          {item.special_instructions && (
                            <p className="text-xs text-muted-foreground mt-0.5 italic">"{item.special_instructions}"</p>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.cartId)} className="p-1 text-muted-foreground hover:text-red-500 transition-colors shrink-0 ml-2">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => {
                            if ((item.quantity || 1) <= 1) removeItem(item.cartId);
                            else updateItem(item.cartId, { quantity: (item.quantity || 1) - 1, item_total: ((item.base_price || 0) + extrasTotal) * ((item.quantity || 1) - 1) });
                          }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-secondary transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="font-body font-bold text-sm w-5 text-center">{item.quantity || 1}</span>
                          <button onClick={() => {
                            const newQty = (item.quantity || 1) + 1;
                            updateItem(item.cartId, { quantity: newQty, item_total: ((item.base_price || 0) + extrasTotal) * newQty });
                          }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-secondary transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-body font-extrabold text-primary text-sm">${lineTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <div className="text-center py-12">
                    <span className="text-4xl block mb-3">🛒</span>
                    <p className="text-muted-foreground font-body text-sm">Your cart is empty</p>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-bold text-foreground">Subtotal</span>
                    <span className="font-body font-extrabold text-primary text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setOpen(false)}
                    className="block w-full bg-primary text-white font-body font-bold text-sm py-3.5 rounded-full text-center hover:bg-primary/90 transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
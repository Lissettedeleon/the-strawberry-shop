import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const platforms = [
  { name: "Order Pickup", to: "/order", emoji: "\uD83C\uDF53", internal: true },
  { name: "Uber Eats", url: "https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg", emoji: "\uD83D\uDE97", internal: false },
  { name: "DoorDash", url: "https://www.doordash.com/store/41748513", emoji: "\uD83C\uDFC3", internal: false },
];

export default function StickyMobileOrder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
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
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[30px] p-6 pb-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-primary text-xl">order now \uD83C\uDF53</h3>
                <button onClick={() => setOpen(false)} className="p-1.5 text-foreground/50" aria-label="Close">
                  <X size={22} />
                </button>
              </div>
              <div className="space-y-3">
                {platforms.map(p =>
                  p.internal ? (
                    <Link
                      key={p.name}
                      to={p.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 bg-secondary text-foreground font-body font-bold px-5 py-4 rounded-2xl hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="text-2xl">{p.emoji}</span> {p.name}
                    </Link>
                  ) : (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-secondary text-foreground font-body font-bold px-5 py-4 rounded-2xl hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="text-2xl">{p.emoji}</span> {p.name}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-border">
        <Link
          to="/order"
          className="w-full bg-primary text-white font-body font-bold text-base py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md"
        >
          <ShoppingBag size={18} /> Order Now
        </Link>
      </div>
    </div>
  );
}
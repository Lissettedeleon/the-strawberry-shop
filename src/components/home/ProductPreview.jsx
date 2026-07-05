import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Toast-ready: pulls structured MenuItem records (stable IDs, images, prices).
// In a future Toast integration these same records map to Toast menu GUIDs.
const FALLBACK_CATEGORIES = [
  { name: "Strawberry Cups", desc: "Fresh-cut strawberries layered with creams, sauces & toppings.", badge: "Popular", color: "#F6E3E7" },
  { name: "Chocolate-Covered Strawberries", desc: "Hand-dipped in rich, glossy chocolate.", badge: "Great for Gifts", color: "#E8D5C4" },
  { name: "Dessert Trays", desc: "Shareable trays built for celebrations.", badge: null, color: "#FBF1F3" },
  { name: "Giftable Treats", desc: "Sweet boxes made for gifting.", badge: "Great for Gifts", color: "#F6E3E7" },
  { name: "Seasonal Favorites", desc: "Limited-time flavors, made fresh.", badge: "Seasonal", color: "#E0A4B0" },
];

export default function ProductPreview() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_featured: true, is_sold_out: false }, "sort_order", 5)
      .then(setItems)
      .catch(() => {});
  }, []);

  const cards =
    items.length > 0
      ? items.map((it) => ({
          name: it.name,
          desc: it.description,
          badge: it.is_seasonal ? "Seasonal" : "Popular",
          image: it.image_url,
          price: it.price,
        }))
      : FALLBACK_CATEGORIES;

  return (
    <section id="fresh-favorites" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
            A taste of what we make
          </p>
          <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Fresh Favorites</h2>
          <p className="text-[#6b7280] font-body text-sm md:text-base mt-3 max-w-xl mx-auto">
            A quick preview of our most-loved treats. See the full menu to build your order.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#F6E3E7] shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: card.color || "#F6E3E7" }}>
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl opacity-40">🍓</span>
                  </div>
                )}
                {card.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-[#7C0116] font-body font-bold text-[11px] px-3 py-1 rounded-full shadow-sm">
                    {card.badge}
                  </span>
                )}
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-bubble text-[#1a1a1a] text-base md:text-lg leading-tight mb-1">
                  {card.name}
                </h3>
                <p className="text-[#6b7280] font-body text-xs md:text-sm leading-relaxed line-clamp-2 mb-3">
                  {card.desc}
                </p>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-1.5 text-[#7C0116] font-body font-bold text-xs md:text-sm hover:text-[#5C0110] transition-colors"
                >
                  <ShoppingBag size={14} /> Start Order
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
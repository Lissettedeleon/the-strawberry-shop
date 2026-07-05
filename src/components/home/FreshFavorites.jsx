import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Toast-ready: pulls structured MenuItem records (stable IDs, images, prices).
const FALLBACK_CATEGORIES = [
  { name: "Strawberry Cups", desc: "Fresh-cut strawberries with creams, sauces & toppings.", badge: "Popular" },
  { name: "Chocolate-Covered Strawberries", desc: "Hand-dipped in rich, glossy chocolate.", badge: "Great for Gifts" },
  { name: "Dessert Trays", desc: "Shareable trays for celebrations.", badge: null },
  { name: "Giftable Treats", desc: "Sweet boxes made for gifting.", badge: "Great for Gifts" },
  { name: "Seasonal Favorites", desc: "Limited-time flavors, made fresh.", badge: "Seasonal" },
];

export default function FreshFavorites() {
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
        }))
      : FALLBACK_CATEGORIES;

  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#F7E3E8" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div
          className="bg-white rounded-[20px_20px_26px_26px] p-5 sm:p-8"
          style={{
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
          }}
        >
          <div className="text-center mb-6">
            <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl">fresh favorites</h2>
            <p className="text-[#7a6469] font-body font-medium text-sm mt-1.5">
              A quick preview — see the full menu to build your order.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="group flex items-center gap-3 p-2 rounded-2xl hover:bg-[#F7E3E8] transition-colors"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 overflow-hidden bg-[#F7E3E8] flex items-center justify-center">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-2xl opacity-50">🍓</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {card.badge && (
                      <span className="bg-[#F7E3E8] text-[#7C0116] font-body font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-body font-extrabold text-[13.5px] text-[#2c2325] truncate leading-tight">
                    {card.name}
                  </h3>
                  <p className="text-[11.5px] text-[#7a6469] font-bold leading-snug line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-7">
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 bg-[#7C0116] text-white font-body font-extrabold text-sm px-6 py-2.5 rounded-full min-h-[44px] hover:bg-[#5C0110] transition-colors active:scale-95"
            >
              Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
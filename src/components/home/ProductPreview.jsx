import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ImageOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

const FAVORITE_NAMES = ["OG", "Dubai", "Build Your Own Cup"];

const FALLBACK_CARDS = [
  { name: "OG", desc: "House cream and fresh strawberries, the one that started it all." },
  { name: "Dubai", desc: "Pistachio cream, kataifi, Nutella, and chocolate sauce over fresh strawberries." },
  { name: "Build Your Own Cup", desc: "Pick your base, toppings, and sauces — made exactly your way." },
];

export default function ProductPreview() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 100)
      .then((all) => {
        const matched = FAVORITE_NAMES.map((name) =>
          all.find((it) => it.name?.toLowerCase() === name.toLowerCase())
        ).filter(Boolean);
        setItems(matched);
      })
      .catch(() => {});
  }, []);

  const cards =
    items.length > 0
      ? items.map((it) => ({ name: it.name, desc: it.description, image: it.image_url, price: it.price }))
      : FALLBACK_CARDS;

  return (
    <section id="fresh-favorites" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Favorites</h2>
          <p className="text-[#6b7280] font-body text-sm md:text-base mt-3 max-w-xl mx-auto">
            The ones everyone keeps coming back for
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#F6E3E7] shadow-sm mb-4">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff size={32} className="text-[#7C0116]/40" />
                  </div>
                )}
              </div>
              <h3 className="font-bubble text-[#1a1a1a] text-lg md:text-xl mb-1.5">{card.name}</h3>
              <p className="text-[#6b7280] font-body text-sm leading-relaxed mb-2">{card.desc}</p>
              {card.price != null && (
                <p className="text-[#7C0116] font-body font-extrabold text-base">${card.price.toFixed(2)}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#E0A4B0] text-[#7C0116] font-body font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#FBF1F3] transition-colors"
          >
            <ShoppingBag size={16} /> See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

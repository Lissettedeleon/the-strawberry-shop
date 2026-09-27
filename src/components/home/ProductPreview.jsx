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

// All favorites share the pistachio-green card; only the photo zoom differs
// so the cups read at a similar size (the OG shot is framed much wider).
const CARD_BG = "#E3EAB9";
const CARD_TEXT = "#4F5F10";
const PHOTO_ZOOM = { og: 1.45, dubai: 1.45, "build your own cup": 1.05 };

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
          <h2 className="font-bubble text-[#E61F3F] text-3xl md:text-4xl">Favorites</h2>
          <p className="text-[#6b7280] font-body text-sm md:text-base mt-3 max-w-xl mx-auto">
            The ones everyone keeps coming back for
          </p>
        </div>

        {/* Stacked list on phones (photo left, text right), three across from tablet up */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cards.map((card, i) => {
            const zoom = PHOTO_ZOOM[card.name?.toLowerCase()] || 1;
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex sm:block items-center gap-4 rounded-3xl p-4 sm:p-5 sm:pt-6 md:p-6 md:pt-8 text-left sm:text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ background: CARD_BG }}
              >
                <div className="w-28 shrink-0 sm:w-[82%] sm:mx-auto sm:mb-5">
                  <div className="aspect-square rounded-full overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] group-hover:rotate-3 transition-transform duration-500 ease-out">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ transform: `scale(${zoom})` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={32} className="text-[#E61F3F]/40" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-bubble text-[#1a1a1a] text-xl md:text-2xl mb-1">{card.name}</h3>
                  <p className="font-body text-sm leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-2" style={{ color: CARD_TEXT }}>{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#F4B3D0] text-[#E61F3F] font-body font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#FDEEF5] transition-colors"
          >
            <ShoppingBag size={16} /> See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

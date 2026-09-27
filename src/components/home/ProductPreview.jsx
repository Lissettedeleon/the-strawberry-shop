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

// Per-favorite look: card color, a short tag, and how far to zoom the photo
// so the cups read at a similar size (the OG shot is framed much wider).
const CARD_STYLES = {
  og: { bg: "#F8CCE1", ink: "#1a1a1a", sub: "#6b4a52", tag: "Where it all started", tagBg: "#E61F3F", tagInk: "#fff", zoom: 1.45, tilt: "-rotate-6" },
  dubai: { bg: "#E3EAB9", ink: "#1a1a1a", sub: "#4F5F10", tag: "Viral favorite", tagBg: "#4F5F10", tagInk: "#fff", zoom: 1.25, tilt: "rotate-6" },
  "build your own cup": { bg: "#E61F3F", ink: "#fff", sub: "rgba(255,255,255,0.85)", tag: "Make it yours", tagBg: "#fff", tagInk: "#E61F3F", zoom: 1.05, tilt: "-rotate-3" },
};
const DEFAULT_STYLE = CARD_STYLES.og;

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

        {/* Swipeable row on phones, three across from tablet up */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 scrollbar-hide">
          {cards.map((card, i) => {
            const st = CARD_STYLES[card.name?.toLowerCase()] || DEFAULT_STYLE;
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative shrink-0 w-[72%] sm:w-auto snap-center rounded-3xl p-5 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ background: st.bg }}
              >
                <span
                  className="inline-block font-body font-bold text-[11px] md:text-xs uppercase tracking-wider rounded-full px-3 py-1 mb-4"
                  style={{ background: st.tagBg, color: st.tagInk }}
                >
                  {st.tag}
                </span>

                <div className="relative w-[82%] mx-auto mb-5">
                  <div className="aspect-square rounded-full overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] group-hover:rotate-3 transition-transform duration-500 ease-out">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ transform: `scale(${st.zoom})` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={32} className="text-[#E61F3F]/40" />
                      </div>
                    )}
                  </div>
                  {card.price != null && (
                    <span
                      className={`absolute -top-1 -right-2 md:-right-3 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-body font-extrabold text-sm md:text-base shadow-md ${st.tilt} group-hover:rotate-0 transition-transform duration-300`}
                      style={{ background: st.tagBg, color: st.tagInk }}
                    >
                      ${card.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <h3 className="font-bubble text-xl md:text-2xl mb-1.5" style={{ color: st.ink }}>{card.name}</h3>
                <p className="font-body text-sm leading-relaxed line-clamp-2" style={{ color: st.sub }}>{card.desc}</p>
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

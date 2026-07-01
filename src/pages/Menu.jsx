import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import OrderMenuItemCard from "@/components/OrderMenuItemCard";
import BrandedLoader from "@/components/BrandedLoader";
import PowderAccent from "@/components/PowderAccent";
import { motion } from "framer-motion";
import { SearchX, Store, Truck } from "lucide-react";
import { DoorDashBadge, UberEatsBadge } from "@/components/DeliveryBadges";
import { useCart } from "@/lib/CartContext";

const CATEGORIES = [
  "Specials",
  "Our Berry Best Cups",
  "Build Your Own Cup",
  "Chocolate Covered Strawberries",
  "Others",
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const { fulfillmentType, setFulfillmentType } = useCart();

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = items.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E0A4B0" }}>
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}>
        <PowderAccent />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            our menu
          </motion.h1>
          <p className="text-white/80 font-body text-lg mb-6">
            Every cup starts with the freshest strawberries. Always.
          </p>

          {/* Pickup / Delivery toggle */}
          <div className="inline-flex bg-white/15 backdrop-blur-sm rounded-full p-1.5">
            <button
              onClick={() => setFulfillmentType("pickup")}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
                fulfillmentType === "pickup" ? "bg-white text-primary shadow-md" : "text-white/80 hover:text-white"
              }`}
            >
              <Store size={15} /> Pickup
            </button>
            <button
              onClick={() => setFulfillmentType("delivery")}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
                fulfillmentType === "delivery" ? "bg-white text-primary shadow-md" : "text-white/80 hover:text-white"
              }`}
            >
              <Truck size={15} /> Delivery
            </button>
          </div>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Category Filter */}
      <div style={{ backgroundColor: "#E0A4B0" }} className="sticky top-16 z-40 border-b border-[#CC8794]/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full font-body font-semibold text-xs sm:text-sm transition-all ${
                  activeCategory === cat ? "bg-[#7C0116] text-white shadow-sm" : "bg-white text-[#1a1a1a] hover:bg-[#F6E3E7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <section style={{ backgroundColor: "#E0A4B0" }} className="pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <BrandedLoader text="whipping up the menu..." />
          ) : activeCategory === "All" && Object.keys(groupedByCategory).length === 0 ? (
            <div className="text-center text-muted-foreground font-body py-16">
              <SearchX size={40} className="mx-auto mb-3 text-[#5C0110]/50" />
              <p>No menu items yet. Check back soon!</p>
            </div>
          ) : activeCategory === "All" ? (
            Object.entries(groupedByCategory).map(([cat, catItems]) => (
              <div key={cat} className="mb-14">
                <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                  {cat.toLowerCase()}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {catItems.map((item) => (
                    <OrderMenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                {activeCategory.toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <OrderMenuItemCard key={item.id} item={item} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center text-muted-foreground font-body py-12">
                  <SearchX size={32} className="mx-auto mb-3 text-[#5C0110]/50" />
                  <p>No items in this category yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Alternative delivery apps */}
      <section className="bg-white py-8 border-t border-[#F6E3E7]">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="font-body text-[#6b7280] text-sm mb-3">Prefer to order delivery through an app instead?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <UberEatsBadge />
            <DoorDashBadge />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

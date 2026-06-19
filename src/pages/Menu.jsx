import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import MenuItemCard from "@/components/MenuItemCard";
import { motion } from "framer-motion";

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

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(i => i.category === activeCategory);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = items.filter(i => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section style={{ backgroundColor: "#E8193C" }} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3"
          >
            our menu
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Every cup starts with the freshest strawberries. Always.
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Category Filter */}
      <div style={{ backgroundColor: "#FFF0F3" }} className="sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all ${
                activeCategory === "All"
                  ? "bg-primary text-white"
                  : "bg-white text-foreground/60 hover:bg-secondary"
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white text-foreground/60 hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <section style={{ backgroundColor: "#FFF0F3" }} className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
            </div>
          ) : activeCategory === "All" ? (
            Object.entries(groupedByCategory).map(([cat, catItems]) => (
              <div key={cat} className="mb-14">
                <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">{cat.toLowerCase()}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">{activeCategory.toLowerCase()}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <p className="text-center text-muted-foreground font-body py-12">No items in this category yet.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Order CTA */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-foreground text-3xl mb-4">ready to order?</h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            Pick your platform and treat yourself. You deserve it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row" target="_blank" rel="noopener noreferrer" className="bg-primary text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors">
              Order Direct (Toast)
            </a>
            <a href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg" target="_blank" rel="noopener noreferrer" className="bg-foreground text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-foreground/90 transition-colors">
              Uber Eats
            </a>
            <a href="https://www.doordash.com/store/41748513" target="_blank" rel="noopener noreferrer" className="bg-white text-primary font-body font-bold px-8 py-3.5 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all">
              DoorDash
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
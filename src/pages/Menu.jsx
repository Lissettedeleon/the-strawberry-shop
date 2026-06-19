import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import MenuItemCard from "@/components/MenuItemCard";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  "Specials",
  "Our Berry Best Cups",
  "Build Your Own Cup",
  "Chocolate Covered Strawberries",
  "Others",
];

const categoryEmojis = {
  "Specials": "✨",
  "Our Berry Best Cups": "🍓",
  "Build Your Own Cup": "🎨",
  "Chocolate Covered Strawberries": "🍫",
  "Others": "🍬",
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const searchedItems = query
    ? items.filter(i => i.name.toLowerCase().includes(query))
    : items;
  const isSearching = query.length > 0;

  const filteredItems = activeCategory === "All"
    ? searchedItems
    : searchedItems.filter(i => i.category === activeCategory);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = searchedItems.filter(i => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-3xl opacity-15 animate-bounce" style={{ top: "15%", left: "5%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-2xl opacity-10 animate-bounce" style={{ top: "40%", right: "10%", animationDuration: "3.5s", animationDelay: "0.5s" }}>🍫</span>
          <span className="absolute text-4xl opacity-10 animate-bounce" style={{ bottom: "20%", right: "20%", animationDuration: "4s", animationDelay: "1s" }}>✨</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            our menu
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Every cup starts with the freshest strawberries. Always. 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Search + Category Filter */}
      <div style={{ backgroundColor: "#FFF0F3" }} className="sticky top-16 md:top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search the menu..."
              className="w-full bg-white border-2 border-border rounded-full pl-11 pr-10 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all ${
                activeCategory === "All"
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-foreground/60 hover:bg-secondary hover:shadow-sm"
              }`}
            >
              🍓 All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-foreground/60 hover:bg-secondary hover:shadow-sm"
                }`}
              >
                {categoryEmojis[cat] || ""} {cat}
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
              <div className="flex items-center gap-2">
                <span className="animate-bounce text-2xl" style={{ animationDelay: "0s" }}>🍓</span>
                <span className="animate-bounce text-2xl" style={{ animationDelay: "0.2s" }}>🍓</span>
                <span className="animate-bounce text-2xl" style={{ animationDelay: "0.4s" }}>🍓</span>
              </div>
            </div>
          ) : activeCategory === "All" && Object.keys(groupedByCategory).length === 0 ? (
            <div className="text-center text-muted-foreground font-body py-16">
              <span className="text-4xl block mb-3">🔍🍓</span>
              <p>No items match "{search}". Try a different search!</p>
            </div>
          ) : activeCategory === "All" ? (
            Object.entries(groupedByCategory).map(([cat, catItems]) => (
              <div key={cat} className="mb-14">
                <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                  {categoryEmojis[cat] || "🍓"} {cat.toLowerCase()}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                {categoryEmojis[activeCategory] || "🍓"} {activeCategory.toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center text-muted-foreground font-body py-12">
                  <span className="text-4xl block mb-3">{isSearching ? "🔍🍓" : "🍓"}</span>
                  <p>{isSearching ? `No items match "${search}" here.` : "No items in this category yet."}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Order CTA */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-display text-primary/60 text-lg mb-1">🍓 hungry yet? 🍓</p>
          <h2 className="font-display text-foreground text-3xl mb-4">ready to order?</h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            Pick your platform and treat yourself. You deserve it. 💕
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row" target="_blank" rel="noopener noreferrer" className="bg-primary text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md">
              Order Direct (Toast)
            </a>
            <a href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg" target="_blank" rel="noopener noreferrer" className="bg-foreground text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-foreground/90 transition-colors shadow-sm hover:shadow-md">
              Uber Eats
            </a>
            <a href="https://www.doordash.com/store/41748513" target="_blank" rel="noopener noreferrer" className="bg-white text-primary font-body font-bold px-8 py-3.5 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
              DoorDash
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>
  );
}
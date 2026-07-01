import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import OrderMenuItemCard from "@/components/OrderMenuItemCard";
import FloatingCart from "@/components/FloatingCart";
import BrandedLoader from "@/components/BrandedLoader";
import PowderAccent from "@/components/PowderAccent";
import { motion } from "framer-motion";
import { Search, X, SearchX, ExternalLink } from "lucide-react";

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const searchedItems = query
    ? items.filter((i) => i.name.toLowerCase().includes(query))
    : items;
  const isSearching = query.length > 0;

  const filteredItems = activeCategory === "All"
    ? searchedItems
    : searchedItems.filter((i) => i.category === activeCategory);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = searchedItems.filter((i) => i.category === cat);
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
          <p className="text-white/80 font-body text-lg">
            Every cup starts with the freshest strawberries. Always.
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Search + Category Filter */}
      <div style={{ backgroundColor: "#E0A4B0" }} className="sticky top-16 z-40 border-b border-[#CC8794]/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C0110]/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the menu..."
              className="w-full bg-white rounded-full pl-11 pr-10 py-3 font-body text-sm text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7C0116]/30 min-h-[44px]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[#F6E3E7] transition-colors"
                aria-label="Clear search"
              >
                <X size={16} className="text-[#5C0110]/60" />
              </button>
            )}
          </div>
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
              <p>{isSearching ? `No items match "${search}". Try a different search!` : "No menu items yet. Check back soon!"}</p>
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
                  <p>{isSearching ? `No items match "${search}" here.` : "No items in this category yet."}</p>
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
            <a
              href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#F6E3E7] text-[#5C0110] font-body font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#E0A4B0]/50 transition-colors"
            >
              Uber Eats <ExternalLink size={13} />
            </a>
            <a
              href="https://www.doordash.com/store/41748513"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#F6E3E7] text-[#5C0110] font-body font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#E0A4B0]/50 transition-colors"
            >
              DoorDash <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCart />
    </div>
  );
}

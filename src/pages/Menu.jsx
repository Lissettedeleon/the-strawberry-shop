import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import MenuItemCard from "@/components/MenuItemCard";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import FloatingDecor from "@/components/FloatingDecor";
import BrandedLoader from "@/components/BrandedLoader";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
"Specials",
"Our Berry Best Cups",
"Build Your Own Cup",
"Chocolate Covered Strawberries",
"Others"];


const categoryEmojis = {
  "Specials": "✨",
  "Our Berry Best Cups": "🍓",
  "Build Your Own Cup": "🎨",
  "Chocolate Covered Strawberries": "🍫",
  "Others": "🍬"
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50).
    then(setItems).
    catch(() => {}).
    finally(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const searchedItems = query ?
  items.filter((i) => i.name.toLowerCase().includes(query)) :
  items;
  const isSearching = query.length > 0;

  const filteredItems = activeCategory === "All" ?
  searchedItems :
  searchedItems.filter((i) => i.category === activeCategory);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = searchedItems.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <FloatingDecor />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            
            our menu
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Every cup starts with the freshest strawberries. Always. 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Search + Category Filter */}
      <div style={{ backgroundColor: "#FFB3C6" }} className="sticky top-16 md:top-20 z-40 shadow-sm">
        












































        
      </div>

      {/* Menu Items */}
      <section style={{ backgroundColor: "#FFB3C6" }} className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ?
          <BrandedLoader text="whipping up the menu..." /> :
          activeCategory === "All" && Object.keys(groupedByCategory).length === 0 ?
          <div className="text-center text-muted-foreground font-body py-16">
              <span className="text-4xl block mb-3">🔍🍓</span>
              <p>No items match "{search}". Try a different search!</p>
            </div> :
          activeCategory === "All" ?
          Object.entries(groupedByCategory).map(([cat, catItems]) =>
          <div key={cat} className="mb-14">
                <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                  {categoryEmojis[cat] || "🍓"} {cat.toLowerCase()}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {catItems.map((item) =>
              <MenuItemCard key={item.id} item={item} />
              )}
                </div>
              </div>
          ) :

          <div>
              <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">
                {categoryEmojis[activeCategory] || "🍓"} {activeCategory.toLowerCase()}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredItems.map((item) =>
              <MenuItemCard key={item.id} item={item} />
              )}
              </div>
              {filteredItems.length === 0 &&
            <div className="text-center text-muted-foreground font-body py-12">
                  <span className="text-4xl block mb-3">{isSearching ? "🔍🍓" : "🍓"}</span>
                  <p>{isSearching ? `No items match "${search}" here.` : "No items in this category yet."}</p>
                </div>
            }
            </div>
          }
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Order CTA */}
      <section className="bg-white">
        
















        
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>);

}
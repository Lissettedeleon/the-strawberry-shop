import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderMenuItemCard from "@/components/OrderMenuItemCard";
import FloatingCart from "@/components/FloatingCart";
import BrandedLoader from "@/components/BrandedLoader";
import WaveDivider from "@/components/WaveDivider";
import { Search, X, ExternalLink } from "lucide-react";

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

function OrderContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [orderType, setOrderType] = useState("pickup");

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

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e8233a 0%, #c41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "10%", left: "5%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-3xl opacity-10 animate-bounce" style={{ bottom: "20%", right: "8%", animationDuration: "3.5s", animationDelay: "0.7s" }}>🛍️</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-3xl sm:text-5xl mb-3 drop-shadow-lg">
            
            order online
          </motion.h1>
          <p className="text-white/80 font-body text-lg mb-6">Fresh made just for you 🍓</p>

          {/* Order Type Toggle */}
          <div className="inline-flex bg-white/15 backdrop-blur-sm rounded-full p-1.5">
            <button
              onClick={() => setOrderType("pickup")}
              className={`px-6 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
              orderType === "pickup" ? "bg-white text-primary shadow-md" : "text-white/80 hover:text-white"}`
              }>
              
              🏪 Pickup
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-6 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
              orderType === "delivery" ? "bg-white text-primary shadow-md" : "text-white/80 hover:text-white"}`
              }>
              
              🚗 Delivery
            </button>
          </div>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {orderType === "delivery" ?
      <section style={{ backgroundColor: "#fff8f9" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="font-display text-primary/60 text-lg text-center mb-8">✨ delivery options ✨</p>
            <div className="space-y-5">
              <motion.a
              href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="block bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              
                <div className="flex items-center gap-5">
                  <span className="text-4xl">🛵</span>
                  <div className="flex-1">
                    <h3 className="font-body font-bold text-xl mb-1">Uber Eats</h3>
                    <p className="text-muted-foreground font-body text-sm">Delivery available. Standard platform fees apply.</p>
                  </div>
                  <ExternalLink size={20} className="text-muted-foreground" />
                </div>
              </motion.a>
              <motion.a
              href="https://www.doordash.com/store/41748513"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="block bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              
                <div className="flex items-center gap-5">
                  <span className="text-4xl">📦</span>
                  <div className="flex-1">
                    <h3 className="font-body font-bold text-xl mb-1">DoorDash</h3>
                    <p className="text-muted-foreground font-body text-sm">Delivery available. Standard platform fees apply.</p>
                  </div>
                  <ExternalLink size={20} className="text-muted-foreground" />
                </div>
              </motion.a>
            </div>
          </div>
        </section> :

      <>
          {/* Search + Categories */}
          <div style={{ backgroundColor: "#fff8f9" }} className="sticky top-16 z-40 border-b border-[#fde8ea] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full bg-white border border-[#f5b8c0] rounded-full pl-9 pr-9 py-2.5 font-body text-sm text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#e8233a]/30 focus:border-[#e8233a] transition-all min-h-[44px]"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#e8233a]">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button onClick={() => setActiveCategory("All")} className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all min-h-[40px] ${activeCategory === "All" ? "bg-[#e8233a] text-white shadow-md" : "bg-[#fde8ea] text-[#c41230] hover:bg-[#f5b8c0]"}`}>🍓 All</button>
                {CATEGORIES.map((cat) =>
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`shrink-0 px-5 py-2 rounded-full font-body font-semibold text-sm transition-all whitespace-nowrap min-h-[40px] ${activeCategory === cat ? "bg-[#e8233a] text-white shadow-md" : "bg-[#fde8ea] text-[#c41230] hover:bg-[#f5b8c0]"}`}>
                    {categoryEmojis[cat]} {cat}
                  </button>
              )}
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <section style={{ backgroundColor: "#fff8f9" }} className="pb-28">
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
                    <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">{categoryEmojis[cat]} {cat.toLowerCase()}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {catItems.map((item) =>
                <OrderMenuItemCard key={item.id} item={item} />
                )}
                    </div>
                  </div>
            ) :

            <div>
                  <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-6">{categoryEmojis[activeCategory]} {activeCategory.toLowerCase()}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredItems.map((item) =>
                <OrderMenuItemCard key={item.id} item={item} />
                )}
                  </div>
                </div>
            }
            </div>
          </section>

          <FloatingCart />
        </>
      }

      <Footer />
    </div>);

}

export default function Order() {
  return <OrderContent />;
}
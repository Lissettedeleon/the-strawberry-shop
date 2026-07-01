import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandedLoader from "@/components/BrandedLoader";
import MenuFolder from "@/components/MenuFolder";
import { motion } from "framer-motion";
import { SearchX, Store, Truck, Globe } from "lucide-react";
import { DoorDashBadge, UberEatsBadge } from "@/components/DeliveryBadges";
import { useCart } from "@/lib/CartContext";

const CATEGORIES = [
  "Specials",
  "Our Berry Best Cups",
  "Build Your Own Cup",
  "Chocolate Covered Strawberries",
  "Others",
];

const DELIVERY_FEE = "$3.99";
const DELIVERY_TIME = "35–45 min";
const DELIVERY_MINIMUM = "$15.00";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fulfillmentType, setFulfillmentType } = useCart();
  const isDelivery = fulfillmentType === "delivery";

  useEffect(() => {
    base44.entities.MenuItem.list("sort_order", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = items.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDelivery ? "#F7E3E8" : "#E0A4B0" }}
    >
      <Navbar />

      {/* Page head */}
      <div className="text-center px-4 pt-10 pb-4">
        <p className="font-body font-black text-[#7C0116] text-xs tracking-widest uppercase mb-2">
          Every cup starts fresh
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-menu-bubble text-[#7C0116] text-3xl sm:text-4xl mb-2"
        >
          our menu
        </motion.h1>
        <p className="text-[#6b4a52] font-body font-bold text-sm">
          Made fresh daily with real strawberries, always.
        </p>
      </div>

      {/* Pickup / Delivery toggle */}
      <div className="flex flex-col items-center gap-3 px-4 pb-9">
        <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => setFulfillmentType("pickup")}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
              !isDelivery ? "bg-[#7C0116] text-white" : "text-[#7a6469]"
            }`}
          >
            <Store size={15} /> Pickup
          </button>
          <button
            onClick={() => setFulfillmentType("delivery")}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
              isDelivery ? "bg-[#7C0116] text-white" : "text-[#7a6469]"
            }`}
          >
            <Truck size={15} /> Delivery
          </button>
        </div>

        {isDelivery && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex flex-col items-center gap-3"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 bg-white rounded-2xl px-6 py-3 shadow-sm">
              <span className="font-body font-extrabold text-[#7C0116] text-xs">
                Delivery fee: <span className="text-[#7a6469] font-bold">{DELIVERY_FEE}</span>
              </span>
              <span className="font-body font-extrabold text-[#7C0116] text-xs">
                Estimated time: <span className="text-[#7a6469] font-bold">{DELIVERY_TIME}</span>
              </span>
              <span className="font-body font-extrabold text-[#7C0116] text-xs">
                Minimum order: <span className="text-[#7a6469] font-bold">{DELIVERY_MINIMUM}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-body text-[#6b4a52] text-xs font-bold">Order delivery through:</span>
              <span className="inline-flex items-center gap-1.5 bg-[#7C0116] text-white font-body font-bold text-xs px-3 py-1.5 rounded-full">
                <Globe size={13} /> Our Website
              </span>
              <UberEatsBadge className="!text-xs !px-3 !py-1.5" />
              <DoorDashBadge className="!text-xs !px-3 !py-1.5" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Menu folders */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14 pb-24 flex flex-col gap-10">
        {loading ? (
          <BrandedLoader text="whipping up the menu..." />
        ) : Object.keys(groupedByCategory).length === 0 ? (
          <div className="text-center text-[#6b4a52] font-body font-bold py-16">
            <SearchX size={40} className="mx-auto mb-3 text-[#7C0116]/50" />
            <p>No menu items yet. Check back soon!</p>
          </div>
        ) : (
          Object.entries(groupedByCategory).map(([cat, catItems]) => (
            <MenuFolder key={cat} category={cat} items={catItems} />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

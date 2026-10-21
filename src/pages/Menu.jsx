import React from "react";
import { menuItems as items } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuFolder, { BuildYourOwnFeature } from "@/components/MenuFolder";
import { motion } from "framer-motion";
import { SearchX, Store, Truck, Globe } from "lucide-react";
import { DoorDashBadge, UberEatsBadge } from "@/components/DeliveryBadges";
import { useCart } from "@/lib/CartContext";

// Display order. Menu items use "Our Berry Best Cups" and
// "Others"; the older names are kept in case any items still use them.
// Any category not listed here is shown after these, so no item is hidden.
const CATEGORIES = [
"Specials",
"Our Berry Best Cups",
"Strawberries and Cream",
"Chocolate Covered Strawberries",
"Others",
"More to Enjoy"];

const BUILD_YOUR_OWN = "Build Your Own Cup";


export default function Menu() {
  const { fulfillmentType, setFulfillmentType } = useCart();
  const isDelivery = fulfillmentType === "delivery";

  const extraCategories = [...new Set(items.map((i) => i.category))].filter(
    (c) => c && c !== BUILD_YOUR_OWN && !CATEGORIES.includes(c)
  );
  const groupedByCategory = [...CATEGORIES, ...extraCategories].reduce((acc, cat) => {
    const catItems = items.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});
  const buildYourOwnItems = items.filter((i) => i.category === BUILD_YOUR_OWN);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDelivery ? "#F8CCE1" : "#F4B3D0" }}>
      
      <Navbar />

      {/* Page head */}
      <div className="text-center px-4 pt-10 pb-4">
        

        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bubble text-white text-3xl sm:text-4xl mb-2 drop-shadow-md">

          Choose Your Favorite, or Try Something New
        </motion.h1>
        

        
      </div>

      {/* Pickup / Delivery toggle */}
      <div className="flex flex-col items-center gap-3 px-4 pb-9">
        <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => setFulfillmentType("pickup")}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
            !isDelivery ? "bg-[#E61F3F] text-white" : "text-[#7a6469]"}`
            }>
            
            <Store size={15} /> Pickup
          </button>
          <button
            onClick={() => setFulfillmentType("delivery")}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
            isDelivery ? "bg-[#E61F3F] text-white" : "text-[#7a6469]"}`
            }>
            
            <Truck size={15} /> Delivery
          </button>
        </div>

        {isDelivery &&
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl flex flex-col items-center gap-3">
          
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-body text-[#6b4a52] text-xs font-bold">Order delivery through:</span>
              <span className="inline-flex items-center gap-1.5 bg-[#E61F3F] text-white font-body font-bold text-xs px-3 py-1.5 rounded-full">
                <Globe size={13} /> Our Website
              </span>
              <UberEatsBadge className="!text-xs !px-3 !py-1.5" />
              <DoorDashBadge className="!text-xs !px-3 !py-1.5" />
            </div>
          </motion.div>
        }
      </div>

      {/* Menu: every category in its own white section, Build Your Own last */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-24 flex flex-col gap-8 sm:gap-10">
        {Object.keys(groupedByCategory).length === 0 && buildYourOwnItems.length === 0 ?
        <div className="text-center text-[#6b4a52] font-body font-bold py-16">
            <SearchX size={40} className="mx-auto mb-3 text-[#E61F3F]/50" />
            <p>No menu items yet. Check back soon!</p>
          </div> :

        <>
            {Object.entries(groupedByCategory).map(([cat, catItems]) =>
          <MenuFolder key={cat} category={cat} items={catItems} />
          )}
            {buildYourOwnItems.map((item) =>
          <BuildYourOwnFeature key={item.id} item={item} />
          )}
          </>
        }
      </div>

      <Footer />
    </div>);

}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { TAX_RATE } from "@/lib/itemConfigs";
import { ArrowLeft, ChevronDown, ChevronUp, ShoppingBag, Store, Truck } from "lucide-react";

const inputClass = "w-full bg-white border border-[#E0A4B0] rounded-2xl px-4 py-3 font-body text-[15px] text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7C0116]/30 focus:border-[#7C0116] transition-all min-h-[48px]";

export default function Checkout() {
  const { items, subtotal, clearCart, fulfillmentType, setFulfillmentType } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({ street: "", city: "", zip: "" });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const isDelivery = fulfillmentType === "delivery";
  const canPlaceOrder = firstName && lastName && email && (!isDelivery || deliveryAddress.street);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      // NOTE: No live payment processing yet — orders are recorded for pickup only.
      // This will connect to Toast Payments once that POS integration is approved and live.
      const orderNumber = "ORD-" + Date.now().toString(36).toUpperCase();
      const customerName = `${firstName} ${lastName}`.trim();
      const order = await base44.entities.Order.create({
        customer_name: customerName,
        customer_email: email,
        customer_phone: phone,
        fulfillment_type: fulfillmentType,
        delivery_address: isDelivery ? deliveryAddress : undefined,
        items,
        subtotal,
        tax,
        total,
        reward_applied: false,
        reward_discount: 0,
        order_number: orderNumber,
      });
      clearCart();
      navigate(`/order-confirmation?order=${order.id}&number=${orderNumber}`);
    } catch {
      // silent
    }
    setPlacing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <ShoppingBag size={40} className="mx-auto mb-4 text-[#7C0116]/40" />
          <h1 className="font-body font-bold text-[#1a1a1a] text-2xl mb-3">Your cart is empty</h1>
          <button onClick={() => navigate("/menu")} className="bg-[#7C0116] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors">
            Back to Menu
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FBF1F3" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-3xl sm:text-4xl mb-1 drop-shadow-lg">
            checkout
          </motion.h1>
          <p className="text-white/80 font-body text-base">Almost there!</p>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
        {/* Collapsible Order Summary */}
        <div className="bg-white border border-[#E0A4B0] rounded-2xl mb-4 overflow-hidden shadow-sm">
          <button
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="w-full flex items-center justify-between px-5 py-4 font-body font-bold text-[#1a1a1a] text-sm min-h-[52px]"
          >
            <span>Order Summary ({items.length} item{items.length !== 1 ? "s" : ""})</span>
            <div className="flex items-center gap-2">
              <span className="text-[#7C0116] font-extrabold">${total.toFixed(2)}</span>
              {summaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>
          {summaryOpen && (
            <div className="px-5 pb-4 border-t border-[#F6E3E7]">
              {items.map((item, idx) => {
                const lineTotal = ((item.base_price || 0) + (item.extras_total || 0)) * (item.quantity || 1);
                return (
                  <div key={idx} className="py-2.5 border-b border-[#F6E3E7] last:border-0">
                    <div className="flex justify-between">
                      <span className="font-body font-semibold text-[#1a1a1a] text-sm">{item.quantity}x {item.name}</span>
                      <span className="font-body font-bold text-[#7C0116] text-sm">${lineTotal.toFixed(2)}</span>
                    </div>
                    {item.ingredients?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">
                        Comes with: {item.ingredients.filter(i => !item.removed_ingredients?.includes(i)).join(", ")}
                      </p>
                    )}
                    {item.removed_ingredients?.length > 0 && <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>}
                    {item.base_selection && <p className="text-xs text-[#6b7280] mt-0.5">Base: {item.base_selection}</p>}
                    {item.chocolate_selections?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Chocolates: {item.chocolate_selections.join(", ")}</p>}
                    {item.selected_toppings?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>}
                    {item.selected_choc_toppings?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_choc_toppings.join(", ")}</p>}
                    {item.selected_sauces?.length > 0 && <p className="text-xs text-[#6b7280] mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>}
                    {item.extras?.length > 0 && <p className="text-xs text-[#7C0116] mt-0.5">+ {item.extras.join(", ")}</p>}
                    {item.special_instructions && <p className="text-xs text-[#6b7280] mt-0.5 italic">"{item.special_instructions}"</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Fulfillment type */}
        <div className="bg-white border border-[#E0A4B0] rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">How would you like to get it?</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFulfillmentType("pickup")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm border-2 transition-colors ${
                fulfillmentType === "pickup" ? "bg-[#7C0116] border-[#7C0116] text-white" : "bg-white border-[#E0A4B0] text-[#1a1a1a] hover:bg-[#F6E3E7]"
              }`}
            >
              <Store size={16} /> Pickup
            </button>
            <button
              onClick={() => setFulfillmentType("delivery")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm border-2 transition-colors ${
                fulfillmentType === "delivery" ? "bg-[#7C0116] border-[#7C0116] text-white" : "bg-white border-[#E0A4B0] text-[#1a1a1a] hover:bg-[#F6E3E7]"
              }`}
            >
              <Truck size={16} /> Delivery
            </button>
          </div>
          {isDelivery && (
            <div className="mt-4 space-y-3">
              <input type="text" value={deliveryAddress.street} onChange={e => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })} className={inputClass} required placeholder="Street address *" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" value={deliveryAddress.city} onChange={e => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })} className={inputClass} placeholder="City" />
                <input type="text" value={deliveryAddress.zip} onChange={e => setDeliveryAddress({ ...deliveryAddress, zip: e.target.value })} className={inputClass} placeholder="ZIP code" />
              </div>
            </div>
          )}
        </div>

        {/* Customer info */}
        <div className="bg-white border border-[#E0A4B0] rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-body font-bold text-[#1a1a1a] text-base">Your Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">First Name *</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} required placeholder="First name" />
            </div>
            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Last Name *</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} required placeholder="Last name" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
            </div>
            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Email *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required placeholder="your@email.com" />
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-[#F6E3E7] space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-body text-[#6b7280] text-sm">Subtotal</span>
              <span className="font-body font-semibold text-[#1a1a1a] text-sm">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body text-[#6b7280] text-sm">Tax</span>
              <span className="font-body font-semibold text-[#1a1a1a] text-sm">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-[#F6E3E7]">
              <span className="font-body font-bold text-[#1a1a1a]">Total</span>
              <span className="font-body font-extrabold text-[#7C0116] text-xl">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={placing || !canPlaceOrder}
            className="w-full bg-[#7C0116] text-white font-body font-bold py-4 rounded-full min-h-[52px] hover:bg-[#5C0110] transition-colors disabled:opacity-50 active:scale-95 text-base"
          >
            {placing ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
          </button>

          <button onClick={() => navigate("/menu")} className="w-full text-center font-body text-sm text-[#6b7280] hover:text-[#7C0116] transition-colors flex items-center justify-center gap-1 py-1 min-h-[44px]">
            <ArrowLeft size={14} /> Back to Menu
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
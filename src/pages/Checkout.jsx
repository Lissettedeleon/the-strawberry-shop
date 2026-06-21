import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { useCart } from "@/lib/CartContext";
import { EXTRA_PRICE } from "@/lib/itemConfigs";
import { ArrowLeft } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const total = subtotal;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const orderNumber = "ORD-" + Date.now().toString(36).toUpperCase();
      const customerName = `${firstName} ${lastName}`.trim();
      const order = await base44.entities.Order.create({
        customer_name: customerName,
        customer_email: email,
        items,
        subtotal,
        total,
        reward_applied: false,
        reward_discount: 0,
        order_number: orderNumber,
      });

      clearCart();
      navigate(`/order-confirmation?order=${order.id}&number=${orderNumber}`);
    } catch {
      // handle error silently
    }
    setPlacing(false);
  };



  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <span className="text-5xl block mb-4">🛒</span>
          <h1 className="font-display text-foreground text-3xl mb-3">Your cart is empty</h1>
          <button onClick={() => navigate("/order")} className="bg-primary text-white font-body font-bold px-8 py-3 rounded-full">Back to Order</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-3xl sm:text-4xl mb-2 drop-shadow-lg">
            checkout
          </motion.h1>
          <p className="text-white/80 font-body">Almost there! 🍓</p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm space-y-5">
            {/* Order Summary */}
            <div>
              <h3 className="font-body font-bold text-lg text-foreground mb-3">Order Summary</h3>
              {items.map((item, idx) => {
                const extrasTotal = (item.extra_count || 0) * EXTRA_PRICE;
                const lineTotal = ((item.base_price || 0) + extrasTotal) * (item.quantity || 1);
                return (
                  <div key={idx} className="py-3 border-b border-border last:border-0">
                    <div className="flex justify-between">
                      <span className="font-body font-semibold text-foreground text-sm">
                        {item.quantity}x {item.name}
                        {item.chocolate_selections?.length > 0 && ` (${item.chocolate_selections.join(", ")})`}
                      </span>
                      <span className="font-body font-bold text-primary text-sm">${lineTotal.toFixed(2)}</span>
                    </div>
                    {item.removed_ingredients?.length > 0 && (
                      <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>
                    )}
                    {item.extras?.length > 0 && (
                      <p className="text-xs text-primary mt-0.5">+ {item.extras.join(", ")}</p>
                    )}
                    {item.selected_toppings?.length > 0 && (
                      <p className="text-xs text-foreground/70 mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>
                    )}
                    {item.selected_sauces?.length > 0 && (
                      <p className="text-xs text-foreground/70 mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>
                    )}
                    {item.special_instructions && (
                      <p className="text-xs text-muted-foreground mt-0.5 italic">"{item.special_instructions}"</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="font-body font-bold text-foreground">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body font-semibold text-xs text-foreground mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2.5 font-body text-sm" required placeholder="First name" />
                </div>
                <div>
                  <label className="block font-body font-semibold text-xs text-foreground mb-1">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2.5 font-body text-sm" required placeholder="Last name" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body font-semibold text-xs text-foreground mb-1">Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2.5 font-body text-sm" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="block font-body font-semibold text-xs text-foreground mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2.5 font-body text-sm" required placeholder="your@email.com" />
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-body">Subtotal</span>
                <span className="font-body font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-border">
                <span className="font-body font-bold text-foreground">Total</span>
                <span className="font-body font-extrabold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || !firstName || !lastName || !email}
              className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {placing ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
            </button>

            <button onClick={() => navigate("/order")} className="w-full text-center font-body text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Back to Menu
            </button>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
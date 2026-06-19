import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import FAQAccordion from "@/components/FAQAccordion";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import FloatingDecor from "@/components/FloatingDecor";
import { Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await base44.entities.CateringRequest.create(form);
      await base44.functions.invoke("sendContactEmail", { ...form, type: "catering" });
    } catch {





      // Entity save failed — form validation should catch this
    }setStatus("done");setForm({ name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: "" });setTimeout(() => setStatus(""), 4000);};
  const inputClass = "w-full bg-white border-2 border-border rounded-2xl px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <FloatingDecor />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            
            catering & events
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Let us make your next event unforgettable 🍓🎉
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }} className="relative overflow-hidden">
        <FloatingDecor />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="font-display text-primary/60 text-lg mb-1">🎉 parties, showers, meetings & more 🎉</p>
            <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-3">book your event</h2>
            <p className="text-muted-foreground font-body text-base max-w-lg mx-auto">
              From bridal showers to office parties — we create beautiful strawberry dessert spreads your guests will love. We'll get back to you within 24 hours with options and pricing.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px_10px_30px_10px] p-6 sm:p-8 border-2 border-border shadow-sm space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">👤 Your Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputClass} required />
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📧 Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📞 Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} />
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📅 Event Date</label>
                <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={inputClass} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📊 Guest Count / Quantity</label>
                <input type="text" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 50 guests" className={inputClass} />
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">🍓 Items Interested In</label>
                <input type="text" value={form.items_of_interest} onChange={(e) => setForm({ ...form, items_of_interest: e.target.value })} placeholder="e.g. OG cups, build-your-own" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block font-body font-semibold text-sm text-foreground mb-1.5">💬 Anything else?</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Special requests, dietary needs, theme ideas..." rows={4} className={inputClass} />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md min-h-[44px]">
              
              <Send size={16} /> {status === "sending" ? "Sending..." : "Submit Catering Request 🎉"}
            </button>
            {status === "done" &&
            <p className="text-center text-primary font-body font-semibold text-sm animate-bounce">Request submitted! We'll reply within 24 hours 🍓💕</p>
            }
          </motion.form>

          {/* Social Links */}
          <div className="mt-14 text-center">
            <p className="font-display text-primary/60 text-lg mb-1 hidden">💖 stay connected 💖</p>
            <h3 className="font-display text-foreground text-2xl mb-6 hidden">follow us</h3>
            <div className="flex justify-center gap-5 flex-wrap">
              {[
              { name: "Instagram", url: "https://www.instagram.com/thestrawberryshopp", icon: "📸" },
              { name: "TikTok", url: "https://www.tiktok.com/@thestrawberryshopp", icon: "🎵" },
              { name: "Facebook", url: "https://www.facebook.com/people/The-strawberry-shop/61579290425454/", icon: "💬" },
              { name: "Pinterest", url: "https://www.pinterest.com/strawberryshopoh/_created", icon: "📌" },
              { name: "Google", url: "https://share.google/6tW3Eo2PrVKv75sjQ", icon: "🌐" }].
              map((s) =>
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
                aria-label={s.name}>
                
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all shadow-sm border-2 border-border group-hover:border-primary/30 hidden">
                    {s.icon}
                  </div>
                  <span className="font-body font-semibold text-xs text-muted-foreground group-hover:text-primary transition-colors hidden">{s.name}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white relative overflow-hidden">
        <FloatingDecor />
        <WaveDivider from="blush" to="white" />
        





        
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>);

}
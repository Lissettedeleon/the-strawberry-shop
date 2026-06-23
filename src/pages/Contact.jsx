import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import FAQAccordion from "@/components/FAQAccordion";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import FloatingDecor from "@/components/FloatingDecor";
import { Send, CheckCircle } from "lucide-react";

const STRAWBERRY_IMAGE = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/b80cb3d55_ChatGPTImageJun21202612_20_40AM.png";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: ""
  });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await base44.entities.CateringRequest.create(form);
      await base44.functions.invoke("sendContactEmail", { ...form, type: "catering" });
      setStatus("done");
    } catch {
      setStatus("");
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
    }
  };

  const inputClass = "w-full bg-white border-2 border-border rounded-2xl px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  // Success screen
  if (status === "done") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
            <motion.img
              src={STRAWBERRY_IMAGE}
              alt="The Strawberry Shop mascot"
              className="mx-auto w-32 h-32 sm:w-40 sm:h-40 object-contain mb-4"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: [0, -16, 0, -16, 0], opacity: 1 }}
              transition={{
                y: { duration: 0.6, times: [0, 0.25, 0.5, 0.75, 1], repeat: 3, repeatDelay: 0.2 },
                opacity: { duration: 0.4 }
              }} />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.2 }}>
              
              <CheckCircle size={64} className="mx-auto text-white mb-4" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="font-display text-white text-3xl sm:text-4xl mb-2 drop-shadow-lg">
              
              request sent!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-white/80 font-body text-lg">
              
              Your catering request has been sent! We'll be in touch with you shortly. 🍓
            </motion.p>
          </div>
          <WaveDivider from="red" to="blush" />
        </section>
        <section style={{ backgroundColor: "#FFB3C6" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-sm">
              <span className="text-5xl block mb-4">🍓🎉</span>
              <p className="font-body text-foreground text-lg mb-6">
                We've received your catering request and will get back to you within 24 hours with options and pricing.
              </p>
              <Link to="/" className="inline-block bg-primary text-white font-body font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
        <WaveDivider from="blush" to="white" />
        <Footer />
      </div>);

  }

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
            {errorMsg &&
            <p className="text-center text-red-500 font-body text-sm">{errorMsg}</p>
            }
          </motion.form>

          {/* Social Links */}
          <div className="mt-14 text-center">
            





















            
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
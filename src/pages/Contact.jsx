import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Send, Calendar, MessageCircle } from "lucide-react";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("");
  const [cateringForm, setCateringForm] = useState({
    name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: "",
  });
  const [cateringStatus, setCateringStatus] = useState("");
  const [activeTab, setActiveTab] = useState("contact");

  const handleContact = async (e) => {
    e.preventDefault();
    setContactStatus("sending");
    await base44.entities.ContactMessage.create(contactForm);
    setContactStatus("done");
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactStatus(""), 4000);
  };

  const handleCatering = async (e) => {
    e.preventDefault();
    setCateringStatus("sending");
    await base44.entities.CateringRequest.create(cateringForm);
    setCateringStatus("done");
    setCateringForm({ name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: "" });
    setTimeout(() => setCateringStatus(""), 4000);
  };

  const inputClass = "w-full bg-white border-2 border-border rounded-2xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "15%", right: "10%", animationDuration: "3s" }}>💌</span>
          <span className="absolute text-3xl opacity-10 animate-bounce" style={{ bottom: "20%", left: "8%", animationDuration: "3.5s", animationDelay: "0.5s" }}>🍓</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            get in touch
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Questions, catering, or just want to say hi? We'd love to hear from you 💕
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Toggle */}
          <div className="flex gap-2 mb-10 bg-white rounded-full p-1.5 shadow-sm border-2 border-border w-fit mx-auto">
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                activeTab === "contact" ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <MessageCircle size={16} /> 💬 Message Us
            </button>
            <button
              onClick={() => setActiveTab("catering")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                activeTab === "catering" ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Calendar size={16} /> 🎉 Catering
            </button>
          </div>

          {activeTab === "contact" ? (
            <motion.form
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleContact}
              className="bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">👤 Name</label>
                  <input type="text" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📧 Email</label>
                  <input type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
                </div>
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">💬 Message</label>
                <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="What's on your mind?" rows={5} className={inputClass} required />
              </div>
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                <Send size={16} /> {contactStatus === "sending" ? "Sending..." : "Send Message 💌"}
              </button>
              {contactStatus === "done" && (
                <p className="text-center text-primary font-body font-semibold text-sm animate-bounce">Message sent! We'll get back to you soon 🍓💕</p>
              )}
            </motion.form>
          ) : (
            <motion.form
              key="catering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCatering}
              className="bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-sm space-y-5"
            >
              <p className="text-muted-foreground font-body text-sm mb-2">
                Planning a party, event, or just need a lot of strawberries? Fill this out and we'll get back to you with options. 🎉
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">👤 Name</label>
                  <input type="text" value={cateringForm.name} onChange={e => setCateringForm({ ...cateringForm, name: e.target.value })} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📧 Email</label>
                  <input type="email" value={cateringForm.email} onChange={e => setCateringForm({ ...cateringForm, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📞 Phone</label>
                  <input type="tel" value={cateringForm.phone} onChange={e => setCateringForm({ ...cateringForm, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📅 Event Date</label>
                  <input type="date" value={cateringForm.event_date} onChange={e => setCateringForm({ ...cateringForm, event_date: e.target.value })} className={inputClass} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">📊 Estimated Quantity</label>
                  <input type="text" value={cateringForm.quantity} onChange={e => setCateringForm({ ...cateringForm, quantity: e.target.value })} placeholder="e.g. 50 cups" className={inputClass} />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">🍓 Items of Interest</label>
                  <input type="text" value={cateringForm.items_of_interest} onChange={e => setCateringForm({ ...cateringForm, items_of_interest: e.target.value })} placeholder="e.g. OG cups, chocolate strawberries" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">💬 Additional Details</label>
                <textarea value={cateringForm.message} onChange={e => setCateringForm({ ...cateringForm, message: e.target.value })} placeholder="Tell us about your event..." rows={4} className={inputClass} />
              </div>
              <button
                type="submit"
                disabled={cateringStatus === "sending"}
                className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                <Send size={16} /> {cateringStatus === "sending" ? "Sending..." : "Submit Request 🎉"}
              </button>
              {cateringStatus === "done" && (
                <p className="text-center text-primary font-body font-semibold text-sm animate-bounce">Request submitted! We'll reach out soon to discuss the details 🍓💕</p>
              )}
            </motion.form>
          )}

          {/* Social Links */}
          <div className="mt-14 text-center">
            <p className="font-display text-primary/60 text-lg mb-1">💖 stay connected 💖</p>
            <h3 className="font-display text-foreground text-2xl mb-6">follow us</h3>
            <div className="flex justify-center gap-5">
              {[
                { name: "Instagram", url: "https://www.instagram.com/thestrawberryshopp", icon: "📸" },
                { name: "TikTok", url: "https://www.tiktok.com/@thestrawberryshopp", icon: "🎵" },
                { name: "Facebook", url: "https://www.facebook.com/people/The-strawberry-shop/61579290425454/", icon: "💬" },
                { name: "Pinterest", url: "https://www.pinterest.com/strawberryshopoh/_created", icon: "📌" },
                { name: "Google", url: "https://share.google/6tW3Eo2PrVKv75sjQ", icon: "🌐" },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                  aria-label={s.name}
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all shadow-sm border-2 border-border group-hover:border-primary/30">
                    {s.icon}
                  </div>
                  <span className="font-body font-semibold text-xs text-muted-foreground group-hover:text-primary transition-colors">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
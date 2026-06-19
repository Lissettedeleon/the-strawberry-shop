import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Send, Calendar, Mail, MessageCircle } from "lucide-react";

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

  const inputClass = "w-full bg-white border border-border rounded-2xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section style={{ backgroundColor: "#E8193C" }} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3"
          >
            get in touch
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Questions, catering, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Toggle */}
          <div className="flex gap-2 mb-10 bg-white rounded-full p-1.5 shadow-sm border border-border w-fit mx-auto">
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                activeTab === "contact" ? "bg-primary text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <MessageCircle size={16} /> Message Us
            </button>
            <button
              onClick={() => setActiveTab("catering")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                activeTab === "catering" ? "bg-primary text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Calendar size={16} /> Catering Request
            </button>
          </div>

          {activeTab === "contact" ? (
            <motion.form
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleContact}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Name</label>
                  <input type="text" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Email</label>
                  <input type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
                </div>
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Message</label>
                <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="What's on your mind?" rows={5} className={inputClass} required />
              </div>
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={16} /> {contactStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {contactStatus === "done" && (
                <p className="text-center text-primary font-body font-semibold text-sm">Message sent! We'll get back to you soon 🍓</p>
              )}
            </motion.form>
          ) : (
            <motion.form
              key="catering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCatering}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-5"
            >
              <p className="text-muted-foreground font-body text-sm mb-2">
                Planning a party, event, or just need a lot of strawberries? Fill this out and we'll get back to you with options.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Name</label>
                  <input type="text" value={cateringForm.name} onChange={e => setCateringForm({ ...cateringForm, name: e.target.value })} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Email</label>
                  <input type="email" value={cateringForm.email} onChange={e => setCateringForm({ ...cateringForm, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Phone</label>
                  <input type="tel" value={cateringForm.phone} onChange={e => setCateringForm({ ...cateringForm, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Event Date</label>
                  <input type="date" value={cateringForm.event_date} onChange={e => setCateringForm({ ...cateringForm, event_date: e.target.value })} className={inputClass} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Estimated Quantity</label>
                  <input type="text" value={cateringForm.quantity} onChange={e => setCateringForm({ ...cateringForm, quantity: e.target.value })} placeholder="e.g. 50 cups" className={inputClass} />
                </div>
                <div>
                  <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Items of Interest</label>
                  <input type="text" value={cateringForm.items_of_interest} onChange={e => setCateringForm({ ...cateringForm, items_of_interest: e.target.value })} placeholder="e.g. OG cups, chocolate strawberries" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-1.5">Additional Details</label>
                <textarea value={cateringForm.message} onChange={e => setCateringForm({ ...cateringForm, message: e.target.value })} placeholder="Tell us about your event..." rows={4} className={inputClass} />
              </div>
              <button
                type="submit"
                disabled={cateringStatus === "sending"}
                className="w-full bg-primary text-white font-body font-bold py-3.5 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={16} /> {cateringStatus === "sending" ? "Sending..." : "Submit Request"}
              </button>
              {cateringStatus === "done" && (
                <p className="text-center text-primary font-body font-semibold text-sm">Request submitted! We'll reach out soon to discuss the details 🍓</p>
              )}
            </motion.form>
          )}

          {/* Social Links */}
          <div className="mt-12 text-center">
            <h3 className="font-display text-foreground text-2xl mb-4">follow us</h3>
            <div className="flex justify-center gap-5">
              <a href="https://www.instagram.com/thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z"/></svg>
              </a>
              <a href="https://www.facebook.com/people/The-strawberry-shop/61579290425454/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
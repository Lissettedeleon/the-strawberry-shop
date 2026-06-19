import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { ExternalLink, MapPin, Truck } from "lucide-react";

const platforms = [
  {
    name: "🍓 Order Direct (Toast)",
    description: "Pickup only — order ahead and grab it at the shop. No extra service fees.",
    url: "https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row",
    icon: "📱",
    highlight: true,
  },
  {
    name: "🚗 Uber Eats",
    description: "Delivery available. Standard platform delivery/service fees apply.",
    url: "https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg",
    icon: "🛵",
    highlight: false,
  },
  {
    name: "🏃 DoorDash",
    description: "Delivery available. Standard platform delivery/service fees apply.",
    url: "https://www.doordash.com/store/41748513",
    icon: "📦",
    highlight: false,
  },
];

export default function Order() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "15%", left: "5%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-3xl opacity-10 animate-bounce" style={{ bottom: "20%", right: "10%", animationDuration: "3.5s", animationDelay: "0.7s" }}>🛍️</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            order online
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            Pick your platform. We'll make it fresh. 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display text-primary/60 text-lg text-center mb-8">✨ choose how you want it ✨</p>

          <div className="space-y-5">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`block rounded-[30px_10px_30px_10px] p-8 transition-all hover:shadow-lg hover:-translate-y-1 ${
                  p.highlight
                    ? "bg-primary text-white shadow-md border-2 border-primary"
                    : "bg-white text-foreground border-2 border-border shadow-sm"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-4xl">{p.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-body font-bold text-xl mb-1">{p.name}</h3>
                    <p className={`font-body text-sm ${p.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                      {p.description}
                    </p>
                  </div>
                  <ExternalLink size={20} className={p.highlight ? "text-white/60" : "text-muted-foreground"} />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-[30px_8px_30px_8px] p-6 border-2 border-border shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <h4 className="font-body font-bold text-base">📍 Pickup</h4>
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Order ahead and pick up at our shop — 7100 Foundry Row, Liberty Township. Usually ready in 15–20 minutes.
              </p>
            </div>
            <div className="bg-white rounded-[30px_8px_30px_8px] p-6 border-2 border-border shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Truck size={20} className="text-primary" />
                </div>
                <h4 className="font-body font-bold text-base">🚚 Delivery</h4>
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Available through Uber Eats and DoorDash. Delivery radius and fees vary by platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
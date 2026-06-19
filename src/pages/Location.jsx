import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

const hours = [
  { days: "Monday", time: "11:00 AM – 8:00 PM" },
  { days: "Tuesday", time: "11:00 AM – 8:00 PM" },
  { days: "Wednesday", time: "11:00 AM – 8:00 PM" },
  { days: "Thursday", time: "11:00 AM – 8:00 PM" },
  { days: "Friday", time: "11:00 AM – 8:00 PM" },
  { days: "Saturday", time: "11:00 AM – 8:00 PM" },
  { days: "Sunday", time: "12:00 PM – 6:00 PM" },
];

export default function Location() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "10%", right: "8%", animationDuration: "3s" }}>📍</span>
          <span className="absolute text-3xl opacity-10 animate-bounce" style={{ bottom: "15%", left: "10%", animationDuration: "3.5s" }}>🍓</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            find us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            We can't wait to see you! 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display text-primary/60 text-lg text-center mb-10">📍 come say hi!</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="rounded-[30px_10px_30px_10px] overflow-hidden shadow-lg border-2 border-border h-80 lg:h-auto min-h-80">
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="text-6xl block mb-3">🗺️</span>
                  <p className="font-display text-primary text-xl mb-1">7100 Foundry Row</p>
                  <p className="font-body text-muted-foreground text-sm">Liberty Township, OH 45069</p>
                  <a
                    href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-primary text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Open in Google Maps 📍
                  </a>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[30px_8px_30px_8px] p-8 border-2 border-border shadow-sm"
              >
                <h3 className="font-body font-bold text-lg text-foreground mb-3">
                  <span className="mr-2">📍</span>Address
                </h3>
                <p className="text-foreground/70 font-body text-base leading-relaxed">
                  7100 Foundry Row<br />
                  Liberty Township, OH 45069
                </p>
                <a
                  href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-primary text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Get Directions 🚗
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[30px_8px_30px_8px] p-8 border-2 border-border shadow-sm"
              >
                <h3 className="font-body font-bold text-lg text-foreground mb-3">
                  <span className="mr-2">🕐</span>Hours
                </h3>
                <div className="space-y-2">
                  {hours.map(h => (
                    <div key={h.days} className="flex justify-between font-body text-sm">
                      <span className="text-foreground/70 font-medium">{h.days}</span>
                      <span className="text-foreground font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[30px_8px_30px_8px] p-8 border-2 border-border shadow-sm"
              >
                <h3 className="font-body font-bold text-lg text-foreground mb-3">
                  <span className="mr-2">🚗</span>Parking
                </h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Free parking is available right in front of our shop at Foundry Row. The lot is spacious and easy to access.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Follow Us */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-display text-primary/60 text-lg mb-1">💖 stay connected 💖</p>
          <h2 className="font-display text-foreground text-3xl mb-8">follow us</h2>
          <div className="flex justify-center gap-6">
            {[
              { name: "Instagram", url: "https://www.instagram.com/thestrawberryshopp", icon: "📸" },
              { name: "TikTok", url: "https://www.tiktok.com/@thestrawberryshopp", icon: "🎵" },
              { name: "Facebook", url: "https://www.facebook.com/people/The-strawberry-shop/61579290425454/", icon: "💬" },
            ].map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
                aria-label={s.name}
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all shadow-sm border-2 border-border group-hover:border-primary/30">
                  {s.icon}
                </div>
                <span className="font-body font-semibold text-xs text-muted-foreground group-hover:text-primary transition-colors">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { Nut, Milk, Wheat, AlertTriangle, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import StickyMobileOrder from "@/components/StickyMobileOrder";

const allergens = [
  {
    tag: "Contains Nuts",
    icon: Nut,
    color: "bg-amber-100 text-amber-700 border-amber-200",
    emoji: "🥜",
    title: "Nuts",
    description:
      "This item contains tree nuts (almonds, pistachios, walnuts, pecans) or peanuts. Our Dubai cup, Biscoff creations, and many chocolate-dipped toppings feature nut-based ingredients like pistachio cream, almond drizzle, and chopped nuts. If you have a nut allergy, please ask our team about nut-free options — we're happy to guide you.",
  },
  {
    tag: "Contains Dairy",
    icon: Milk,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    emoji: "🥛",
    title: "Dairy",
    description:
      "This item contains milk, cream, butter, or cheese. Our signature house cream, Belgian chocolate, and whipped toppings are all dairy-based. We use real, fresh dairy because it makes everything taste better — but we can suggest dairy-free customizations if you let us know at the counter.",
  },
  {
    tag: "Gluten-Containing",
    icon: Wheat,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    emoji: "🌾",
    title: "Wheat / Gluten",
    description:
      "This item contains wheat, barley, rye, or other gluten-containing grains. Toppings like Biscoff crumbs, brownie chunks, and cookie pieces contain gluten. Many of our cups can be made gluten-free — just ask when you order and we'll swap in safe alternatives.",
  },
];

export default function Allergens() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #A31C46 0%, #7A1535 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "15%", left: "8%", animationDuration: "3.5s" }}>🥜</span>
          <span className="absolute text-3xl opacity-15 animate-bounce" style={{ bottom: "20%", right: "10%", animationDuration: "3s", animationDelay: "0.5s" }}>🥛</span>
          <span className="absolute text-2xl opacity-10 animate-pulse" style={{ top: "40%", right: "20%", animationDuration: "2s" }}>🌾</span>
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ bottom: "30%", left: "15%", animationDuration: "4s", animationDelay: "1s" }}>🍓</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-white/60 text-lg mb-2">🍓 allergen guide 🍓</p>
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl mb-4 drop-shadow-lg">
              know what's in your cup
            </h1>
            <p className="text-white/80 font-body text-lg max-w-xl mx-auto leading-relaxed">
              We tag every menu item so you can order with confidence. Here's what each tag means.
            </p>
          </motion.div>
        </div>
        <WaveDivider from="dark" to="blush" />
      </section>

      {/* Allergen Cards */}
      <section style={{ backgroundColor: "#FFB3C6" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            {allergens.map((a, i) => (
              <motion.div
                key={a.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-[28px_10px_28px_10px] p-6 sm:p-8 shadow-sm border-2 border-border flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${a.color}`}>
                  <a.icon size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-foreground text-xl">{a.emoji} {a.title}</h3>
                    <span className={`text-[11px] font-body font-bold px-2.5 py-0.5 rounded-full border ${a.color}`}>
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Disclaimer */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={28} className="text-amber-600" />
            </div>
            <h2 className="font-display text-foreground text-2xl sm:text-3xl mb-4">still have questions?</h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              We make everything in a shared kitchen, so cross-contact is always possible. If you have a severe allergy, please talk to our team before ordering — we want you to enjoy your treats safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-5 py-3 text-foreground font-body font-semibold text-sm">
                <MapPin size={16} /> 7100 Foundry Row, Liberty Township
              </div>
              <a
                href="tel:+15135551234"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-5 py-3 font-body font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <Phone size={16} /> Call the Shop
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>
  );
}
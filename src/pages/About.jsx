import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Heart, Leaf, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-15 animate-bounce" style={{ top: "15%", right: "8%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-3xl opacity-10 animate-bounce" style={{ bottom: "20%", left: "5%", animationDuration: "4s", animationDelay: "0.5s" }}>💕</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg"
          >
            about us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            A little shop with a whole lot of heart. 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }} className="relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-8 pointer-events-none">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-primary" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md aspect-[4/3] bg-white rounded-[40px_10px_40px_10px] flex items-center justify-center border-2 border-border shadow-lg">
                <div className="text-center p-8">
                  <span className="text-8xl block mb-4">🍓</span>
                  <p className="font-display text-primary text-2xl">since day one</p>
                  <p className="font-body text-muted-foreground text-sm mt-1">made fresh, made with love</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-primary/60 text-lg mb-1">🍓 our story</p>
              <h2 className="font-display text-foreground text-3xl mb-6">how it all started</h2>
              <div className="space-y-4 text-foreground/70 font-body text-base leading-relaxed">
                <p>
                  The Strawberry Shop started with a simple idea: what if we took the world's favorite fruit and gave it the spotlight it deserves? No complicated menus, no gimmicks — just ripe, beautiful strawberries paired with the best creams, chocolates, and toppings we could find.
                </p>
                <p>
                  We're a small, family-run dessert shop right here in Liberty Township, Ohio. Everything we make is fresh, made daily, and built to make you smile. Whether you're a classic cream-and-berries person or you want to go all-out with Nutella, Biscoff, and brownie bites — we've got a cup for you.
                </p>
                <p>
                  We believe dessert should be fun, fresh, and a little bit special. That's why we source the best berries, make our house cream from scratch, and put love into every single cup. Come say hi — we'd love to make your day a little sweeter. 💕
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Values */}
      <section className="bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <p className="font-display text-primary/60 text-lg text-center mb-1">💖 our vibe 💖</p>
          <h2 className="font-display text-foreground text-3xl text-center mb-12">what we're about</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="text-primary" size={28} />,
                title: "Always Fresh",
                text: "We source the ripest, juiciest strawberries and prep everything daily. No shortcuts, no compromises.",
                emoji: "🍓",
              },
              {
                icon: <Heart className="text-primary" size={28} />,
                title: "Made with Love",
                text: "Every cup is built by hand with care. We treat each order like it's for our own family.",
                emoji: "💕",
              },
              {
                icon: <Sparkles className="text-primary" size={28} />,
                title: "A Little Bit Extra",
                text: "From Belgian chocolate to house-made matcha cream — we believe in going above and beyond the ordinary.",
                emoji: "✨",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  {v.icon}
                </div>
                <h3 className="font-body font-bold text-lg mb-2 text-foreground">{v.emoji} {v.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7A0A2A 0%, #5A081E 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-3xl opacity-15 animate-pulse" style={{ top: "20%", right: "10%", animationDuration: "2s" }}>🍓</span>
          <span className="absolute text-2xl opacity-10 animate-pulse" style={{ bottom: "25%", left: "12%", animationDuration: "3s", animationDelay: "1s" }}>✨</span>
        </div>
        <WaveDivider from="white" to="dark" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <p className="font-display text-white/60 text-lg mb-1">📍 stop by & say hi!</p>
          <h2 className="font-display text-white text-3xl mb-4 drop-shadow-lg">come visit us</h2>
          <p className="text-white/75 font-body text-lg mb-8 leading-relaxed">
            We're at 7100 Foundry Row in Liberty Township. Swing by, grab a cup, and see what all the buzz is about.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/location" className="bg-white text-primary font-body font-bold px-8 py-3.5 rounded-full hover:bg-secondary transition-colors shadow-sm hover:shadow-md">
              Find Us 🗺️
            </Link>
            <Link to="/menu" className="bg-primary text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md">
              View Menu 🍓
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
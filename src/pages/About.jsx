import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SocialIconsRow, GoogleReviewButton } from "@/components/SocialButtons";
import { Heart, Leaf, Sparkles, ImageOff, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            about us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">A little shop with a whole lot of heart.</p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center">
              <div className="w-full max-w-sm aspect-[4/3] bg-white border border-[#E0A4B0] rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                {/* TODO: swap in the shop photo once provided */}
                <div className="text-center p-8">
                  <ImageOff size={56} className="mx-auto mb-4 text-[#7C0116]/40" />
                  <p className="font-display text-[#7C0116] text-2xl">since day one</p>
                  <p className="font-body text-[#6b7280] text-sm mt-1">made fresh, made with love</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-body font-semibold text-[#5C0110] text-2xl md:text-3xl mb-5">how it all started</h2>
              <div className="space-y-4 text-[#6b7280] font-body text-base leading-relaxed">
                <p>The Strawberry Shop started with a simple idea: what if we took the world's favorite fruit and gave it the spotlight it deserves? No complicated menus, no gimmicks — just ripe, beautiful strawberries paired with the best creams, chocolates, and toppings we could find.</p>
                <p>We're a small, family-run dessert shop right here in Liberty Township, Ohio. Everything we make is fresh, made daily, and built to make you smile. Whether you're a classic cream-and-berries person or you want to go all-out with Nutella, Biscoff, and brownie bites — we've got a cup for you.</p>
                <p>We believe dessert should be fun, fresh, and a little bit special. Come say hi — we'd love to make your day a little sweeter.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-12 md:py-16 border-t border-[#F6E3E7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-body font-semibold text-[#5C0110] text-2xl text-center mb-10">what we're about</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
            { icon: <Leaf className="text-[#7C0116]" size={24} />, title: "Always Fresh", text: "We source the ripest, juiciest strawberries and prep everything daily. No shortcuts, no compromises." },
            { icon: <Heart className="text-[#7C0116]" size={24} />, title: "Made with Love", text: "Every cup is built by hand with care. We treat each order like it's for our own family." },
            { icon: <Sparkles className="text-[#7C0116]" size={24} />, title: "A Little Bit Extra", text: "From Belgian chocolate to house-made matcha cream — we believe in going above and beyond." }].
            map((v, i) =>
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white border border-[#E0A4B0] rounded-2xl p-6 text-center shadow-sm hover:scale-[1.02] transition-transform">
              
                <div className="w-14 h-14 rounded-full bg-[#F6E3E7] flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-2">{v.title}</h3>
                <p className="text-[#6b7280] font-body text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Social + CTA */}
      

















      

      <Footer />
    </div>);

}

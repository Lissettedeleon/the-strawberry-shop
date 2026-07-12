import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Leaf, Sparkles, ImageOff } from "lucide-react";

const VALUES = [
  { icon: Leaf, title: "Always Fresh", text: "Every order is made with fresh strawberries and quality ingredients." },
  { icon: Heart, title: "Guest Experience", text: "We believe every visit should be welcoming, enjoyable, and memorable." },
  { icon: Sparkles, title: "Innovation & Creativity", text: "We're always creating new flavors, seasonal specials, and unique ways to enjoy our strawberries." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bubble text-white text-4xl sm:text-5xl drop-shadow-lg"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-sm aspect-[4/3] bg-white border border-[#E0A4B0] rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                {/* TODO: swap in the shop photo once provided */}
                <div className="text-center p-8">
                  <ImageOff size={56} className="mx-auto mb-4 text-[#7C0116]/40" />
                  <p className="font-display text-[#7C0116] text-2xl">since day one</p>
                  <p className="font-body text-[#6b7280] text-sm mt-1">made fresh, made with love</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 text-[#6b7280] font-body text-base leading-relaxed">
                <p>The Strawberry Shop began with a simple idea shared by two Colombian sisters: to bring one of our favorite desserts to a place where it didn't exist. Growing up, fresh strawberries and cream were a classic treat that brought family and friends together, and we wanted to share that experience with our community here in Ohio.</p>
                <p>Our goal was to create more than just a dessert shop. We wanted a place where people could treat themselves, celebrate life's moments, and enjoy something sweet without guilt. We believe dessert is meant to be enjoyed, and everyone deserves to indulge every once in a while.</p>
                <p>Every cup is made fresh to order using fresh strawberries, our house-made creams, premium chocolates, and carefully selected ingredients. We take pride in every detail, making each order with the same care and quality we'd expect ourselves.</p>
                <p>Whether you're stopping by for your favorite treat or inviting us to cater your special event, we're grateful to be part of your celebrations. Thank you for supporting our dream and allowing us to share a taste of our Colombian roots, one cup at a time.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-12 md:py-16 border-t border-[#F6E3E7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bubble text-[#5C0110] text-2xl text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#E0A4B0] rounded-2xl p-6 text-center shadow-sm hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-[#F6E3E7] flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-[#7C0116]" size={24} />
                </div>
                <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-2">{v.title}</h3>
                <p className="text-[#6b7280] font-body text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

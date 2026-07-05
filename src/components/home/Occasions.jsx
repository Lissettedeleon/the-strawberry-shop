import React from "react";
import { motion } from "framer-motion";
import { Gift, Cake, Heart, Sparkles, PartyPopper } from "lucide-react";

const OCCASIONS = [
  { icon: Gift, title: "Gifts", text: "A thoughtful sweet treat for someone special." },
  { icon: Cake, title: "Birthdays", text: "Dessert trays and strawberry boxes made for celebrations." },
  { icon: Heart, title: "Date Nights", text: "Fresh desserts made to share." },
  { icon: Sparkles, title: "Self-Care Treats", text: "A sweet pickup order just because." },
  { icon: PartyPopper, title: "Parties & Events", text: "Easy dessert options for gatherings." },
];

export default function Occasions() {
  return (
    <section className="py-14 md:py-20 bg-[#FBF1F3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
            Made for moments
          </p>
          <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">
            Perfect for Every Sweet Moment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {OCCASIONS.map((occ, i) => (
            <motion.div
              key={occ.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-[#F6E3E7] shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FBF1F3] flex items-center justify-center text-[#7C0116] mx-auto mb-3">
                <occ.icon size={24} />
              </div>
              <h3 className="font-bubble text-[#1a1a1a] text-base mb-1.5">{occ.title}</h3>
              <p className="text-[#6b7280] font-body text-sm leading-relaxed">{occ.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

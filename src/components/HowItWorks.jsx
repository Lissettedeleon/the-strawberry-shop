import React from "react";
import { motion } from "framer-motion";
import { CupIcon, ChefHatIcon, DeliveryBagIcon } from "./HomeIcons";

const STEPS = [
  { icon: CupIcon, color: "#7C0116", title: "Pick your cup", text: "Browse the menu and choose your favorite, or build your own." },
  { icon: ChefHatIcon, color: "#a3123a", title: "We make it fresh", text: "Every cup is prepped by hand the moment you order." },
  { icon: DeliveryBagIcon, color: "#5C0110", title: "Pickup or delivered", text: "Swing by the shop or have it brought right to your door." },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-bubble text-[#7C0116] text-2xl md:text-3xl mb-2">how it works</h2>
          <p className="text-[#6b7280] font-body text-sm">From cup to hand in three easy steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative inline-block mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon size={28} />
                </div>
                <span
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white font-body font-extrabold text-xs border-2 border-white"
                  style={{ backgroundColor: step.color }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="font-body font-extrabold text-[#1a1a1a] text-base mb-1.5">{step.title}</h3>
              <p className="text-[#6b7280] font-body text-sm leading-relaxed max-w-[220px] mx-auto">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

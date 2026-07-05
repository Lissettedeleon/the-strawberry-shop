import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ClipboardList, Send, Store } from "lucide-react";

const STEPS = [
  { icon: ShoppingBag, title: "Choose Your Treats", text: "Browse the menu and add your favorite strawberry desserts to your order." },
  { icon: ClipboardList, title: "Review Your Order", text: "Check your items, quantities, pickup details, and contact information." },
  { icon: Send, title: "Submit Your Order", text: "Send your order request directly through the website." },
  { icon: Store, title: "Pick Up & Enjoy", text: "Your treats are prepared for pickup based on the shop’s current process." },
];

export default function OrderingSteps() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
            How ordering works
          </p>
          <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Ordering Made Simple</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="relative inline-block mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF1F3] border border-[#F6E3E7] flex items-center justify-center text-[#7C0116]">
                  <step.icon size={26} />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#7C0116] text-white font-body font-extrabold text-xs flex items-center justify-center border-2 border-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bubble text-[#1a1a1a] text-base mb-1.5">{step.title}</h3>
              <p className="text-[#6b7280] font-body text-sm leading-relaxed max-w-[240px] mx-auto">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#7C0116] text-white font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-all active:scale-95 shadow-lg"
          >
            <ShoppingBag size={18} /> Start Your Order
          </Link>
        </div>
      </div>
    </section>
  );
}
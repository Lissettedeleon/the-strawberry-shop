import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";

const hours = [
  { days: "Monday", time: "11:00 AM – 8:00 PM" },
  { days: "Tuesday", time: "11:00 AM – 8:00 PM" },
  { days: "Wednesday", time: "11:00 AM – 8:00 PM" },
  { days: "Thursday", time: "11:00 AM – 8:00 PM" },
  { days: "Friday", time: "11:00 AM – 8:00 PM" },
  { days: "Saturday", time: "11:00 AM – 8:00 PM" },
  { days: "Sunday", time: "12:00 PM – 6:00 PM" },
];

const holidayHours = [
  { label: "Easter (April 5)", time: "Closed" },
  { label: "Independence Day (July 4)", time: "11:00 AM – 6:00 PM" },
  { label: "Labor Day (September 7)", time: "11:00 AM – 6:00 PM" },
  { label: "Thanksgiving (November 26)", time: "Closed" },
];

export default function Hours() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            hours
          </motion.h1>
          <p className="text-white/80 font-body text-lg">When to find us.</p>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E0A4B0] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="flex items-center gap-2 font-body font-bold text-[#1a1a1a] text-base mb-3"><Clock size={16} className="text-[#7C0116]" /> Regular Hours</h3>
            <div className="space-y-2">
              {hours.map(h => (
                <div key={h.days} className="flex justify-between font-body text-sm">
                  <span className="text-[#6b7280]">{h.days}</span>
                  <span className="text-[#1a1a1a] font-semibold">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F6E3E7]">
              <p className="font-body font-bold text-[#1a1a1a] text-sm mb-2">Holiday Hours</p>
              <div className="space-y-2">
                {holidayHours.map(h => (
                  <div key={h.label} className="flex justify-between font-body text-sm">
                    <span className="text-[#6b7280]">{h.label}</span>
                    <span className={`font-semibold ${h.time === "Closed" ? "text-[#7C0116]" : "text-[#1a1a1a]"}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

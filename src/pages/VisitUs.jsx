import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Navigation, Clock } from "lucide-react";
import { WEEKLY_HOURS, HOLIDAY_HOURS, formatRange } from "@/lib/hours";

const orderedWeek = [1, 2, 3, 4, 5, 6, 0].map(day => WEEKLY_HOURS.find(h => h.day === day));

const DIRECTIONS_URL = "https://maps.apple.com/?daddr=7100+Foundry+Row,+Liberty+Township,+OH+45069";

export default function VisitUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl drop-shadow-lg"
          >
            Liberty township, Ohio
          </motion.h1>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Location picture + directions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl overflow-hidden border border-[#E0A4B0] h-72 shadow-sm bg-white flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={48} className="mx-auto mb-3 text-[#7C0116]" />
                <p className="font-body font-bold text-[#5C0110] text-xl mb-1">7100 Foundry Row</p>
                <p className="font-body text-[#6b7280] text-sm">Liberty Township, OH 45069</p>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#7C0116] text-white font-body font-bold text-sm px-6 py-3 rounded-full min-h-[44px] hover:bg-[#5C0110] transition-colors"
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#E0A4B0] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="flex items-center gap-2 font-body font-bold text-[#1a1a1a] text-base mb-3">
              <Clock size={16} className="text-[#7C0116]" /> Hours
            </h3>
            <div className="space-y-2">
              {orderedWeek.map(h => (
                <div key={h.label} className="flex justify-between font-body text-sm">
                  <span className="text-[#6b7280]">{h.label}</span>
                  <span className="text-[#1a1a1a] font-semibold">{formatRange(h)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#E0A4B0] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">Special hours</h3>
            <div className="space-y-2">
              {HOLIDAY_HOURS.map(h => {
                const time = formatRange(h);
                return (
                  <div key={h.label} className="flex justify-between font-body text-sm">
                    <span className="text-[#6b7280]">{h.label}</span>
                    <span className={`font-semibold ${time === "Closed" ? "text-[#7C0116]" : "text-[#1a1a1a]"}`}>{time}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

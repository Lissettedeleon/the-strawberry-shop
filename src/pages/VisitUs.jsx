import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Navigation, Clock } from "lucide-react";
import { WEEKLY_HOURS, getUpcomingHolidays, formatRange } from "@/lib/hours";

const orderedWeek = [1, 2, 3, 4, 5, 6, 0].map(day => WEEKLY_HOURS.find(h => h.day === day));

// Collapse back-to-back days with the same hours into one row,
// e.g. "Monday – Saturday".
const weekRows = orderedWeek.reduce((rows, h) => {
  const last = rows[rows.length - 1];
  if (last && last.open === h.open && last.close === h.close) {
    last.to = h.label;
  } else {
    rows.push({ from: h.label, to: h.label, open: h.open, close: h.close });
  }
  return rows;
}, []);

const DIRECTIONS_URL = "https://maps.apple.com/?daddr=7100+Foundry+Row,+Liberty+Township,+OH+45069";

export default function VisitUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "#FDEEF5" }} className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Location picture + directions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl overflow-hidden border border-[#F4B3D0] shadow-lg">
              <img
                src="/images/shop-location.jpg"
                alt="The Strawberry Shop kiosk at Liberty Center, 7100 Foundry Row"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center mt-5">
              <p className="flex items-center justify-center gap-1.5 font-body font-bold text-[#C4112F] text-xl mb-1">
                <MapPin size={20} className="text-[#E61F3F]" /> 7100 Foundry Row
              </p>
              <p className="font-body text-[#6b7280] text-sm">Liberty Township, OH 45069</p>
            </div>
            <div className="flex justify-center mt-5">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E61F3F] text-white font-body font-bold text-sm px-6 py-3 rounded-full min-h-[44px] hover:bg-[#C4112F] transition-colors"
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
            className="bg-white border border-[#F4B3D0] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="flex items-center gap-2 font-body font-bold text-[#1a1a1a] text-base mb-3">
              <Clock size={16} className="text-[#E61F3F]" /> Hours
            </h3>
            <div className="space-y-2">
              {weekRows.map(h => (
                <div key={h.from} className="flex justify-between gap-3 font-body text-sm">
                  <span className="text-[#6b7280]">{h.from === h.to ? h.from : `${h.from} – ${h.to}`}</span>
                  <span className="text-[#1a1a1a] font-semibold whitespace-nowrap shrink-0">{formatRange(h)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#F8CCE1] my-5" />
            <h4 className="font-body font-bold text-[#1a1a1a] text-sm mb-3">Holiday hours</h4>
            <div className="space-y-2">
              {getUpcomingHolidays().map(h => {
                const time = formatRange(h);
                return (
                  <div key={h.label} className="flex justify-between gap-3 font-body text-sm">
                    <span className="text-[#6b7280]">{h.label}</span>
                    <span className={`font-semibold whitespace-nowrap shrink-0 ${time === "Closed" ? "text-[#E61F3F]" : "text-[#1a1a1a]"}`}>{time}</span>
                  </div>
                );
              })}
            </div>
            <p className="font-body text-xs text-[#6b7280] mt-4">Holiday hours are subject to change.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

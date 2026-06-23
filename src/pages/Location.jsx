import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleReviewButton } from "@/components/SocialButtons";

const hours = [
  { days: "Monday", time: "11:00 AM – 8:00 PM" },
  { days: "Tuesday", time: "11:00 AM – 8:00 PM" },
  { days: "Wednesday", time: "11:00 AM – 8:00 PM" },
  { days: "Thursday", time: "11:00 AM – 8:00 PM" },
  { days: "Friday", time: "11:00 AM – 8:00 PM" },
  { days: "Saturday", time: "11:00 AM – 8:00 PM" },
  { days: "Sunday", time: "12:00 PM – 6:00 PM" },
];

export default function Location() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #e8233a 0%, #c41230 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            find us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">We can't wait to see you! 🍓</p>
        </div>
      </section>

      <section style={{ background: "#fff8f9" }} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#f5b8c0] h-72 lg:h-auto min-h-72 shadow-sm bg-white flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl block mb-3">🗺️</span>
                <p className="font-body font-bold text-[#c41230] text-xl mb-1">7100 Foundry Row</p>
                <p className="font-body text-[#6b7280] text-sm mb-4">Liberty Township, OH 45069</p>
                <a
                  href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#e8233a] text-white font-body font-bold text-sm px-6 py-3 rounded-full min-h-[44px] hover:bg-[#c41230] transition-colors"
                >
                  Open in Google Maps 📍
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#f5b8c0] rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">📍 Address</h3>
                <p className="text-[#6b7280] font-body text-base leading-relaxed">
                  7100 Foundry Row<br />Liberty Township, OH 45069
                </p>
                <a
                  href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-[#e8233a] text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#c41230] transition-colors"
                >
                  Get Directions 🚗
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white border border-[#f5b8c0] rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">🕐 Hours</h3>
                <div className="space-y-2">
                  {hours.map(h => (
                    <div key={h.days} className="flex justify-between font-body text-sm">
                      <span className="text-[#6b7280]">{h.days}</span>
                      <span className="text-[#1a1a1a] font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex justify-center">
                <GoogleReviewButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
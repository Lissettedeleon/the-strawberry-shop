import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleReviewButton } from "@/components/SocialButtons";
import { MapPin, Navigation, Clock, ChevronRight } from "lucide-react";

export default function Location() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            find us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">We can't wait to see you!</p>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#E0A4B0] h-72 lg:h-auto min-h-72 shadow-sm bg-white flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={48} className="mx-auto mb-3 text-[#7C0116]" />
                <p className="font-body font-bold text-[#5C0110] text-xl mb-1">7100 Foundry Row</p>
                <p className="font-body text-[#6b7280] text-sm mb-4">Liberty Township, OH 45069</p>
                <a
                  href="https://maps.apple.com/?daddr=7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#7C0116] text-white font-body font-bold text-sm px-6 py-3 rounded-full min-h-[44px] hover:bg-[#5C0110] transition-colors"
                >
                  Open in Apple Maps
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#E0A4B0] rounded-2xl p-6 shadow-sm"
              >
                <h3 className="flex items-center gap-2 font-body font-bold text-[#1a1a1a] text-base mb-3"><MapPin size={16} className="text-[#7C0116]" /> Address</h3>
                <p className="text-[#6b7280] font-body text-base leading-relaxed">
                  7100 Foundry Row<br />Liberty Township, OH 45069
                </p>
                <a
                  href="https://maps.apple.com/?daddr=7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 bg-[#7C0116] text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#5C0110] transition-colors"
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/hours"
                  className="flex items-center justify-between bg-white border border-[#E0A4B0] rounded-2xl p-6 shadow-sm hover:bg-[#F6E3E7] transition-colors"
                >
                  <span className="flex items-center gap-2 font-body font-bold text-[#1a1a1a] text-base"><Clock size={16} className="text-[#7C0116]" /> See Our Hours</span>
                  <ChevronRight size={18} className="text-[#7C0116]" />
                </Link>
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
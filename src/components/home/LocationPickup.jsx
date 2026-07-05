import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, ShoppingBag, ArrowRight } from "lucide-react";
import { computeStatus, getTodayHours } from "@/lib/hours";

const ADDRESS = "7100 Foundry Row, Liberty Township, OH 45069";
const MAPS_URL = "https://maps.apple.com/?address=7100+Foundry+Row,+Liberty+Township,+OH";

export default function LocationPickup() {
  const [status, setStatus] = useState(computeStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 md:py-20 bg-[#FBF1F3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
            Visit us
          </p>
          <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Location &amp; Pickup</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] border border-[#F6E3E7] shadow-sm overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Info */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FBF1F3] flex items-center justify-center text-[#7C0116] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bubble text-[#1a1a1a] text-base mb-0.5">Our Shop</h3>
                  <p className="text-[#6b7280] font-body text-sm">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FBF1F3] flex items-center justify-center text-[#7C0116] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bubble text-[#1a1a1a] text-base mb-0.5">Hours Today</h3>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-[#7C0116]"}`} />
                    <span className="font-body font-semibold text-sm text-[#1a1a1a]">
                      {status.isOpen ? "Open now" : `Closed${status.opensAt ? ` · Opens ${status.opensAt}` : ""}`}
                    </span>
                  </div>
                  <p className="text-[#6b7280] font-body text-sm">{getTodayHours()}</p>
                  <Link to="/hours" className="inline-flex items-center gap-1 text-[#7C0116] font-body font-bold text-xs mt-1 hover:text-[#5C0110]">
                    Full hours <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FBF1F3] flex items-center justify-center text-[#7C0116] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bubble text-[#1a1a1a] text-base mb-0.5">Catering</h3>
                  <p className="text-[#6b7280] font-body text-sm">strawberryshopoh@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#7C0116] border-2 border-[#E0A4B0] font-body font-bold text-sm px-5 py-3 rounded-full min-h-[48px] hover:bg-[#FBF1F3] transition-colors active:scale-95"
                >
                  <Navigation size={16} /> Get Directions
                </a>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-sm px-5 py-3 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors active:scale-95"
                >
                  <ShoppingBag size={16} /> Order Now
                </Link>
              </div>
            </div>

            {/* Map visual */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative min-h-[220px] md:min-h-full bg-[#E8D5C4] group"
              aria-label="Open directions in Maps"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #E0A4B0 0%, #E8D5C4 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-3 text-[#7C0116]">
                    <MapPin size={28} />
                  </div>
                  <p className="font-bubble text-[#5C0110] text-sm">7100 Foundry Row</p>
                  <p className="font-body text-[#5C0110]/70 text-xs">Liberty Township, OH</p>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-3 py-1.5 text-[#7C0116] font-body font-bold text-xs flex items-center gap-1 shadow-sm">
                <Navigation size={12} /> Open Map
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
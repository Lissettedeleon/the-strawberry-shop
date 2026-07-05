import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, ArrowRight } from "lucide-react";
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
    <section className="py-10 md:py-14" style={{ backgroundColor: "#F7E3E8" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div
          className="bg-white rounded-[20px_20px_26px_26px] p-5 sm:p-8"
          style={{
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl mb-5">
                location &amp; pickup
              </h2>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#F7E3E8] flex items-center justify-center text-[#7C0116] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-body font-extrabold text-[13.5px] text-[#2c2325]">Our Shop</p>
                  <p className="text-[11.5px] text-[#7a6469] font-bold">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#F7E3E8] flex items-center justify-center text-[#7C0116] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-[#7C0116]"}`} />
                    <p className="font-body font-extrabold text-[13.5px] text-[#2c2325]">
                      {status.isOpen ? "Open now" : `Closed${status.opensAt ? ` · Opens ${status.opensAt}` : ""}`}
                    </p>
                  </div>
                  <p className="text-[11.5px] text-[#7a6469] font-bold">{getTodayHours()}</p>
                  <Link to="/hours" className="inline-flex items-center gap-1 text-[#7C0116] font-body font-bold text-xs mt-0.5">
                    Full hours <ArrowRight size={11} />
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#F7E3E8] flex items-center justify-center text-[#7C0116] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-body font-extrabold text-[13.5px] text-[#2c2325]">Catering</p>
                  <p className="text-[11.5px] text-[#7a6469] font-bold">strawberryshopoh@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#F7E3E8] text-[#7C0116] font-body font-extrabold text-sm px-5 py-2.5 rounded-full min-h-[44px] hover:opacity-90 transition-opacity"
                >
                  <Navigation size={15} /> Get Directions
                </a>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-extrabold text-sm px-5 py-2.5 rounded-full min-h-[44px] hover:bg-[#5C0110] transition-colors"
                >
                  Menu
                </Link>
              </div>
            </motion.div>

            {/* Map visual */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative min-h-[200px] rounded-2xl overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #E0A4B0 0%, #F7E3E8 100%)" }}
              aria-label="Open directions in Maps"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-2 text-[#7C0116]">
                    <MapPin size={26} />
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
        </div>
      </div>
    </section>
  );
}
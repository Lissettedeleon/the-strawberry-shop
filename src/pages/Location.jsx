import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { MapPin, Clock, Car, Phone } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <section style={{ backgroundColor: "#E8193C" }} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3"
          >
            find us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            We can't wait to see you!
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border h-80 lg:h-auto min-h-80">
              <iframe
                title="The Strawberry Shop location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.123!2d-84.3847!3d39.3439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDIwJzM4LjAiTiA4NMKwMjMnMDQuOSJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border border-border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <h3 className="font-body font-bold text-lg text-foreground">Address</h3>
                </div>
                <p className="text-foreground/70 font-body text-base">
                  7100 Foundry Row<br />
                  Liberty Township, OH 45069
                </p>
                <a
                  href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-primary text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Get Directions
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 border border-border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <h3 className="font-body font-bold text-lg text-foreground">Hours</h3>
                </div>
                <div className="space-y-2">
                  {hours.map(h => (
                    <div key={h.days} className="flex justify-between font-body text-sm">
                      <span className="text-foreground/70 font-medium">{h.days}</span>
                      <span className="text-foreground font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Car size={18} className="text-primary" />
                  </div>
                  <h3 className="font-body font-bold text-lg text-foreground">Parking</h3>
                </div>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Free parking is available right in front of our shop at Foundry Row. The lot is spacious and easy to access.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
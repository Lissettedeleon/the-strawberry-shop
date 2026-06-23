import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import FloatingDecor from "@/components/FloatingDecor";

const hours = [
{ days: "Monday", time: "11:00 AM – 8:00 PM" },
{ days: "Tuesday", time: "11:00 AM – 8:00 PM" },
{ days: "Wednesday", time: "11:00 AM – 8:00 PM" },
{ days: "Thursday", time: "11:00 AM – 8:00 PM" },
{ days: "Friday", time: "11:00 AM – 8:00 PM" },
{ days: "Saturday", time: "11:00 AM – 8:00 PM" },
{ days: "Sunday", time: "12:00 PM – 6:00 PM" }];


export default function Location() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <FloatingDecor />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">
            
            find us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            We can't wait to see you! 🍓
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display text-primary/60 text-lg text-center mb-10">📍 come say hi!</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="rounded-[30px_10px_30px_10px] overflow-hidden shadow-lg border-2 border-border h-80 lg:h-auto min-h-80">
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="text-6xl block mb-3">🗺️</span>
                  <p className="font-display text-primary text-xl mb-1">7100 Foundry Row</p>
                  <p className="font-body text-muted-foreground text-sm">Liberty Township, OH 45069</p>
                  <a
                    href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-primary text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors">
                    
                    Open in Google Maps 📍
                  </a>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[30px_8px_30px_8px] p-8 border-2 border-border shadow-sm">
                
                <h3 className="font-body font-bold text-lg text-foreground mb-3">
                  <span className="mr-2">📍</span>Address
                </h3>
                <p className="text-foreground/70 font-body text-base leading-relaxed">
                  7100 Foundry Row<br />
                  Liberty Township, OH 45069
                </p>
                <a
                  href="https://www.google.com/maps/dir//7100+Foundry+Row,+Liberty+Township,+OH+45069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-primary text-white font-body font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm">
                  
                  Get Directions 🚗
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[30px_8px_30px_8px] p-8 border-2 border-border shadow-sm">
                
                <h3 className="font-body font-bold text-lg text-foreground mb-3">
                  <span className="mr-2">🕐</span>Hours
                </h3>
                <div className="space-y-2">
                  {hours.map((h) =>
                  <div key={h.days} className="flex justify-between font-body text-sm">
                      <span className="text-foreground/70 font-medium">{h.days}</span>
                      <span className="text-foreground font-semibold">{h.time}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              











              
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Follow Us */}
      <section className="bg-white">
        

























        
      </section>

      <Footer />
    </div>);

}
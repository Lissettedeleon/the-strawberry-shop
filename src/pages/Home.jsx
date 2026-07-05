import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoursStrip from "@/components/HoursStrip";
import WaveDivider from "@/components/WaveDivider";
import Hero from "@/components/home/Hero";
import OrderingSteps from "@/components/home/OrderingSteps";
import LocalTrust from "@/components/home/LocalTrust";
import SocialFeed from "@/components/SocialFeed";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navbar />

      <Hero />
      <HoursStrip />
      <OrderingSteps />
      <LocalTrust />

      <WaveDivider from="white" to="#FBF1F3" />

      {/* Social Feed */}
      <section className="py-14 md:py-20" style={{ background: "linear-gradient(180deg, #FBF1F3 0%, #F6E3E7 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
              Follow along
            </p>
            <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Find Us on Social</h2>
          </motion.div>
          <SocialFeed />
        </div>
      </section>

      <WaveDivider from="#F6E3E7" to="red" />

      <FinalCTA />

      <Footer />
    </div>
  );
}

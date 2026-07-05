import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoursStrip from "@/components/HoursStrip";
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

      {/* Social Feed */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#FBF1F3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
              Follow along
            </p>
            <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl">Find Us on Social</h2>
          </div>
          <SocialFeed />
        </div>
      </section>

      <FinalCTA />

      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">frequently asked questions</h1>
          <p className="text-white/80 font-body text-lg">Everything you need to know before you visit.</p>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </section>

      <Footer />
    </div>
  );
}
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import ProductPreview from "@/components/home/ProductPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navbar />

      <Hero />
      <ProductPreview />
      <FinalCTA />

      <Footer />
    </div>
  );
}

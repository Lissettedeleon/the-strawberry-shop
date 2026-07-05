import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoursStrip from "@/components/HoursStrip";
import Hero from "@/components/home/Hero";
import ProductPreview from "@/components/home/ProductPreview";
import ProductVideo from "@/components/home/ProductVideo";
import OrderingSteps from "@/components/home/OrderingSteps";
import Occasions from "@/components/home/Occasions";
import LocalTrust from "@/components/home/LocalTrust";
import LocationPickup from "@/components/home/LocationPickup";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navbar />

      <Hero />
      <HoursStrip />
      <ProductPreview />
      <ProductVideo />
      <OrderingSteps />
      <Occasions />
      <LocalTrust />
      <LocationPickup />
      <FinalCTA />

      <Footer />
    </div>
  );
}
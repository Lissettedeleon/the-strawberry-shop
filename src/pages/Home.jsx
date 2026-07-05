import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import Hero from "@/components/home/Hero";
import FrontVideo from "@/components/home/FrontVideo";
import FreshFavorites from "@/components/home/FreshFavorites";
import SocialSection from "@/components/home/SocialSection";
import LocalPreview from "@/components/home/LocalPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen pb-16 md:pb-0" style={{ backgroundColor: "#F7E3E8" }}>
      <Navbar />

      <Hero />
      <WaveDivider from="blush" to="cream" />
      <FrontVideo />
      <WaveDivider from="cream" to="blush" />
      <FreshFavorites />
      <WaveDivider from="blush" to="cream" />
      <SocialSection />
      <WaveDivider from="cream" to="blush" />
      <LocalPreview />
      <FinalCTA />

      <Footer />
    </div>
  );
}
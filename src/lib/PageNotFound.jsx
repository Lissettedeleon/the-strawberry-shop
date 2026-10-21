import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PageNotFound() {
  return (
    <div className="min-h-screen" style={{ background: "#FDEEF5" }}>
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <p className="font-bubble text-[#F4B3D0] text-7xl mb-3">404</p>
        <h1 className="font-bubble text-[#E61F3F] text-3xl mb-3">Page not found</h1>
        <p className="font-body text-[#6b4a52] mb-8">This page doesn't exist, but there's plenty of sweetness on the menu.</p>
        <Link to="/menu" className="inline-block bg-[#E61F3F] text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-[#C4112F] transition-colors">
          See the Menu
        </Link>
      </div>
      <Footer />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { InstagramButton, TikTokButton, GoogleReviewButton } from "./SocialButtons";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Order", to: "/order" },
  { label: "About", to: "/about" },
  { label: "Location", to: "/location" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#fde8ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-display text-[#e8233a] text-xl font-medium">🍓 the strawberry shop</span>
            <p className="mt-2 text-[#6b7280] text-[13px] font-body">7100 Foundry Row · Liberty Township, OH</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-[#6b7280] hover:text-[#e8233a] font-body text-[13px] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="text-[#6b7280] text-[13px] font-body italic">Fresh strawberries, made your way.</p>
          </div>
        </div>

        {/* Social + Google review */}
        <div className="mt-8 pt-6 border-t border-[#fde8ea] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <InstagramButton />
            <TikTokButton />
          </div>
          <GoogleReviewButton />
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#6b7280] font-body">
            © {new Date().getFullYear()} The Strawberry Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
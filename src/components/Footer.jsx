import React from "react";
import { Link } from "react-router-dom";
import { SocialIconsRow, GoogleReviewButton } from "./SocialButtons";
import Logo from "./Logo";

const navLinks = [
{ label: "Home", to: "/" },
{ label: "Menu", to: "/menu" },
{ label: "About", to: "/about" },
{ label: "Location", to: "/location" },
{ label: "Hours", to: "/hours" },
{ label: "Catering", to: "/contact" },
{ label: "Gift Cards", to: "/gift-cards" },
{ label: "FAQ", to: "/faq" }];


export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[#F6E3E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-display text-[#7C0116] text-xl font-medium">the strawberry shop</span>
            </Link>
            <p className="mt-2 text-[#6b7280] text-[13px] font-body">7100 Foundry Row · Liberty Township, OH</p>
            <p className="mt-1 text-[#6b7280] text-[13px] font-body">Mon–Sat 11am–8pm · Sun 12pm–6pm</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) =>
            <Link key={link.to} to={link.to} className="text-[#6b7280] hover:text-[#7C0116] font-body text-[13px] transition-colors">
                {link.label}
              </Link>
            )}
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="text-[#6b7280] text-[13px] font-body italic">Fresh strawberries, made your way.</p>
          </div>
        </div>

        {/* Social + Google review */}
        <div className="mt-8 pt-6 border-t border-[#F6E3E7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex justify-center sm:justify-start">
            <SocialIconsRow />
          </div>
          <GoogleReviewButton />
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#6b7280] font-body">
            © {new Date().getFullYear()} The Strawberry Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}
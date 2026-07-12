import React from "react";
import { Link } from "react-router-dom";
import { SocialIconsRow } from "./SocialButtons";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Catering", to: "/catering" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "About Us", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Visit Us", to: "/visit-us" },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[#F6E3E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-[#6b7280] hover:text-[#7C0116] font-body text-[13px] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <SocialIconsRow />

          {/* Logo + name + slogan */}
          <div>
            <Link to="/" className="flex items-center justify-center gap-2">
              <Logo size="sm" />
              <span className="font-display text-[#7C0116] text-xl font-medium">the strawberry shop</span>
            </Link>
            <p className="mt-2 text-[#6b7280] text-[13px] font-body italic">Made Fresh. Just for You</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F6E3E7] text-center">
          <p className="text-[11px] text-[#6b7280] font-body">
            © {new Date().getFullYear()} The Strawberry Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

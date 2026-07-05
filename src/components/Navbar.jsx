import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import { SocialIconsRow } from "./SocialButtons";
import { useCart } from "@/lib/CartContext";
import { base44 } from "@/api/base44Client";

const DEFAULT_ANNOUNCEMENT =
  "Fresh strawberry desserts, chocolate-covered treats, and pickup orders available in Liberty Township.";

function CartButton({ className = "", iconSize = 20 }) {
  const { itemCount, setCartOpen } = useCart();
  return (
    <button
      onClick={() => setCartOpen(true)}
      className={`relative p-2 text-[#1a1a1a] flex items-center justify-center transition-colors hover:text-[#7C0116] ${className}`}
      aria-label="Cart"
    >
      <ShoppingBag size={iconSize} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[#7C0116] text-white text-[10px] font-body font-bold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}

const navLinks = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Location", to: "/location" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const location = useLocation();
  const { setOrderChoiceOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    base44.entities.Announcement.filter({ is_active: true }, "-created_date", 1)
      .then((res) => { if (res.length > 0) setAnnouncement(res[0]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const announcementText = announcement?.message || DEFAULT_ANNOUNCEMENT;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#7C0116] text-white text-center py-2 px-4 text-xs sm:text-sm font-body font-semibold">
        {announcementText}
        {announcement?.link_url && announcement?.link_text && (
          <a
            href={announcement.link_url}
            className="underline ml-2 font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {announcement.link_text}
          </a>
        )}
      </div>

      {/* Top utility bar */}
      <div className="bg-[#FBF1F3] border-b border-[#F6E3E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
          <div className="hidden sm:flex items-center gap-3">
            <p className="text-[#5C0110] text-xs font-body font-semibold">7100 Foundry Row, Liberty Township, OH</p>
            <OpenClosedBadge />
          </div>
          <SocialIconsRow compact className="gap-3 mx-auto sm:mx-0" />
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : "border-b border-[#F6E3E7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo size="sm" />
              <span className="font-display text-[#7C0116] text-base hidden sm:block">
                the strawberry shop
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body font-semibold text-sm transition-colors ${
                    location.pathname === link.to
                      ? "text-[#7C0116]"
                      : "text-[#6b7280] hover:text-[#7C0116]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <CartButton />
              <button
                onClick={() => setOrderChoiceOpen(true)}
                className="flex items-center gap-2 bg-[#7C0116] text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#5C0110] transition-colors min-h-[40px] active:scale-95"
              >
                <ShoppingBag size={16} /> Order Now
              </button>
            </div>

            {/* Mobile: open badge + cart + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <OpenClosedBadge />
              <CartButton />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-[#1a1a1a] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/30 z-[40] md:hidden"
                style={{ top: 64 }}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-16 right-0 bottom-0 w-72 bg-white z-[50] shadow-2xl md:hidden"
              >
                <div className="px-6 py-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-4 py-3.5 rounded-xl font-body font-semibold text-lg transition-colors min-h-[52px] ${
                        location.pathname === link.to
                          ? "bg-[#F6E3E7] text-[#7C0116]"
                          : "text-[#1a1a1a] hover:bg-[#F6E3E7]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3">
                    <button
                      onClick={() => { setMobileOpen(false); setOrderChoiceOpen(true); }}
                      className="w-full flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-lg py-4 rounded-full min-h-[52px] active:scale-95"
                    >
                      <ShoppingBag size={18} /> Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

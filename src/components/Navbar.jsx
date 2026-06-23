import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import OrderModal from "./OrderModal";
import { base44 } from "@/api/base44Client";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Order", to: "/order" },
  { label: "About", to: "/about" },
  { label: "Location", to: "/location" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    base44.entities.Announcement.filter({ is_active: true }, "-created_date", 1)
      .then(res => { if (res.length > 0) setAnnouncement(res[0]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {announcement && (
        <div className="bg-[#e8233a] text-white text-center py-2 px-4 text-sm font-body font-semibold">
          {announcement.message}
          {announcement.link_url && announcement.link_text && (
            <a href={announcement.link_url} className="underline ml-2 font-bold" target="_blank" rel="noopener noreferrer">
              {announcement.link_text}
            </a>
          )}
        </div>
      )}

      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "border-b border-[#fde8ea]"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo size="sm" />
              <span className="font-display text-[#e8233a] text-base hidden sm:block">the strawberry shop</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body font-semibold text-sm transition-colors ${
                    location.pathname === link.to ? "text-[#e8233a]" : "text-[#6b7280] hover:text-[#e8233a]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setOrderModalOpen(true)}
                className="bg-[#e8233a] text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#c41230] transition-colors min-h-[40px] active:scale-95"
              >
                Order Now
              </button>
            </div>

            {/* Mobile: open badge + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <OpenClosedBadge />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-[#1a1a1a] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
                  {navLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-4 py-3.5 rounded-xl font-body font-semibold text-lg transition-colors min-h-[52px] ${
                        location.pathname === link.to
                          ? "bg-[#fde8ea] text-[#e8233a]"
                          : "text-[#1a1a1a] hover:bg-[#fde8ea]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3">
                    <button
                      onClick={() => { setMobileOpen(false); setOrderModalOpen(true); }}
                      className="w-full bg-[#e8233a] text-white font-body font-bold text-lg py-4 rounded-full min-h-[52px] active:scale-95"
                    >
                      Order Now 🍓
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <OrderModal open={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </>
  );
}
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import { base44 } from "@/api/base44Client";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Order", to: "/order" },
  { label: "About", to: "/about" },
  { label: "Location", to: "/location" },
  { label: "Catering", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

function OrderModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/40 z-[90]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-[30px_10px_30px_10px] p-8 border-2 border-border shadow-2xl z-[100]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">🍓</span>
              <h2 className="font-display text-primary text-2xl mb-1">order now</h2>
              <p className="text-muted-foreground font-body text-sm">Choose how you'd like to order</p>
            </div>
            <div className="space-y-3">
              <Link
                to="/order"
                onClick={onClose}
                className="flex items-center gap-4 bg-primary text-white font-body font-bold px-5 py-4 rounded-2xl hover:bg-primary/90 transition-colors shadow-md"
              >
                <span className="text-2xl">🏪</span>
                <div className="flex-1 text-left">
                  <span className="block text-base">Order Online for Pickup</span>
                  <span className="block text-xs text-white/70 font-medium">Customize & place your order</span>
                </div>
              </Link>
              <a
                href="https://www.doordash.com/store/41748513"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 bg-[#E8193C] text-white font-body font-bold px-5 py-4 rounded-2xl hover:bg-[#C41230] transition-colors"
              >
                <span className="text-2xl">🏃</span>
                <div className="flex-1 text-left">
                  <span className="block text-base">Order on DoorDash</span>
                  <span className="block text-xs text-white/70 font-medium">Delivery available</span>
                </div>
                <ExternalLink size={16} />
              </a>
              <a
                href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 bg-foreground text-white font-body font-bold px-5 py-4 rounded-2xl hover:bg-foreground/90 transition-colors"
              >
                <span className="text-2xl">🛵</span>
                <div className="flex-1 text-left">
                  <span className="block text-base">Order on Uber Eats</span>
                  <span className="block text-xs text-white/60 font-medium">Delivery available</span>
                </div>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

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

  const handleOrderClick = (e) => {
    e.preventDefault();
    setOrderModalOpen(true);
  };

  return (
    <>
      {announcement && (
        <div className="bg-accent text-accent-foreground text-center py-2.5 px-4 text-sm font-body font-semibold tracking-wide">
          {announcement.message}
          {announcement.link_url && announcement.link_text && (
            <a href={announcement.link_url} className="underline ml-2 font-bold" target="_blank" rel="noopener noreferrer">
              {announcement.link_text}
            </a>
          )}
        </div>
      )}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <Logo size="md" />
              <span className="font-display text-primary text-lg hidden sm:block">the strawberry shop</span>
              <OpenClosedBadge className="hidden lg:inline-flex" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body font-semibold text-sm tracking-wide transition-colors hover:text-primary ${
                    location.pathname === link.to ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleOrderClick}
                className="bg-primary text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                Order Now
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl font-body font-semibold text-base transition-colors ${
                    location.pathname === link.to
                      ? "bg-secondary text-primary"
                      : "text-foreground/70 hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); setOrderModalOpen(true); }}
                className="block w-full text-center bg-primary text-white font-body font-bold text-base px-5 py-3 rounded-full mt-3"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <OrderModal open={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </>
  );
}
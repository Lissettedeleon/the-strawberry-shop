import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
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
              <a
                href="https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                Order Now
              </a>
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
              <a
                href="https://order.toasttab.com/online/the-strawberry-shop-7100-foundry-row"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-primary text-white font-body font-bold text-base px-5 py-3 rounded-full mt-3"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
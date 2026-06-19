import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { base44 } from "@/api/base44Client";
import { MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("sending");
    await base44.entities.NewsletterSignup.create({ email });
    setSubStatus("done");
    setEmail("");
    setTimeout(() => setSubStatus(""), 3000);
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size="md" />
              <span className="font-display text-white text-lg">the strawberry shop</span>
            </div>
            <p className="text-white/60 font-body text-sm leading-relaxed">
              Fresh strawberry desserts made with love in Liberty Township, Ohio. Because life is sweeter with strawberries.
            </p>
          </div>

          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-widest mb-4 text-white/80">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Menu", to: "/menu" },
                { label: "Order Online", to: "/order" },
                { label: "About Us", to: "/about" },
                { label: "Location", to: "/location" },
                { label: "Contact", to: "/contact" },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-white/60 hover:text-white transition-colors font-body text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-widest mb-4 text-white/80">Visit Us</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>7100 Foundry Row<br />Liberty Township, OH 45069</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>Mon–Sat: 11am – 8pm<br />Sun: 12pm – 6pm</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-widest mb-4 text-white/80">Stay Sweet</h4>
            <p className="text-white/60 text-sm mb-3 font-body">Get promos and new flavors delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                disabled={subStatus === "sending"}
                className="bg-primary text-white font-body font-bold text-sm px-4 py-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {subStatus === "sending" ? "..." : "Join"}
              </button>
            </form>
            {subStatus === "done" && (
              <p className="text-primary text-xs mt-2 font-body">You're in! Sweet news coming soon 🍓</p>
            )}
            <div className="flex gap-4 mt-5">
              <a href="https://www.instagram.com/thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z"/></svg>
              </a>
              <a href="https://www.facebook.com/people/The-strawberry-shop/61579290425454/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-xs font-body">
            © {new Date().getFullYear()} The Strawberry Shop. All rights reserved. Made with 🍓 in Liberty Township, Ohio.
          </p>
        </div>
      </div>
    </footer>
  );
}
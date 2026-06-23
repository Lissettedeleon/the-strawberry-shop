import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuItemCard from "@/components/MenuItemCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import SocialFeed from "@/components/SocialFeed";
import OrderModal from "@/components/OrderModal";
import { GoogleReviewButton } from "@/components/SocialButtons";
import { ArrowRight, Star } from "lucide-react";

const PERKS = [
{ emoji: "🌿", title: "Fresh Daily", sub: "Made every morning, never frozen" },
{ emoji: "⚡", title: "Pickup Ready", sub: "Order online, skip the line" },
{ emoji: "🎨", title: "Made to Order", sub: "Customize every cup your way" }];


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_featured: true }, "sort_order", 6).
    then(setFeatured).
    catch(() => {}).
    finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #e8233a 0%, #c41230 100%)" }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-20 animate-bounce" style={{ top: "10%", left: "5%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-3xl opacity-15 animate-bounce" style={{ top: "20%", right: "8%", animationDuration: "4s", animationDelay: "0.5s" }}>🍫</span>
          <span className="absolute text-2xl opacity-15 animate-bounce" style={{ bottom: "20%", left: "15%", animationDuration: "3.5s", animationDelay: "1s" }}>✨</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-block", animation: "heroLogoBounce 1.5s ease-in-out infinite", marginBottom: "8px" }}>
              <span className="text-5xl">🍓</span>
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 drop-shadow-lg">
              Life is sweeter with strawberries.
            </h1>
            <p className="text-white/85 font-body text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
              Fresh strawberry cups, chocolate-covered berries &amp; creative desserts — made fresh daily with a whole lot of love 🍓
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setOrderModalOpen(true)}
                className="bg-white text-[#e8233a] font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#fde8ea] transition-colors active:scale-95 shadow-lg">
                
                Order for Pickup 🍓
              </button>
              <Link
                to="/menu"
                className="bg-transparent text-white border-2 border-white/60 font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-white/10 transition-colors active:scale-95">
                
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-7xl mx-auto bg-[hsl(var(--background))]">
        <div className="text-center mb-8">
          <h2 className="font-body font-semibold text-[#c41230] text-2xl md:text-3xl mb-1">fan favorites</h2>
          <p className="text-[#6b7280] font-body text-sm">The ones everyone keeps coming back for</p>
        </div>

        {loading ?
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3].map((i) =>
          <div key={i} className="shrink-0 w-64 h-64 rounded-2xl bg-[#fde8ea] animate-pulse" />
          )}
          </div> :
        featured.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 3).map((item) => <MenuItemCard key={item.id} item={item} />)}
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
          { name: "The OG", price: 8.75, description: "Fresh strawberries layered with our signature house cream." },
          { name: "Build Your Own Cup", price: 12.50, description: "Your cup, your rules. Pick any base and toppings." },
          { name: "Half & Half", price: 11.50, description: "Two Belgian chocolates on a single strawberry." }].
          map((item, i) => <MenuItemCard key={i} item={item} />)}
          </div>
        }

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 border-[1.5px] border-[#e8233a] text-[#e8233a] font-body font-bold text-sm px-7 py-3 rounded-full min-h-[44px] hover:bg-[#fde8ea] transition-colors">
            
            See Full Menu <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3 perks */}
      











      

      {/* Reviews */}
      <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[hsl(var(--background))]">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#c41230] text-2xl md:text-3xl mb-3">what people are saying</h2>
            <div className="inline-flex items-center gap-3 bg-[#fff8f9] border border-[#f5b8c0] rounded-full px-5 py-2.5 mb-4">
              <span className="font-body font-bold text-[#e8233a] text-2xl">5.0</span>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#6b7280] font-body text-xs">12 reviews on Google</p>
              </div>
            </div>
          </div>
          <ReviewCarousel />
          <div className="text-center mt-8">
            <GoogleReviewButton />
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section style={{ background: "#fff8f9" }} className="py-12 md:py-16 border-t border-[#fde8ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#c41230] text-2xl md:text-3xl">find us on social</h2>
          </div>
          <SocialFeed />
        </div>
      </section>

      {/* Order CTA */}
      <section style={{ background: "linear-gradient(135deg, #c41230 0%, #a31c46 100%)" }} className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-white text-3xl sm:text-4xl mb-3 drop-shadow-lg">craving something sweet?</h2>
          <p className="text-white/75 font-body text-base mb-8">Order online for pickup or get it delivered through DoorDash &amp; Uber Eats.</p>
          <button
            onClick={() => setOrderModalOpen(true)}
            className="bg-white text-[#e8233a] font-body font-bold text-base px-10 py-4 rounded-full min-h-[52px] hover:bg-[#fde8ea] transition-colors active:scale-95 shadow-lg">
            
            Order Now 🍓
          </button>
        </div>
      </section>

      <Footer />
      <OrderModal open={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </div>);

}
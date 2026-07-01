import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuItemCard from "@/components/MenuItemCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import SocialFeed from "@/components/SocialFeed";
import PowderAccent from "@/components/PowderAccent";
import { GoogleReviewButton } from "@/components/SocialButtons";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <PowderAccent />
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-block", animation: "heroLogoBounce 1.5s ease-in-out infinite", marginBottom: "16px" }}>
              <img
                src="https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/79980b498_strawberry_shop_logo_white_outline_medium.png"
                alt="The Strawberry Shop"
                className="w-52 h-52 rounded-full object-contain"
              />
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 drop-shadow-lg">
              Life is sweeter with strawberries.
            </h1>
            <p className="text-white/85 font-body text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
              Fresh strawberry cups, chocolate-covered berries &amp; creative desserts — made fresh daily with a whole lot of love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 bg-white text-[#7C0116] font-body font-bold text-base px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#F6E3E7] transition-colors active:scale-95 shadow-lg">
                <ShoppingBag size={18} /> Order Online
              </Link>
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
      <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#5C0110] text-2xl md:text-3xl mb-1">fan favorites</h2>
            <p className="text-[#6b7280] font-body text-sm">The ones everyone keeps coming back for</p>
          </div>

          {loading ?
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3].map((i) =>
            <div key={i} className="shrink-0 w-64 h-64 rounded-2xl bg-[#F6E3E7] animate-pulse" />
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
              className="inline-flex items-center gap-2 border-[1.5px] border-[#7C0116] text-[#7C0116] font-body font-bold text-sm px-7 py-3 rounded-full min-h-[44px] hover:bg-[#F6E3E7] transition-colors">

              See Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 perks */}
      











      

      {/* Reviews */}
      <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#5C0110] text-2xl md:text-3xl mb-3">what people are saying</h2>
            <div className="inline-flex items-center gap-3 bg-[#FBF1F3] border border-[#E0A4B0] rounded-full px-5 py-2.5 mb-4">
              <span className="font-body font-bold text-[#7C0116] text-2xl">5.0</span>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#6b7280] font-body text-xs">12 reviews on Google</p>
              </div>
            </div>
            <div className="mt-3">
              <a
                href="https://g.page/r/CdQvXvbxNOAaEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-[#E0A4B0] rounded-full px-4 py-2 text-sm font-body font-semibold text-[#1a1a1a] hover:bg-[#F6E3E7] transition-colors shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Leave us a Google Review
              </a>
            </div>
          </div>
          <ReviewCarousel />
          <div className="text-center mt-8">
            <GoogleReviewButton />
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16 border-t border-[#F6E3E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#5C0110] text-2xl md:text-3xl">find us on social</h2>
          </div>
          <SocialFeed />
        </div>
      </section>

      {/* Order CTA */}
      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-white text-3xl sm:text-4xl mb-3 drop-shadow-lg">craving something sweet?</h2>
          <p className="text-white/75 font-body text-base mb-8">Order online for pickup or delivery, right through our website.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white text-[#7C0116] font-body font-bold text-base px-10 py-4 rounded-full min-h-[52px] hover:bg-[#F6E3E7] transition-colors active:scale-95 shadow-lg">
            <ShoppingBag size={18} /> Order Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>);

}
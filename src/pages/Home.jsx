import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import OrderButtons from "@/components/OrderButtons";
import MenuItemCard from "@/components/MenuItemCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import SocialFeed from "@/components/SocialFeed";
import StickyMobileOrder from "@/components/StickyMobileOrder";
import BrandedLoader from "@/components/BrandedLoader";
import { Star, ArrowRight } from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_featured: true }, "sort_order", 6)
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        {/* Floating strawberries */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-4xl opacity-20 animate-bounce" style={{ top: "10%", left: "5%", animationDuration: "3s" }}>🍓</span>
          <span className="absolute text-3xl opacity-15 animate-bounce" style={{ top: "20%", right: "10%", animationDuration: "4s", animationDelay: "0.5s" }}>🍫</span>
          <span className="absolute text-2xl opacity-20 animate-bounce" style={{ bottom: "15%", left: "15%", animationDuration: "3.5s", animationDelay: "1s" }}>✨</span>
          <span className="absolute text-3xl opacity-15 animate-bounce" style={{ top: "60%", right: "5%", animationDuration: "2.5s", animationDelay: "0.3s" }}>🍓</span>
          <span className="absolute text-5xl opacity-10 animate-pulse" style={{ bottom: "10%", right: "25%", animationDuration: "2s" }}>💕</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-4 md:pb-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <span className="animate-wiggle inline-block">🍓</span>
                <span className="text-white/90 font-body font-semibold text-sm">fresh & locally loved</span>
                <span className="animate-wiggle inline-block" style={{ animationDelay: "0.3s" }}>🍓</span>
              </div>
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 drop-shadow-lg">
                Life is sweeter with strawberries.
              </h1>
              <p className="text-white/85 font-body text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                Fresh strawberry cups, chocolate-covered berries, and creative desserts — made fresh daily with a whole lot of love 🍓
              </p>
              <OrderButtons size="md" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md aspect-square flex items-center justify-center">
                <img
                  src="https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/e4f84c221_image.png"
                  alt="The Strawberry Shop logo"
                  className="w-4/5 h-4/5 object-contain drop-shadow-2xl animate-bounce"
                  style={{ animationDuration: "2.5s" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Featured Items */}
      <section style={{ backgroundColor: "#FFB3C6" }} className="pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="font-display text-primary/60 text-lg mb-1">✨ our picks ✨</p>
            <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-3">fan favorites</h2>
            <p className="text-muted-foreground font-body text-lg">The ones everyone keeps coming back for 🍓</p>
          </div>
          {loading ? (
            <BrandedLoader text="whipping up the menu..." />
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "The OG", price: 8.75, description: "Fresh strawberries layered with our signature house cream. Classic, clean, and oh so good." },
                { name: "Build Your Own Cup", price: 12.50, description: "Your cup, your rules. Start with your favorite base, pick toppings, and finish it off." },
                { name: "Half & Half", price: 11.50, description: "Two Belgian chocolates of your choice on a single strawberry." },
              ].map((item, i) => (
                <MenuItemCard key={i} item={item} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-white text-primary font-body font-bold text-base px-8 py-3.5 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              See Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* About Teaser */}
      <section className="bg-white relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md aspect-[4/3] bg-secondary rounded-[40px_10px_40px_10px] flex items-center justify-center border-2 border-border shadow-inner overflow-hidden">
                <div className="text-center p-8">
                  <span className="text-7xl block mb-3">🍓</span>
                  <p className="font-display text-primary text-xl">made with love</p>
                  <p className="font-body text-muted-foreground text-sm mt-1">every single day</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-primary/60 text-lg mb-1">hey there! 👋</p>
              <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-4">our story</h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">
                We're a small, local dessert shop dedicated to one thing: making fresh strawberries the star of every bite. From our signature house cream to hand-dipped Belgian chocolate, everything we make is crafted with love and meant to put a smile on your face.
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Stop by, grab a cup, and taste what happens when fresh berries meet a whole lot of heart. 💕
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-body font-bold hover:underline"
              >
                Read more about us <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ backgroundColor: "#FFB3C6" }} className="relative">
        <WaveDivider from="white" to="blush" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="font-display text-primary/60 text-lg mb-1">💖 the love is real 💖</p>
            <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-4">what people are saying</h2>
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-sm border border-border">
              <span className="font-display text-primary text-3xl">4.9</span>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground font-body text-xs">average rating ⭐</p>
              </div>
            </div>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      {/* Social Feed */}
      <section className="bg-white">
        <WaveDivider from="blush" to="white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="font-display text-primary/60 text-lg mb-1">📱 come hang with us 📱</p>
            <h2 className="font-display text-foreground text-3xl sm:text-4xl">find us on social</h2>
          </div>
          <SocialFeed />
        </div>
      </section>

      {/* Order CTA */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7A0A2A 0%, #5A081E 100%)" }}>
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-3xl opacity-15 animate-pulse" style={{ top: "10%", left: "10%", animationDuration: "2s" }}>🍫</span>
          <span className="absolute text-4xl opacity-15 animate-pulse" style={{ bottom: "20%", right: "8%", animationDuration: "2.5s", animationDelay: "0.5s" }}>🍓</span>
          <span className="absolute text-2xl opacity-10 animate-bounce" style={{ top: "50%", left: "5%", animationDuration: "3s" }}>✨</span>
        </div>
        <WaveDivider from="blush" to="dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-display text-white/60 text-lg mb-1">🍓 get yours today 🍓</p>
              <h2 className="font-display text-white text-3xl sm:text-4xl mb-4 drop-shadow-lg">craving something sweet?</h2>
              <p className="text-white/75 font-body text-lg mb-8 leading-relaxed">
                Order online for pickup at the shop. Delivery available through Uber Eats & DoorDash.
              </p>
              <OrderButtons size="md" />
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/10 backdrop-blur-sm rounded-[50px_16px_50px_16px] flex items-center justify-center border-2 border-white/10 shadow-2xl">
                <div className="text-center">
                  <span className="text-7xl block mb-3 drop-shadow-lg animate-bounce" style={{ animationDuration: "2.5s" }}>🍓</span>
                  <p className="text-white/80 font-display text-xl">treat yourself</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileOrder />
    </div>
  );
}
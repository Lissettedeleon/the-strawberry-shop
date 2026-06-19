import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import OrderButtons from "@/components/OrderButtons";
import MenuItemCard from "@/components/MenuItemCard";
import { Star, ArrowRight } from "lucide-react";

const HERO_IMG = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/c563e3fcc_generated_2280f49c.png";
const ABOUT_IMG = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/0f70d52c5_generated_23dfb0c1.png";
const CTA_IMG = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/ff75a50b8_generated_549e5b01.png";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_featured: true }, "sort_order", 6)
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#E8193C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-4">
                Life is sweeter with strawberries.
              </h1>
              <p className="text-white/80 font-body text-lg md:text-xl mb-8 max-w-lg">
                Fresh strawberry cups, chocolate-covered berries, and creative desserts — made fresh daily in Liberty Township, Ohio.
              </p>
              <OrderButtons size="md" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={HERO_IMG}
                alt="Fresh strawberry cup overflowing with cream and strawberries"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      {/* Featured Items */}
      <section style={{ backgroundColor: "#FFF0F3" }} className="pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-3">fan favorites</h2>
            <p className="text-muted-foreground font-body text-lg">The ones everyone keeps coming back for.</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
            </div>
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
                { name: "Half & Half", price: 11.50, description: "Can't choose just one? Two Belgian chocolates of your choice on a single strawberry." },
              ].map((item, i) => (
                <MenuItemCard key={i} item={item} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-white text-primary font-body font-bold text-base px-8 py-3.5 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all"
            >
              See Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* About Teaser */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.img
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={ABOUT_IMG}
              alt="Fresh strawberries and cream spread on a pink surface"
              className="w-full rounded-3xl shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-4">our story</h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">
                We're a small, local dessert shop dedicated to one thing: making fresh strawberries the star of every bite. From our signature house cream to hand-dipped Belgian chocolate, everything we make is crafted with love and meant to put a smile on your face.
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Stop by, grab a cup, and taste what happens when fresh berries meet a whole lot of heart.
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
      <section style={{ backgroundColor: "#FFF0F3" }}>
        <WaveDivider from="white" to="blush" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-foreground text-3xl sm:text-4xl mb-3">what people are saying</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground font-body">4.9 stars on DoorDash</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Best strawberry dessert I've ever had! The OG cup is perfection — simple but you can taste the quality.", author: "Sarah M." },
              { text: "The Dubai cup is worth every penny. The pistachio cream with chocolate drizzle is INSANE. Already ordered twice this week.", author: "Marcus T." },
              { text: "Finally a dessert spot that delivers on the hype! Fresh berries, real cream, and the Biscoff cup is addictive.", author: "Priya K." },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-border"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="text-muted-foreground font-body text-xs font-bold">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#7A0A2A" }}>
        <WaveDivider from="blush" to="dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-white text-3xl sm:text-4xl mb-4">craving something sweet?</h2>
              <p className="text-white/70 font-body text-lg mb-8">
                Order online for pickup or delivery. Your strawberry moment is just a few taps away.
              </p>
              <OrderButtons size="md" />
            </div>
            <div className="flex justify-center">
              <img
                src={CTA_IMG}
                alt="Chocolate drizzled over fresh strawberries in a cup"
                className="w-full max-w-sm rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
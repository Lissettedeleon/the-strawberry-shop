import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Heart, Leaf, Sparkles } from "lucide-react";

const ABOUT_IMG = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/0f70d52c5_generated_23dfb0c1.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section style={{ backgroundColor: "#E8193C" }} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-white text-4xl sm:text-5xl mb-3"
          >
            about us
          </motion.h1>
          <p className="text-white/80 font-body text-lg">
            A little shop with a whole lot of heart.
          </p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFF0F3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.img
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={ABOUT_IMG}
              alt="Fresh strawberries artfully arranged on a pink surface with cream"
              className="w-full rounded-3xl shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-foreground text-3xl mb-6">our story</h2>
              <div className="space-y-4 text-foreground/70 font-body text-base leading-relaxed">
                <p>
                  The Strawberry Shop started with a simple idea: what if we took the world's favorite fruit and gave it the spotlight it deserves? No complicated menus, no gimmicks — just ripe, beautiful strawberries paired with the best creams, chocolates, and toppings we could find.
                </p>
                <p>
                  We're a small, family-run dessert shop right here in Liberty Township, Ohio. Everything we make is fresh, made daily, and built to make you smile. Whether you're a classic cream-and-berries person or you want to go all-out with Nutella, Biscoff, and brownie bites — we've got a cup for you.
                </p>
                <p>
                  We believe dessert should be fun, fresh, and a little bit special. That's why we source the best berries, make our house cream from scratch, and put love into every single cup. Come say hi — we'd love to make your day a little sweeter.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />

      {/* Values */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="font-display text-foreground text-3xl text-center mb-12">what we're about</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="text-primary" size={28} />,
                title: "Always Fresh",
                text: "We source the ripest, juiciest strawberries and prep everything daily. No shortcuts, no compromises.",
              },
              {
                icon: <Heart className="text-primary" size={28} />,
                title: "Made with Love",
                text: "Every cup is built by hand with care. We treat each order like it's for our own family.",
              },
              {
                icon: <Sparkles className="text-primary" size={28} />,
                title: "A Little Bit Extra",
                text: "From Belgian chocolate to house-made matcha cream — we believe in going above and beyond the ordinary.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-body font-bold text-lg mb-2 text-foreground">{v.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#7A0A2A" }}>
        <WaveDivider from="white" to="dark" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-white text-3xl mb-4">come visit us</h2>
          <p className="text-white/70 font-body text-lg mb-8">
            We're at 7100 Foundry Row in Liberty Township. Swing by, grab a cup, and see what all the buzz is about.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/location" className="bg-white text-primary font-body font-bold px-8 py-3.5 rounded-full hover:bg-secondary transition-colors">
              Find Us
            </Link>
            <Link to="/menu" className="bg-primary text-white font-body font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
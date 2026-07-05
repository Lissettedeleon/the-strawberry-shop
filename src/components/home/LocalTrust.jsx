import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Sparkles, BadgeCheck } from "lucide-react";
import ReviewCarousel from "@/components/ReviewCarousel";
import PhotoGallery from "@/components/PhotoGallery";
import { GoogleReviewButton } from "@/components/SocialButtons";

export default function LocalTrust() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
              Locally made
            </p>
            <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl mb-4 leading-tight">
              Fresh Treats in Liberty Township
            </h2>
            <p className="text-[#5C0110]/80 font-body text-base md:text-lg leading-relaxed mb-6">
              The Strawberry Shop creates fresh, handcrafted strawberry desserts made for everyday
              cravings, thoughtful gifts, celebrations, and special moments.
            </p>
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Local pickup at 7100 Foundry Row, Liberty Township, OH" },
                { icon: Sparkles, text: "Made fresh daily with quality strawberries" },
                { icon: BadgeCheck, text: "Handcrafted with care, every single order" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FBF1F3] flex items-center justify-center text-[#7C0116] shrink-0">
                    <item.icon size={18} />
                  </div>
                  <p className="font-body text-[#1a1a1a] text-sm md:text-base pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <GoogleReviewButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-3xl bg-[#FBF1F3] border border-[#F6E3E7] p-6 md:p-8">
              <PhotoGallery />
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="rounded-[36px] bg-[#F7E3E8] px-4 sm:px-8 py-10 md:py-12">
          <div className="text-center mb-6">
            <h3 className="font-bubble text-[#7C0116] text-2xl md:text-3xl">What people are saying</h3>
          </div>
          <ReviewCarousel />
        </div>
      </div>
    </section>
  );
}

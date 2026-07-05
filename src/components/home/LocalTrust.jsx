import React from "react";
import { motion } from "framer-motion";
import ReviewCarousel from "@/components/ReviewCarousel";
import { GoogleReviewButton } from "@/components/SocialButtons";

export default function LocalTrust() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[36px] bg-[#F7E3E8] px-4 sm:px-8 py-10 md:py-12"
        >
          <div className="text-center mb-6">
            <h3 className="font-bubble text-[#7C0116] text-2xl md:text-3xl">What people are saying</h3>
          </div>
          <ReviewCarousel />
          <div className="flex justify-center mt-8">
            <GoogleReviewButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

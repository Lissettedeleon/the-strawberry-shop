import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewCarousel from "@/components/ReviewCarousel";
import { SocialIconsRow, GoogleReviewButton } from "@/components/SocialButtons";


export default function Reviews() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bubble text-white text-4xl sm:text-5xl drop-shadow-lg">
            
            Reviews
          </motion.h1>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Customer photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[280px] sm:max-w-xs mx-auto rounded-2xl overflow-hidden border border-[#E0A4B0] shadow-lg mb-10 aspect-[4/5]">

            <img
              src="https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/1325aa9bf_IMG_0916.jpeg"
              alt="Customer holding a Strawberry Shop dessert cup"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[36px] bg-[#F7E3E8] px-4 sm:px-8 py-10 md:py-12 mb-10">

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

      <Footer />
    </div>);

}
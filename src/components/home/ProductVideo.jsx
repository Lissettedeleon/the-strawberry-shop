import React from "react";
import { motion } from "framer-motion";

const PRODUCT_IMAGE =
  "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/3bdcbd663_generated_image.png";

export default function ProductVideo() {
  return (
    <section className="py-14 md:py-20 bg-[#FBF1F3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body font-semibold text-[#7C0116] text-xs uppercase tracking-[0.18em] mb-2">
              Crafted with care
            </p>
            <h2 className="font-bubble text-[#7C0116] text-3xl md:text-4xl mb-4 leading-tight">
              Freshly Made, Beautifully Served
            </h2>
            <p className="text-[#5C0110]/80 font-body text-base md:text-lg leading-relaxed mb-6">
              From fresh strawberry cups to chocolate-covered favorites, every treat is prepared
              with care and made to feel special.
            </p>
            <ul className="space-y-3">
              {[
                "Fresh strawberries, prepped by hand",
                "Rich chocolate, dipped to order",
                "Beautifully packaged for pickup",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7C0116] shrink-0" />
                  <span className="font-body text-[#1a1a1a] text-sm md:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] bg-[#F6E3E7]">
              <img
                src={PRODUCT_IMAGE}
                alt="Fresh strawberry dessert cups with toppings from The Strawberry Shop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
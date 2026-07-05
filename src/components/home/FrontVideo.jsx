import React from "react";
import { motion } from "framer-motion";
import TikTokEmbed from "@/components/TikTokEmbed";

// Front homepage video — TikTok embed autoplays muted inline.
const FRONT_VIDEO_ID = "7613835095157296398";
const FRONT_VIDEO_URL = "https://www.tiktok.com/@thestrawberryshopp/video/7613835095157296398";

export default function FrontVideo() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "#FFF6F2" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div
          className="bg-white rounded-[20px_20px_26px_26px] p-5 sm:p-8"
          style={{
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
          }}
        >
          <div className="text-center mb-6">
            <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl mb-2">
              freshly made, beautifully served
            </h2>
            <p className="text-[#7a6469] font-body font-medium text-sm sm:text-base max-w-xl mx-auto">
              Take a look at the fresh strawberry treats and handcrafted favorites made for
              everyday cravings, gifts, and celebrations.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-[340px] rounded-[20px_20px_26px_26px] overflow-hidden border border-[#F7E3E8] flex justify-center"
            style={{
              boxShadow:
                "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
            }}
          >
            <TikTokEmbed videoId={FRONT_VIDEO_ID} citeUrl={FRONT_VIDEO_URL} title="Fresh strawberry treats" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
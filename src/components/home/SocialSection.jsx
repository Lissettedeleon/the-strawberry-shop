import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Music2, ArrowUpRight } from "lucide-react";
import TikTokEmbed from "@/components/TikTokEmbed";

const INSTAGRAM_URL = "https://www.instagram.com/thestrawberryshopp";
const TIKTOK_PROFILE = "https://www.tiktok.com/@thestrawberryshopp";
const FACEBOOK_URL = "https://www.facebook.com/people/The-strawberry-shop/61579290425454/";

const TIKTOK_VIDEOS = [
  { id: "7616177536048893197", url: "https://www.tiktok.com/@thestrawberryshopp/video/7616177536048893197" },
  { id: "7649445152708185358", url: "https://www.tiktok.com/@thestrawberryshopp/video/7649445152708185358" },
];

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad-s2" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-s2)" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1a1a1a">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

export default function SocialSection() {
  const [tab, setTab] = useState("instagram");

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "#FFF6F2" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div className="text-center mb-7">
          <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl mb-2">follow the strawberry shop</h2>
          <p className="text-[#7a6469] font-body font-medium text-sm max-w-md mx-auto">
            Fresh strawberry creations, seasonal treats, and sweet updates.
          </p>
        </div>

        {/* Sliding tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-[#F7E3E8]">
            <button
              onClick={() => setTab("instagram")}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
                tab === "instagram" ? "bg-[#7C0116] text-white" : "text-[#7a6469]"
              }`}
            >
              <Instagram size={15} /> Instagram
            </button>
            <button
              onClick={() => setTab("tiktok")}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-body font-extrabold text-sm transition-all ${
                tab === "tiktok" ? "bg-[#1a1a1a] text-white" : "text-[#7a6469]"
              }`}
            >
              <Music2 size={15} /> TikTok
            </button>
          </div>
        </div>

        {/* Sliding content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {tab === "instagram" ? (
              <motion.div
                key="ig"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block max-w-md mx-auto bg-white rounded-[24px_24px_30px_30px] overflow-hidden border border-[#F7E3E8] group"
                  style={{ boxShadow: "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)" }}
                >
                  <div
                    className="aspect-[4/5] flex flex-col items-center justify-center text-center p-6"
                    style={{ background: "linear-gradient(150deg, #F7E3E8 0%, #E0A4B0 100%)" }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                      <InstagramIcon />
                    </div>
                    <p className="font-bubble text-[#7C0116] text-xl">@thestrawberryshopp</p>
                    <p className="text-[#5C0110]/70 font-body text-xs mt-1">Follow for fresh creations &amp; behind-the-scenes</p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 py-3 text-[#7C0116] font-body font-extrabold text-sm">
                    Open Instagram <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="tt"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {TIKTOK_VIDEOS.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-2xl overflow-hidden border border-[#F7E3E8] flex justify-center bg-white"
                      style={{ boxShadow: "0 14px 30px -18px rgba(44,35,37,0.22), 0 2px 6px rgba(44,35,37,0.05)" }}
                    >
                      <TikTokEmbed videoId={v.id} citeUrl={v.url} />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-5">
                  <a
                    href={TIKTOK_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-body font-extrabold text-sm px-6 py-2.5 rounded-full min-h-[44px] hover:opacity-85 transition-opacity"
                  >
                    <TikTokIcon /> Follow @thestrawberryshopp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Icon links */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors" style={{ borderWidth: "0.5px" }}>
            <InstagramIcon />
          </a>
          <a href={TIKTOK_PROFILE} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors" style={{ borderWidth: "0.5px" }}>
            <TikTokIcon />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors" style={{ borderWidth: "0.5px" }}>
            <FacebookIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
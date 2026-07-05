import React from "react";
import { motion } from "framer-motion";
import TikTokEmbed from "@/components/TikTokEmbed";

const TIKTOK_VIDEOS = [
  { id: "7616177536048893197", url: "https://www.tiktok.com/@thestrawberryshopp/video/7616177536048893197" },
  { id: "7649445152708185358", url: "https://www.tiktok.com/@thestrawberryshopp/video/7649445152708185358" },
];

const INSTAGRAM_URL = "https://www.instagram.com/thestrawberryshopp";
const TIKTOK_PROFILE = "https://www.tiktok.com/@thestrawberryshopp";
const FACEBOOK_URL = "https://www.facebook.com/people/The-strawberry-shop/61579290425454/";

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad-social" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-social)" />
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
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#F7E3E8" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-14">
        <div
          className="bg-white rounded-[20px_20px_26px_26px] p-5 sm:p-8"
          style={{
            boxShadow:
              "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)",
          }}
        >
          <div className="text-center mb-6">
            <h2 className="font-bubble text-[#7C0116] text-2xl sm:text-3xl">
              follow the strawberry shop
            </h2>
            <p className="text-[#7a6469] font-body font-medium text-sm mt-1.5 max-w-lg mx-auto">
              Follow along for fresh strawberry creations, seasonal treats, behind-the-scenes
              videos, and sweet updates.
            </p>
          </div>

          {/* TikTok videos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6"
          >
            {TIKTOK_VIDEOS.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl overflow-hidden border border-[#F7E3E8] flex justify-center"
                style={{
                  boxShadow:
                    "0 14px 30px -18px rgba(44,35,37,0.22), 0 2px 6px rgba(44,35,37,0.05)",
                }}
              >
                <TikTokEmbed videoId={v.id} citeUrl={v.url} />
              </div>
            ))}
          </motion.div>

          {/* Instagram + profile links */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F7E3E8] text-[#5C0110] font-body font-extrabold text-sm px-6 py-2.5 rounded-full min-h-[44px] hover:opacity-90 transition-opacity"
            >
              <InstagramIcon /> @thestrawberryshopp
            </a>

            <div className="flex items-center gap-3">
              <a
                href={TIKTOK_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors"
                style={{ borderWidth: "0.5px" }}
              >
                <TikTokIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors"
                style={{ borderWidth: "0.5px" }}
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F7E3E8] transition-colors"
                style={{ borderWidth: "0.5px" }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
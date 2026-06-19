import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Instagram, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://www.instagram.com/thestrawberryshopp";
const TIKTOK_URL = "https://www.tiktok.com/@thestrawberryshopp";

export default function SocialFeed() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    base44.entities.GalleryPhoto.filter({ is_active: true }, "sort_order", 6)
      .then(setPhotos)
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Instagram */}
      <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Instagram size={22} className="text-primary" />
            <span className="font-body font-bold text-foreground">@thestrawberryshopp</span>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body font-bold text-primary hover:underline flex items-center gap-1"
          >
            Follow <ExternalLink size={12} />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {photos.slice(0, 6).map(photo => (
            <a
              key={photo.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={photo.image_url}
                alt={photo.caption || "Instagram post"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-5 bg-secondary text-primary font-body font-bold text-sm py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
        >
          📸 See more on Instagram
        </a>
      </div>

      {/* TikTok */}
      <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <span className="font-body font-bold text-foreground">@thestrawberryshopp</span>
          </div>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body font-bold text-primary hover:underline flex items-center gap-1"
          >
            Follow <ExternalLink size={12} />
          </a>
        </div>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 relative rounded-2xl overflow-hidden group min-h-[240px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E8193C 0%, #7A0A2A 100%)" }}
        >
          <div className="absolute inset-0 opacity-20">
            {photos[0] && (
              <img src={photos[0].image_url} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="relative text-center px-6">
            <motion.span
              className="text-6xl block mb-3"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              🍓
            </motion.span>
            <p className="font-display text-white text-2xl mb-1">watch us on TikTok</p>
            <p className="font-body text-white/70 text-sm">Behind-the-scenes, new flavors & more</p>
            <span className="inline-block mt-4 bg-white text-primary font-body font-bold text-sm px-6 py-2.5 rounded-full">
              🎵 Watch now
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
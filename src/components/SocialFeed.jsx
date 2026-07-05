import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import TikTokFeedSection from "@/components/TikTokFeedSection";
import { Instagram, Music2 } from "lucide-react";

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #7C0116, #a3123a)",
  "linear-gradient(135deg, #E0A4B0, #F7E3E8)",
  "linear-gradient(135deg, #5C0110, #7C0116)",
  "linear-gradient(135deg, #F7E3E8, #E0A4B0)",
  "linear-gradient(135deg, #a3123a, #5C0110)",
  "linear-gradient(135deg, #E0A4B0, #7C0116)",
];

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Instagram");

  useEffect(() => {
    base44.entities.SocialPost.filter({ active: true }, "order")
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Load Instagram embed script once
  useEffect(() => {
    if (posts.some(p => p.platform === "Instagram")) {
      const scriptId = "instagram-embed-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        // Process new embeds if script already loaded
        if (window.instgrm) window.instgrm.Embeds.process();
      }
    }
  }, [posts]);

  // Load TikTok embed script once
  useEffect(() => {
  if (posts.some(p => p.platform === "TikTok")) {
  const scriptId = "tiktok-embed-script";
  if (!document.getElementById(scriptId)) {
  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "https://www.tiktok.com/embed.js";
  script.async = true;
  script.onload = () => { window.tiktokEmbed = true; };
  document.body.appendChild(script);
  }
  }
  }, [posts]);

  // Reprocess embeds when tab or posts change
  useEffect(() => {
    if (activeTab === "Instagram" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
    if (activeTab === "TikTok" && window.tiktokEmbed) {
      try {
        const tiktokEmbeds = document.querySelectorAll('.tiktok-embed');
        tiktokEmbeds.forEach(el => {
          if (el.getAttribute('data-video-id') && window.tiktokEmbed.load) {
            window.tiktokEmbed.load(el);
          }
        });
      } catch {}
    }
  }, [activeTab]);

  const instagramPosts = posts.filter(p => p.platform === "Instagram");
  const tiktokPosts = posts.filter(p => p.platform === "TikTok");

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" />
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tab Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 mb-8 bg-secondary rounded-full p-1.5 w-fit mx-auto"
      >
        <button
          onClick={() => setActiveTab("Instagram")}
          className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
            activeTab === "Instagram" ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          <Instagram size={16} className="inline mr-1.5 -mt-0.5" /> On Instagram
        </button>
        <button
          onClick={() => setActiveTab("TikTok")}
          className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
            activeTab === "TikTok" ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          <Music2 size={16} className="inline mr-1.5 -mt-0.5" /> On TikTok
        </button>
      </motion.div>

      {/* Instagram Feed */}
      {activeTab === "Instagram" && (
        <div>
          {instagramPosts.length === 0 ? (
            <div className="text-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 mb-6 max-w-2xl mx-auto">
                {PLACEHOLDER_GRADIENTS.map((gradient, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl shadow-sm"
                    style={{ background: gradient }}
                  />
                ))}
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Instagram posts coming soon! Follow us{" "}
                <a href="https://www.instagram.com/thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">
                  @thestrawberryshopp
                </a>
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 max-w-4xl mx-auto ${instagramPosts.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"}`}>
              {instagramPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="w-full bg-card rounded-[30px_10px_30px_10px] overflow-hidden border-2 border-border shadow-sm transition-shadow hover:shadow-md"
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{ background: "#FFF", border: 0, margin: 0, padding: 0, width: "100%" }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TikTok Feed */}
      {activeTab === "TikTok" && <TikTokFeedSection />}
    </div>
  );
}

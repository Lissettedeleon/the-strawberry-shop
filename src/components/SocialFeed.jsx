import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import TikTokFeedSection from "@/components/TikTokFeedSection";
import { Instagram, Music2 } from "lucide-react";

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
      <div className="flex gap-2 mb-8 bg-secondary rounded-full p-1.5 w-fit mx-auto">
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
      </div>

      {/* Instagram Feed */}
      {activeTab === "Instagram" && (
        <div className="max-w-3xl mx-auto">
          {instagramPosts.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-12 px-6 bg-card rounded-[30px_10px_30px_10px] border-2 border-border">
              <Instagram size={40} className="mx-auto mb-3 text-primary" />
              <p className="text-muted-foreground font-body text-sm">
                Instagram posts coming soon! Follow us{" "}
                <a href="https://www.instagram.com/thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">
                  @thestrawberryshopp
                </a>
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${instagramPosts.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-1 sm:grid-cols-2 justify-items-center"}`}>
              {instagramPosts.map(post => (
                <div key={post.id} className="w-full bg-card rounded-[30px_10px_30px_10px] overflow-hidden border-2 border-border shadow-sm">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{ background: "#FFF", border: 0, margin: 0, padding: 0, width: "100%" }}
                  />
                </div>
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
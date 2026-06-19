import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

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
          <span className="animate-bounce text-2xl">🍓</span>
          <span className="animate-bounce text-2xl" style={{ animationDelay: "0.2s" }}>🍓</span>
          <span className="animate-bounce text-2xl" style={{ animationDelay: "0.4s" }}>🍓</span>
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
          📸 On Instagram
        </button>
        <button
          onClick={() => setActiveTab("TikTok")}
          className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
            activeTab === "TikTok" ? "bg-primary text-white shadow-sm" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          🎵 On TikTok
        </button>
      </div>

      {/* Instagram Feed */}
      {activeTab === "Instagram" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instagramPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-card rounded-[30px_10px_30px_10px] border-2 border-border">
              <span className="text-5xl block mb-3">📸</span>
              <p className="text-muted-foreground font-body text-sm">
                Instagram posts coming soon! Follow us{" "}
                <a href="https://www.instagram.com/thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">
                  @thestrawberryshopp
                </a>
              </p>
            </div>
          ) : (
            instagramPosts.map(post => (
              <div key={post.id} className="bg-card rounded-[30px_10px_30px_10px] overflow-hidden border-2 border-border shadow-sm">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{ background: "#FFF", border: 0, margin: 0, padding: 0, width: "100%" }}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* TikTok Feed */}
      {activeTab === "TikTok" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiktokPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-card rounded-[30px_10px_30px_10px] border-2 border-border">
              <span className="text-5xl block mb-3">🎵</span>
              <p className="text-muted-foreground font-body text-sm">
                TikTok videos coming soon! Follow us{" "}
                <a href="https://www.tiktok.com/@thestrawberryshopp" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">
                  @thestrawberryshopp
                </a>
              </p>
            </div>
          ) : (
            tiktokPosts.map(post => {
              const videoId = post.url.split("/video/")[1]?.split("?")[0];
              if (!videoId) {
                return (
                  <div key={post.id} className="bg-card rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm text-center">
                    <span className="text-4xl block mb-3">🎵</span>
                    <p className="text-muted-foreground font-body text-sm">
                      Check out our TikTok{" "}
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">
                        @thestrawberryshopp
                      </a>
                    </p>
                  </div>
                );
              }
              return (
                <div key={post.id} className="bg-card rounded-[30px_10px_30px_10px] overflow-hidden border-2 border-border shadow-sm">
                  <blockquote
                    className="tiktok-embed"
                    cite={post.url}
                    data-video-id={videoId}
                    style={{ maxWidth: "100%", minWidth: "280px" }}
                  >
                    <section></section>
                  </blockquote>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
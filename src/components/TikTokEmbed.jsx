import React, { useEffect, useRef } from "react";

// Loads TikTok's official embed.js once and renders a single video embed.
// The embed player autoplays muted when scrolled into view (controlled by TikTok).
let scriptPromise = null;

function loadEmbedScript() {
  if (window.tiktokEmbed) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const existing = document.getElementById("tiktok-embed-script");
    if (existing) {
      if (window.tiktokEmbed) return resolve();
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.id = "tiktok-embed-script";
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export default function TikTokEmbed({ videoId, citeUrl, title = "Watch on TikTok" }) {
  const ref = useRef(null);

  useEffect(() => {
    loadEmbedScript().then(() => {
      if (ref.current && window.tiktokEmbed && window.tiktokEmbed.load) {
        try {
          window.tiktokEmbed.load(ref.current);
        } catch {}
      }
    });
  }, [videoId]);

  return (
    <blockquote
      ref={ref}
      className="tiktok-embed"
      cite={citeUrl}
      data-video-id={videoId}
      style={{ maxWidth: "100%", minWidth: "auto", margin: "0 auto" }}
    >
      <a href={citeUrl} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </blockquote>
  );
}
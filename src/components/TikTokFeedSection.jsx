import React, { useState, useEffect } from "react";
import { Music2 } from "lucide-react";

const VIDEO_1_URL = "https://www.tiktok.com/@thestrawberryshopp/video/7649445152708185358";
const VIDEO_2_URL = "https://www.tiktok.com/@thestrawberryshopp/video/7616177536048893197";
const OEMBED_1 = `https://www.tiktok.com/oembed?url=${encodeURIComponent(VIDEO_1_URL)}`;
const OEMBED_2 = `https://www.tiktok.com/oembed?url=${encodeURIComponent(VIDEO_2_URL)}`;

function TikTokSVG() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1a1a1a">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z"/>
    </svg>
  );
}

function VideoCard({ oembedUrl, videoUrl }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetch(oembedUrl)
      .then(r => r.json())
      .then(data => { if (data.thumbnail_url) setThumbnail(data.thumbnail_url); })
      .catch(() => {});
  }, [oembedUrl]);

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-[#E0A4B0] overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative w-full aspect-[9/16]">
        {thumbnail ? (
          <img src={thumbnail} alt="TikTok video thumbnail" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#F6E3E7] flex items-center justify-center">
            <Music2 size={32} className="text-[#7C0116]" />
          </div>
        )}
        {/* Dark overlay + play button */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7C0116" }}>
            <svg className="w-6 h-6 text-white ml-1" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function TikTokFeedSection() {
  return (
    <div>
      {/* Handle */}
      <div className="flex justify-center mb-5">
        <a
          href="https://www.tiktok.com/@thestrawberryshopp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-75 transition-opacity"
        >
          <TikTokSVG />
          <span style={{ color: "#1a1a1a", fontWeight: 500, fontSize: "15px" }} className="font-body">
            @thestrawberryshopp
          </span>
        </a>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        <VideoCard oembedUrl={OEMBED_1} videoUrl={VIDEO_1_URL} />
        <VideoCard oembedUrl={OEMBED_2} videoUrl={VIDEO_2_URL} />
      </div>

      {/* Follow button */}
      <div className="flex justify-center mt-6">
        <a
          href="https://www.tiktok.com/@thestrawberryshopp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-body font-semibold text-sm px-6 py-3 rounded-full min-h-[44px] hover:opacity-85 transition-opacity"
        >
          <TikTokSVG />
          <span className="text-white">Follow us on TikTok</span>
        </a>
      </div>
    </div>
  );
}
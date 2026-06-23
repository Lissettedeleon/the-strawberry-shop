import React from "react";

function TikTokIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export function TikTokButton({ className = "" }) {
  return (
    <a
      href="https://www.tiktok.com/@thestrawberryshopp"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[44px] hover:opacity-90 transition-opacity ${className}`}
    >
      <TikTokIcon />
      Follow us on TikTok
    </a>
  );
}

export function InstagramButton({ className = "" }) {
  return (
    <a
      href="https://www.instagram.com/thestrawberryshopp"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#fde8ea] text-[#c41230] font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[44px] hover:opacity-90 transition-opacity ${className}`}
    >
      <InstagramIcon />
      Follow on Instagram
    </a>
  );
}

export function GoogleReviewButton({ className = "" }) {
  return (
    <a
      href="https://share.google/sVShJ5jaLb8Ju7gz1"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-white border-[1.5px] border-[#e8233a] text-[#e8233a] font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[48px] hover:bg-[#fde8ea] transition-colors ${className}`}
    >
      <span className="text-yellow-400 text-base">★★★★★</span>
      Leave us a review on Google
    </a>
  );
}

export default function SocialButtons({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <InstagramButton />
      <TikTokButton />
    </div>
  );
}
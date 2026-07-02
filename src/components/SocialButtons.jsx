import React from "react";

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>);

}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1a1a1a">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-4.84-1.82V6.69h4.84z" />
    </svg>);

}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>);

}

function PinterestIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E60023">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>);

}

function LinktreeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#43E55E">
      <path d="M13.11 1.006L8.89 5.995l-3.442-3.38a.714.714 0 00-1.007 1.012l3.42 3.36-4.776.005a.714.714 0 00.001 1.428l4.776-.005-3.42 3.36a.714.714 0 001.006 1.013l3.441-3.38 4.22 4.987a.714.714 0 001.09-.928L10.014 9.09l4.776.005a.714.714 0 00.001-1.428l-4.776-.005 4.185-4.368a.714.714 0 00-1.09-.929v.641zM11.286 13.714v9.572h1.428v-9.572h-1.428z" />
    </svg>);

}

const SOCIAL_LINKS = [
{ id: "instagram", icon: <InstagramIcon />, href: "https://www.instagram.com/thestrawberryshopp", label: "Instagram" },
{ id: "tiktok", icon: <TikTokIcon />, href: "https://www.tiktok.com/@thestrawberryshopp", label: "TikTok" },
{ id: "facebook", icon: <FacebookIcon />, href: "https://www.facebook.com/people/The-strawberry-shop/61579290425454/", label: "Facebook" },
{ id: "pinterest", icon: <PinterestIcon />, href: "https://www.pinterest.com/strawberryshopoh/", label: "Pinterest" },
{ id: "linktree", icon: <LinktreeIcon />, href: "https://linktr.ee/Thestrawberryshopoh", label: "Linktree" }];


export function SocialIconsRow({ className = "", compact = false }) {
  if (compact) {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        {SOCIAL_LINKS.map(({ id, icon, href, label }) =>
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">

            {icon}
          </a>
        )}
      </div>);
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ id, icon, href, label }) =>
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-11 h-11 rounded-full bg-white border border-[#E0A4B0] flex items-center justify-center hover:bg-[#F6E3E7] transition-colors"
        style={{ borderWidth: "0.5px" }}>

          {icon}
        </a>
      )}
    </div>);

}

export function TikTokButton({ className = "" }) {
  return (
    <a
      href="https://www.tiktok.com/@thestrawberryshopp"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[44px] hover:opacity-90 transition-opacity ${className}`}>
      
      <TikTokIcon />
      Follow us on TikTok
    </a>);

}

export function InstagramButton({ className = "" }) {
  return (
    <a
      href="https://www.instagram.com/thestrawberryshopp"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#F6E3E7] text-[#5C0110] font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[44px] hover:opacity-90 transition-opacity ${className}`}>
      
      Follow on Instagram
    </a>);

}

export function GoogleReviewButton({ className = "" }) {
  return (
    <a
      href="https://share.google/2h11qEjqljoOxwZsx"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-white border border-[#E0A4B0] rounded-full px-5 py-2.5 text-sm font-body font-semibold text-[#1a1a1a] hover:bg-[#FBF1F3] transition-colors shadow-sm ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Leave us a Google Review
    </a>
  );
}

export default function SocialButtons({ className = "" }) {
  return <SocialIconsRow className={className} />;
}
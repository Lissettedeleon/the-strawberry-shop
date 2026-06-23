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


export function SocialIconsRow({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ id, icon, href, label }) =>
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-11 h-11 rounded-full bg-white border border-[#f5b8c0] flex items-center justify-center hover:bg-[#fde8ea] transition-colors"
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
      className={`inline-flex items-center gap-2 bg-[#fde8ea] text-[#c41230] font-body font-semibold text-sm px-5 py-3 rounded-full min-h-[44px] hover:opacity-90 transition-opacity ${className}`}>
      
      Follow on Instagram
    </a>);

}

export function GoogleReviewButton({ className = "" }) {
  return null;










}

export default function SocialButtons({ className = "" }) {
  return <SocialIconsRow className={className} />;
}
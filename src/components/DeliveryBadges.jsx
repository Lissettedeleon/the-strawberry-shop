import React from "react";
import { ExternalLink } from "lucide-react";

function UberEatsMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#06C167" />
      <path d="M7 7h2v6.2a2.3 2.3 0 004.6 0V7h2v6.2a4.3 4.3 0 01-8.6 0V7zM15.2 15.2h2V17h-2v-1.8z" fill="#fff" />
    </svg>
  );
}

function DoorDashMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF3008" />
      <path d="M6 8h8.5a3.5 3.5 0 010 7H10v3H6V8zm4 4.5v-1h4.5a.5.5 0 010 1H10z" fill="#fff" />
    </svg>
  );
}

const badgeClass = "inline-flex items-center gap-2 bg-white border border-[#E0A4B0] text-[#1a1a1a] font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-[#F6E3E7] transition-colors shadow-sm";

export function UberEatsBadge({ className = "" }) {
  return (
    <a
      href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg"
      target="_blank" rel="noopener noreferrer"
      className={`${badgeClass} ${className}`}
    >
      <UberEatsMark /> Uber Eats <ExternalLink size={13} className="text-[#6b7280]" />
    </a>
  );
}

export function DoorDashBadge({ className = "" }) {
  return (
    <a
      href="https://www.doordash.com/store/41748513"
      target="_blank" rel="noopener noreferrer"
      className={`${badgeClass} ${className}`}
    >
      <DoorDashMark /> DoorDash <ExternalLink size={13} className="text-[#6b7280]" />
    </a>
  );
}

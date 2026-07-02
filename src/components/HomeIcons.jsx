import React from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function StrawberryLineIcon({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} {...base}>
      <path d="M24 14c-2-3-5.5-4.5-9-4 1 2 2 3.5 4 4.5" />
      <path d="M24 14c2-3 5.5-4.5 9-4-1 2-2 3.5-4 4.5" />
      <path d="M24 12v3" />
      <path d="M24 15c8 0 13 6.5 13 13.5C37 37 30.5 42 24 42S11 37 11 28.5C11 21.5 16 15 24 15z" />
      <circle cx="19" cy="24" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="29" cy="24" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="24" cy="21" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17" cy="30" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="31" cy="30" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="24" cy="27" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="24" cy="33" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CupIcon({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} {...base}>
      <path d="M13 17h22l-2.5 20a4 4 0 01-4 3.5h-9a4 4 0 01-4-3.5L13 17z" />
      <path d="M11 17h26" />
      <path d="M18 12c1.5-2 3-3 6-3s4.5 1 6 3" />
      <path d="M31 33c3-1 5-3 5-5.5" />
    </svg>
  );
}

export function ChefHatIcon({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} {...base}>
      <path d="M16 22c-4 0-7-3-7-7 0-3.5 2.5-6.3 5.8-6.9A7 7 0 0124 5a7 7 0 019.2 3.1c3.3.6 5.8 3.4 5.8 6.9 0 4-3 7-7 7" />
      <path d="M16 22h16v9H16z" />
      <path d="M14 31h20v6a2 2 0 01-2 2H16a2 2 0 01-2-2v-6z" />
    </svg>
  );
}

export function DeliveryBagIcon({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} {...base}>
      <path d="M12 17h24l-1.7 20.3a3 3 0 01-3 2.7H16.7a3 3 0 01-3-2.7L12 17z" />
      <path d="M17 17v-3a7 7 0 0114 0v3" />
      <path d="M19 25h10" />
    </svg>
  );
}

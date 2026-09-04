import React from "react";
import { motion } from "framer-motion";

/**
 * A styled gift card visual matching the brand design reference.
 * Deep red card with strawberry graphic, "Because you deserve sweet things",
 * GIFT CARD label, and a To/From box. Optionally shows the chosen amount.
 */
export default function GiftCardVisual({ amount, recipientName, senderName, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`relative w-full max-w-md mx-auto rounded-[28px] overflow-hidden shadow-2xl ${className}`}
      style={{ aspectRatio: "5 / 3", background: "#C82835" }}
    >
      {/* Strawberry watermark on the right */}
      <StrawberryWatermark />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 text-white">
        {/* Top: stacked wordmark */}
        <div className="flex items-start gap-1">
          <div className="font-bubble text-white leading-[0.82] text-base sm:text-lg">
            <p>the</p>
            <p className="flex items-center gap-1">
              straw
              <StrawberryIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 -mb-0.5" />
            </p>
            <p>berry</p>
            <p className="font-body font-bold text-[9px] sm:text-[10px] tracking-[0.3em] mt-1">SHOP</p>
          </div>
        </div>

        {/* Middle: message */}
        <div className="mt-2">
          <p className="font-bubble text-white text-2xl sm:text-3xl leading-[1.05]">
            Because you
            <br />
            deserve
          </p>
          <p className="font-body text-white text-base sm:text-lg tracking-[0.3em] uppercase mt-1">
            sweet things
          </p>
        </div>

        {/* Bottom: GIFT CARD + amount + To/From */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-body font-bold text-white text-xs sm:text-sm tracking-[0.25em]">
              GIFT CARD
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="w-16 h-px bg-white/50" />
              <HeartIcon className="w-3 h-3 text-white/70" />
            </div>
            {typeof amount === "number" && amount > 0 && (
              <p className="mt-3 font-bubble text-white text-3xl sm:text-4xl leading-none">
                ${amount}
              </p>
            )}
          </div>

          <div className="rounded-2xl px-4 py-3 w-40 sm:w-48" style={{ background: "#F6E4E3" }}>
            <ToFromRow label="TO" value={recipientName} />
            <div className="h-2" />
            <ToFromRow label="FROM" value={senderName} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ToFromRow({ label, value }) {
  return (
    <div>
      <p className="font-body font-bold text-[10px] sm:text-xs tracking-wider" style={{ color: "#A8222D" }}>
        {label}:
      </p>
      <div className="mt-1 border-b" style={{ borderColor: "#A8222D", opacity: 0.4 }} />
      {value && (
        <p className="mt-1 font-body text-[11px] sm:text-xs text-[#5C0110] truncate">{value}</p>
      )}
    </div>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.5 6.6 4.4 5.1c2.2-1.15 4.6-.35 5.9 1.4l1.7 2.3 1.7-2.3c1.3-1.75 3.7-2.55 5.9-1.4 2.9 1.5 3.5 5 1.7 7.8C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function StrawberryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 40 44" fill="none" className={className} aria-hidden="true">
      <path d="M20 11 C24 9 28 10 30 14 C22 15 18 12 20 11 Z" fill="currentColor" />
      <path d="M20 11 C16 9 12 10 10 14 C18 15 22 12 20 11 Z" fill="currentColor" />
      <path d="M20 13 C10 13 5 22 5 29 C5 37 12 43 20 43 C28 43 35 37 35 29 C35 22 30 13 20 13 Z" fill="currentColor" />
    </svg>
  );
}

function StrawberryWatermark() {
  return (
    <svg
      className="absolute -right-8 top-1/2 -translate-y-1/2 w-[70%] h-auto opacity-[0.18] pointer-events-none"
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 6-petal calyx/flower on top */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="30"
          rx="10"
          ry="30"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          transform={`rotate(${deg} 100 58)`}
        />
      ))}
      {/* Body */}
      <path
        d="M100,58 C58,58 30,92 30,132 C30,175 62,212 100,225 C138,212 170,175 170,132 C170,92 142,58 100,58 Z"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
      {/* Seeds */}
      <g fill="#FFFFFF">
        <ellipse cx="80" cy="115" rx="2.5" ry="4" />
        <ellipse cx="120" cy="115" rx="2.5" ry="4" />
        <ellipse cx="68" cy="145" rx="2.5" ry="4" />
        <ellipse cx="100" cy="155" rx="2.5" ry="4" />
        <ellipse cx="132" cy="145" rx="2.5" ry="4" />
        <ellipse cx="85" cy="180" rx="2.5" ry="4" />
        <ellipse cx="115" cy="180" rx="2.5" ry="4" />
        <ellipse cx="100" cy="200" rx="2.5" ry="4" />
      </g>
    </svg>
  );
}

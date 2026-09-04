import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

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
        {/* Top: logo */}
        <div className="flex items-center gap-2">
          <Logo size="xs" />
          <span className="font-display text-white text-sm sm:text-base tracking-wide">
            the strawberry shop
          </span>
        </div>

        {/* Middle: message */}
        <div className="mt-2">
          <p className="font-bubble text-white text-2xl sm:text-3xl leading-[1.05]">
            Because you deserve
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
            <div className="mt-1.5 w-20 h-px bg-white/50" />
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

function StrawberryWatermark() {
  return (
    <svg
      className="absolute -right-6 top-1/2 -translate-y-1/2 w-2/3 h-auto opacity-25 pointer-events-none"
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Leaves */}
      <path
        d="M100 10 C70 20 55 45 60 70 C85 60 105 40 100 10 Z"
        fill="#D9505B"
      />
      <path
        d="M100 10 C130 20 145 45 140 70 C115 60 95 40 100 10 Z"
        fill="#D9505B"
      />
      {/* Body */}
      <path
        d="M100 55 C60 55 35 85 35 130 C35 185 70 225 100 225 C130 225 165 185 165 130 C165 85 140 55 100 55 Z"
        fill="#D9505B"
      />
      {/* Seeds */}
      <g fill="#F6E4E3">
        <ellipse cx="80" cy="110" rx="3" ry="5" />
        <ellipse cx="120" cy="110" rx="3" ry="5" />
        <ellipse cx="70" cy="140" rx="3" ry="5" />
        <ellipse cx="100" cy="150" rx="3" ry="5" />
        <ellipse cx="130" cy="140" rx="3" ry="5" />
        <ellipse cx="85" cy="175" rx="3" ry="5" />
        <ellipse cx="115" cy="175" rx="3" ry="5" />
        <ellipse cx="100" cy="195" rx="3" ry="5" />
      </g>
    </svg>
  );
}
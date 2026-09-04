import React from "react";
import { motion } from "framer-motion";

/**
 * Gift card visual matching the brand reference exactly.
 * Deep red card, large strawberry watermark on the right/bottom,
 * stacked wordmark top-left, "Because you deserve sweet things" center,
 * GIFT CARD label bottom-left, light pink To/From box bottom-right.
 */
export default function GiftCardVisual({ amount, recipientName, senderName, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`relative w-full max-w-md mx-auto rounded-[28px] overflow-hidden shadow-2xl ${className}`}
      style={{ aspectRatio: "5 / 3", background: "#C82939" }}
    >
      {/* Large strawberry watermark on the right/bottom */}
      <StrawberryWatermark />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 text-white">
        {/* Top: stacked wordmark */}
        <div className="flex items-start gap-1.5">
          <div className="leading-[0.85]">
            <p className="font-body text-white text-[10px] sm:text-xs tracking-wide">the</p>
            <p className="font-body font-extrabold text-white text-base sm:text-lg tracking-tight">strawberry</p>
            <p className="font-body text-white text-[10px] sm:text-xs tracking-[0.3em] mt-0.5">SHOP</p>
          </div>
          <BittenStrawberryIcon className="w-5 h-5 sm:w-6 sm:h-6 -mt-0.5" />
        </div>

        {/* Middle: message */}
        <div className="mt-2">
          <p className="font-bubble text-white text-2xl sm:text-3xl leading-[1.05]">
            Because you
            <br />
            deserve
          </p>
          <p className="font-body font-light text-white text-sm sm:text-base tracking-[0.25em] lowercase mt-1.5">
            sweet things
          </p>
        </div>

        {/* Bottom: GIFT CARD + amount + To/From */}
        <div className="flex items-end justify-between gap-4">
          <div className="shrink-0">
            <p className="font-body font-semibold text-white text-[11px] sm:text-xs tracking-[0.25em]">
              GIFT CARD
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="w-14 h-px bg-white/60" />
              <HeartIcon className="w-3 h-3 text-white/80" />
            </div>
            {typeof amount === "number" && amount > 0 && (
              <p className="mt-2.5 font-bubble text-white text-3xl sm:text-4xl leading-none">
                ${amount}
              </p>
            )}
          </div>

          <div className="rounded-2xl px-4 py-3 w-40 sm:w-48" style={{ background: "#FCE4E6" }}>
            <ToFromRow label="TO" value={recipientName} />
            <div className="h-2.5" />
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
      <div className="mt-1 border-b" style={{ borderColor: "rgba(168, 34, 45, 0.35)" }} />
      {value && (
        <p className="mt-1 font-body text-[11px] sm:text-xs text-[#5C0110] truncate">{value}</p>
      )}
    </div>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.5 6.6 4.4 5.1c2.2-1.15 4.6-.35 5.9 1.4l1.7 2.3 1.7-2.3c1.3-1.75 3.7-2.55 5.9-1.4 2.9 1.5 3.5 5 1.7 7.8C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function BittenStrawberryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 40 44" fill="currentColor" className={className} aria-hidden="true">
      {/* leaves */}
      <path d="M20 6 C24 2 30 2 32 6 C28 7 24 7 20 6 Z" fill="#5C0110" />
      <path d="M20 6 C16 2 10 2 8 6 C12 7 16 7 20 6 Z" fill="#5C0110" />
      {/* body with a bite taken out of the right side */}
      <path d="M20 8 C10 8 5 17 5 26 C5 34 12 42 20 42 C28 42 35 34 35 26 C35 24 34.5 22 33.5 20 C31 21 28 20 27 17 C26.5 15 27 13 28.5 12 C26 9 23 8 20 8 Z" />
      {/* bite mark (white) */}
      <circle cx="32" cy="20" r="3.5" fill="#C82939" />
    </svg>
  );
}

function StrawberryWatermark() {
  return (
    <svg
      className="absolute -right-6 -bottom-6 w-[75%] h-auto pointer-events-none"
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity: 0.22 }}
    >
      {/* 6-petal calyx/flower on top */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="30"
          rx="11"
          ry="32"
          fill="#DA4D5D"
          transform={`rotate(${deg} 100 58)`}
        />
      ))}
      {/* Body — filled, lighter red */}
      <path
        d="M100,58 C58,58 30,92 30,132 C30,175 62,212 100,225 C138,212 170,175 170,132 C170,92 142,58 100,58 Z"
        fill="#DA4D5D"
      />
      {/* Seeds */}
      <g fill="#C82939">
        <ellipse cx="80" cy="115" rx="3" ry="5" />
        <ellipse cx="120" cy="115" rx="3" ry="5" />
        <ellipse cx="68" cy="145" rx="3" ry="5" />
        <ellipse cx="100" cy="155" rx="3" ry="5" />
        <ellipse cx="132" cy="145" rx="3" ry="5" />
        <ellipse cx="85" cy="180" rx="3" ry="5" />
        <ellipse cx="115" cy="180" rx="3" ry="5" />
        <ellipse cx="100" cy="200" rx="3" ry="5" />
      </g>
    </svg>
  );
}
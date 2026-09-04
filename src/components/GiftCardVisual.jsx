import React from "react";
import { motion } from "framer-motion";

const CARD_IMAGE = "https://media.base44.com/images/public/6a34ab1480a9a94dcd8377fa/ea78651e4_42414B76-286D-4573-A6F0-C3431FA0BA1D.png";

/**
 * Gift card visual using the exact reference image, with an editable
 * To/From text box and amount overlaid on top.
 */
export default function GiftCardVisual({ amount, recipientName, senderName, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`relative w-full max-w-md mx-auto rounded-[28px] overflow-hidden shadow-2xl ${className}`}
      style={{ aspectRatio: "5 / 3" }}
    >
      {/* Exact reference image */}
      <img
        src={CARD_IMAGE}
        alt="The Strawberry Shop gift card"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Amount — centered on the thin line between "GIFT CARD" and the heart */}
      {amount > 0 && (
        <div className="absolute bottom-[13%] left-[33%] sm:left-[31%]">
          <span className="font-bubble text-white text-sm sm:text-base drop-shadow-md">
            ${amount.toFixed(0)}
          </span>
        </div>
      )}

      {/* To/From text box overlaid on bottom-right */}
      <div
        className="absolute bottom-[10%] right-[6%] rounded-2xl px-3 py-2.5 w-[38%] sm:w-[40%]"
        style={{ background: "#FCE4E6" }}
      >
        <ToFromRow label="TO" value={recipientName} />
        <div className="h-1.5" />
        <ToFromRow label="FROM" value={senderName} />
      </div>
    </motion.div>
  );
}

function ToFromRow({ label, value }) {
  return (
    <div>
      <p className="font-body font-bold text-[9px] sm:text-[10px] tracking-wider" style={{ color: "#A8222D" }}>
        {label}:
      </p>
      <div className="mt-0.5 border-b" style={{ borderColor: "rgba(168, 34, 45, 0.35)" }} />
      {value && (
        <p className="mt-0.5 font-body text-[10px] sm:text-[11px] text-[#5C0110] truncate">{value}</p>
      )}
    </div>
  );
}

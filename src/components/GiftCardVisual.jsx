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
      style={{ aspectRatio: "3 / 2" }}
    >
      {/* The reference image's white frame is thicker on the left/right than
          on the top/bottom. Render the card at its original 5:3 size inside a
          narrower 3:2 frame so the sides are trimmed and the white border is
          even all the way around. Overlays stay positioned against the 5:3
          card, so they line up exactly as before. */}
      <div className="absolute inset-y-0 left-[-5.5556%] w-[111.1111%]">
        {/* Exact reference image */}
        <img
          src={CARD_IMAGE}
          alt="The Strawberry Shop gift card"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Amount — centered on the thin line between "GIFT CARD" and the heart */}
        {amount > 0 && (
          <div className="absolute bottom-[16%] left-[36%] sm:left-[34%]">
            <span className="font-bubble text-white text-sm sm:text-base drop-shadow-md">
              ${amount.toFixed(0)}
            </span>
          </div>
        )}

        {/* To/From text box. It must fully cover the To/From box printed on the
            card image (top edge at ~56%), so it's pinned top and bottom rather
            than sized to its text. text-left overrides the
            page's centered text so the labels start at the box edge */}
        <div
          className="absolute top-[54%] bottom-[6%] right-[9%] rounded-2xl px-3 py-2.5 w-[39%] sm:w-[41%] text-left flex flex-col justify-center"
          style={{ background: "#FCE4E6" }}
        >
          <ToFromRow label="TO" value={recipientName} />
          <div className="h-1.5" />
          <ToFromRow label="FROM" value={senderName} />
        </div>
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
        <p className="mt-0.5 font-body text-[10px] sm:text-[11px] text-[#C4112F] truncate">{value}</p>
      )}
    </div>
  );
}

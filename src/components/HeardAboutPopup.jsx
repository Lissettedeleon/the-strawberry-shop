import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Check } from "lucide-react";
import { SHEET_TRANSITION, EASE_OUT_STRONG } from "@/lib/motion";

const SOURCES = ["TikTok", "Instagram", "Google", "A Friend", "Other"];

export default function HeardAboutPopup({ open, onClose, onSubmit, showRating = false, title, subtitle }) {
  const [rating, setRating] = useState(0);
  const [sources, setSources] = useState([]);

  const toggleSource = (s) => {
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = () => {
    onSubmit?.({ rating: showRating ? rating : null, sources });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[90]"
          />

          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={SHEET_TRANSITION}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white rounded-t-[24px] px-5 pt-3 pb-8 shadow-2xl"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <PopupContent {...{ showRating, rating, setRating, sources, toggleSource, title, subtitle, onClose, handleSubmit }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.25, ease: EASE_OUT_STRONG }}
            className="hidden md:block fixed left-1/2 top-1/2 z-[100] w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
          >
            <PopupContent {...{ showRating, rating, setRating, sources, toggleSource, title, subtitle, onClose, handleSubmit }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PopupContent({ showRating, rating, setRating, sources, toggleSource, title, subtitle, onClose, handleSubmit }) {
  return (
    <div className="relative">
      <button onClick={onClose} className="absolute -top-1 right-0 p-2 rounded-full hover:bg-gray-100" aria-label="Close">
        <X size={20} className="text-gray-500" />
      </button>

      <h2 className="font-body font-bold text-[#1a1a1a] text-lg mb-1 pr-8">{title || "How was your experience?"}</h2>
      {subtitle && <p className="font-body text-[#6b7280] text-sm mb-5">{subtitle}</p>}

      {showRating && (
        <div className="flex items-center gap-1.5 mb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star`} className="p-0.5">
              <Star size={30} className={n <= rating ? "text-[#7C0116] fill-[#7C0116]" : "text-[#E0A4B0]"} />
            </button>
          ))}
        </div>
      )}

      <p className="font-body font-semibold text-[#1a1a1a] text-sm mb-3">How did you hear about us?</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {SOURCES.map((s) => {
          const active = sources.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggleSource(s)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body font-semibold text-sm border transition-colors ${
                active ? "bg-[#7C0116] border-[#7C0116] text-white" : "bg-white border-[#E0A4B0] text-[#1a1a1a] hover:bg-[#FBF1F3]"
              }`}
            >
              {active && <Check size={14} />}
              {s}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-white border border-[#E0A4B0] text-[#6b7280] font-body font-semibold text-sm py-3 rounded-full hover:bg-[#FBF1F3] transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-[#7C0116] text-white font-body font-bold text-sm py-3 rounded-full hover:bg-[#5C0110] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

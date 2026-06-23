import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ExternalLink } from "lucide-react";

export default function OrderModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[90]"
          />

          {/* Mobile: bottom sheet / Desktop: centered modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white rounded-t-[24px] px-4 pt-3 pb-8 shadow-2xl"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" aria-label="Close">
              <X size={20} className="text-gray-500" />
            </button>
            <h2 className="font-body font-bold text-[#1a1a1a] text-lg mb-4">How would you like to order?</h2>
            <OrderOptions onClose={onClose} />
          </motion.div>

          {/* Desktop modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="hidden md:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" aria-label="Close">
              <X size={20} className="text-gray-500" />
            </button>
            <div className="text-center mb-6">
              <span className="text-3xl">🍓</span>
              <h2 className="font-body font-bold text-[#1a1a1a] text-xl mt-2">How would you like to order?</h2>
            </div>
            <OrderOptions onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function OrderOptions({ onClose }) {
  return (
    <div className="space-y-3">
      <Link
        to="/order"
        onClick={onClose}
        className="flex items-center gap-4 bg-[#e8233a] text-white rounded-2xl px-5 py-4 min-h-[64px] hover:bg-[#c41230] transition-colors active:scale-95"
      >
        <span className="text-2xl">🏪</span>
        <div className="flex-1">
          <p className="font-body font-bold text-base leading-tight">Order Online for Pickup</p>
          <p className="font-body text-white/80 text-xs mt-0.5">Skip the line — order and pay here</p>
        </div>
        <ChevronRight size={18} className="text-white/80 shrink-0" />
      </Link>

      <a
        href="https://www.doordash.com/store/41748513"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="flex items-center gap-4 bg-white border border-[#f5b8c0] rounded-2xl px-5 py-4 min-h-[64px] hover:bg-[#fde8ea] transition-colors active:scale-95"
      >
        <span className="text-2xl">🏃</span>
        <div className="flex-1">
          <p className="font-body font-bold text-[#e8233a] text-base leading-tight">Order on DoorDash</p>
          <p className="font-body text-[#6b7280] text-xs mt-0.5">Delivery via DoorDash</p>
        </div>
        <ExternalLink size={16} className="text-[#6b7280] shrink-0" />
      </a>

      <a
        href="https://www.ubereats.com/store/the-strawberry-shop-7100-foundry-row/sBLlZJJpWzytPViiGPa2Fg"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="flex items-center gap-4 bg-white border border-[#f5b8c0] rounded-2xl px-5 py-4 min-h-[64px] hover:bg-[#fde8ea] transition-colors active:scale-95"
      >
        <span className="text-2xl">🛵</span>
        <div className="flex-1">
          <p className="font-body font-bold text-[#1a1a1a] text-base leading-tight">Order on Uber Eats</p>
          <p className="font-body text-[#6b7280] text-xs mt-0.5">Delivery via Uber Eats</p>
        </div>
        <ExternalLink size={16} className="text-[#6b7280] shrink-0" />
      </a>
    </div>
  );
}
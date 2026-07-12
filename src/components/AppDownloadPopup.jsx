import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone } from "lucide-react";
import Logo from "./Logo";
import { SHEET_TRANSITION, EASE_OUT_STRONG } from "@/lib/motion";

const STORAGE_KEY = "sb_app_prompt_seen";

export default function AppDownloadPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const openApp = () => {
    dismiss();
    navigate("/app");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/50 z-[90]"
          />

          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={SHEET_TRANSITION}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white rounded-t-[24px] px-5 pt-3 pb-8 shadow-2xl text-center"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <PopupContent onOpenApp={openApp} onDismiss={dismiss} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE_OUT_STRONG }}
            className="hidden md:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl text-center"
          >
            <PopupContent onOpenApp={openApp} onDismiss={dismiss} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PopupContent({ onOpenApp, onDismiss }) {
  return (
    <div className="relative">
      <button onClick={onDismiss} className="absolute -top-1 right-0 p-2 rounded-full hover:bg-gray-100" aria-label="Close">
        <X size={20} className="text-gray-500" />
      </button>

      <div className="flex justify-center mb-4">
        <Logo size="lg" />
      </div>
      <h2 className="font-body font-bold text-[#1a1a1a] text-lg mb-2">Continue in the app</h2>
      <p className="font-body text-[#6b7280] text-sm mb-6">
        Get the best experience ordering from the strawberry shop app
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={onOpenApp}
          className="w-full flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-sm py-3.5 rounded-full hover:bg-[#5C0110] transition-colors active:scale-95"
        >
          <Smartphone size={16} /> Open App
        </button>
        <button
          onClick={onDismiss}
          className="w-full bg-white border border-[#E0A4B0] text-[#6b7280] font-body font-semibold text-sm py-3.5 rounded-full hover:bg-[#FBF1F3] transition-colors"
        >
          Continue on Website
        </button>
      </div>
    </div>
  );
}

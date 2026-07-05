import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

// Sticky mobile-only "Order Now" bar for quick access on small screens.
export default function MobileOrderBar() {
  const { pathname } = useLocation();
  if (["/menu", "/checkout", "/admin", "/login"].includes(pathname)) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#F6E3E7] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <Link
        to="/menu"
        className="flex items-center justify-center gap-2 bg-[#7C0116] text-white font-body font-bold text-base py-3.5 rounded-full min-h-[48px] active:scale-95 shadow-lg transition-transform"
      >
        <ShoppingBag size={18} /> Order Now
      </Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { computeStatus, getTodayHours } from "@/lib/hours";

export default function HoursStrip() {
  const [status, setStatus] = useState(computeStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 -mt-8">
      <div className="bg-white rounded-3xl shadow-lg px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 flex-wrap justify-center">
        <span className="flex items-center gap-2 font-body font-bold text-sm text-[#1a1a1a]">
          <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? "bg-green-500 animate-pulse" : "bg-[#7C0116]"}`} />
          {status.isOpen ? "Open now" : `Closed${status.opensAt ? ` · Opens ${status.opensAt}` : ""}`}
        </span>
        <span className="text-[#6b7280] font-body text-sm">7100 Foundry Row, Liberty Township, OH</span>
        <span className="hidden sm:block w-px h-4 bg-[#F6E3E7]" />
        <span className="text-[#6b7280] font-body text-sm">
          Today: <span className="text-[#1a1a1a] font-semibold">{getTodayHours()}</span>
        </span>
        <Link to="/hours" className="flex items-center gap-1 text-[#7C0116] font-body font-bold text-sm hover:text-[#5C0110] transition-colors">
          Full hours <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

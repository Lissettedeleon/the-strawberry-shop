import React, { useState, useEffect } from "react";
import { computeStatus } from "@/lib/hours";

export default function OpenClosedBadge({ className = "" }) {
  const [status, setStatus] = useState(computeStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-body font-bold text-xs px-3 py-1 ${
        status.isOpen ? "bg-[#B4C84C]/25 text-[#4F5F10]" : "bg-secondary text-primary"
      } ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-[#B4C84C] animate-pulse" : "bg-primary"}`} />
      {status.isOpen ? "Open Now" : `Closed${status.opensAt ? ` · Opens ${status.opensAt}` : ""}`}
    </span>
  );
}

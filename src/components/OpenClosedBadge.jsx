import React, { useState, useEffect } from "react";

// Hours: Mon–Sat 11:00–20:00, Sun 12:00–18:00
function getHoursForDay(day) {
  if (day === 0) return { open: 12, close: 18 }; // Sunday
  return { open: 11, close: 20 };
}

function formatHour(h) {
  const period = h >= 12 ? "PM" : "AM";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return `${hour}${period}`;
}

function computeStatus() {
  const now = new Date();
  const day = now.getDay();
  const hourDecimal = now.getHours() + now.getMinutes() / 60;
  const { open, close } = getHoursForDay(day);

  if (hourDecimal >= open && hourDecimal < close) {
    return { isOpen: true };
  }

  // Closed — find next opening
  if (hourDecimal < open) {
    return { isOpen: false, opensAt: formatHour(open) };
  }
  // After close — opens tomorrow
  const nextDay = (day + 1) % 7;
  const nextHours = getHoursForDay(nextDay);
  return { isOpen: false, opensAt: formatHour(nextHours.open) };
}

export default function OpenClosedBadge({ className = "" }) {
  const [status, setStatus] = useState(computeStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-body font-bold text-xs px-3 py-1 ${
        status.isOpen ? "bg-green-100 text-green-700" : "bg-secondary text-primary"
      } ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500 animate-pulse" : "bg-primary"}`} />
      {status.isOpen ? "Open Now" : `Closed${status.opensAt ? ` · Opens ${status.opensAt}` : ""}`}
    </span>
  );
}
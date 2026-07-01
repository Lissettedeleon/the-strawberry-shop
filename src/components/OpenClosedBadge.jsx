import React, { useState, useEffect } from "react";

// Holiday overrides — month is 0-indexed to match Date#getMonth()
const HOLIDAY_HOURS = [
  { month: 3, day: 5, label: "Easter", closed: true }, // April 5
  { month: 6, day: 4, label: "Independence Day", open: 11, close: 18 }, // July 4
  { month: 8, day: 7, label: "Labor Day", open: 11, close: 18 }, // September 7
  { month: 10, day: 26, label: "Thanksgiving", closed: true }, // November 26
];

function getHolidayOverride(date) {
  return HOLIDAY_HOURS.find(h => h.month === date.getMonth() && h.day === date.getDate());
}

// Hours: Mon–Sat 11:00–20:00, Sun 12:00–18:00
function getHoursForDay(day, date) {
  const holiday = getHolidayOverride(date);
  if (holiday) return holiday.closed ? { closed: true } : { open: holiday.open, close: holiday.close };
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
  const todayHours = getHoursForDay(day, now);

  if (!todayHours.closed && hourDecimal >= todayHours.open && hourDecimal < todayHours.close) {
    return { isOpen: true };
  }

  // Closed — find next opening
  if (!todayHours.closed && hourDecimal < todayHours.open) {
    return { isOpen: false, opensAt: formatHour(todayHours.open) };
  }
  // After close (or closed all day) — find the next open day
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);
    const nextHours = getHoursForDay(nextDate.getDay(), nextDate);
    if (!nextHours.closed) {
      return { isOpen: false, opensAt: formatHour(nextHours.open) };
    }
  }
  return { isOpen: false };
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
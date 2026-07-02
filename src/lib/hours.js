// Shared hours data + status logic, used by OpenClosedBadge, the Home
// page hours strip, and the Hours page.

export const WEEKLY_HOURS = [
  { day: 1, label: "Monday", open: 11, close: 20 },
  { day: 2, label: "Tuesday", open: 11, close: 20 },
  { day: 3, label: "Wednesday", open: 11, close: 20 },
  { day: 4, label: "Thursday", open: 11, close: 20 },
  { day: 5, label: "Friday", open: 11, close: 20 },
  { day: 6, label: "Saturday", open: 11, close: 20 },
  { day: 0, label: "Sunday", open: 12, close: 18 },
];

// Holiday overrides — month is 0-indexed to match Date#getMonth()
export const HOLIDAY_HOURS = [
  { month: 3, day: 5, label: "Easter (April 5)", closed: true },
  { month: 6, day: 4, label: "Independence Day (July 4)", open: 11, close: 18 },
  { month: 8, day: 7, label: "Labor Day (September 7)", open: 11, close: 18 },
  { month: 10, day: 26, label: "Thanksgiving (November 26)", closed: true },
];

function getHolidayOverride(date) {
  return HOLIDAY_HOURS.find(h => h.month === date.getMonth() && h.day === date.getDate());
}

export function getHoursForDay(day, date) {
  const holiday = getHolidayOverride(date);
  if (holiday) return holiday.closed ? { closed: true } : { open: holiday.open, close: holiday.close };
  const weekly = WEEKLY_HOURS.find(h => h.day === day);
  return { open: weekly.open, close: weekly.close };
}

export function formatHour(h) {
  const period = h >= 12 ? "PM" : "AM";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return `${hour}${period}`;
}

export function formatHourFull(h) {
  const period = h >= 12 ? "PM" : "AM";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return `${hour}:00 ${period}`;
}

export function formatRange(todayHours) {
  if (todayHours.closed) return "Closed";
  return `${formatHourFull(todayHours.open)} – ${formatHourFull(todayHours.close)}`;
}

export function computeStatus() {
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

export function getTodayHours() {
  const now = new Date();
  return formatRange(getHoursForDay(now.getDay(), now));
}

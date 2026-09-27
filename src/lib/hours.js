// Shared hours data + status logic, used by the Visit Us page.

export const WEEKLY_HOURS = [
  { day: 1, label: "Monday", open: 11, close: 20 },
  { day: 2, label: "Tuesday", open: 11, close: 20 },
  { day: 3, label: "Wednesday", open: 11, close: 20 },
  { day: 4, label: "Thursday", open: 11, close: 20 },
  { day: 5, label: "Friday", open: 11, close: 20 },
  { day: 6, label: "Saturday", open: 11, close: 20 },
  { day: 0, label: "Sunday", open: 12, close: 18 },
];

// Holiday overrides. Each rule computes its date for a given year, so the
// list stays correct every year without editing dates by hand.
function nthWeekday(year, month, weekday, n) {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
}

function lastWeekday(year, month, weekday) {
  const last = new Date(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - offset);
}

// Anonymous Gregorian algorithm for Easter Sunday
function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function thanksgiving(year) {
  return nthWeekday(year, 10, 4, 4);
}

function addDays(date, n) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

export const HOLIDAY_RULES = [
  { name: "New Year's Day", date: y => new Date(y, 0, 1), open: 11, close: 18 },
  { name: "Easter", date: easterSunday, closed: true },
  { name: "Memorial Day", date: y => lastWeekday(y, 4, 1), open: 11, close: 18 },
  { name: "Independence Day", date: y => new Date(y, 6, 4), open: 11, close: 18 },
  { name: "Labor Day", date: y => nthWeekday(y, 8, 1, 1), open: 11, close: 18 },
  { name: "Thanksgiving", date: thanksgiving, closed: true },
  { name: "Black Friday", date: y => addDays(thanksgiving(y), 1), open: 11, close: 21 },
  { name: "Small Business Saturday", date: y => addDays(thanksgiving(y), 2), open: 11, close: 21 },
  { name: "Christmas Eve", date: y => new Date(y, 11, 24), open: 11, close: 18 },
  { name: "Christmas Day", date: y => new Date(y, 11, 25), closed: true },
  { name: "New Year's Eve", date: y => new Date(y, 11, 31), open: 11, close: 18 },
];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getHolidayOverride(date) {
  return HOLIDAY_RULES.find(h => sameDay(h.date(date.getFullYear()), date));
}

// Every holiday's next occurrence (today or later), soonest first.
export function getUpcomingHolidays(from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return HOLIDAY_RULES.map(h => {
    let date = h.date(today.getFullYear());
    if (date < today) date = h.date(today.getFullYear() + 1);
    const label = `${h.name} (${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;
    return { ...h, date, label };
  }).sort((a, b) => a.date - b.date);
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

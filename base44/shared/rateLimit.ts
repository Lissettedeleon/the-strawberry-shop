// Shared attempt throttling, counted per rate key in a fixed time window.
// Returns true when the action is allowed, false when the key is over its limit.
export async function checkRateLimit(base44, rateKey, maxAttempts, windowMs) {
  const now = Date.now();
  const rows = await base44.asServiceRole.entities.EmailRateLimit.filter(
    { rate_key: rateKey },
    "-created_date",
    1
  );

  if (!rows || rows.length === 0) {
    await base44.asServiceRole.entities.EmailRateLimit.create({
      rate_key: rateKey,
      last_sent: new Date(now).toISOString(),
      window_start: new Date(now).toISOString(),
      attempts: 1,
    });
    return true;
  }

  const row = rows[0];
  const windowStart = new Date(row.window_start || row.last_sent).getTime();

  // Window elapsed (or unreadable) — start a fresh count.
  if (!Number.isFinite(windowStart) || now - windowStart >= windowMs) {
    await base44.asServiceRole.entities.EmailRateLimit.update(row.id, {
      attempts: 1,
      window_start: new Date(now).toISOString(),
      last_sent: new Date(now).toISOString(),
    });
    return true;
  }

  if ((row.attempts || 0) >= maxAttempts) return false;

  await base44.asServiceRole.entities.EmailRateLimit.update(row.id, {
    attempts: (row.attempts || 0) + 1,
    last_sent: new Date(now).toISOString(),
  });
  return true;
}
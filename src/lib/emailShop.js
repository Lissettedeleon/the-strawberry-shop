export const SHOP_EMAIL = "strawberryshopoh@gmail.com";

// Opens the visitor's email app with a message to the shop already filled in.
// Empty lines in `lines` are dropped.
export function emailShop(subject, lines) {
  const body = lines.filter((l) => l !== null && l !== undefined && l !== false && l !== "").join("\n");
  window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

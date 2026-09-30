// Sends a little strawberry from a button to the visible cart icon, then
// bounces the icon. Purely decorative: skipped when the viewer prefers
// reduced motion or no cart icon is on screen.
export function flyToCart(fromEl) {
  if (typeof window === "undefined" || !fromEl) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const cart = [...document.querySelectorAll("[data-cart-icon]")].find((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  if (!cart) return;

  const from = fromEl.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  const startX = from.left + from.width / 2;
  const startY = from.top + from.height / 2;
  const dx = to.left + to.width / 2 - startX;
  const dy = to.top + to.height / 2 - startY;

  const berry = document.createElement("div");
  berry.textContent = "🍓";
  berry.setAttribute("aria-hidden", "true");
  Object.assign(berry.style, {
    position: "fixed",
    left: `${startX - 14}px`,
    top: `${startY - 14}px`,
    fontSize: "28px",
    lineHeight: "1",
    zIndex: "9999",
    pointerEvents: "none",
  });
  document.body.appendChild(berry);

  // Arc: rise a little first, then drop into the cart.
  const anim = berry.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${Math.min(dy, 0) * 0.45 - 90}px) scale(1.25) rotate(-20deg)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.45) rotate(15deg)`, opacity: 0.9 },
    ],
    { duration: 750, easing: "cubic-bezier(.45,.05,.4,1)" }
  );
  anim.onfinish = () => {
    berry.remove();
    cart.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.35) rotate(-8deg)" },
        { transform: "scale(0.9) rotate(6deg)" },
        { transform: "scale(1)" },
      ],
      { duration: 450, easing: "ease-out" }
    );
  };
}

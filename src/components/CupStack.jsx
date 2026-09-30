import React from "react";
import { AnimatePresence, motion } from "framer-motion";

// Build Your Own: a drawn cup that fills up as the customer picks a base,
// toppings and sauces. Each new layer drops in from above.

const BASE_COLORS = {
  "House Cream": ["#FFF7EC"],
  "Matcha Cream": ["#C7DB9C"],
  Both: ["#FFF7EC", "#C7DB9C"],
};

const TOPPING_COLORS = {
  Oreo: "#2B2320",
  Brownie: "#5A3420",
  "Tres Leches Cake": "#F3DDB0",
  Peanuts: "#C98A4B",
  "Mini Marshmallows": "#FFFFFF",
  "Cookie Dough": "#D7A86E",
  "Biscoff cookie": "#B8733A",
  "M&M's": "#3B7DD8",
  Pretzels: "#8A4B22",
  Kataifi: "#D9A441",
  Cream: "#FFF7EC",
};

const SAUCE_COLORS = {
  "Condensed Milk": "#F6EEDB",
  "Dulce De Leche": "#C07A34",
  Nutella: "#5A3420",
  "White Chocolate": "#FFF4E2",
  "Milk Chocolate": "#7B4A2A",
  "Dark Chocolate": "#3E2418",
  "Pistachio Cream": "#A8C46A",
};

const drop = {
  initial: { y: -60, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.2 } },
};

// Cup interior spans x 30..170; y grows downward (rim at 40, bottom at 190).
function Crumbs({ color, seed, y }) {
  const bits = Array.from({ length: 12 }, (_, i) => {
    const r = Math.sin(seed * 97 + i * 13.7) * 0.5 + 0.5;
    const r2 = Math.sin(seed * 31 + i * 7.3) * 0.5 + 0.5;
    return { x: 44 + i * 10 + r * 6, y: y + r2 * 10, s: 4 + r * 4 };
  });
  return bits.map((b, i) => (
    <rect key={i} x={b.x} y={b.y} width={b.s} height={b.s} rx={1.5} fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" transform={`rotate(${(i * 37) % 60 - 30} ${b.x} ${b.y})`} />
  ));
}

export default function CupStack({ base, toppings, sauces }) {
  const baseColors = BASE_COLORS[base] || [];
  const empty = !base && toppings.length === 0 && sauces.length === 0;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 210" className="w-40 h-40" role="img" aria-label="Your cup">
        <defs>
          <clipPath id="cup-inside">
            <path d="M30 40 L170 40 L155 190 Q100 200 45 190 Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#cup-inside)">
          {/* strawberries always sit at the bottom */}
          <rect x="0" y="150" width="200" height="60" fill="#E61F3F" />
          {[50, 78, 106, 134, 158].map((x, i) => (
            <circle key={x} cx={x} cy={160 + (i % 2) * 8} r="14" fill={i % 2 ? "#F0445E" : "#D01535"} />
          ))}

          <AnimatePresence>
            {baseColors.map((c, i) => (
              <motion.rect key={`base-${base}-${i}`} {...drop} x={i === 1 ? 100 : 0} y="110" width={baseColors.length === 2 ? 100 : 200} height="44" fill={c} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {toppings.map((t, i) => (
              <motion.g key={`top-${t}`} {...drop}>
                <Crumbs color={TOPPING_COLORS[t] || "#B8733A"} seed={t.length + i} y={i === 0 ? 92 : 74} />
              </motion.g>
            ))}
          </AnimatePresence>
        </g>

        <AnimatePresence>
          {sauces.map((s, i) => (
            <motion.path
              key={`sauce-${s}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              d={i === 0
                ? "M40 70 Q60 55 75 72 T110 70 T145 72 T165 64"
                : "M45 88 Q65 76 85 90 T120 86 T160 82"}
              fill="none"
              stroke={SAUCE_COLORS[s] || "#7B4A2A"}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </AnimatePresence>

        {/* the clear cup and its sticker */}
        <path d="M30 40 L170 40 L155 190 Q100 200 45 190 Z" fill="rgba(255,255,255,0.18)" stroke="#E0A4B0" strokeWidth="3" />
        <rect x="24" y="34" width="152" height="9" rx="4.5" fill="#fff" stroke="#E0A4B0" strokeWidth="2" />
        <circle cx="100" cy="150" r="20" fill="#E61F3F" stroke="#fff" strokeWidth="2.5" />
        <text x="100" y="147" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="Fredoka, sans-serif">the straw</text>
        <text x="100" y="156" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="Fredoka, sans-serif">berry</text>
      </svg>
      <p className="font-body text-xs text-muted-foreground -mt-1">
        {empty ? "Pick a base to start your cup" : "Your cup so far"}
      </p>
    </div>
  );
}

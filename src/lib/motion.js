// Shared easing curves, in the spirit of Emil Kowalski's motion work (Vaul, emilkowal.ski).
// Prefer duration + curve for deliberate, system-triggered motion (opens/closes);
// reserve spring for anything gesture-driven or interruptible.

// Strong ease-out — default for things entering the screen (dropdowns, cards, reveals).
export const EASE_OUT_STRONG = [0.23, 1, 0.32, 1];

// Strong ease-in-out — for on-screen repositioning (progress lines, draws).
export const EASE_IN_OUT_STRONG = [0.77, 0, 0.175, 1];

// The exact curve Vaul ships for its drawer sheets, matching native iOS sheet motion.
export const EASE_SHEET = [0.32, 0.72, 0, 1];

export const SHEET_TRANSITION = { duration: 0.5, ease: EASE_SHEET };

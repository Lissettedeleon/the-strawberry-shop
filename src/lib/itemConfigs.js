// ---- Standard toppings & sauces (used across most customizable cups) ----

export const TOPPING_PRICE = 1.0;

export const STANDARD_TOPPINGS = [
  "Oreo", "Brownie", "Tres Leches Cake", "Peanuts", "Mini Marshmallows",
  "Cookie Dough", "Biscoff cookie", "M&M's", "Pretzels", "Kataifi", "Cream",
];

export const STANDARD_SAUCES = [
  { name: "Condensed Milk", price: 1 },
  { name: "Dulce De Leche", price: 1 },
  { name: "Nutella", price: 1 },
  { name: "Biscoff", price: 1 },
  { name: "Milk Chocolate", price: 2 },
  { name: "White Chocolate", price: 2 },
  { name: "Dark Chocolate", price: 2 },
  { name: "Pistachio Cream", price: 2 },
];

// "Toppings chocolates" for Chocolate Covered Strawberries / Half & Half —
// standard toppings plus the non-chocolate sauces (adding a chocolate sauce
// to an already chocolate-covered strawberry doesn't apply), all $1 except
// Pistachio Cream at $2.
export const TOPPINGS_CHOCOLATES = [
  ...STANDARD_TOPPINGS.map((name) => ({ name, price: TOPPING_PRICE })),
  { name: "Condensed Milk", price: 1 },
  { name: "Dulce De Leche", price: 1 },
  { name: "Nutella", price: 1 },
  { name: "Biscoff", price: 1 },
  { name: "Pistachio Cream", price: 2 },
];

export const HALF_AND_HALF_CHOCOLATES = ["Milk", "White", "Dark", "Nutella"];

// ---- Build Your Own Cup ----

export const BYO_BASES = ["House Cream", "Matcha Cream", "Both"];
export const BYO_TOPPINGS = STANDARD_TOPPINGS;
export const BYO_SAUCES = [
  { name: "Condensed Milk", price: 0 },
  { name: "Dulce De Leche", price: 0 },
  { name: "Nutella", price: 0 },
  { name: "White Chocolate", price: 1 },
  { name: "Milk Chocolate", price: 1 },
  { name: "Dark Chocolate", price: 1 },
  { name: "Pistachio Cream", price: 2 },
];

export const DUBAI_ADD_CREAM_PRICE = 1.0;

export function priceOf(list, name) {
  const found = list.find((x) => x.name === name);
  return found ? found.price : 0;
}

// ---- Per-item configs ----
// type: "simple" — quantity only, no customization
// type: "ingredient_removal" — toggle off included ingredients, no additions
// type: "toppings_sauces" — Standard Toppings (up to 2, $1 each) + Standard
//   Additional Sauces (up to 2, tiered)
// type: "choc_toppings" — single "toppings chocolates" list (up to 2, tiered)
// type: "half_and_half" — pick exactly 2 chocolates, plus optional toppings
//   chocolates (up to 2, tiered)
// type: "build_your_own" — required base + required toppings (free) +
//   required sauces (tiered)
// type: "dubai" — remove included ingredients + paid "Add cream" addon

const OG_CONFIG = {
  type: "toppings_sauces",
  ingredients: ["House Cream", "Fresh Strawberries"],
};

const HALF_AND_HALF_CONFIG = {
  type: "half_and_half",
};

export const ITEM_CONFIGS = {
  "The St. Pete's": {
    type: "ingredient_removal",
    ingredients: ["Pretzels", "Brownie Bites", "Nutella", "Dulce de Leche", "House Cream", "Fresh Strawberries"],
    removable_ingredients: ["Nutella", "Dulce de Leche", "Brownie Bites", "Pretzels"],
  },
  "Biscoff": {
    type: "ingredient_removal",
    ingredients: ["Biscoff Crumbs", "Biscoff Sauce", "House Cream", "Fresh Strawberries"],
  },
  "OG": OG_CONFIG,
  "Og": OG_CONFIG,
  "Matcha": {
    type: "toppings_sauces",
    ingredients: ["Matcha Cream", "House Cream", "Matcha Powder", "Fresh Strawberries"],
  },
  "Tres Leches": {
    type: "toppings_sauces",
    ingredients: ["House Cream", "Tres Leches Cake Bites", "Nutella", "Fresh Strawberries"],
  },
  "Brownie": {
    type: "toppings_sauces",
    ingredients: ["House Cream", "Nutella", "Dulce de Leche", "Brownie Bites", "Fresh Strawberries"],
  },
  "Oreo": {
    type: "toppings_sauces",
    ingredients: ["House Cream", "Nutella", "Oreo Bites", "Fresh Strawberries"],
  },
  "Summer Peach": {
    type: "toppings_sauces",
    ingredients: ["White Chocolate", "Cookie Crumble"],
    removable_ingredients: ["White Chocolate", "Cookie Crumble"],
  },
  "Dubai": {
    type: "dubai",
    ingredients: ["Pistachio Cream", "Kataifi", "Nutella", "Chocolate Sauce", "Fresh Strawberries"],
    removable_ingredients: ["Pistachio Cream", "Nutella", "Chocolate Sauce"],
    addons: [{ name: "Add cream", price: DUBAI_ADD_CREAM_PRICE }],
  },
  "Belgian Milk Chocolate": {
    type: "choc_toppings",
    ingredients: ["Milk Chocolate"],
  },
  "Belgian White Chocolate": {
    type: "choc_toppings",
    ingredients: ["White Chocolate"],
  },
  "Belgian Dark Chocolate": {
    type: "choc_toppings",
    ingredients: ["Dark Chocolate"],
  },
  "Half & Half": HALF_AND_HALF_CONFIG,
  "Build Your Own Cup": {
    type: "build_your_own",
  },
  "Cup of Strawberries": {
    type: "simple",
    ingredients: ["Fresh Strawberries"],
  },
  "Strawberries & Nutella": {
    type: "simple",
    ingredients: ["Nutella", "Fresh Strawberries"],
  },
  "Water": {
    type: "simple",
  },
};

// Liberty Township, OH (Butler County) combined sales tax rate.
// Confirm against your Toast POS tax settings before relying on this.
export const TAX_RATE = 0.065;

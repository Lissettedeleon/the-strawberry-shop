// Server-side order pricing. Base prices come from the MenuItem catalog and
// extras are recomputed from the customer's selections, so totals written to
// an Order never come from the browser. Mirrors src/lib/itemConfigs.js.

export const TAX_RATE = 0.065;

const TOPPING_PRICE = 1.0;

const STANDARD_SAUCES = [
  { name: "Condensed Milk", price: 1 },
  { name: "Dulce De Leche", price: 1 },
  { name: "Nutella", price: 1 },
  { name: "Biscoff", price: 1 },
  { name: "Milk Chocolate", price: 2 },
  { name: "White Chocolate", price: 2 },
  { name: "Dark Chocolate", price: 2 },
  { name: "Pistachio Cream", price: 2 },
];

const STANDARD_TOPPINGS = [
  "Oreo", "Brownie", "Tres Leches Cake", "Peanuts", "Mini Marshmallows",
  "Cookie Dough", "Biscoff cookie", "M&M's", "Pretzels", "Kataifi", "Cream",
];

const TOPPINGS_CHOCOLATES = [
  ...STANDARD_TOPPINGS.map((name) => ({ name, price: TOPPING_PRICE })),
  { name: "Condensed Milk", price: 1 },
  { name: "Dulce De Leche", price: 1 },
  { name: "Nutella", price: 1 },
  { name: "Biscoff", price: 1 },
  { name: "Pistachio Cream", price: 2 },
];

const BYO_SAUCES = [
  { name: "Condensed Milk", price: 0 },
  { name: "Dulce De Leche", price: 0 },
  { name: "Nutella", price: 0 },
  { name: "White Chocolate", price: 1 },
  { name: "Milk Chocolate", price: 1 },
  { name: "Dark Chocolate", price: 1 },
  { name: "Pistachio Cream", price: 2 },
];

const DUBAI_ADDONS = [{ name: "Add cream", price: 1 }];

const ITEM_TYPES = {
  "The St. Pete's": "ingredient_removal",
  "Biscoff": "ingredient_removal",
  "OG": "toppings_sauces",
  "Og": "toppings_sauces",
  "Matcha": "toppings_sauces",
  "Tres Leches": "toppings_sauces",
  "Brownie": "toppings_sauces",
  "Oreo": "toppings_sauces",
  "Summer Peach": "toppings_sauces",
  "Dubai": "dubai",
  "Belgian Milk Chocolate": "choc_toppings",
  "Belgian White Chocolate": "choc_toppings",
  "Belgian Dark Chocolate": "choc_toppings",
  "Half & Half": "half_and_half",
  "Build Your Own Cup": "build_your_own",
  "Cup of Strawberries": "simple",
  "Strawberries & Nutella": "simple",
  "Water": "simple",
};

function round2(value) {
  return Math.round(value * 100) / 100;
}

function priceIn(list, name) {
  const found = list.find((entry) => entry.name === name);
  return found ? found.price : 0;
}

function stringList(value, max) {
  if (!Array.isArray(value)) return [];
  return value.filter((entry) => typeof entry === "string" && entry.length <= 80).slice(0, max);
}

function shortText(value, max) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

/**
 * Re-prices a submitted cart against the catalog.
 * @param rawItems items as submitted by the browser
 * @param catalogPrices Map of menu item name -> catalog price
 * @throws Error('unavailable_item') when an item is no longer on the menu
 */
export function priceItems(rawItems, catalogPrices) {
  const items = [];

  for (const raw of rawItems) {
    const name = shortText(raw && raw.name, 120).trim();
    if (!name || !catalogPrices.has(name)) {
      const error = new Error("item_unavailable");
      throw error;
    }

    const basePrice = Number(catalogPrices.get(name)) || 0;
    const quantity = Math.min(50, Math.max(1, Math.floor(Number(raw.quantity)) || 1));

    const selectedToppings = stringList(raw.selected_toppings, 2);
    const selectedSauces = stringList(raw.selected_sauces, 2);
    const selectedChocToppings = stringList(raw.selected_choc_toppings, 2);
    const selectedAddons = stringList(raw.selected_addons ?? raw.extras, 4);

    const type = ITEM_TYPES[name] || "generic";
    let extras = 0;

    if (type === "toppings_sauces") {
      extras = selectedToppings.length * TOPPING_PRICE +
        selectedSauces.reduce((sum, sauce) => sum + priceIn(STANDARD_SAUCES, sauce), 0);
    } else if (type === "choc_toppings" || type === "half_and_half") {
      extras = selectedChocToppings.reduce((sum, topping) => sum + priceIn(TOPPINGS_CHOCOLATES, topping), 0);
    } else if (type === "build_your_own") {
      extras = selectedSauces.reduce((sum, sauce) => sum + priceIn(BYO_SAUCES, sauce), 0);
    } else if (type === "dubai") {
      extras = selectedAddons.reduce((sum, addon) => sum + priceIn(DUBAI_ADDONS, addon), 0);
    } else if (type === "generic") {
      // Unknown/new catalog item: price its paid selections with the standard lists.
      extras = selectedToppings.length * TOPPING_PRICE +
        selectedSauces.reduce((sum, sauce) => sum + priceIn(STANDARD_SAUCES, sauce), 0) +
        selectedChocToppings.reduce((sum, topping) => sum + priceIn(TOPPINGS_CHOCOLATES, topping), 0) +
        selectedAddons.reduce((sum, addon) => sum + priceIn(DUBAI_ADDONS, addon), 0);
    }

    extras = round2(extras);
    const itemTotal = round2((basePrice + extras) * quantity);

    items.push({
      name,
      base_price: basePrice,
      quantity,
      ingredients: stringList(raw.ingredients, 12),
      removed_ingredients: stringList(raw.removed_ingredients, 12),
      extras: selectedAddons,
      selected_addons: selectedAddons,
      extras_total: extras,
      chocolate_selections: stringList(raw.chocolate_selections, 2),
      selected_toppings: selectedToppings,
      selected_choc_toppings: selectedChocToppings,
      selected_sauces: selectedSauces,
      base_selection: shortText(raw.base_selection, 60),
      special_instructions: shortText(raw.special_instructions, 500),
      item_total: itemTotal,
    });
  }

  const subtotal = round2(items.reduce((sum, item) => sum + item.item_total, 0));
  const tax = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + tax);

  return { items, subtotal, tax, total };
}
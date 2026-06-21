export const ITEM_CONFIGS = {
  "The St. Pete's": {
    ingredients: ["Pretzels", "Brownie Bites", "Nutella", "Dulce de Leche", "House Cream", "Fresh Strawberries"]
  },
  "Biscoff": {
    ingredients: ["Biscoff Crumbs", "Biscoff Sauce", "House Cream", "Fresh Strawberries"]
  },
  "OG": {
    ingredients: ["House Cream", "Fresh Strawberries"]
  },
  "Matcha": {
    ingredients: ["Matcha Cream", "House Cream", "Matcha Powder", "Fresh Strawberries"]
  },
  "Tres Leches": {
    ingredients: ["House Cream", "Tres Leches Cake Bites", "Nutella", "Fresh Strawberries"]
  },
  "Brownie": {
    ingredients: ["House Cream", "Nutella", "Dulce de Leche", "Brownie Bites", "Fresh Strawberries"]
  },
  "Oreo": {
    ingredients: ["House Cream", "Nutella", "Oreo Bites", "Fresh Strawberries"]
  },
  "Dubai": {
    ingredients: ["Pistachio Cream", "Nutella", "Chocolate Sauce", "Fresh Strawberries"]
  },
  "Belgian Milk Chocolate Strawberries": {
    ingredients: ["Milk Chocolate"]
  },
  "Belgian White Chocolate Strawberries": {
    ingredients: ["White Chocolate"]
  },
  "Belgian Dark Chocolate Strawberries": {
    ingredients: ["Dark Chocolate"]
  },
  "Half and Half Chocolate Strawberries": {
    type: "chocolate_picker"
  },
  "Build Your Own Cup": {
    type: "build_your_own"
  },
  "Cup of Strawberries": {
    ingredients: ["Fresh Strawberries"]
  },
  "Strawberries and Nutella": {
    ingredients: ["Nutella", "Fresh Strawberries"]
  },
  "Water": {
    type: "simple"
  },
};

export const TOPPINGS = [
  "Brownie Bites", "Oreo Bites", "Biscoff Crumbs", "Pretzel Crumbs",
  "Tres Leches Cake Bites", "Matcha Powder", "Pistachio Cream"
];

export const SAUCES = [
  "Nutella", "Dulce de Leche", "Chocolate Sauce", "Biscoff Sauce", "Matcha Sauce"
];

export const ALL_EXTRAS = [...TOPPINGS, ...SAUCES];

export const CHOCOLATE_TYPES = ["Milk", "White", "Dark"];

export const EXTRA_PRICE = 1.00;
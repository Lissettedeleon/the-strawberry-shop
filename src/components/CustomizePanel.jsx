import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  ITEM_CONFIGS,
  STANDARD_TOPPINGS,
  STANDARD_SAUCES,
  TOPPINGS_CHOCOLATES,
  HALF_AND_HALF_CHOCOLATES,
  BYO_BASES,
  BYO_TOPPINGS,
  BYO_SAUCES,
  TOPPING_PRICE,
  priceOf,
} from "@/lib/itemConfigs";

function priceLabel(price) {
  return price > 0 ? `+$${price.toFixed(2)}` : "Free";
}

function ChipPicker({ title, subtitle, items, selected, onToggle, max, showPrice = true }) {
  return (
    <div>
      <h4 className="font-body font-bold text-sm text-foreground mb-2">{title}</h4>
      {subtitle && <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>}
      <div className="flex flex-wrap gap-2">
        {items.map(({ name, price }) => {
          const isSelected = selected.includes(name);
          const isDisabled = !isSelected && !!max && selected.length >= max;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onToggle(name)}
              disabled={isDisabled}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                isSelected
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30 disabled:opacity-40"
              }`}
            >
              {name}{showPrice ? ` (${priceLabel(price)})` : ""}
            </button>
          );
        })}
      </div>
      {max > 0 && <p className="text-xs text-muted-foreground mt-1.5">{selected.length}/{max} selected</p>}
    </div>
  );
}

function RemovalChips({ ingredients, removed, onToggle }) {
  if (ingredients.length === 0) return null;
  return (
    <div>
      <h4 className="font-body font-bold text-sm text-foreground mb-2">Remove Ingredients</h4>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ing) => (
          <button
            key={ing}
            type="button"
            onClick={() => onToggle(ing)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
              removed.includes(ing)
                ? "bg-red-100 text-red-600 border-2 border-red-300"
                : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30"
            }`}
          >
            No {ing}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CustomizePanel({ item, onAddToCart, onAddSimple }) {
  const config = item.name ? ITEM_CONFIGS[item.name] : null;
  const type = config?.type || "ingredient_removal";
  const ingredients = config?.ingredients || [];
  const removableIngredients = config?.removable_ingredients || ingredients;
  const addons = config?.addons || [];

  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedChocToppings, setSelectedChocToppings] = useState([]);
  const [chocolateSelections, setChocolateSelections] = useState([]);
  const [baseCream, setBaseCream] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);

  const toggleInList = (setter, max) => (value) => {
    setter((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (max && prev.length >= max) return prev;
      return [...prev, value];
    });
  };

  const toggleIngredient = toggleInList(setRemovedIngredients);
  const toggleTopping = toggleInList(setSelectedToppings, 2);
  const toggleSauce = toggleInList(setSelectedSauces, 2);
  const toggleChocTopping = toggleInList(setSelectedChocToppings, 2);
  const toggleAddon = toggleInList(setSelectedAddons);

  const toggleChocolate = (choc) => {
    setChocolateSelections((prev) => {
      if (prev.includes(choc)) return prev.filter((c) => c !== choc);
      if (prev.length >= 2) return prev;
      return [...prev, choc];
    });
  };

  let extrasTotal = 0;
  if (type === "toppings_sauces") {
    extrasTotal =
      selectedToppings.length * TOPPING_PRICE +
      selectedSauces.reduce((s, name) => s + priceOf(STANDARD_SAUCES, name), 0);
  } else if (type === "choc_toppings" || type === "half_and_half") {
    extrasTotal = selectedChocToppings.reduce((s, name) => s + priceOf(TOPPINGS_CHOCOLATES, name), 0);
  } else if (type === "build_your_own") {
    extrasTotal = selectedSauces.reduce((s, name) => s + priceOf(BYO_SAUCES, name), 0);
  } else if (type === "dubai") {
    extrasTotal = selectedAddons.reduce((s, name) => {
      const addon = addons.find((a) => a.name === name);
      return s + (addon ? addon.price : 0);
    }, 0);
  }

  const itemTotal = ((item.price || 0) + extrasTotal) * quantity;

  const canAddToCart = () => {
    if (type === "half_and_half") return chocolateSelections.length === 2;
    if (type === "build_your_own") return !!baseCream && selectedToppings.length >= 1 && selectedSauces.length >= 1;
    return true;
  };

  const handleAddToCart = () => {
    onAddToCart({
      name: item.name,
      base_price: item.price,
      quantity,
      ingredients,
      removed_ingredients: removedIngredients,
      extras: selectedAddons,
      extras_total: extrasTotal,
      chocolate_selections: chocolateSelections,
      selected_toppings: selectedToppings,
      selected_sauces: selectedSauces,
      selected_choc_toppings: selectedChocToppings,
      base_selection: baseCream,
      selected_addons: selectedAddons,
      special_instructions: instructions,
      item_total: itemTotal,
    });
  };

  if (type === "simple") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-body font-semibold text-foreground text-sm">Quantity</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"><Minus size={14} /></button>
            <span className="font-body font-bold text-foreground w-6 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"><Plus size={14} /></button>
          </div>
        </div>
        <button
          onClick={() => onAddSimple(item, quantity)}
          className="w-full bg-primary text-white font-body font-bold py-3 rounded-full hover:bg-primary/90 transition-colors text-sm"
        >
          Add to Cart — ${(item.price * quantity).toFixed(2)}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {(type === "ingredient_removal" || type === "dubai") && (
        <RemovalChips ingredients={removableIngredients} removed={removedIngredients} onToggle={toggleIngredient} />
      )}

      {type === "dubai" && addons.length > 0 && (
        <ChipPicker
          title="Add-ons"
          items={addons}
          selected={selectedAddons}
          onToggle={toggleAddon}
        />
      )}

      {type === "toppings_sauces" && (
        <>
          <ChipPicker
            title="Toppings (up to 2)"
            items={STANDARD_TOPPINGS.map((name) => ({ name, price: TOPPING_PRICE }))}
            selected={selectedToppings}
            onToggle={toggleTopping}
            max={2}
          />
          <ChipPicker
            title="Additional Sauces (up to 2)"
            items={STANDARD_SAUCES}
            selected={selectedSauces}
            onToggle={toggleSauce}
            max={2}
          />
        </>
      )}

      {type === "choc_toppings" && (
        <ChipPicker
          title="Toppings (up to 2)"
          items={TOPPINGS_CHOCOLATES}
          selected={selectedChocToppings}
          onToggle={toggleChocTopping}
          max={2}
        />
      )}

      {type === "half_and_half" && (
        <>
          <ChipPicker
            title="Choose 2 Chocolates (required)"
            items={HALF_AND_HALF_CHOCOLATES.map((name) => ({ name, price: 0 }))}
            selected={chocolateSelections}
            onToggle={toggleChocolate}
            max={2}
            showPrice={false}
          />
          <ChipPicker
            title="Toppings (up to 2, optional)"
            items={TOPPINGS_CHOCOLATES}
            selected={selectedChocToppings}
            onToggle={toggleChocTopping}
            max={2}
          />
        </>
      )}

      {type === "build_your_own" && (
        <>
          <ChipPicker
            title="Base Cream (required, pick 1)"
            items={BYO_BASES.map((name) => ({ name, price: 0 }))}
            selected={baseCream ? [baseCream] : []}
            onToggle={(name) => setBaseCream((prev) => (prev === name ? "" : name))}
            max={1}
            showPrice={false}
          />
          <ChipPicker
            title="Toppings (required, pick 1–2)"
            items={BYO_TOPPINGS.map((name) => ({ name, price: 0 }))}
            selected={selectedToppings}
            onToggle={toggleTopping}
            max={2}
          />
          <ChipPicker
            title="Sauces (required, pick 1–2)"
            items={BYO_SAUCES}
            selected={selectedSauces}
            onToggle={toggleSauce}
            max={2}
          />
        </>
      )}

      {/* Special Instructions */}
      <div>
        <h4 className="font-body font-bold text-sm text-foreground mb-2">Special Instructions</h4>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Any special requests..."
          rows={2}
          className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          We'll do our best to accommodate special requests but may not be able to honor all substitutes. Extra charges may apply.
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <span className="font-body font-semibold text-foreground text-sm">Quantity</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"><Minus size={14} /></button>
          <span className="font-body font-bold text-foreground w-6 text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"><Plus size={14} /></button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={!canAddToCart()}
        className="w-full bg-primary text-white font-body font-bold py-3 rounded-full hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
      >
        Add to Cart — ${itemTotal.toFixed(2)}
      </button>
    </div>
  );
}

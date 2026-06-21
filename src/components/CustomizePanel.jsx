import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ITEM_CONFIGS, TOPPINGS, SAUCES, ALL_EXTRAS, CHOCOLATE_TYPES, EXTRA_PRICE } from "@/lib/itemConfigs";

export default function CustomizePanel({ item, onAddToCart, onAddSimple }) {
  const config = item.name ? ITEM_CONFIGS[item.name] : null;
  const ingredients = config?.ingredients || [];
  const isChocolatePicker = config?.type === "chocolate_picker";
  const isBuildYourOwn = config?.type === "build_your_own";
  const isSimple = config?.type === "simple";

  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [extras, setExtras] = useState({});
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [chocolateSelections, setChocolateSelections] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);

  const toggleIngredient = (ing) => {
    setRemovedIngredients(prev =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const toggleChocolate = (choc) => {
    setChocolateSelections(prev => {
      if (prev.includes(choc)) return prev.filter(c => c !== choc);
      if (prev.length >= 2) return prev;
      return [...prev, choc];
    });
  };

  const toggleTopping = (t) => {
    setSelectedToppings(prev => {
      if (prev.includes(t)) return prev.filter(x => x !== t);
      if (prev.length >= 2) return prev;
      return [...prev, t];
    });
  };

  const toggleSauce = (s) => {
    setSelectedSauces(prev => {
      if (prev.includes(s)) return prev.filter(x => x !== s);
      if (prev.length >= 2) return prev;
      return [...prev, s];
    });
  };

  const adjustExtra = (name, delta) => {
    setExtras(prev => {
      const current = prev[name] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: next };
    });
  };

  const extraCount = Object.values(extras).reduce((s, v) => s + v, 0);
  const extraTotal = extraCount * EXTRA_PRICE;
  const itemTotal = ((item.price || 0) + extraTotal) * quantity;

  const canAddToCart = () => {
    if (isChocolatePicker && chocolateSelections.length !== 2) return false;
    return true;
  };

  const handleAddToCart = () => {
    onAddToCart({
      name: item.name,
      base_price: item.price,
      quantity,
      removed_ingredients: removedIngredients,
      extras: Object.entries(extras).filter(([,c]) => c > 0).map(([n]) => n),
      extra_count: extraCount,
      chocolate_selections: chocolateSelections,
      selected_toppings: selectedToppings,
      selected_sauces: selectedSauces,
      special_instructions: instructions,
      item_total: itemTotal,
    });
  };

  if (isSimple) {
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
      {/* Remove Ingredients */}
      {ingredients.length > 0 && (
        <div>
          <h4 className="font-body font-bold text-sm text-foreground mb-2">Remove Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ing => (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                  removedIngredients.includes(ing)
                    ? "bg-red-100 text-red-600 border-2 border-red-300"
                    : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30"
                }`}
              >
                No {ing}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chocolate Picker */}
      {isChocolatePicker && (
        <div>
          <h4 className="font-body font-bold text-sm text-foreground mb-2">Choose 2 Chocolate Types</h4>
          <div className="flex flex-wrap gap-2">
            {CHOCOLATE_TYPES.map(choc => (
              <button
                key={choc}
                onClick={() => toggleChocolate(choc)}
                disabled={!chocolateSelections.includes(choc) && chocolateSelections.length >= 2}
                className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-all ${
                  chocolateSelections.includes(choc)
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30 disabled:opacity-40"
                }`}
              >
                {choc} Chocolate
              </button>
            ))}
          </div>
          {chocolateSelections.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1.5">{chocolateSelections.length}/2 selected</p>
          )}
        </div>
      )}

      {/* Build Your Own */}
      {isBuildYourOwn && (
        <>
          <div>
            <h4 className="font-body font-bold text-sm text-foreground mb-2">Choose Your Toppings (up to 2)</h4>
            <div className="flex flex-wrap gap-2">
              {TOPPINGS.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTopping(t)}
                  disabled={!selectedToppings.includes(t) && selectedToppings.length >= 2}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                    selectedToppings.includes(t)
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30 disabled:opacity-40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {selectedToppings.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1.5">{selectedToppings.length}/2 selected</p>
            )}
          </div>
          <div>
            <h4 className="font-body font-bold text-sm text-foreground mb-2">Choose Your Sauces (up to 2)</h4>
            <div className="flex flex-wrap gap-2">
              {SAUCES.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSauce(s)}
                  disabled={!selectedSauces.includes(s) && selectedSauces.length >= 2}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                    selectedSauces.includes(s)
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground/70 border-2 border-transparent hover:border-primary/30 disabled:opacity-40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {selectedSauces.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1.5">{selectedSauces.length}/2 selected</p>
            )}
          </div>
        </>
      )}

      {/* Add Extras */}
      {!isSimple && (
        <div>
          <h4 className="font-body font-bold text-sm text-foreground mb-2">Add Extras ($1.00 each)</h4>
          <div className="space-y-1.5">
            {ALL_EXTRAS.map(extra => (
              <div key={extra} className="flex items-center justify-between py-1">
                <span className="font-body text-xs text-foreground/80">{extra}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustExtra(extra, -1)}
                    disabled={!extras[extra]}
                    className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 disabled:opacity-30 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-body font-bold text-xs w-4 text-center">{extras[extra] || 0}</span>
                  <button
                    onClick={() => adjustExtra(extra, 1)}
                    className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Instructions */}
      <div>
        <h4 className="font-body font-bold text-sm text-foreground mb-2">Special Instructions</h4>
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
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
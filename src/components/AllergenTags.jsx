import React from "react";
import { Nut, Milk, Wheat, Leaf } from "lucide-react";

const TAG_CONFIG = {
  "Contains Nuts": { icon: Nut, color: "bg-amber-100 text-amber-700", label: "Nuts" },
  "Contains Dairy": { icon: Milk, color: "bg-blue-100 text-blue-700", label: "Dairy" },
  "Gluten-Containing": { icon: Wheat, color: "bg-orange-100 text-orange-700", label: "Gluten" },
  "Vegetarian": { icon: Leaf, color: "bg-green-100 text-green-700", label: "Vegetarian" },
};

export default function AllergenTags({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {allergens.map(tag => {
        const cfg = TAG_CONFIG[tag];
        if (!cfg) return null;
        const Icon = cfg.icon;
        return (
          <span key={tag} className={`inline-flex items-center gap-1 text-[11px] font-body font-bold px-2 py-0.5 rounded-full ${cfg.color}`}>
            <Icon size={11} /> {cfg.label}
          </span>
        );
      })}
    </div>
  );
}
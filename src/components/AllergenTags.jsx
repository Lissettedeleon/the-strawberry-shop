import React from "react";
import { Nut, Milk, Wheat, Leaf } from "lucide-react";

const TAG_CONFIG = {
  "Contains Nuts": { icon: Nut, label: "Nuts", className: "bg-amber-100 text-amber-700" },
  "Contains Dairy": { icon: Milk, label: "Dairy", className: "bg-blue-100 text-blue-700" },
  "Gluten-Containing": { icon: Wheat, label: "Gluten", className: "bg-orange-100 text-orange-700" },
  "Vegetarian": { icon: Leaf, label: "Veggie", className: "bg-green-100 text-green-700" },
};

export default function AllergenTags({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {allergens.map(tag => {
        const config = TAG_CONFIG[tag];
        if (!config) return null;
        const Icon = config.icon;
        return (
          <span
            key={tag}
            title={tag}
            className={`inline-flex items-center gap-1 text-[11px] font-body font-bold px-2 py-0.5 rounded-full ${config.className}`}
          >
            <Icon size={11} /> {config.label}
          </span>
        );
      })}
    </div>
  );
}
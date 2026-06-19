import React from "react";
import { Nut } from "lucide-react";

export default function AllergenTags({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  const hasNuts = allergens.includes("Contains Nuts");
  if (!hasNuts) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      <span className="inline-flex items-center gap-1 text-[11px] font-body font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        <Nut size={11} /> Nuts
      </span>
    </div>
  );
}
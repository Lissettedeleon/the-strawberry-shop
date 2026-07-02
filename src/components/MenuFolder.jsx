import React from "react";
import MenuFolderRow from "./MenuFolderRow";

export default function MenuFolder({ category, items }) {
  const singleItem = items.length === 1;

  return (
    <div className="relative">
      <div className="font-bubble inline-flex items-center bg-[#7C0116] text-white text-[13px] px-5 py-2.5 rounded-t-2xl ml-6 -mb-px relative z-10">
        {category.toLowerCase()}
      </div>
      <div
        className="bg-white rounded-[20px_20px_26px_26px] p-4 sm:p-6 relative"
        style={{ boxShadow: "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)" }}
      >
        <div className={`grid gap-3 sm:gap-3.5 ${singleItem ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
          {items.map((item) => (
            <MenuFolderRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

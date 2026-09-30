import React from "react";
import MenuFolderRow, { useItemModal, ItemPhoto } from "./MenuFolderRow";

export default function MenuFolder({ category, items }) {
  return (
    <section
      className="bg-white rounded-3xl p-4 sm:p-6"
      style={{ boxShadow: "0 14px 30px -18px rgba(44,35,37,0.28), 0 2px 6px rgba(44,35,37,0.06)" }}
    >
      <h2 className="font-bubble text-[#E61F3F] text-xl sm:text-2xl mb-3 px-2.5">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        {items.map((item) => (
          <MenuFolderRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

// Full-width pale-green feature for Build Your Own Cup, with a Customize
// button that opens the existing customization flow.
export function BuildYourOwnFeature({ item }) {
  const { openModal, modal } = useItemModal(item);

  return (
    <>
      <section className="bg-[#E3EAB9] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <ItemPhoto item={item} className="w-full h-48 sm:w-40 sm:h-40 bg-white/70" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 sm:block">
            <h2 className="font-bubble text-[#E61F3F] text-2xl sm:text-3xl leading-tight break-words min-w-0">{item.name}</h2>
            <span className="sm:hidden text-[#E61F3F] font-body font-extrabold text-base whitespace-nowrap bg-white px-3 py-1 rounded-full shrink-0">
              ${item.price?.toFixed(2)}
            </span>
          </div>
          <p className="hidden sm:block mt-1 text-[#E61F3F] font-body font-extrabold text-lg">${item.price?.toFixed(2)}</p>
          {item.description && (
            <p className="mt-2 text-[15px] text-[#3d4a0c] font-medium leading-relaxed">{item.description}</p>
          )}
          {item.is_sold_out && (
            <span className="inline-block mt-2 bg-foreground/10 text-foreground/60 text-[11px] font-body font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          )}
        </div>
        <button
          type="button"
          onClick={openModal}
          disabled={item.is_sold_out}
          className="w-full sm:w-auto shrink-0 bg-[#E61F3F] hover:bg-[#C4112F] text-white font-body font-bold text-base px-8 py-3.5 rounded-full shadow-md transition-colors disabled:opacity-50"
        >
          Customize
        </button>
      </section>
      {modal}
    </>
  );
}

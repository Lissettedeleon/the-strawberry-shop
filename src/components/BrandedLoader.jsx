import React from "react";
import Logo from "./Logo";

export default function BrandedLoader({ text = "loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <Logo size="lg" className="animate-[spin_1.6s_linear_infinite] mb-6" />
      <p className="font-body text-muted-foreground text-base">{text}</p>
    </div>
  );
}

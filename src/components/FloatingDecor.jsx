import React from "react";

export default function FloatingDecor() {
  const decorations = [
    { emoji: "🍓", top: "5%", left: "3%", size: "text-3xl", animDuration: "3.5s", delay: "0s" },
    { emoji: "💕", top: "25%", right: "5%", size: "text-2xl", animDuration: "2.8s", delay: "0.4s" },
    { emoji: "✨", bottom: "30%", left: "8%", size: "text-xl", animDuration: "3s", delay: "0.8s" },
    { emoji: "🍓", top: "60%", right: "10%", size: "text-2xl", animDuration: "4s", delay: "1.2s" },
    { emoji: "🍫", bottom: "10%", left: "15%", size: "text-xl", animDuration: "2.5s", delay: "0.3s" },
    { emoji: "💖", top: "40%", right: "3%", size: "text-lg", animDuration: "3.2s", delay: "0.7s" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {decorations.map((d, i) => (
        <span
          key={i}
          className={`absolute ${d.size} opacity-10 animate-bounce`}
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            animationDuration: d.animDuration,
            animationDelay: d.delay,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
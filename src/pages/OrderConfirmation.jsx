import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EXTRA_PRICE } from "@/lib/itemConfigs";

const CONFETTI_COLORS = ["#e8233a","#f5b8c0","#fde8ea","#ffd93d","#6bcb77","#4d96ff","#ff922b","#cc5de8","#ffffff","#ff6b9d"];

function fireConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    startVelocity: 45,
    gravity: 1,
    ticks: 200,
    origin: { x: 0.5, y: 0.1 },
    colors: CONFETTI_COLORS,
  });
}

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const orderNumber = params.get("number");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lottieData, setLottieData] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_touohxv0.json")
      .then(r => r.json())
      .then(setLottieData)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (orderId) {
      base44.entities.Order.get(orderId)
        .then(setOrder)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fireConfetti();
    intervalRef.current = setInterval(fireConfetti, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fff8f9" }}>
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">🍓</div>
          <p className="font-body text-[#6b7280]">Finalizing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#fff8f9" }}>
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        {/* Lottie strawberry */}
        <div className="flex justify-center mb-4">
          {lottieData ? (
            <Lottie animationData={lottieData} loop style={{ width: 180, height: 180 }} />
          ) : (
            <div className="text-7xl animate-bounce" style={{ animationDuration: "2s" }}>🍓</div>
          )}
        </div>

        {/* Pulsing green checkmark */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Order Placed! 🎉</h1>
        <p className="font-body text-[#6b7280] text-base mb-1">We'll have it ready for you shortly 🍓</p>

        {orderNumber && (
          <div className="mt-4 mb-6 inline-block bg-white border border-[#f5b8c0] rounded-2xl px-6 py-3">
            <p className="font-body text-[#6b7280] text-xs mb-1">Order Number</p>
            <p className="font-body font-bold text-[#e8233a] text-xl">{orderNumber}</p>
          </div>
        )}

        {order && (
          <div className="bg-white border border-[#f5b8c0] rounded-2xl p-5 text-left mb-6">
            <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">Order Summary</h3>
            <div className="space-y-3">
              {order.items?.map((item, idx) => {
                const extrasTotal = (item.extra_count || 0) * EXTRA_PRICE;
                const lineTotal = ((item.base_price || 0) + extrasTotal) * (item.quantity || 1);
                return (
                  <div key={idx} className="py-2 border-b border-[#fde8ea] last:border-0">
                    <div className="flex justify-between">
                      <span className="font-body font-semibold text-[#1a1a1a] text-sm">{item.quantity}x {item.name}</span>
                      <span className="font-body font-bold text-[#e8233a] text-sm">${lineTotal.toFixed(2)}</span>
                    </div>
                    {item.removed_ingredients?.length > 0 && (
                      <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>
                    )}
                    {item.extras?.length > 0 && (
                      <p className="text-xs text-[#e8233a] mt-0.5">+ {item.extras.join(", ")}</p>
                    )}
                    {item.chocolate_selections?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Choc: {item.chocolate_selections.join(", ")}</p>
                    )}
                    {item.selected_toppings?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>
                    )}
                    {item.selected_sauces?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>
                    )}
                    {item.special_instructions && (
                      <p className="text-xs text-[#6b7280] mt-0.5 italic">"{item.special_instructions}"</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-3 mt-1 border-t border-[#fde8ea]">
              <span className="font-body font-bold text-[#1a1a1a]">Total</span>
              <span className="font-body font-extrabold text-[#e8233a] text-lg">${order.total?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/order"
            className="inline-block bg-[#e8233a] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#c41230] transition-colors text-center"
          >
            Order Again
          </Link>
          <Link
            to="/"
            className="inline-block bg-white border border-[#f5b8c0] text-[#6b7280] font-body font-semibold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#fde8ea] transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
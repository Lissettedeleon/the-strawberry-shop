import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandedLoader from "@/components/BrandedLoader";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const orderNumber = params.get("number");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId && orderNumber) {
      base44.functions.invoke("getOrderReceipt", { orderId, orderNumber })
        .then(res => setOrder(res.data?.order || null))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId, orderNumber]);

  if (loading) {
    return <BrandedLoader text="Finalizing your order..." />;
  }

  return (
    <div className="min-h-screen" style={{ background: "#FBF1F3" }}>
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Order Placed!</h1>
        <p className="font-body text-[#6b7280] text-base mb-1">We'll have it ready for you shortly.</p>

        {orderNumber && (
          <div className="mt-4 mb-6 inline-block bg-white border border-[#E0A4B0] rounded-2xl px-6 py-3">
            <p className="font-body text-[#6b7280] text-xs mb-1">Order Number</p>
            <p className="font-body font-bold text-[#7C0116] text-xl">{orderNumber}</p>
          </div>
        )}

        {order && (
          <div className="bg-white border border-[#E0A4B0] rounded-2xl p-5 text-left mb-6">
            <h3 className="font-body font-bold text-[#1a1a1a] text-base mb-3">Order Summary</h3>
            <div className="space-y-3">
              {order.items?.map((item, idx) => {
                const lineTotal = ((item.base_price || 0) + (item.extras_total || 0)) * (item.quantity || 1);
                return (
                  <div key={idx} className="py-2 border-b border-[#F6E3E7] last:border-0">
                    <div className="flex justify-between">
                      <span className="font-body font-semibold text-[#1a1a1a] text-sm">{item.quantity}x {item.name}</span>
                      <span className="font-body font-bold text-[#7C0116] text-sm">${lineTotal.toFixed(2)}</span>
                    </div>
                    {item.ingredients?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">
                        Comes with: {item.ingredients.filter(i => !item.removed_ingredients?.includes(i)).join(", ")}
                      </p>
                    )}
                    {item.removed_ingredients?.length > 0 && (
                      <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>
                    )}
                    {item.base_selection && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Base: {item.base_selection}</p>
                    )}
                    {item.chocolate_selections?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Chocolates: {item.chocolate_selections.join(", ")}</p>
                    )}
                    {item.selected_toppings?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_toppings.join(", ")}</p>
                    )}
                    {item.selected_choc_toppings?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Toppings: {item.selected_choc_toppings.join(", ")}</p>
                    )}
                    {item.selected_sauces?.length > 0 && (
                      <p className="text-xs text-[#6b7280] mt-0.5">Sauces: {item.selected_sauces.join(", ")}</p>
                    )}
                    {item.extras?.length > 0 && (
                      <p className="text-xs text-[#7C0116] mt-0.5">+ {item.extras.join(", ")}</p>
                    )}
                    {item.special_instructions && (
                      <p className="text-xs text-[#6b7280] mt-0.5 italic">"{item.special_instructions}"</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pt-3 mt-1 border-t border-[#F6E3E7] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-body text-[#6b7280] text-sm">Subtotal</span>
                <span className="font-body font-semibold text-[#1a1a1a] text-sm">${order.subtotal?.toFixed(2)}</span>
              </div>
              {order.tax != null && (
                <div className="flex justify-between items-center">
                  <span className="font-body text-[#6b7280] text-sm">Tax</span>
                  <span className="font-body font-semibold text-[#1a1a1a] text-sm">${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1.5 border-t border-[#F6E3E7]">
                <span className="font-body font-bold text-[#1a1a1a]">Total</span>
                <span className="font-body font-extrabold text-[#7C0116] text-lg">${order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/menu"
            className="inline-block bg-[#7C0116] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors text-center"
          >
            Order Again
          </Link>
          <Link
            to="/"
            className="inline-block bg-white border border-[#E0A4B0] text-[#6b7280] font-body font-semibold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#F6E3E7] transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

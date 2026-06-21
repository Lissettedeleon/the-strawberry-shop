import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import BrandedLoader from "@/components/BrandedLoader";
import { EXTRA_PRICE } from "@/lib/itemConfigs";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const orderNumber = params.get("number");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <BrandedLoader text="finalizing your order..." />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E8193C 0%, #C41230 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <CheckCircle size={64} className="mx-auto text-white mb-4" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display text-white text-3xl sm:text-4xl mb-2 drop-shadow-lg">
            thank you!
          </motion.h1>
          <p className="text-white/80 font-body text-lg">Thank you for your order! We will have it ready for you shortly.</p>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#FFB3C6" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 sm:p-8 border-2 border-border shadow-sm">
            <div className="text-center mb-6">
              <p className="font-body text-sm text-muted-foreground mb-1">Order Number</p>
              <h2 className="font-display text-primary text-2xl sm:text-3xl">{orderNumber || "—"}</h2>
            </div>

            {order && (
              <>
                <div className="space-y-3 mb-6">
                  <h3 className="font-body font-bold text-foreground">Order Summary</h3>
                  {order.items?.map((item, idx) => {
                    const extrasTotal = (item.extra_count || 0) * EXTRA_PRICE;
                    const lineTotal = ((item.base_price || 0) + extrasTotal) * (item.quantity || 1);
                    return (
                      <div key={idx} className="py-2 border-b border-border last:border-0">
                        <div className="flex justify-between">
                          <span className="font-body font-semibold text-sm">{item.quantity}x {item.name}</span>
                          <span className="font-body font-bold text-primary text-sm">${lineTotal.toFixed(2)}</span>
                        </div>
                        {item.removed_ingredients?.length > 0 && (
                          <p className="text-xs text-red-500 mt-0.5">No: {item.removed_ingredients.join(", ")}</p>
                        )}
                        {item.extras?.length > 0 && (
                          <p className="text-xs text-primary mt-0.5">+ {item.extras.join(", ")}</p>
                        )}
                        {item.special_instructions && (
                          <p className="text-xs text-muted-foreground mt-0.5 italic">"{item.special_instructions}"</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-body font-bold text-foreground">Total</span>
                  <span className="font-body font-extrabold text-primary text-lg">${order.total?.toFixed(2)}</span>
                </div>
              </>
            )}

            <div className="mt-8 text-center space-y-3">
              <Link to="/order" className="inline-block bg-primary text-white font-body font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
                Order Again
              </Link>
              <br />
              <Link to="/" className="inline-block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
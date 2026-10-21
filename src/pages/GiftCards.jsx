import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { emailShop } from "@/lib/emailShop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, Mail } from "lucide-react";
import GiftCardVisual from "@/components/GiftCardVisual";
import WaveDivider from "@/components/WaveDivider";

const AMOUNTS = [25, 50, 75, 100];

const inputClass = "w-full bg-white border border-[#F4B3D0] rounded-2xl px-4 py-3 font-body text-[15px] text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#E61F3F]/30 focus:border-[#E61F3F] transition-all min-h-[48px]";

export default function GiftCards() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    sender_name: "", sender_email: "", recipient_name: "", recipient_email: "", message: "", delivery_date: "",
  });
  const [status, setStatus] = useState("");
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Opens the visitor's email app with the request filled in, addressed to the shop.
  const handleSubmit = (e) => {
    e.preventDefault();
    emailShop(`Gift Card Request - $${finalAmount.toFixed(2)} for ${form.recipient_name}`, [
      `Amount: $${finalAmount.toFixed(2)}`,
      `From: ${form.sender_name} (${form.sender_email})`,
      `To: ${form.recipient_name} (${form.recipient_email})`,
      form.delivery_date && `Send on: ${form.delivery_date}`,
      form.message && `Message: ${form.message}`,
    ]);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="min-h-screen" style={{ background: "#FDEEF5" }}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-[#B4C84C] flex items-center justify-center">
              <Mail className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Almost done!</h1>
          <p className="font-body text-[#6b7280] text-base mb-6">
            Your email app opened with your gift card request filled in. Press send and we'll reply to arrange payment for the ${finalAmount.toFixed(2)} gift card.
          </p>
          <div>
            <Link to="/" className="inline-block bg-[#E61F3F] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#C4112F] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Red / white / red: the card sits on a white band between two waves
          so its own white border blends in */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 md:pt-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bubble text-white text-4xl sm:text-5xl drop-shadow-lg"
          >
            A sweet gift
          </motion.h1>
        </div>
        <WaveDivider from="transparent" to="white" />
      </section>

      {/* -my-px + z-index covers the hairline seams where the waves meet */}
      <section className="bg-white relative z-[1] -my-px">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GiftCardVisual />
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }}>
        <WaveDivider from="transparent" to="white" flip />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 md:pb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/85 font-body text-base sm:text-lg max-w-xl mx-auto"
          >
            Make someone's day a little sweeter with a gift card they can use toward their favorite strawberry desserts. The perfect gift for celebrations, special moments, or simply because
          </motion.p>
        </div>
      </section>

      <section style={{ background: "#FDEEF5" }} className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form id="gift-card-form" onSubmit={handleSubmit} className="bg-white border border-[#F4B3D0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm scroll-mt-24">
            <div>
              <label className="block font-body font-bold text-[#1a1a1a] text-sm mb-3">Choose an amount</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => { setAmount(a); setCustomAmount(""); }}
                    className={`py-3 rounded-xl font-body font-extrabold text-sm border-2 transition-colors ${
                      !customAmount && amount === a ? "bg-[#E61F3F] border-[#E61F3F] text-white" : "bg-white border-[#F4B3D0] text-[#1a1a1a] hover:bg-[#FDEEF5]"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Or enter a custom amount"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Your Name *</label>
                <input type="text" value={form.sender_name} onChange={(e) => setForm({ ...form, sender_name: e.target.value })} placeholder="Full name" className={inputClass} required />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Your Email *</label>
                <input type="email" value={form.sender_email} onChange={(e) => setForm({ ...form, sender_email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Recipient's Name *</label>
                <input type="text" value={form.recipient_name} onChange={(e) => setForm({ ...form, recipient_name: e.target.value })} placeholder="Who's it for?" className={inputClass} required />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Recipient's Email *</label>
                <input type="email" value={form.recipient_email} onChange={(e) => setForm({ ...form, recipient_email: e.target.value })} placeholder="their@email.com" className={inputClass} required />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Deliver on (optional)</label>
              <input type="date" value={form.delivery_date} onChange={(e) => setForm({ ...form, delivery_date: e.target.value })} className={inputClass} />
            </div>

            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Personal Message (optional)</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Say something sweet..." rows={3} className={inputClass} style={{ minHeight: "unset" }} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F8CCE1]">
              <span className="font-body font-bold text-[#1a1a1a]">Total</span>
              <span className="font-body font-extrabold text-[#E61F3F] text-xl">${finalAmount.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#6b7280] font-body -mt-3">Opens your email app with your request filled in. We'll reply to arrange payment before the gift card is sent.</p>

            <button
              type="submit"
              disabled={finalAmount <= 0}
              className="w-full bg-[#E61F3F] text-white font-body font-bold py-4 rounded-full min-h-[52px] hover:bg-[#C4112F] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              <Gift size={16} />
              {`Send $${finalAmount.toFixed(2)} Gift Card Request by Email`}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
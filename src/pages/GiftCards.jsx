import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, Check } from "lucide-react";

const AMOUNTS = [25, 50, 75, 100];

const inputClass = "w-full bg-white border border-[#E0A4B0] rounded-2xl px-4 py-3 font-body text-[15px] text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7C0116]/30 focus:border-[#7C0116] transition-all min-h-[48px]";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SB-";
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function GiftCards() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    sender_name: "", sender_email: "", recipient_name: "", recipient_email: "", message: "", delivery_date: "",
  });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [code, setCode] = useState("");

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const newCode = generateCode();
      await base44.entities.GiftCard.create({
        ...form,
        amount: finalAmount,
        balance: finalAmount,
        code: newCode,
        status: "Pending Payment",
      });
      setCode(newCode);
      setStatus("done");
    } catch {
      setStatus("");
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
    }
  };

  if (status === "done") {
    return (
      <div className="min-h-screen" style={{ background: "#FBF1F3" }}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Gift Card Requested!</h1>
          <p className="font-body text-[#6b7280] text-base mb-6">
            We'll follow up at <span className="font-semibold text-[#1a1a1a]">{form.sender_email}</span> to complete payment. Once confirmed, we'll send a ${finalAmount.toFixed(2)} gift card to {form.recipient_name} at {form.recipient_email}.
          </p>
          <div className="inline-block bg-white border border-[#E0A4B0] rounded-2xl px-6 py-3 mb-6">
            <p className="font-body text-[#6b7280] text-xs mb-1">Reference Code</p>
            <p className="font-body font-bold text-[#7C0116] text-xl">{code}</p>
          </div>
          <div>
            <Link to="/" className="inline-block bg-[#7C0116] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors">
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

      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-bubble text-white text-3xl sm:text-4xl mb-3 drop-shadow-lg">
            gift cards
          </motion.h1>
          <p className="text-white/80 font-body text-lg">Because they deserve something sweet too.</p>
        </div>
      </section>

      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white border border-[#E0A4B0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div>
              <label className="block font-body font-bold text-[#1a1a1a] text-sm mb-3">Choose an amount</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => { setAmount(a); setCustomAmount(""); }}
                    className={`py-3 rounded-xl font-body font-extrabold text-sm border-2 transition-colors ${
                      !customAmount && amount === a ? "bg-[#7C0116] border-[#7C0116] text-white" : "bg-white border-[#E0A4B0] text-[#1a1a1a] hover:bg-[#FBF1F3]"
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

            <div className="flex items-center justify-between pt-2 border-t border-[#F6E3E7]">
              <span className="font-body font-bold text-[#1a1a1a]">Total</span>
              <span className="font-body font-extrabold text-[#7C0116] text-xl">${finalAmount.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#6b7280] font-body -mt-3">We'll follow up by email to collect payment before the gift card is sent.</p>

            {errorMsg && (
              <div className="bg-[#F6E3E7] border border-[#E0A4B0] rounded-xl px-4 py-3">
                <p className="text-[#5C0110] font-body text-sm">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending" || finalAmount <= 0}
              className="w-full bg-[#7C0116] text-white font-body font-bold py-4 rounded-full min-h-[52px] hover:bg-[#5C0110] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              <Gift size={16} />
              {status === "sending" ? "Sending..." : `Request $${finalAmount.toFixed(2)} Gift Card`}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

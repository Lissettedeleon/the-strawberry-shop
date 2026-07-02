import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import FAQAccordion from "@/components/FAQAccordion";
import { SocialIconsRow, GoogleReviewButton } from "@/components/SocialButtons";
import { Send, ClipboardList, Mail, CalendarCheck, PackageCheck, ImageOff } from "lucide-react";

const BOOKING_STEPS = [
{ icon: ClipboardList, title: "Tell us about your event", text: "Fill out the form below with your date, guest count, and what you're interested in." },
{ icon: Mail, title: "We follow up within 24 hours", text: "We'll reach out with a custom menu and pricing tailored to your event." },
{ icon: CalendarCheck, title: "Lock in your date", text: "Confirm the details and we'll reserve your spot on our calendar." },
{ icon: PackageCheck, title: "We handle the rest", text: "Pickup or delivery on the day of — fresh, on time, and ready to serve." }];


const CONFETTI_COLORS = ["#7C0116", "#E0A4B0", "#F6E3E7", "#ffd93d", "#6bcb77", "#4d96ff", "#ff922b", "#cc5de8", "#ffffff", "#ff6b9d"];

function fireConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    startVelocity: 45,
    gravity: 1,
    ticks: 200,
    origin: { x: 0.5, y: 0.1 },
    colors: CONFETTI_COLORS
  });
}

const inputClass = "w-full bg-white border border-[#E0A4B0] rounded-2xl px-4 py-3 font-body text-[15px] text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7C0116]/30 focus:border-[#7C0116] transition-all min-h-[48px]";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", event_date: "", quantity: "", items_of_interest: "", message: ""
  });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lottieData, setLottieData] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_touohxv0.json").
    then((r) => r.json()).
    then(setLottieData).
    catch(() => {});
  }, []);

  useEffect(() => {
    if (status === "done") {
      fireConfetti();
      intervalRef.current = setInterval(fireConfetti, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await base44.entities.CateringRequest.create(form);
      await base44.functions.invoke("sendContactEmail", { ...form, type: "catering" });
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
          <div className="flex justify-center mb-4">
            {lottieData ?
            <Lottie animationData={lottieData} loop style={{ width: 180, height: 180 }} /> :

            <Logo size="lg" className="animate-bounce" />
            }
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Request Sent!</h1>
          <p className="font-body text-[#6b7280] text-base mb-6">Your catering request has been sent! We'll be in touch with you shortly.</p>
          <Link to="/" className="inline-block bg-[#7C0116] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#5C0110] transition-colors">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>);

  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <h1 className="font-display text-white text-4xl sm:text-5xl mb-3 drop-shadow-lg">catering & events</h1>
          <p className="text-white/80 font-body text-lg">Let us make your next event unforgettable.</p>
        </div>
      </section>

      {/* How booking works */}
      <section className="bg-white py-12 md:py-16 border-b border-[#F6E3E7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-body font-semibold text-[#5C0110] text-2xl text-center mb-10">how booking works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {BOOKING_STEPS.map((step, i) =>
            <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#F6E3E7] flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-[#7C0116]" size={24} />
                </div>
                <p className="font-body font-bold text-[#1a1a1a] text-sm mb-1">{i + 1}. {step.title}</p>
                <p className="text-[#6b7280] font-body text-xs leading-relaxed">{step.text}</p>
              </div>
            )}
          </div>

          {/* Event photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {/* TODO: swap in real catering/event photos once provided */}
            {[1, 2, 3].map((i) =>
            <div key={i} className="aspect-square bg-[#F6E3E7] rounded-2xl border border-[#E0A4B0] flex items-center justify-center hidden">
                <ImageOff size={28} className="text-[#7C0116]/40" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "#FBF1F3" }} className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-body font-semibold text-[#5C0110] text-2xl mb-2">book your event</h2>
            <p className="text-[#6b7280] font-body text-sm max-w-md mx-auto">
              From bridal showers to office parties — we'll get back to you within 24 hours with options and pricing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[#E0A4B0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Your Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={inputClass} required />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Event Date *</label>
                <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={inputClass} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Guest Count / Quantity</label>
                <input type="text" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 50 guests" className={inputClass} />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Items Interested In</label>
                <input type="text" value={form.items_of_interest} onChange={(e) => setForm({ ...form, items_of_interest: e.target.value })} placeholder="e.g. OG cups, build-your-own" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block font-body text-xs text-[#6b7280] mb-1.5">Anything else?</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Special requests, dietary needs, theme ideas..." rows={4} className={inputClass} style={{ minHeight: "unset" }} />
            </div>

            {errorMsg &&
            <div className="bg-[#F6E3E7] border border-[#E0A4B0] rounded-xl px-4 py-3">
                <p className="text-[#5C0110] font-body text-sm">{errorMsg}</p>
              </div>
            }

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#7C0116] text-white font-body font-bold py-4 rounded-full min-h-[52px] hover:bg-[#5C0110] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
              
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Submit Catering Request"}
            </button>
          </form>
        </div>
      </section>

      {/* Social */}
      <section className="py-10 border-t border-[#F6E3E7] bg-[hsl(var(--background))]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="font-body font-semibold text-[#5C0110] text-base mb-4">Follow us</p>
          <div className="flex justify-center mb-4">
            <SocialIconsRow />
          </div>
          <GoogleReviewButton />
        </div>
      </section>

      {/* FAQ */}
      




      

      <Footer />
    </div>);

}
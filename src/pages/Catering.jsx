import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeardAboutPopup from "@/components/HeardAboutPopup";
import { Send, Check } from "lucide-react";

const inputClass = "w-full bg-white border border-[#F4B3D0] rounded-2xl px-4 py-3 font-body text-[15px] text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#E61F3F]/30 focus:border-[#E61F3F] transition-all min-h-[48px]";

export default function Catering() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    guest_count: "",
    items_of_interest: "",
    fulfillment_type: "Pickup",
    event_address: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [trap, setTrap] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      // Only bots fill the hidden field; skip saving and sending for them.
      if (trap) { setStatus("done"); return; }
      await base44.entities.CateringRequest.create(form);
      // The request is saved above. If the notification email is throttled
      // or fails, the customer still gets a confirmation.
      await base44.functions.invoke("sendContactEmail", { ...form, type: "catering", company_website: "" }).catch(() => {});
      setStatus("done");
      setFeedbackOpen(true);
    } catch {
      setStatus("");
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
    }
  };

  const handleFeedback = ({ sources }) => {
    base44.entities.CustomerFeedback.create({
      type: "catering",
      reference_id: form.email,
      sources,
    }).catch(() => {});
  };

  if (status === "done") {
    return (
      <div className="min-h-screen" style={{ background: "#FDEEF5" }}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-[#B4C84C] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="font-body font-bold text-[#1a1a1a] text-3xl mb-2">Request Sent!</h1>
          <p className="font-body text-[#6b7280] text-base mb-6">Your catering request has been sent. We'll be in touch with you shortly</p>
          <Link to="/" className="inline-block bg-[#E61F3F] text-white font-body font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-[#C4112F] transition-colors">
            Back to Home
          </Link>
        </div>
        <Footer />

        <HeardAboutPopup
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          onSubmit={handleFeedback}
          title="Thanks for your request"
          subtitle="How did you hear about us?"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }} className="relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <h1 className="font-bubble text-white text-2xl sm:text-3xl drop-shadow-lg">Let Us Be Part of Your Next Celebration</h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 border-b border-[#F8CCE1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-[#F4B3D0] shadow-lg mb-8">
            <img
              src="/images/catering-display.jpg"
              alt="Strawberry cups displayed on a table at a catering event"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[#6b7280] font-body text-base leading-relaxed text-center max-w-2xl mx-auto">
            Whether you're celebrating a birthday, wedding, baby shower, corporate event, or any special gathering, our handcrafted strawberry desserts add a fresh, memorable touch to every celebration. Contact us today to start planning your custom dessert experience
          </p>
        </div>
      </section>

      <section style={{ background: "#FDEEF5" }} className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-bubble text-[#C4112F] text-2xl mb-2">Request Catering</h2>
            <p className="text-[#6b7280] font-body text-sm max-w-md mx-auto">
              We'll follow up within 24–48 business hours with pricing tailored to your event
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[#F4B3D0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label>Company website<input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
            </div>
            <div className="space-y-4">
              <p className="font-body font-bold text-[#1a1a1a] text-sm">Contact Information</p>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={inputClass} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} required />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#F8CCE1]">
              <p className="font-body font-bold text-[#1a1a1a] text-sm pt-4">Event Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Event Type *</label>
                  <input type="text" value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} placeholder="Birthday, wedding, shower..." className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Event Date *</label>
                  <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={inputClass} required />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Event Location *</label>
                <input type="text" value={form.event_address} onChange={(e) => setForm({ ...form, event_address: e.target.value })} placeholder="Address" className={inputClass} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Guest Count *</label>
                  <input type="text" value={form.guest_count} onChange={(e) => setForm({ ...form, guest_count: e.target.value })} placeholder="e.g. 50 guests" className={inputClass} required />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#6b7280] mb-1.5">Items Interested In</label>
                  <input type="text" value={form.items_of_interest} onChange={(e) => setForm({ ...form, items_of_interest: e.target.value })} placeholder="e.g. OG cups, build-your-own" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Pickup or Delivery *</label>
                <div className="flex gap-3">
                  {["Pickup", "Delivery"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm({ ...form, fulfillment_type: opt })}
                      className={`flex-1 py-3 rounded-xl font-body font-bold text-sm border-2 transition-colors ${
                        form.fulfillment_type === opt ? "bg-[#E61F3F] border-[#E61F3F] text-white" : "bg-white border-[#F4B3D0] text-[#1a1a1a] hover:bg-[#FDEEF5]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#F8CCE1]">
              <p className="font-body font-bold text-[#1a1a1a] text-sm pt-4">Additional Details</p>
              <div>
                <label className="block font-body text-xs text-[#6b7280] mb-1.5">Tell us more about your event or any special requests</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Special requests, dietary needs, theme ideas..." rows={4} className={inputClass} style={{ minHeight: "unset" }} />
              </div>
            </div>

            {errorMsg && (
              <div className="bg-[#F8CCE1] border border-[#F4B3D0] rounded-xl px-4 py-3">
                <p className="text-[#C4112F] font-body text-sm">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#E61F3F] text-white font-body font-bold py-4 rounded-full min-h-[52px] hover:bg-[#C4112F] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Submit Catering Request"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
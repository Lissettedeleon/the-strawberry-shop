import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "strawberryshopoh@gmail.com";
const LAST_UPDATED = "October 21, 2026";

const SECTIONS = [
  {
    title: "What we collect",
    body: [
      "This website doesn't keep a database. When you send an order or a request, it goes to us as an email from your own email app, and it includes only what you typed:",
    ],
    list: [
      "Orders: your name, email, phone number (optional), what you ordered and, for delivery, your address.",
      "Catering requests: your name, email, phone number, event details and event address.",
      "Gift cards: your name and email, and the recipient's name and email.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your information to prepare your order, reply to your catering request, send gift cards, and contact you about any of these.",
      "We do not sell your information, and we don't use it for advertising.",
    ],
  },
  {
    title: "Payments",
    body: [
      "This website does not take card payments. We never ask for or store card details here.",
    ],
  },
  {
    title: "Who else sees it",
    body: [
      "Your email reaches us through your email provider and ours. We don't share it with anyone else unless the law requires us to.",
    ],
  },
  {
    title: "Your browser",
    body: [
      "The site saves a few small things in your browser, like what's in your cart and whether you've already seen a pop-up. They stay on your device, and you can clear them in your browser settings.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `To see, correct or delete the information you've given us, email ${CONTACT_EMAIL} and we'll take care of it.`,
    ],
  },
  {
    title: "Children",
    body: [
      "This website isn't meant for children under 13, and we don't knowingly collect their information.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If we change this page, we'll update the date at the top.",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #E61F3F 0%, #C4112F 100%)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bubble text-white text-3xl sm:text-4xl drop-shadow-lg"
          >
            Privacy
          </motion.h1>
        </div>
      </section>

      <section style={{ background: "#FDEEF5" }} className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
            <p className="font-body text-[#6b4a52] text-sm">Last updated {LAST_UPDATED}</p>
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-bubble text-[#E61F3F] text-xl mb-2">{s.title}</h2>
                {s.body.map((t) => (
                  <p key={t} className="font-body text-[#3d2f33] text-[15px] leading-relaxed mb-2">{t}</p>
                ))}
                {s.list && (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {s.list.map((t) => (
                      <li key={t} className="font-body text-[#3d2f33] text-[15px] leading-relaxed">{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

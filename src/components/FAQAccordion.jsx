import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FALLBACK = [
{ question: "Do you offer catering?", answer: "Yes! We love catering events of all sizes. We ask for at least 48 hours notice for catering orders, with a minimum of 20 cups or 3 dozen chocolate-covered strawberries. Head to our Contact page and fill out the catering form to get started." },
{ question: "What payment types do you accept?", answer: "We accept all major credit and debit cards, Apple Pay, Google Pay, and cash in-store. Online orders through Toast, Uber Eats, and DoorDash accept their supported payment methods." },
{ question: "How long do orders take for pickup?", answer: "Most orders are freshly made and ready in 15–20 minutes. During busy weekends it may take a little longer — we'll always have it ready as fast as we can!" },
{ question: "Do your products contain allergens?", answer: "Many of our items contain dairy, nuts, and gluten. Each menu item is labeled with allergen tags, but please let us know about any allergies when ordering. Our items are prepared in a shared kitchen, so we can't guarantee against cross-contact." },
{ question: "What is your cancellation and refund policy?", answer: "Because everything is made fresh to order, we can only cancel or adjust orders before preparation begins. For catering, cancellations made at least 24 hours in advance are fully refundable. Reach out to us right away if something needs to change." }];


export default function FAQAccordion() {
  const [faqs, setFaqs] = useState(FALLBACK);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    base44.entities.FAQ.filter({ is_active: true }, "sort_order", 30).
    then((res) => {if (res.length > 0) setFaqs(res);}).
    catch(() => {});
  }, []);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) =>
      <div key={faq.id || i} className="bg-white rounded-[24px_8px_24px_8px] border-2 border-border overflow-hidden">
          <button
          onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left hidden">
          
            <span className="font-body font-bold text-foreground text-base">{faq.question}</span>
            <ChevronDown
            size={20}
            className={`shrink-0 text-primary transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
          
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            
                <p className="px-5 pb-5 text-muted-foreground font-body text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
          }
          </AnimatePresence>
        </div>
      )}
    </div>);

}
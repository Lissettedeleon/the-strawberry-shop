import React, { useState, useEffect, useCallback } from "react";
import { reviews as savedReviews } from "@/data/content";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ReviewCarousel() {
  const reviews = savedReviews;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % reviews.length), [reviews.length]);
  const prev = () => setIndex(i => (i - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const current = reviews[index];

  return (
    <div
      className="max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="bg-white rounded-[40px_12px_40px_12px] p-8 md:p-12 shadow-sm border border-border min-h-[240px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < (current.rating || 5) ? "fill-primary text-primary" : "text-border"} />
                ))}
              </div>
              <p className="text-foreground font-body text-lg md:text-xl leading-relaxed mb-5">"{current.quote}"</p>
              <p className="font-cursive text-primary text-2xl md:text-3xl">{current.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Previous review"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Next review"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/50"}`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

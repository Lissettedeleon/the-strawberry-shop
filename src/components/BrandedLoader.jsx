import React from "react";
import { motion } from "framer-motion";

const layers = [
  { emoji: "🍓", label: "strawberries", delay: 0 },
  { emoji: "🍫", label: "chocolate drizzle", delay: 0.4 },
  { emoji: "🧁", label: "whipped cream", delay: 0.8 },
  { emoji: "✨", label: "sprinkles", delay: 1.2 },
];

export default function BrandedLoader({ text = "making your cup..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex items-end gap-1 mb-8">
        {layers.map((layer, i) => (
          <motion.span
            key={i}
            className="text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: layer.delay,
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 0.8,
              repeatType: "reverse",
            }}
          >
            {layer.emoji}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-body text-muted-foreground text-base"
      >
        {text}
      </motion.p>
      <motion.div
        className="mt-4 w-32 h-1.5 bg-secondary rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{
            width: ["0%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
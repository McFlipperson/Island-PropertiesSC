"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const quotes = [
  {
    text: "I pay ₱18,000 a month for a two-bedroom with an ocean view. My pension goes four times further here than it did in Canada. I wasn't looking for paradise — I just couldn't afford NOT to move.",
    name: "Daniel Reyes",
    city: "Calgary, Canada",
  },
  {
    text: "As a retired GP I had serious questions about healthcare before I moved. Bohol surprised me. The facilities are better than I expected and the air quality alone added years to my life.",
    name: "Dr. Felix Hartmann",
    city: "London, UK",
  },
  {
    text: "The numbers made no sense at first — I kept looking for the catch. There isn't one. Bohol is where Cebu was fifteen years ago. The window is still open.",
    name: "Marcus Webb",
    city: "London, UK",
  },
];

export function VoicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full bg-[#F5F0E8] px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Real Voices
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            From people who made the move.
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="flex flex-col"
            >
              <span className="font-heading text-5xl leading-none text-brand-gold">&ldquo;</span>
              <p className="mt-2 flex-1 text-base leading-relaxed text-brand-emerald/80">
                {q.text}
              </p>
              <div className="mt-6">
                <p className="font-semibold text-brand-emerald">{q.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-emerald/50">{q.city}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

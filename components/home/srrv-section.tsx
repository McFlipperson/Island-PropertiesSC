"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";

const facts = [
  { label: "Age 50+" },
  { label: "No annual renewal" },
  { label: "Live & work legally" },
  { label: "Re-enter freely" },
  { label: "Free if you buy" },
];

export function SrrvSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);

  return (
    <section
      ref={ref}
      className="w-full bg-[#EBF4EC] px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            The SRRV Visa
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            The visa most expats<br className="hidden sm:block" /> don&apos;t know exists.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-emerald/80">
            The Special Resident Retiree&apos;s Visa (SRRV) lets you live in the Philippines permanently — re-enter freely, no annual renewal, no embassy visits. Age 50+. Work, invest, retire. It&apos;s the most underrated long-stay visa in Southeast Asia, and almost no one talks about it.
          </p>
        </motion.div>

        {/* The Hook — highlighted callout */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-brand-gold/40 bg-brand-emerald px-7 py-6 shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3">
            The Part Most People Miss
          </p>
          <p className="text-base leading-relaxed text-white sm:text-lg">
            The $20,000 USD deposit required for the SRRV?{" "}
            <strong className="text-brand-gold">
              If you purchase a qualifying condominium unit valued at $50,000 or more, that deposit is waived
            </strong>{" "}
            — your property satisfies the requirement. For most buyers, the SRRV is{" "}
            <strong className="text-white">effectively free.</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {facts.map((fact) => (
            <span
              key={fact.label}
              className="rounded-full border border-brand-emerald/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-emerald"
            >
              {fact.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8"
        >
          <button
            onClick={openYuna}
            className="inline-flex items-center gap-2 text-base font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all"
          >
            ✦ Ask Yuna if you qualify →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

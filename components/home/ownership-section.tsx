"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { FileText, Key, Building2 } from "lucide-react";

const paths = [
  {
    icon: FileText,
    title: "CCT Condo Title",
    body: "The cleanest option. Your name on a Filipino title deed. No middleman, no structure, no risk.",
  },
  {
    icon: Key,
    title: "Long-Term Lease",
    body: "50 years, renewable for 25. Own the building, lease the land. Flexible and proven.",
  },
  {
    icon: Building2,
    title: "Filipino Corporation",
    body: "For serious investors. Structure a company, acquire land assets. Attorney-guided.",
  },
];

export function OwnershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);

  return (
    <section
      ref={ref}
      className="w-full bg-white px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Ownership
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            Foreigners can legally own property in Bohol.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-emerald/70">
            Three paths. All legitimate. We&apos;ll show you which fits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {paths.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="rounded-2xl border border-brand-emerald/10 bg-[#F5F0E8] p-7"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-emerald">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-emerald">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-emerald/70">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-brand-emerald/70">
            Not sure which is right for you?{" "}
            <button
              onClick={openYuna}
              className="font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all text-base"
            >
              ✦ Yuna can walk you through all three in plain English →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { CheckCircle2 } from "lucide-react";

const USD_TO_PHP = 58;
const USD_TO_KRW = 1450;

type Currency = "PHP" | "USD" | "KRW";

function formatPrice(phpValue: number, currency: Currency): string {
  const usd = phpValue / USD_TO_PHP;
  if (currency === "PHP") {
    return `₱${Math.round(phpValue).toLocaleString()}`;
  } else if (currency === "USD") {
    return `$${Math.round(usd).toLocaleString()}`;
  } else {
    return `₩${Math.round(usd * USD_TO_KRW).toLocaleString()}`;
  }
}

function formatUsdPrice(usdValue: number, currency: Currency): string {
  if (currency === "PHP") {
    return `₱${Math.round(usdValue * USD_TO_PHP).toLocaleString()}`;
  } else if (currency === "USD") {
    return `$${Math.round(usdValue).toLocaleString()}`;
  } else {
    return `₩${Math.round(usdValue * USD_TO_KRW).toLocaleString()}`;
  }
}

function formatRange(phpLow: number, phpHigh: number, currency: Currency): string {
  const lo = formatPrice(phpLow, currency);
  const hi = formatPrice(phpHigh, currency);
  // Strip currency symbol from hi end
  const hiNum = hi.replace(/^[₱$₩]/, "");
  return `${lo}–${hiNum}`;
}

const currencyLabel: Record<Currency, string> = {
  PHP: "Philippine Peso (PHP)",
  USD: "US Dollar (USD)",
  KRW: "Korean Won (KRW)",
};

export function NumbersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);
  const currency = useUIStore((s) => s.currency) as Currency;

  const comparisons = [
    {
      city: "Manila CBD",
      price: formatPrice(202590, currency) + "/sqm",
      note: "Congestion, pollution, no beach",
      highlight: false,
    },
    {
      city: "Cebu",
      price: formatPrice(100000, currency) + "/sqm",
      note: "Growing fast, already crowded",
      highlight: false,
    },
    {
      city: "Bali",
      price: formatUsdPrice(2300, currency) + "+/sqm",
      note: "Foreigners CANNOT own freehold",
      highlight: false,
    },
    {
      city: "Chiang Mai",
      price: formatUsdPrice(1700, currency) + "/sqm",
      note: "Landlocked, leasehold only",
      highlight: false,
    },
    {
      city: "Bohol / Panglao",
      price: formatRange(50000, 80000, currency) + "/sqm",
      note: "CLEAN CCT TITLE — foreigners CAN own",
      highlight: true,
      badge: "✓ Best Value",
    },
  ];

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
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            The Numbers
          </p>
          <h2 className="font-heading max-w-3xl text-3xl font-bold leading-tight text-brand-emerald sm:text-4xl lg:text-5xl">
            Manila prices are 4× higher. And that&apos;s before the traffic.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-emerald/75">
            Southeast Asia is full of beautiful places — but most lock out foreign buyers, price them into congested cities, or bury them in leasehold complexity. Bohol offers something rare: freehold ownership, pristine nature, and prices that still make sense.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {comparisons.map((item, i) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`relative rounded-2xl border p-5 transition ${
                item.highlight
                  ? "border-brand-gold bg-brand-emerald text-white shadow-xl"
                  : "border-brand-emerald/10 bg-white/60 text-brand-emerald/60"
              }`}
            >
              {item.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-emerald">
                  {item.badge}
                </span>
              )}
              <p className={`text-xs uppercase tracking-[0.2em] ${item.highlight ? "text-brand-gold" : "text-brand-emerald/40"}`}>
                {item.city}
              </p>
              <p className={`mt-1 text-2xl font-bold ${item.highlight ? "text-white" : ""}`}>
                {item.price}
              </p>
              <div className={`mt-2 flex items-start gap-2 text-sm ${item.highlight ? "text-white/80" : ""}`}>
                {item.highlight && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />}
                <p>{item.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <p className="text-xs text-brand-emerald/50 italic">
            Prices shown in {currencyLabel[currency]}. Toggle currency in the top navigation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6"
        >
          <p className="text-lg font-semibold text-brand-emerald">
            Still cheaper than Chiang Mai. Better weather than anywhere. And you actually own it.
          </p>
          <button
            onClick={openYuna}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all text-base"
          >
            ✦ Curious what your budget gets you here? Ask Yuna →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

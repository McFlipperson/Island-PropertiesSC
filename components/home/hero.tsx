"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="bg-transparent"
      >
        <div className="relative h-[72vh] w-full bg-brand-cream sm:h-[88vh] lg:h-[96vh]">
          <Image
            src="https://i.imgur.com/4Wumn1e.jpeg"
            alt="Island Properties hero"
            fill
            priority
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="px-1 pt-8 sm:pt-10"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-brand-gold sm:text-sm">
          Lean Luxury Concierge Platform
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-emerald sm:text-6xl">
          Exceptional Assets. Secure Ownership.
        </h1>
        <p className="mt-6 max-w-xl text-sm text-brand-emerald/85 sm:text-base">
          Purpose-built for high-net-worth foreign buyers focused on asset quality, legal structure,
          and personal privacy in the Philippines.
        </p>
        <Link
          href="/listings/panglao-cliffside-estate"
          className="mt-8 inline-flex rounded-full border border-brand-gold/70 bg-brand-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald transition hover:bg-[#d3ad64]"
        >
          Enter Private Listings
        </Link>
      </motion.div>
    </section>
  );
}
